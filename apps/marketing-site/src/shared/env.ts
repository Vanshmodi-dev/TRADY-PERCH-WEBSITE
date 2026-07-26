/**
 * Product Implementation Constitution Ch.10 §3: "every app declares its
 * required environment variables in a single, typed schema file... never
 * scattered across multiple files." This app has exactly two environment
 * variables (both read by `app/api/contact/route.ts`) — before this file,
 * they were each a raw `process.env.X` lookup inline in the route handler,
 * which is Ch.10 §8's named anti-pattern ("never introduced by a call to a
 * raw environment-variable lookup scattered directly in application code").
 *
 * Both are declared optional, not required: Ch.10 §4's mandatory
 * startup-fail-loudly rule applies to a value the app cannot correctly run
 * without. This app can — email delivery is a genuinely optional
 * capability until an ESP account exists (see the route handler's own
 * comment), and degrading to "validate but don't deliver, log loudly" is a
 * deliberate design decision already made and disclosed there, not a gap
 * this schema file should paper over by inventing a false "required"
 * status just to satisfy Section 4's letter.
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
}

const DEFAULT_FROM_EMAIL = "Trady Perch site <onboarding@resend.dev>";

export const env: Env = {
  MARKETING_SITE_RESEND_API_KEY: process.env.MARKETING_SITE_RESEND_API_KEY,
  MARKETING_SITE_CONTACT_INBOX_EMAIL: process.env.MARKETING_SITE_CONTACT_INBOX_EMAIL,
  MARKETING_SITE_RESEND_FROM_EMAIL:
    process.env.MARKETING_SITE_RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
};
