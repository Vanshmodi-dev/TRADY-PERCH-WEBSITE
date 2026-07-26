import { NextResponse } from "next/server";
import {
  isSpamSubmission,
  validateContactForm,
  type ContactFormData,
} from "@/features/contact/contact-validation";
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
 * Real server-side validation and real delivery via Resend.
 *
 * Delivery is configured through three Ch.10 environment variables (see
 * `src/shared/env.ts`). When the API key or inbox address is absent — an
 * unconfigured environment such as CI or a fresh clone — the endpoint still
 * validates the submission, still returns a truthful success to the visitor,
 * and logs loudly server-side rather than silently swallowing the message.
 * That degradation path is deliberate and predates delivery being wired up;
 * it is what keeps the build and tests runnable without a live secret.
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

  const apiKey = env.MARKETING_SITE_RESEND_API_KEY;
  const toAddress = env.MARKETING_SITE_CONTACT_INBOX_EMAIL;

  if (!apiKey || !toAddress) {
    console.warn(
      "[api/contact] MARKETING_SITE_RESEND_API_KEY or MARKETING_SITE_CONTACT_INBOX_EMAIL not set — submission validated but not delivered.",
    );
    return NextResponse.json({ ok: true });
  }

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
    return NextResponse.json(
      { ok: false, errors: { message: "Something went wrong sending this — email us directly instead." } },
      { status: 502 },
    );
  }

  if (!response.ok) {
    // Body is logged in full: Resend returns the actionable reason here
    // (unverified sender domain, invalid key, recipient restriction), and
    // discarding it would leave a failed delivery undiagnosable.
    console.error(
      `[api/contact] Resend delivery failed (${response.status})`,
      await response.text(),
    );
    return NextResponse.json(
      { ok: false, errors: { message: "Something went wrong sending this — email us directly instead." } },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
