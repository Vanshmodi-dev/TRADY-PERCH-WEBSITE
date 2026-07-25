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
export interface Env {
  RESEND_API_KEY: string | undefined;
  CONTACT_INBOX_EMAIL: string | undefined;
}

export const env: Env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_INBOX_EMAIL: process.env.CONTACT_INBOX_EMAIL,
};
