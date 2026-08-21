import "server-only";

import { env } from "@/shared/env";
import type { ContactFormData } from "./contact-validation";
import { delivered, failed, skipped, type DeliveryOutcome } from "./delivery-outcome";

/**
 * WHATSAPP DELIVERY — the second channel for a contact-form submission.
 *
 * An enquiry is a lead with a half-life. It arrives in an inbox that gets
 * checked when it gets checked; this puts the same enquiry on a phone that
 * buzzes. Email remains the record; this is the alert.
 *
 * ── Why a template, and why that is not optional ──────────────────────────
 *
 * WhatsApp splits messages into two kinds. Inside a 24-hour window opened by
 * the *recipient* messaging the business first, anything can be sent freely.
 * Outside it — which is always, for an unprompted notification — Meta accepts
 * only a pre-approved **template**, and rejects free-form text outright.
 *
 * So the body below is not a string this code composes. It is a fixed layout
 * approved in advance in the WhatsApp Manager, into which four values are
 * substituted at send time. TEMPLATE_BODY is that exact approved text, kept
 * here as the single source of truth precisely so the two cannot drift: the
 * character budget below is computed from it, and if the dashboard copy is
 * edited without editing this constant, the budget silently stops matching
 * what Meta renders.
 *
 * ── Why the values are flattened ──────────────────────────────────────────
 *
 * Meta's own constraint on a template parameter: no newlines, no tabs, no
 * more than four consecutive spaces, and a rendered body of at most 1024
 * characters. A contact-form message is the exact opposite of that — it is
 * multi-line free text of up to 5000 characters (contact-validation.ts). Sent
 * raw it is a 400 from the API and a lost notification, so every value is
 * collapsed to a single line and the message is truncated to whatever the
 * other three fields leave behind.
 *
 * Truncation is acceptable here in a way it would never be for the email:
 * the email carries the complete, unmodified submission, and this channel
 * exists to make a phone buzz with enough context to judge urgency.
 */

/**
 * The approved template's body, verbatim.
 *
 * Placeholders are Meta's positional `{{n}}` syntax: 1 name, 2 email,
 * 3 company, 4 message. Two rules shaped this layout and both are rejection
 * reasons if broken — a template body may not begin or end with a
 * placeholder, and two placeholders may not sit adjacent. Hence the fixed
 * first line and the fixed sign-off.
 *
 * No URL appears anywhere in it, deliberately: since January 2026 Meta
 * requires every URL in a submitted template to be independently verifiable,
 * which turns a cosmetic link into a review dependency for no benefit.
 */
export const TEMPLATE_BODY = `New TradyPerch enquiry.

From: {{1}}
Email: {{2}}
Company: {{3}}
Message: {{4}}

Sent automatically from the website contact form.`;

/** Meta's ceiling on the rendered body. */
const BODY_LIMIT = 1024;

/**
 * Characters the template spends on its own fixed text. Derived from
 * TEMPLATE_BODY rather than counted by hand, so editing the layout above
 * re-derives the budget instead of quietly invalidating it.
 */
const FIXED_CHARS = TEMPLATE_BODY.replace(/\{\{\d\}\}/g, "").length;

/* Per-field caps, mirroring contact-validation.ts's own maximums so a value
   that passed validation is never truncated more than the transport demands. */
const NAME_LIMIT = 120;
const EMAIL_LIMIT = 254;
const COMPANY_LIMIT = 160;

/**
 * The message keeps whatever the other three fields leave, but never less
 * than this — a pathological 254-character email address must not squeeze the
 * actual enquiry down to nothing, since the enquiry is the one part worth
 * reading on a phone.
 */
const MESSAGE_FLOOR = 280;

/** Shown in place of an empty optional field, matching the email's own dash. */
const EMPTY_FIELD = "—";

/** How long to wait on Meta before giving up, ms. */
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Collapse a value to something a template parameter is allowed to contain.
 *
 * All whitespace — newlines, tabs, runs of spaces — becomes a single space,
 * which satisfies three of Meta's four constraints at once. The fourth,
 * length, is handled by truncating on a word boundary where one is available
 * within the last fifth of the budget, so a cut lands between words rather
 * than mid-word whenever it reasonably can.
 */
export function flattenParameter(value: string, budget: number): string {
  const flat = value.replace(/\s+/g, " ").trim();
  if (flat.length <= budget) return flat;

  const hard = Math.max(1, budget - 1); // room for the ellipsis
  const slice = flat.slice(0, hard);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > hard * 0.8 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}

/**
 * Normalise a recipient into the digits-only E.164 form Meta expects.
 *
 * Written for how the value actually arrives: pasted into a hosting dashboard
 * as "+91 95090 17150" or "+91-95090-17150" by someone copying it out of a
 * contacts app. Meta accepts none of those, and rejects them with an error
 * that names the number rather than the formatting.
 */
export function normalizeRecipient(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

export interface WhatsAppTemplateMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "template";
  template: {
    name: string;
    language: { code: string };
    components: Array<{
      type: "body";
      parameters: Array<{ type: "text"; text: string }>;
    }>;
  };
}

/**
 * Build the request body. Pure, and separated from the send precisely so the
 * character arithmetic — the part that fails silently in production and is
 * invisible in review — can be asserted in tests.
 */
export function buildTemplateMessage(
  data: ContactFormData,
  options: { to: string; templateName: string; languageCode: string },
): WhatsAppTemplateMessage {
  const name = flattenParameter(data.name, NAME_LIMIT);
  const email = flattenParameter(data.email, EMAIL_LIMIT);
  const company = flattenParameter(data.company, COMPANY_LIMIT) || EMPTY_FIELD;

  const spent = FIXED_CHARS + name.length + email.length + company.length;
  const messageBudget = Math.max(MESSAGE_FLOOR, BODY_LIMIT - spent);
  const message = flattenParameter(data.message, messageBudget) || EMPTY_FIELD;

  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: normalizeRecipient(options.to),
    type: "template",
    template: {
      name: options.templateName,
      language: { code: options.languageCode },
      components: [
        {
          type: "body",
          parameters: [name, email, company, message].map((text) => ({
            type: "text" as const,
            text,
          })),
        },
      ],
    },
  };
}

/**
 * Send the notification.
 *
 * Never throws, and never reports anything but its own outcome: the caller
 * treats this as strictly additive, so a WhatsApp outage must be incapable of
 * turning a delivered email into an error page for the visitor.
 *
 * Returns `skipped` when unconfigured — the same degradation the Resend path
 * has always had, and what keeps CI, a fresh clone and secret-less preview
 * deployments building and passing.
 */
export async function sendWhatsAppNotification(data: ContactFormData): Promise<DeliveryOutcome> {
  const token = env.MARKETING_SITE_WHATSAPP_TOKEN;
  const phoneNumberId = env.MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID;
  const recipient = env.MARKETING_SITE_WHATSAPP_TO;

  if (!token || !phoneNumberId || !recipient) return skipped();

  const to = normalizeRecipient(recipient);
  if (to.length <= 10) {
    /* Ten digits or fewer is a national number with the country code left
       off — the single most common way this is misconfigured. Meta answers it
       with a generic "invalid parameter", so the diagnosis is written here
       instead. Still attempted: guessing a country code would be worse than
       an error message that says exactly what is wrong. */
    console.warn(
      `[whatsapp] MARKETING_SITE_WHATSAPP_TO ("${recipient}") looks like it is missing a country ` +
        `code — Meta expects full international digits, e.g. 91XXXXXXXXXX for India.`,
    );
  }

  const message = buildTemplateMessage(data, {
    to,
    templateName: env.MARKETING_SITE_WHATSAPP_TEMPLATE,
    languageCode: env.MARKETING_SITE_WHATSAPP_TEMPLATE_LANGUAGE,
  });

  const url = `https://graph.facebook.com/${env.MARKETING_SITE_WHATSAPP_API_VERSION}/${phoneNumberId}/messages`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      /* The visitor is waiting on this request's sibling. A Meta edge that
         stops answering must cost the form a few seconds, not the platform's
         whole function timeout. */
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (cause) {
    console.error("[whatsapp] Could not reach the WhatsApp Cloud API", cause);
    return failed("network");
  }

  if (!response.ok) {
    /* Logged in full: Meta returns the actionable reason in the body — an
       expired token, an unapproved or misnamed template, a recipient not on
       the allow-list of a test number, a wrong language code. Discarding it
       leaves a silent channel with nothing to debug. */
    console.error(`[whatsapp] Delivery failed (${response.status})`, await response.text());
    return failed(`whatsapp-${response.status}`);
  }

  return delivered();
}
