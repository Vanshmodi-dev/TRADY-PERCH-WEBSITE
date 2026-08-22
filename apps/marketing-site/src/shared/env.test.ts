import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * REGRESSION GUARD — production outage, contact form.
 *
 * `MARKETING_SITE_RESEND_FROM_EMAIL` was stored in the hosting dashboard as
 * "Trady Perch site <hello@tradyperch.com>\n" — an invisible trailing newline
 * picked up when the value was pasted. An envelope sender containing a
 * newline is a malformed mail header, so every submission failed with a 502,
 * and nothing about the value looked wrong in the dashboard.
 *
 * The same class of defect turns an API key into `Bearer <key>\n`, which
 * providers reject as invalid — pointing whoever debugs it at the credential
 * rather than at the whitespace.
 */

const KEYS = [
  "MARKETING_SITE_RESEND_API_KEY",
  "MARKETING_SITE_CONTACT_INBOX_EMAIL",
  "MARKETING_SITE_RESEND_FROM_EMAIL",
  "MARKETING_SITE_GITHUB_TOKEN",
  "MARKETING_SITE_GITHUB_USERNAME",
  "MARKETING_SITE_TELEGRAM_BOT_TOKEN",
  "MARKETING_SITE_TELEGRAM_CHAT_ID",
] as const;

/** `env` is a module-level constant, so each case needs a fresh import. */
async function loadEnv(values: Partial<Record<(typeof KEYS)[number], string>>) {
  vi.resetModules();
  for (const key of KEYS) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  return (await import("./env")).env;
}

const original = { ...process.env };
beforeEach(() => vi.resetModules());
afterEach(() => {
  process.env = { ...original };
});

describe("env", () => {
  it("strips the trailing newline a pasted dashboard value carries", async () => {
    const env = await loadEnv({
      MARKETING_SITE_RESEND_FROM_EMAIL: "Trady Perch site <hello@tradyperch.com>\n",
      MARKETING_SITE_RESEND_API_KEY: "re_livekey_0123456789\n",
    });
    expect(env.MARKETING_SITE_RESEND_FROM_EMAIL).toBe("Trady Perch site <hello@tradyperch.com>");
    expect(env.MARKETING_SITE_RESEND_API_KEY).toBe("re_livekey_0123456789");
  });

  it("strips surrounding spaces and carriage returns too", async () => {
    const env = await loadEnv({
      MARKETING_SITE_CONTACT_INBOX_EMAIL: "  hello@tradyperch.com \r\n",
    });
    expect(env.MARKETING_SITE_CONTACT_INBOX_EMAIL).toBe("hello@tradyperch.com");
  });

  it("treats an unfilled dashboard row as absent, not as configured", async () => {
    // "" would otherwise send `Authorization: Bearer ` on every request, which
    // a provider rejects with a 401 instead of falling back to the
    // unauthenticated path an absent token correctly takes.
    const env = await loadEnv({
      MARKETING_SITE_GITHUB_TOKEN: "",
      MARKETING_SITE_RESEND_API_KEY: "   ",
    });
    expect(env.MARKETING_SITE_GITHUB_TOKEN).toBeUndefined();
    expect(env.MARKETING_SITE_RESEND_API_KEY).toBeUndefined();
  });

  it("falls back to Resend's shared test sender when none is configured", async () => {
    const env = await loadEnv({});
    expect(env.MARKETING_SITE_RESEND_FROM_EMAIL).toBe("Trady Perch site <onboarding@resend.dev>");
  });

  it("strips whitespace from the Telegram credentials too", async () => {
    /* A BotFather token is delivered by copy-paste out of a chat message,
       which is the exact circumstance that produced the Resend outage above.
       Here a trailing newline lands inside the URL path itself — Telegram
       answers `bot<token>\n/sendMessage` with a 404, which sends whoever
       debugs it to regenerate a perfectly good token. */
    const env = await loadEnv({
      MARKETING_SITE_TELEGRAM_BOT_TOKEN: "123456:AAExample-token\n",
      MARKETING_SITE_TELEGRAM_CHAT_ID: "  1234567890 \r\n",
    });
    expect(env.MARKETING_SITE_TELEGRAM_BOT_TOKEN).toBe("123456:AAExample-token");
    expect(env.MARKETING_SITE_TELEGRAM_CHAT_ID).toBe("1234567890");
  });

  it("leaves the Telegram channel unconfigured rather than half-configured", async () => {
    const env = await loadEnv({});
    expect(env.MARKETING_SITE_TELEGRAM_BOT_TOKEN).toBeUndefined();
    expect(env.MARKETING_SITE_TELEGRAM_CHAT_ID).toBeUndefined();
  });
});
