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
  "MARKETING_SITE_WHATSAPP_TOKEN",
  "MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID",
  "MARKETING_SITE_WHATSAPP_TO",
  "MARKETING_SITE_WHATSAPP_TEMPLATE",
  "MARKETING_SITE_WHATSAPP_TEMPLATE_LANGUAGE",
  "MARKETING_SITE_WHATSAPP_API_VERSION",
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
    const env = await loadEnv({ MARKETING_SITE_CONTACT_INBOX_EMAIL: "  hello@tradyperch.com \r\n" });
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

  it("strips whitespace from the WhatsApp credentials too", async () => {
    /* A Meta System User token is ~200 characters and is always delivered by
       copy-paste, which is the exact circumstance that produced the Resend
       outage above. `Bearer <token>\n` is rejected by Meta as an invalid
       token, sending whoever debugs it to regenerate a perfectly good one. */
    const env = await loadEnv({
      MARKETING_SITE_WHATSAPP_TOKEN: "EAAG0zaBcDeF...\n",
      MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID: "  123456789012345 \r\n",
      MARKETING_SITE_WHATSAPP_TO: " 919509017150 ",
    });
    expect(env.MARKETING_SITE_WHATSAPP_TOKEN).toBe("EAAG0zaBcDeF...");
    expect(env.MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID).toBe("123456789012345");
    expect(env.MARKETING_SITE_WHATSAPP_TO).toBe("919509017150");
  });

  it("leaves the WhatsApp channel unconfigured rather than half-configured", async () => {
    const env = await loadEnv({});
    expect(env.MARKETING_SITE_WHATSAPP_TOKEN).toBeUndefined();
    expect(env.MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID).toBeUndefined();
    expect(env.MARKETING_SITE_WHATSAPP_TO).toBeUndefined();
  });

  it("defaults the WhatsApp template, language and API version", async () => {
    const env = await loadEnv({});
    expect(env.MARKETING_SITE_WHATSAPP_TEMPLATE).toBe("new_enquiry");
    expect(env.MARKETING_SITE_WHATSAPP_TEMPLATE_LANGUAGE).toBe("en");
    expect(env.MARKETING_SITE_WHATSAPP_API_VERSION).toMatch(/^v\d+\.\d+$/);
  });
});
