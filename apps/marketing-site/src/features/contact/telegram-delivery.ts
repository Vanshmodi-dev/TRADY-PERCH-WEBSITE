import "server-only";

import { env } from "@/shared/env";
import type { ContactFormData } from "./contact-validation";
import { delivered, failed, skipped, type DeliveryOutcome } from "./delivery-outcome";

/**
 * TELEGRAM DELIVERY — the second channel for a contact-form submission.
 *
 * An enquiry is a lead with a half-life. It arrives in an inbox that gets
 * checked when it gets checked; this puts the same enquiry on a phone that
 * buzzes. Email remains the record; this is the alert.
 *
 * ── Why Telegram rather than WhatsApp ─────────────────────────────────────
 *
 * This replaced a WhatsApp Cloud API implementation, and the replacement is
 * a large simplification rather than a lateral move. WhatsApp permits an
 * unprompted business-initiated message only through a template approved in
 * advance by Meta, which brought with it: a second phone number to act as
 * sender (a number on the WhatsApp Business Platform stops working in the
 * normal app), business verification, a review cycle for the message layout,
 * per-message billing, and — the part that actually degraded the alert —
 * template parameters that may not contain newlines, tabs, or runs of
 * spaces, inside a 1024-character rendered body.
 *
 * A contact-form message is multi-line free text of up to 5000 characters.
 * Under WhatsApp it had to be flattened onto a single line and truncated
 * hard. Telegram's bot API takes a plain HTTP POST with a 4096-character
 * body, keeps newlines, needs no template, no approval, no sender number and
 * no billing. The enquiry arrives looking like the enquiry.
 *
 * ── Why the escaping is not optional ──────────────────────────────────────
 *
 * `parse_mode: HTML` is what gives the alert its bold labels, and it means
 * Telegram parses the body as markup. Every value in that body is supplied by
 * an anonymous visitor. A message containing `<b>` — or, more likely, a plain
 * `<` in something like `x < y` — is at best a mangled alert and at worst a
 * 400 that loses the notification entirely. So every interpolated value goes
 * through `escapeHtml` first; the only markup in the payload is markup this
 * file wrote.
 */

/** Telegram's ceiling on a `sendMessage` body. */
const MESSAGE_LIMIT = 4096;

/**
 * Room reserved for the labels, the heading and the line breaks around them.
 * Generous on purpose: overshooting the limit costs the whole notification,
 * and the few characters this may cost the message body are invisible next to
 * a 4096-character allowance.
 */
const CHROME_BUDGET = 320;

/* Per-field caps, mirroring contact-validation.ts's own maximums so a value
   that passed validation is never truncated more than the transport demands. */
const NAME_LIMIT = 120;
const EMAIL_LIMIT = 254;
const COMPANY_LIMIT = 160;

/**
 * The message keeps whatever the other fields leave, but never less than
 * this — the enquiry itself is the one part worth reading on a phone.
 */
const MESSAGE_FLOOR = 500;

/** Shown in place of an empty optional field, matching the email's own dash. */
const EMPTY_FIELD = "—";

/** How long to wait on Telegram before giving up, ms. */
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Escape the three characters Telegram's HTML parser treats as markup.
 *
 * Ampersand first, or the escapes escape each other's output.
 */
export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Truncate to a budget, preferring a word boundary in the last fifth so a cut
 * lands between words rather than mid-word wherever it reasonably can.
 */
export function truncate(value: string, budget: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= budget) return trimmed;

  const hard = Math.max(1, budget - 1); // room for the ellipsis
  const slice = trimmed.slice(0, hard);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > hard * 0.8 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}

/**
 * Escape a value and guarantee the *escaped* result fits the budget.
 *
 * The budget has to be measured after escaping, not before, and the reason is
 * a real defect this replaced: escaping expands, by up to five characters for
 * every one. A 5000-character message of nothing but ampersands truncates to
 * a comfortable 3700 visible characters and then escapes to 18,782 — Telegram
 * rejects the whole body and the notification is silently lost, at exactly the
 * moment someone is trying to tell you something.
 *
 * Truncating the escaped string introduces the opposite hazard: a cut landing
 * inside `&amp;` leaves a dangling `&am`, which Telegram's parser rejects with
 * "can't parse entities". So a partial entity at the tail is removed before
 * the ellipsis goes on.
 */
export function escapeAndFit(value: string, budget: number): string {
  const escaped = escapeHtml(value.trim());
  if (escaped.length <= budget) return escaped;

  const hard = Math.max(1, budget - 1); // room for the ellipsis
  /* A complete entity always ends in `;`, so this can only ever match the
     broken tail of one — never a whole `&amp;`. */
  let slice = escaped.slice(0, hard).replace(/&[a-z]*$/i, "");
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > hard * 0.8) slice = slice.slice(0, lastSpace);
  return `${slice.trimEnd()}…`;
}

/**
 * Compose the alert body.
 *
 * Pure, and separated from the send so the escaping and the character
 * arithmetic — the parts that fail silently in production and are invisible
 * in review — can be asserted in tests.
 *
 * The message keeps its own line breaks. That is the whole reason this reads
 * as an enquiry rather than as a notification about one.
 */
export function buildAlert(data: ContactFormData): string {
  const name = escapeAndFit(data.name, NAME_LIMIT);
  const email = escapeAndFit(data.email, EMAIL_LIMIT);
  const company = escapeAndFit(data.company, COMPANY_LIMIT) || EMPTY_FIELD;

  /* Every length here is a post-escaping length, so the sum is the real
     rendered size. The floor can never push the total over the limit: the
     three caps total 534, the chrome allowance is 320, and 4096 minus both
     still leaves far more than MESSAGE_FLOOR. */
  const spent = CHROME_BUDGET + name.length + email.length + company.length;
  const messageBudget = Math.max(MESSAGE_FLOOR, MESSAGE_LIMIT - spent);
  const message = escapeAndFit(data.message, messageBudget) || EMPTY_FIELD;

  return [
    "<b>New TradyPerch enquiry</b>",
    "",
    `<b>From:</b> ${name}`,
    `<b>Email:</b> ${email}`,
    `<b>Company:</b> ${company}`,
    "",
    message,
  ].join("\n");
}

/**
 * Send the notification.
 *
 * Never throws, and never reports anything but its own outcome: the caller
 * treats this as strictly additive, so a Telegram outage must be incapable of
 * turning a delivered email into an error page for the visitor.
 *
 * Returns `skipped` when unconfigured — the same degradation the Resend path
 * has always had, and what keeps CI, a fresh clone and secret-less preview
 * deployments building and passing.
 */
export async function sendTelegramNotification(data: ContactFormData): Promise<DeliveryOutcome> {
  const token = env.MARKETING_SITE_TELEGRAM_BOT_TOKEN;
  const chatId = env.MARKETING_SITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) return skipped();

  let response: Response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildAlert(data),
        parse_mode: "HTML",
        /* The body carries a visitor-supplied email address and often a URL.
           Without this, Telegram renders a preview card for whatever it finds
           there — an unsolicited fetch of an unknown link, and an alert that
           buries the enquiry under someone else's OG image. */
        disable_web_page_preview: true,
      }),
      /* The visitor is waiting on this request's sibling. An unresponsive
         Telegram edge must cost the form a few seconds, not the platform's
         whole function timeout. */
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (cause) {
    console.error("[telegram] Could not reach the Telegram Bot API", cause);
    return failed("network");
  }

  if (!response.ok) {
    /* Logged in full: Telegram returns the actionable reason in the body —
       401 for a revoked token, 400 "chat not found" when the bot has never
       been started by the recipient, 400 "can't parse entities" for broken
       markup. Discarding it leaves a silent channel with nothing to debug. */
    console.error(`[telegram] Delivery failed (${response.status})`, await response.text());
    return failed(`telegram-${response.status}`);
  }

  return delivered();
}
