import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormData } from "./contact-validation";
import { buildAlert, escapeAndFit, escapeHtml, truncate } from "./telegram-delivery";

/**
 * The Telegram channel's escaping and character arithmetic.
 *
 * Everything asserted here fails the same way in production: Telegram answers
 * a malformed body with a 400, the notification silently never arrives, and
 * the email still works — so nothing looks broken until someone notices the
 * phone stopped buzzing weeks ago. These are the rules that have no visible
 * symptom when broken, which is exactly why they are tested rather than
 * eyeballed.
 */

/** Telegram's ceiling on a sendMessage body. */
const MESSAGE_LIMIT = 4096;

const submission = (overrides: Partial<ContactFormData> = {}): ContactFormData => ({
  name: "Priya Raman",
  email: "priya@example.com",
  company: "Raman Logistics",
  message: "We run dispatch on three spreadsheets and want it automated.",
  website: "",
  ...overrides,
});

describe("escapeHtml", () => {
  it("escapes the three characters Telegram's HTML parser treats as markup", () => {
    expect(escapeHtml('<b>bold</b> & "quoted"')).toBe('&lt;b&gt;bold&lt;/b&gt; &amp; "quoted"');
  });

  it("escapes the ampersand first, so escapes do not escape each other", () => {
    /* Wrong order yields `&amp;lt;`, which renders as the literal text
       "&lt;" instead of "<". */
    expect(escapeHtml("<")).toBe("&lt;");
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("leaves ordinary prose untouched", () => {
    expect(escapeHtml("We need help with dispatch.")).toBe("We need help with dispatch.");
  });
});

describe("truncate", () => {
  it("returns short values untouched", () => {
    expect(truncate("Priya Raman", 120)).toBe("Priya Raman");
  });

  it("truncates to the budget and marks the cut", () => {
    const cut = truncate("x".repeat(500), 50);
    expect(cut.length).toBeLessThanOrEqual(50);
    expect(cut.endsWith("…")).toBe(true);
  });

  it("cuts on a word boundary rather than mid-word when one is close to the limit", () => {
    expect(truncate("alpha bravo charlie delta echo foxtrot", 30)).toBe(
      "alpha bravo charlie delta…",
    );
  });

  it("still truncates a single unbroken word rather than overflowing", () => {
    const cut = truncate("supercalifragilisticexpialidocious", 12);
    expect(cut.length).toBeLessThanOrEqual(12);
    expect(cut.endsWith("…")).toBe(true);
  });
});

describe("escapeAndFit", () => {
  /* This function exists because of a defect the buildAlert tests below
     caught: budgeting before escaping let an all-ampersand message escape to
     18,782 characters against Telegram's 4096 limit, which loses the whole
     notification. The budget is a post-escaping budget. */
  it("measures the budget after escaping, not before", () => {
    const fitted = escapeAndFit("&".repeat(500), 100);
    expect(fitted.length).toBeLessThanOrEqual(100);
  });

  it("never leaves a half-written entity at the cut", () => {
    /* A dangling `&am` is rejected by Telegram with "can't parse entities",
       which is the same lost notification by a different route. */
    for (let budget = 6; budget < 60; budget += 1) {
      const fitted = escapeAndFit("&".repeat(200), budget);
      expect(fitted.length).toBeLessThanOrEqual(budget);
      expect(fitted).not.toMatch(/&[a-z]*…?$/i);
    }
  });

  it("leaves a value that already fits completely alone", () => {
    expect(escapeAndFit("Priya Raman", 120)).toBe("Priya Raman");
    expect(escapeAndFit("Raman & Co", 120)).toBe("Raman &amp; Co");
  });
});

describe("buildAlert", () => {
  it("labels every field and includes the whole enquiry", () => {
    const alert = buildAlert(submission());
    expect(alert).toContain("<b>New TradyPerch enquiry</b>");
    expect(alert).toContain("<b>From:</b> Priya Raman");
    expect(alert).toContain("<b>Email:</b> priya@example.com");
    expect(alert).toContain("<b>Company:</b> Raman Logistics");
    expect(alert).toContain("We run dispatch on three spreadsheets and want it automated.");
  });

  it("keeps the message's own line breaks — this is why Telegram replaced WhatsApp", () => {
    /* Under WhatsApp's template rules every newline had to be collapsed to a
       space. Preserving them is the whole readability difference. */
    const alert = buildAlert(
      submission({ message: "First paragraph.\n\nSecond paragraph.\nThird line." }),
    );
    expect(alert).toContain("First paragraph.\n\nSecond paragraph.\nThird line.");
  });

  it("shows a dash for an omitted company, matching the email's own formatting", () => {
    expect(buildAlert(submission({ company: "" }))).toContain("<b>Company:</b> —");
  });

  it("escapes markup in every visitor-supplied field", () => {
    /* The injection case: without escaping, this either mangles the alert or
       returns a 400 "can't parse entities" and loses the notification. */
    const alert = buildAlert(
      submission({
        name: "<b>Priya</b>",
        company: "Raman & Co <Logistics>",
        message: "Is 5 < 10 && 20 > 3?",
      }),
    );
    expect(alert).toContain("<b>From:</b> &lt;b&gt;Priya&lt;/b&gt;");
    expect(alert).toContain("Raman &amp; Co &lt;Logistics&gt;");
    expect(alert).toContain("Is 5 &lt; 10 &amp;&amp; 20 &gt; 3?");
    // The only unescaped tags are the ones this module wrote.
    expect(alert.match(/<(?!\/?b>)/g)).toBeNull();
  });

  it("stays within Telegram's 4096-character limit at every field's maximum", () => {
    /* The worst case the validator will actually let through: 120-char name,
       254-char email, 160-char company, 5000-char message. */
    const alert = buildAlert(
      submission({
        name: "n".repeat(120),
        email: `${"e".repeat(240)}@example.com`,
        company: "c".repeat(160),
        message: "word ".repeat(1000),
      }),
    );
    expect(alert.length).toBeLessThanOrEqual(MESSAGE_LIMIT);
  });

  it("stays within the limit even when every character escapes to five", () => {
    /* An all-ampersand message is the pathological case for HTML escaping:
       each character becomes `&amp;`, so a body measured before escaping can
       quintuple afterwards. */
    const alert = buildAlert(submission({ message: "&".repeat(5000) }));
    expect(alert.length).toBeLessThanOrEqual(MESSAGE_LIMIT);
  });

  it("never lets a huge email address crowd out the enquiry itself", () => {
    const alert = buildAlert(
      submission({
        name: "n".repeat(120),
        email: `${"e".repeat(240)}@example.com`,
        company: "c".repeat(160),
        message: "m".repeat(5000),
      }),
    );
    expect(alert).toMatch(/m{500,}/);
  });
});

/**
 * The request as Telegram actually receives it.
 *
 * `fetch` is stubbed rather than a live call: this asserts the wire format —
 * endpoint, method, body shape — which is the part that can be wrong without
 * any local symptom, while needing no credentials to run in CI.
 */
describe("sendTelegramNotification", () => {
  const CONFIG = {
    MARKETING_SITE_TELEGRAM_BOT_TOKEN: "123456:TEST-token",
    MARKETING_SITE_TELEGRAM_CHAT_ID: "1234567890",
  } as const;

  const KEYS = ["MARKETING_SITE_TELEGRAM_BOT_TOKEN", "MARKETING_SITE_TELEGRAM_CHAT_ID"] as const;

  const original = { ...process.env };

  /** `env` is a module-level constant, so each case needs a fresh import. */
  async function load(values: Partial<Record<(typeof KEYS)[number], string>>) {
    vi.resetModules();
    for (const key of KEYS) {
      if (values[key] === undefined) delete process.env[key];
      else process.env[key] = values[key];
    }
    return await import("./telegram-delivery");
  }

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = { ...original };
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("does nothing at all when the channel is unconfigured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { sendTelegramNotification } = await load({});

    await expect(sendTelegramNotification(submission())).resolves.toEqual({ status: "skipped" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does nothing when only half the credentials are present", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { sendTelegramNotification } = await load({
      MARKETING_SITE_TELEGRAM_BOT_TOKEN: CONFIG.MARKETING_SITE_TELEGRAM_BOT_TOKEN,
    });

    await expect(sendTelegramNotification(submission())).resolves.toEqual({ status: "skipped" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the alert to the bot's sendMessage endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { sendTelegramNotification } = await load({ ...CONFIG });

    await expect(sendTelegramNotification(submission())).resolves.toEqual({ status: "sent" });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.telegram.org/bot123456:TEST-token/sendMessage");
    expect(init.method).toBe("POST");

    const body = JSON.parse(String(init.body));
    expect(body.chat_id).toBe("1234567890");
    expect(body.parse_mode).toBe("HTML");
    expect(body.disable_web_page_preview).toBe(true);
    expect(body.text).toContain("New TradyPerch enquiry");
  });

  it("reports a rejected send without throwing, so the email path is untouched", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: false, description: "chat not found" }), { status: 400 }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const { sendTelegramNotification } = await load({ ...CONFIG });

    await expect(sendTelegramNotification(submission())).resolves.toEqual({
      status: "failed",
      reason: "telegram-400",
    });
    // The body carries the only actionable diagnosis, so it must be logged.
    expect(console.error).toHaveBeenCalled();
  });

  it("reports an unreachable API without throwing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ETIMEDOUT")));
    const { sendTelegramNotification } = await load({ ...CONFIG });

    await expect(sendTelegramNotification(submission())).resolves.toEqual({
      status: "failed",
      reason: "network",
    });
  });
});

/**
 * The same guardrail `github-api.test.ts` applies to the GitHub token, for the
 * same reason: `vitest.config.ts` aliases `server-only` to a stub so this
 * module can be imported at all, which means no runtime test could ever catch
 * the marker being deleted. Reading the source is the only way.
 */
describe("client-bundle safety", () => {
  const read = (relativePath: string) =>
    readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

  it("telegram-delivery.ts is marked server-only", () => {
    expect(read("./telegram-delivery.ts")).toMatch(/^import ["']server-only["'];$/m);
  });

  it("never gives the bot token a NEXT_PUBLIC_ prefix", () => {
    expect(read("../../shared/env.ts")).not.toMatch(/NEXT_PUBLIC_[A-Z_]*TELEGRAM/);
  });

  it("keeps the token out of the client form component", () => {
    const form = read("./contact-form.tsx");
    expect(form).not.toContain("MARKETING_SITE_TELEGRAM");
    expect(form).not.toMatch(/from ["']\.\/telegram-delivery["']/);
  });

  it("hardcodes no bot token or chat ID in the source — the repository is public", () => {
    const source = read("./telegram-delivery.ts");
    /* A BotFather token is `<digits>:<35 chars>`, and a chat ID is a long
       digit run. Neither is code; both are configuration. */
    expect(source).not.toMatch(/\d{6,}:[A-Za-z0-9_-]{30,}/);
    expect(source.match(/\b\d{9,}\b/g) ?? []).toEqual([]);
  });
});
