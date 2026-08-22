import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * `/api/contact`'s two-channel decision matrix.
 *
 * An enquiry goes to an inbox and to a phone, and the only genuinely new logic
 * in the endpoint is what it tells the visitor given two independent outcomes.
 * Each row below is a real production state:
 *
 *   email    telegram   visitor sees   submission logged?
 *   ------   --------   ------------   ------------------
 *   sent     sent       success        no
 *   sent     failed     success        no   ← the alert is down, not the lead
 *   failed   sent       success        no   ← the outage this pairing exists for
 *   failed   failed     502 + mailto   YES
 *   skipped  skipped    success        no   ← CI, fresh clone, no secrets
 *
 * The third row is the one that motivated dispatching both channels together
 * rather than chaining them: Resend rejecting every submission is exactly when
 * a phone alert is most valuable, and a chained notification would have been
 * skipped in precisely that outage.
 */

/**
 * Every case here calls `vi.resetModules()` and re-imports the route handler,
 * which pulls in `next/server` and transforms it again from cold. On a warm
 * machine that is milliseconds; in a full-suite run on a cold worker — and on
 * a two-core CI runner especially — the first import alone can exceed Vitest's
 * 5s default and fail a test that has not actually run yet.
 *
 * The re-import is not incidental: `env` is a module-level constant, so a
 * fresh module graph per case is the only way to vary the credentials each
 * channel sees. Raising the ceiling is the honest fix; it only ever applies
 * when something is genuinely stuck.
 */
vi.setConfig({ testTimeout: 30_000 });

const ENV = {
  MARKETING_SITE_RESEND_API_KEY: "re_test_key",
  MARKETING_SITE_CONTACT_INBOX_EMAIL: "hello@tradyperch.com",
  MARKETING_SITE_TELEGRAM_BOT_TOKEN: "123456:TEST-token",
  MARKETING_SITE_TELEGRAM_CHAT_ID: "1234567890",
} as const;

const KEYS = Object.keys(ENV) as Array<keyof typeof ENV>;

const original = { ...process.env };

function submission(): FormData {
  const form = new FormData();
  form.set("name", "Priya Raman");
  form.set("email", "priya@example.com");
  form.set("company", "Raman Logistics");
  form.set("message", "We run dispatch on three spreadsheets and want it automated.");
  form.set("website", "");
  return form;
}

/** The route reads `env` at module load, so each case needs a fresh import. */
async function loadRoute(values: Partial<Record<keyof typeof ENV, string>>) {
  vi.resetModules();
  for (const key of KEYS) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  return (await import("../../../app/api/contact/route")).POST;
}

/** Route one stubbed response to Resend and another to Telegram. */
function stubChannels(outcomes: { email: "ok" | "fail"; telegram: "ok" | "fail" }) {
  const calls: string[] = [];
  const fetchMock = vi.fn(async (input: string | URL | Request) => {
    const url = String(input);
    calls.push(url);
    const which = url.includes("resend.com") ? outcomes.email : outcomes.telegram;
    return which === "ok"
      ? new Response("{}", { status: 200 })
      : new Response(JSON.stringify({ error: "nope" }), { status: 400 });
  });
  vi.stubGlobal("fetch", fetchMock);
  return { calls, fetchMock };
}

async function post(handler: (request: Request) => Promise<Response>) {
  const response = await handler(
    new Request("https://tradyperch.com/api/contact", { method: "POST", body: submission() }),
  );
  return { status: response.status, body: await response.json() };
}

describe("/api/contact delivery matrix", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = { ...original };
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("sends to both channels, in parallel, from one submission", async () => {
    const { calls } = stubChannels({ email: "ok", telegram: "ok" });
    const { status, body } = await post(await loadRoute(ENV));

    expect(status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(calls.some((url) => url.includes("api.resend.com"))).toBe(true);
    expect(calls.some((url) => url.includes("api.telegram.org"))).toBe(true);
  });

  it("still reports success when only the Telegram alert fails", async () => {
    stubChannels({ email: "ok", telegram: "fail" });
    const { status, body } = await post(await loadRoute(ENV));

    expect(status).toBe(200);
    expect(body).toEqual({ ok: true });
    // Nothing was lost, so the visitor's data must not be written to the log.
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining("UNDELIVERED SUBMISSION"),
    );
    // But the operator needs to know the alerting channel is down.
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("telegram delivery failed"));
  });

  it("still reports success when email is down but the phone got it", async () => {
    stubChannels({ email: "fail", telegram: "ok" });
    const { status, body } = await post(await loadRoute(ENV));

    expect(status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining("UNDELIVERED SUBMISSION"),
    );
  });

  it("fails loudly, and records the submission, only when every channel fails", async () => {
    stubChannels({ email: "fail", telegram: "fail" });
    const { status, body } = await post(await loadRoute(ENV));

    expect(status).toBe(502);
    expect(body.ok).toBe(false);
    expect(body.fallbackEmail).toBe("hello@tradyperch.com");
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("UNDELIVERED SUBMISSION"));
  });

  it("accepts the submission without delivering when nothing is configured", async () => {
    const { fetchMock } = stubChannels({ email: "ok", telegram: "ok" });
    const { status, body } = await post(await loadRoute({}));

    expect(status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("delivers by Telegram alone when only that channel is configured", async () => {
    const { calls } = stubChannels({ email: "ok", telegram: "ok" });
    const { status } = await post(
      await loadRoute({
        MARKETING_SITE_TELEGRAM_BOT_TOKEN: ENV.MARKETING_SITE_TELEGRAM_BOT_TOKEN,
        MARKETING_SITE_TELEGRAM_CHAT_ID: ENV.MARKETING_SITE_TELEGRAM_CHAT_ID,
      }),
    );

    expect(status).toBe(200);
    expect(calls.every((url) => !url.includes("resend.com"))).toBe(true);
    expect(calls.some((url) => url.includes("api.telegram.org"))).toBe(true);
  });

  it("delivers by email alone when only that channel is configured", async () => {
    const { calls } = stubChannels({ email: "ok", telegram: "ok" });
    const { status } = await post(
      await loadRoute({
        MARKETING_SITE_RESEND_API_KEY: ENV.MARKETING_SITE_RESEND_API_KEY,
        MARKETING_SITE_CONTACT_INBOX_EMAIL: ENV.MARKETING_SITE_CONTACT_INBOX_EMAIL,
      }),
    );

    expect(status).toBe(200);
    expect(calls.some((url) => url.includes("api.resend.com"))).toBe(true);
    expect(calls.every((url) => !url.includes("api.telegram.org"))).toBe(true);
  });

  it("never contacts a delivery channel for a honeypot submission", async () => {
    const { fetchMock } = stubChannels({ email: "ok", telegram: "ok" });
    const handler = await loadRoute(ENV);
    const form = submission();
    form.set("website", "https://spam.example");

    const response = await handler(
      new Request("https://tradyperch.com/api/contact", { method: "POST", body: form }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("never contacts a delivery channel for an invalid submission", async () => {
    const { fetchMock } = stubChannels({ email: "ok", telegram: "ok" });
    const handler = await loadRoute(ENV);
    const form = submission();
    form.set("email", "not-an-address");

    const response = await handler(
      new Request("https://tradyperch.com/api/contact", { method: "POST", body: form }),
    );

    expect(response.status).toBe(422);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
