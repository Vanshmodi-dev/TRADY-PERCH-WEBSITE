import { NextResponse } from "next/server";
import {
  isSpamSubmission,
  validateContactForm,
  type ContactFormData,
} from "@/features/contact/contact-validation";
import {
  delivered,
  failed,
  skipped,
  type DeliveryOutcome,
} from "@/features/contact/delivery-outcome";
import { sendTelegramNotification } from "@/features/contact/telegram-delivery";
import { env } from "@/shared/env";
import { isRateLimited } from "@/shared/rate-limit";

export const runtime = "nodejs";

function readField(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

/**
 * `x-forwarded-for` is set by the hosting platform's own proxy/edge layer,
 * not by this app — trusted here only as a rate-limit *key* (grouping
 * requests, not an identity/authorization decision), which is the correct,
 * narrow use for a header a client could otherwise forge: forging it just
 * lets an attacker rate-limit-key themselves differently, not bypass
 * validation or gain access to anything. Falls back to a single shared
 * key when absent (local dev with no proxy in front), which is
 * intentionally the most restrictive case, not the most permissive one.
 */
function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

/**
 * The response a visitor gets when delivery failed.
 *
 * The old copy — "Something went wrong sending this — email us directly
 * instead." — named no address. It told someone to do a thing while
 * withholding the one piece of information needed to do it, at the exact
 * moment they were most likely to give up. The address is returned so the
 * form can render a real, prefilled mailto rather than a dead end.
 *
 * `hello@tradyperch.com` is already published on /contact, /privacy and
 * /terms, so this exposes nothing new. It is hardcoded rather than read from
 * MARKETING_SITE_CONTACT_INBOX_EMAIL because that variable is a delivery
 * detail that may point at a routing alias, while this is the public address
 * the site already promises — and because a failure path must not depend on
 * the configuration that just failed.
 */
const PUBLIC_CONTACT_EMAIL = "hello@tradyperch.com";

function deliveryFailure() {
  return {
    ok: false as const,
    errors: {
      message:
        `We could not send this automatically. Please email ${PUBLIC_CONTACT_EMAIL} ` +
        `— your message is below, ready to copy.`,
    },
    fallbackEmail: PUBLIC_CONTACT_EMAIL,
  };
}

/**
 * Deliver one submission to Resend, exactly as this endpoint always has.
 *
 * Extracted from the handler unchanged — same request, same logging, same
 * failure classification — so that the handler can hold two channels side by
 * side without either one's error handling being nested inside the other's.
 *
 * `recordLostSubmission` is passed in rather than closed over here because
 * whether a failed email actually loses the submission now depends on the
 * *other* channel: if the phone got it, nothing was lost, and writing a
 * visitor's personal data into the server log would be retention for no
 * reason. Only the handler knows both outcomes, so only the handler decides.
 */
async function sendEmail(data: ContactFormData): Promise<DeliveryOutcome> {
  const apiKey = env.MARKETING_SITE_RESEND_API_KEY;
  const toAddress = env.MARKETING_SITE_CONTACT_INBOX_EMAIL;

  if (!apiKey || !toAddress) return skipped();

  // A newline in `name` would otherwise split the subject header. Resend's
  // JSON API escapes this itself, so this is defence in depth rather than a
  // live injection hole — but the subject is built from visitor-supplied
  // text, so it is collapsed to a single line at the point of use.
  const safeName = data.name.replace(/\s+/g, " ").trim();

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.MARKETING_SITE_RESEND_FROM_EMAIL,
        to: toAddress,
        reply_to: data.email,
        subject: `New inquiry from ${safeName}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\n\n${data.message}`,
      }),
    });
  } catch (cause) {
    // Ch.27 — a DNS failure, TLS error, or timeout reaching Resend is a
    // network fault, not a malformed submission. Without this the throw
    // escapes as an opaque 500 and the visitor's message is lost with no
    // server-side record of what they wrote.
    console.error("[api/contact] Could not reach Resend", cause);
    return failed("network");
  }

  if (!response.ok) {
    // Body is logged in full: Resend returns the actionable reason here
    // (unverified sender domain, invalid key, recipient restriction), and
    // discarding it would leave a failed delivery undiagnosable.
    console.error(
      `[api/contact] Resend delivery failed (${response.status})`,
      await response.text(),
    );
    return failed(`resend-${response.status}`);
  }

  return delivered();
}

/**
 * Real server-side validation, and real delivery down two independent
 * channels: an email via Resend, and a Telegram notification via the Bot API
 * (`features/contact/telegram-delivery.ts`).
 *
 * ── Why two, and why they are not a chain ─────────────────────────────────
 *
 * The email is the record — complete, searchable, replyable. The Telegram
 * message is the alert, so an enquiry is noticed in minutes rather than
 * whenever the inbox is next opened.
 *
 * They are dispatched together and judged together, rather than the second
 * being sent only if the first succeeds. That ordering matters in the case
 * that actually hurt this endpoint before: Resend rejecting every submission
 * because of a malformed sender address. A chained notification would have
 * failed in exactly the outage where an alert was most valuable. Here, either
 * channel arriving means the enquiry reached a human, and the visitor is told
 * the truth accordingly.
 *
 * Each channel is configured independently through Ch.10 environment
 * variables (see `src/shared/env.ts`), and each degrades to `skipped` when
 * its credentials are absent — an unconfigured environment such as CI or a
 * fresh clone still validates the submission, still returns a truthful
 * success to the visitor, and logs loudly server-side rather than silently
 * swallowing the message. That degradation path is deliberate and predates
 * delivery being wired up; it is what keeps the build and tests runnable
 * without a live secret.
 */
export async function POST(request: Request): Promise<Response> {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, errors: { message: "Too many submissions — please try again in a few minutes." } },
      { status: 429 },
    );
  }

  // Ch.27 — `request.formData()` throws on any body that isn't form-encoded,
  // and an unhandled throw here surfaces as an opaque 500. Anyone can send
  // `Content-Type: application/json` to this public endpoint, so a malformed
  // body is an expected input to reject cleanly, not an exceptional server
  // fault to crash on.
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { message: "Malformed request body." } },
      { status: 400 },
    );
  }

  const data: ContactFormData = {
    name: readField(formData.get("name")),
    email: readField(formData.get("email")),
    company: readField(formData.get("company")),
    message: readField(formData.get("message")),
    website: readField(formData.get("website")),
  };

  if (isSpamSubmission(data)) {
    // Reply as if it succeeded — telling a bot its honeypot was detected
    // only teaches it to stop filling that field.
    return NextResponse.json({ ok: true });
  }

  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  /**
   * A submission that could not be delivered is still a lead, and the visitor
   * has already spent the effort of writing it. Losing it to a transient
   * provider fault — or, as happened in production, an invalid API key — is
   * the worst outcome this endpoint has.
   *
   * So on any delivery failure the whole submission goes to the server log at
   * `error` level. It is recoverable from the hosting platform's log viewer,
   * and it means the cost of a delivery outage is "someone has to copy a
   * message out of a log" rather than "we never knew they wrote".
   *
   * Logged only on the failure paths, never on success: the happy path
   * delivers the message to a real inbox, and writing visitor-supplied
   * personal data into logs when it was not needed is exactly the retention
   * problem the privacy policy exists to avoid.
   */
  const recordLostSubmission = (reason: string) => {
    console.error(
      `[api/contact] UNDELIVERED SUBMISSION (${reason}) — recover this manually:\n` +
        `  name:    ${data.name}\n` +
        `  email:   ${data.email}\n` +
        `  company: ${data.company || "—"}\n` +
        `  message: ${data.message}`,
    );
  };

  /* Dispatched together, not one after the other: the two are independent
     services and the visitor waits on the slower of them rather than on their
     sum. Neither settle can reject — each channel resolves with its own
     outcome and reports its own faults — so `Promise.all` is safe here and
     keeps the destructuring readable. */
  const [email, telegram] = await Promise.all([sendEmail(data), sendTelegramNotification(data)]);

  const channels = { email, telegram };
  const anyDelivered = email.status === "sent" || telegram.status === "sent";
  const anyConfigured = email.status !== "skipped" || telegram.status !== "skipped";

  if (anyDelivered) {
    /* One channel down while the other worked is not a visitor-facing
       failure — the enquiry reached a human — but it is an operational fault
       that would otherwise be invisible until someone noticed the alerts had
       stopped. */
    for (const [name, outcome] of Object.entries(channels)) {
      if (outcome.status === "failed") {
        console.warn(
          `[api/contact] ${name} delivery failed (${outcome.reason}) but the submission was ` +
            `delivered by another channel — no data lost.`,
        );
      }
    }
    return NextResponse.json({ ok: true });
  }

  if (!anyConfigured) {
    console.warn(
      "[api/contact] No delivery channel is configured (Resend and Telegram are both unset) — submission validated but not delivered.",
    );
    return NextResponse.json({ ok: true });
  }

  /* Every configured channel failed. This is the case the visitor must be
     told about, and the case where their message only survives if it is
     written down. */
  const reason = [email.reason, telegram.reason].filter(Boolean).join(", ");
  recordLostSubmission(reason || "all-channels-failed");
  return NextResponse.json(deliveryFailure(), { status: 502 });
}
