/**
 * Product Implementation Constitution Ch.10 §3: "every app declares its
 * required environment variables in a single, typed schema file... never
 * scattered across multiple files." Every variable this app reads is declared
 * here and nowhere else — before this file, the first two were each a raw
 * `process.env.X` lookup inline in the route handler, which is Ch.10 §8's
 * named anti-pattern ("never introduced by a call to a raw
 * environment-variable lookup scattered directly in application code").
 *
 * Every credential here is declared optional, not required: Ch.10 §4's
 * mandatory startup-fail-loudly rule applies to a value the app cannot
 * correctly run without. This app can — email delivery, WhatsApp delivery and
 * the GitHub portfolio feed are each a genuinely optional capability until an
 * account exists for it (see each handler's own comment), and degrading to
 * "validate but don't deliver, log loudly" is a deliberate design decision
 * already made and disclosed there, not a gap this schema file should paper
 * over by inventing a false "required" status just to satisfy Section 4's
 * letter.
 */
/**
 * Ch.9 §6: `<APP_PREFIX>_<SCREAMING_SNAKE_NAME>`, where the prefix is the
 * app's Ch.7 folder name uppercased — `marketing-site` -> `MARKETING_SITE_`.
 * These were previously bare (`RESEND_API_KEY`, `CONTACT_INBOX_EMAIL`), which
 * Ch.9 §6 does not permit: an unprefixed name is reserved there for a
 * variable genuinely shared across every app and documented in
 * `packages/config/`, which these are not — both are read only by this app's
 * own `/api/contact` route.
 *
 * Ch.9 §7's exception clause doesn't apply either: nothing external dictates
 * these names. The Resend key is passed as a bearer token in a hand-written
 * `fetch`, not read from the environment by a vendor SDK that would require
 * a fixed variable name.
 */
export interface Env {
  MARKETING_SITE_RESEND_API_KEY: string | undefined;
  MARKETING_SITE_CONTACT_INBOX_EMAIL: string | undefined;
  /**
   * GitHub personal access token for the /work/projects portfolio feed.
   *
   * Server-only, and structurally so: it is reachable exclusively through
   * this module, this module is imported only by `src/features/projects/
   * github-api.ts` and `app/api/contact/route.ts` (both server-only), and it
   * carries no `NEXT_PUBLIC_` prefix — the only mechanism by which Next.js
   * inlines an environment variable into the client bundle. A build-time
   * assertion in `src/features/projects/github-api.test.ts` fails if the
   * token identifier ever appears in a `"use client"` module.
   *
   * Optional, for the same Ch.10 §4 reason as the Resend key above: the
   * portfolio degrades to its empty state without it, so a fresh clone and
   * CI both build and test with no secret present. Unauthenticated requests
   * to the GitHub REST API are also allowed (60/hour rather than 5,000), so
   * local development against a public account works token-free.
   */
  MARKETING_SITE_GITHUB_TOKEN: string | undefined;
  /**
   * The GitHub account (user or organisation) whose public repositories are
   * published as portfolio projects. Optional for the same reason as the
   * token: absent, `github-service.ts` short-circuits to an empty result
   * rather than issuing a request against an `undefined` username.
   */
  MARKETING_SITE_GITHUB_USERNAME: string | undefined;
  /**
   * The envelope sender. Configurable rather than hardcoded because Resend
   * rejects any `from` address whose domain isn't verified in the account —
   * the previous hardcoded `contact@tradyperch.com` would have failed with a
   * 403 on an account with no verified domains, which is the state this was
   * wired up in. Falls back to Resend's shared test sender, which needs no
   * domain verification but can only deliver to the account owner's own
   * address; that constraint is satisfied here because
   * MARKETING_SITE_CONTACT_INBOX_EMAIL is that same address.
   */
  MARKETING_SITE_RESEND_FROM_EMAIL: string;
  /**
   * Telegram bot credentials — the contact form's second delivery channel
   * (`features/contact/telegram-delivery.ts`).
   *
   * Both are optional together, and the channel is inert unless both are
   * present, for the same Ch.10 §4 reason as the Resend key: the site is
   * fully functional without it, and CI, a fresh clone and any preview
   * deployment without secrets must all still build and pass.
   *
   * The token is a BotFather token, and it is a full credential — anyone
   * holding it can read and send everything the bot can. Server-only and
   * structurally so: reachable only through this module, imported only by
   * server code, and carrying no `NEXT_PUBLIC_` prefix, which is the sole
   * mechanism by which Next.js inlines a variable into the client bundle.
   */
  MARKETING_SITE_TELEGRAM_BOT_TOKEN: string | undefined;
  /**
   * The chat the alert is posted to — a personal chat ID, a group, or a
   * channel.
   *
   * An environment variable rather than a constant in the source because
   * this repository is public. It is configuration, not code, and neither it
   * nor the token belongs in git.
   */
  MARKETING_SITE_TELEGRAM_CHAT_ID: string | undefined;
}

const DEFAULT_FROM_EMAIL = "Trady Perch site <onboarding@resend.dev>";

/**
 * Read one variable, trimmed, with the empty string treated as absent.
 *
 * ── Why trimming is not cosmetic ──────────────────────────────────────────
 *
 * Every value here arrives by being pasted into a hosting dashboard, and a
 * pasted secret routinely carries a trailing newline that the field accepts
 * silently and nothing downstream reports. This has already cost a production
 * outage: `MARKETING_SITE_RESEND_FROM_EMAIL` was stored as
 * "Trady Perch site <hello@tradyperch.com>\n" — 41 characters where the
 * address is 39 — and an envelope sender containing a newline is a malformed
 * mail header. Every contact-form submission failed with a 502, and nothing in
 * the value *looked* wrong in the dashboard, because the defect was invisible
 * whitespace.
 *
 * The same class of bug turns an API key into `Bearer <key>\n`, which every
 * provider rejects as invalid — with an error message that points at the key
 * rather than at the whitespace, sending whoever debugs it to rotate a
 * perfectly good credential.
 *
 * Trimming here fixes it once, for every variable, at the only point they are
 * read. No caller can forget.
 *
 * The empty string maps to `undefined` because that is how an unfilled row in
 * a hosting dashboard arrives, and treating "" as "configured" would send
 * `Authorization: Bearer ` on every request — which GitHub rejects with a 401
 * rather than falling back to the unauthenticated path an absent token
 * correctly takes.
 */
function readEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const env: Env = {
  MARKETING_SITE_RESEND_API_KEY: readEnv("MARKETING_SITE_RESEND_API_KEY"),
  MARKETING_SITE_CONTACT_INBOX_EMAIL: readEnv("MARKETING_SITE_CONTACT_INBOX_EMAIL"),
  MARKETING_SITE_RESEND_FROM_EMAIL:
    readEnv("MARKETING_SITE_RESEND_FROM_EMAIL") ?? DEFAULT_FROM_EMAIL,
  MARKETING_SITE_GITHUB_TOKEN: readEnv("MARKETING_SITE_GITHUB_TOKEN"),
  MARKETING_SITE_GITHUB_USERNAME: readEnv("MARKETING_SITE_GITHUB_USERNAME"),
  MARKETING_SITE_TELEGRAM_BOT_TOKEN: readEnv("MARKETING_SITE_TELEGRAM_BOT_TOKEN"),
  MARKETING_SITE_TELEGRAM_CHAT_ID: readEnv("MARKETING_SITE_TELEGRAM_CHAT_ID"),
};
