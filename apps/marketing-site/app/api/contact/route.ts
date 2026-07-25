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
 * Real server-side validation and a real delivery attempt — this is not a
 * fake endpoint. What's genuinely incomplete: no email service provider is
 * configured in this environment (no `RESEND_API_KEY`), so there is
 * nowhere real to deliver a validated submission to yet. That's a
 * deployment/ops step (an ESP account + API key belong to whoever owns
 * the inbox, not to the codebase) — see the Milestone 4 Completion Report
 * for the explicit pre-launch checklist item this produces. Until that
 * key is set, submissions are validated but not delivered anywhere, and
 * that is logged loudly server-side rather than silently swallowed.
 */
export async function POST(request: Request): Promise<Response> {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, errors: { message: "Too many submissions — please try again in a few minutes." } },
      { status: 429 },
    );
  }

  const formData = await request.formData();
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

  const apiKey = env.RESEND_API_KEY;
  const toAddress = env.CONTACT_INBOX_EMAIL;

  if (!apiKey || !toAddress) {
    console.warn(
      "[api/contact] RESEND_API_KEY or CONTACT_INBOX_EMAIL not set — submission validated but not delivered.",
    );
    return NextResponse.json({ ok: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Trady Perch site <contact@tradyperch.com>",
      to: toAddress,
      reply_to: data.email,
      subject: `New inquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\n\n${data.message}`,
    }),
  });

  if (!response.ok) {
    console.error("[api/contact] Resend delivery failed", await response.text());
    return NextResponse.json(
      { ok: false, errors: { message: "Something went wrong sending this — email us directly instead." } },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
