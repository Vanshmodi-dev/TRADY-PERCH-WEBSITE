import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormData } from "./contact-validation";
import {
  TEMPLATE_BODY,
  buildTemplateMessage,
  flattenParameter,
  normalizeRecipient,
} from "./whatsapp-delivery";

/**
 * The WhatsApp channel's arithmetic and escaping.
 *
 * Everything asserted here fails the same way in production: Meta answers a
 * malformed template parameter with a generic 400, the notification silently
 * never arrives, and the email still works — so nothing looks broken until
 * someone notices the phone stopped buzzing weeks ago. These are the rules
 * that have no visible symptom when broken, which is exactly why they are
 * tested rather than eyeballed.
 */

/** Meta's ceiling on a rendered template body. */
const BODY_LIMIT = 1024;

const submission = (overrides: Partial<ContactFormData> = {}): ContactFormData => ({
  name: "Priya Raman",
  email: "priya@example.com",
  company: "Raman Logistics",
  message: "We run dispatch on three spreadsheets and want it automated.",
  website: "",
  ...overrides,
});

/** Substitute parameters into the approved body, as Meta does at send time. */
function render(message: ReturnType<typeof buildTemplateMessage>): string {
  const values = message.template.components[0]?.parameters.map((p) => p.text) ?? [];
  return TEMPLATE_BODY.replace(
    /\{\{(\d)\}\}/g,
    (_, index: string) => values[Number(index) - 1] ?? "",
  );
}

describe("TEMPLATE_BODY", () => {
  /* Each of these is a documented Meta rejection reason, and each costs a
     round trip through template review to discover the hard way. */
  it("does not begin or end with a placeholder", () => {
    expect(TEMPLATE_BODY.trimStart().startsWith("{{")).toBe(false);
    expect(TEMPLATE_BODY.trimEnd().endsWith("}}")).toBe(false);
  });

  it("never places two placeholders adjacent", () => {
    expect(TEMPLATE_BODY).not.toMatch(/\}\}\s*\{\{/);
  });

  it("numbers its placeholders 1 to 4, each used exactly once", () => {
    const found = [...TEMPLATE_BODY.matchAll(/\{\{(\d)\}\}/g)].map((m) => m[1]);
    expect(found).toEqual(["1", "2", "3", "4"]);
  });

  it("contains no URL — since 2026 Meta requires every one to be separately verifiable", () => {
    expect(TEMPLATE_BODY).not.toMatch(/https?:\/\//);
  });
});

describe("flattenParameter", () => {
  it("collapses the newlines a multi-line message always contains", () => {
    const flat = flattenParameter("first line\n\nsecond line\r\nthird", 200);
    expect(flat).toBe("first line second line third");
    expect(flat).not.toMatch(/[\n\r\t]/);
  });

  it("never leaves more than four consecutive spaces", () => {
    const flat = flattenParameter("a          b\t\t\tc", 200);
    expect(flat).toBe("a b c");
    expect(flat).not.toMatch(/ {5}/);
  });

  it("returns short values untouched", () => {
    expect(flattenParameter("Priya Raman", 120)).toBe("Priya Raman");
  });

  it("truncates to the budget and marks the cut", () => {
    const flat = flattenParameter("x".repeat(500), 50);
    expect(flat.length).toBeLessThanOrEqual(50);
    expect(flat.endsWith("…")).toBe(true);
  });

  it("cuts on a word boundary rather than mid-word when one is close to the limit", () => {
    /* A hard cut here would land inside "echo", so the last space within the
       final fifth of the budget is preferred. */
    const flat = flattenParameter("alpha bravo charlie delta echo foxtrot", 30);
    expect(flat.length).toBeLessThanOrEqual(30);
    expect(flat).toBe("alpha bravo charlie delta…");
  });

  it("still truncates a single unbroken word rather than overflowing", () => {
    const flat = flattenParameter("supercalifragilisticexpialidocious", 12);
    expect(flat.length).toBeLessThanOrEqual(12);
    expect(flat.endsWith("…")).toBe(true);
  });
});

describe("normalizeRecipient", () => {
  it.each([
    ["+91 95090 17150", "919509017150"],
    ["+91-95090-17150", "919509017150"],
    ["(91) 95090 17150", "919509017150"],
    ["919509017150", "919509017150"],
  ])("turns %s into digits-only E.164", (input, expected) => {
    expect(normalizeRecipient(input)).toBe(expected);
  });
});

describe("buildTemplateMessage", () => {
  const options = { to: "+91 95090 17150", templateName: "new_enquiry", languageCode: "en" };

  it("sends four body parameters, in template order", () => {
    const message = buildTemplateMessage(submission(), options);
    expect(message.template.components[0]?.parameters.map((p) => p.text)).toEqual([
      "Priya Raman",
      "priya@example.com",
      "Raman Logistics",
      "We run dispatch on three spreadsheets and want it automated.",
    ]);
  });

  it("addresses the normalised recipient and names the configured template", () => {
    const message = buildTemplateMessage(submission(), options);
    expect(message.to).toBe("919509017150");
    expect(message.template.name).toBe("new_enquiry");
    expect(message.template.language.code).toBe("en");
    expect(message.messaging_product).toBe("whatsapp");
  });

  it("shows a dash for an omitted company, matching the email's own formatting", () => {
    const message = buildTemplateMessage(submission({ company: "" }), options);
    expect(message.template.components[0]?.parameters[2]?.text).toBe("—");
  });

  it("keeps the rendered body within Meta's 1024 limit at every field's maximum", () => {
    /* The worst case the validator will actually let through: 120-char name,
       254-char email, 160-char company, 5000-char message. Unflattened this
       renders at over 5500 characters and Meta rejects the send outright. */
    const message = buildTemplateMessage(
      submission({
        name: "n".repeat(120),
        email: `${"e".repeat(240)}@example.com`,
        company: "c".repeat(160),
        message: "word ".repeat(1000),
      }),
      options,
    );
    expect(render(message).length).toBeLessThanOrEqual(BODY_LIMIT);
  });

  it("keeps the rendered body within the limit for an ordinary submission too", () => {
    expect(render(buildTemplateMessage(submission(), options)).length).toBeLessThanOrEqual(
      BODY_LIMIT,
    );
  });

  it("never lets a huge email address crowd out the enquiry itself", () => {
    /* The message is the only part worth reading on a phone. A pathological
       address must cost the message some characters, not all of them. */
    const message = buildTemplateMessage(
      submission({
        name: "n".repeat(120),
        email: `${"e".repeat(240)}@example.com`,
        company: "c".repeat(160),
        message: "m".repeat(5000),
      }),
      options,
    );
    const body = message.template.components[0]?.parameters[3]?.text ?? "";
    expect(body.length).toBeGreaterThanOrEqual(280);
  });

  it("emits no parameter containing a character Meta forbids", () => {
    const message = buildTemplateMessage(
      submission({
        name: "Priya\nRaman",
        company: "Raman\tLogistics",
        message: "line one\n\nline two\n\n\nline three     spaced",
      }),
      options,
    );
    for (const parameter of message.template.components[0]?.parameters ?? []) {
      expect(parameter.text).not.toMatch(/[\n\r\t]/);
      expect(parameter.text).not.toMatch(/ {5}/);
    }
  });
});

/**
 * The request as Meta actually receives it.
 *
 * `fetch` is stubbed rather than a live call: this asserts the wire format —
 * endpoint, version, auth header, body shape — which is the part that can be
 * wrong without any local symptom, while needing no credentials to run in CI.
 */
describe("sendWhatsAppNotification", () => {
  const CONFIG = {
    MARKETING_SITE_WHATSAPP_TOKEN: "EAAG-test-token",
    MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID: "123456789012345",
    MARKETING_SITE_WHATSAPP_TO: "+91 95090 17150",
  } as const;

  const KEYS = [
    "MARKETING_SITE_WHATSAPP_TOKEN",
    "MARKETING_SITE_WHATSAPP_PHONE_NUMBER_ID",
    "MARKETING_SITE_WHATSAPP_TO",
    "MARKETING_SITE_WHATSAPP_TEMPLATE",
    "MARKETING_SITE_WHATSAPP_TEMPLATE_LANGUAGE",
    "MARKETING_SITE_WHATSAPP_API_VERSION",
  ] as const;

  const original = { ...process.env };

  /** `env` is a module-level constant, so each case needs a fresh import. */
  async function load(values: Partial<Record<(typeof KEYS)[number], string>>) {
    vi.resetModules();
    for (const key of KEYS) {
      if (values[key] === undefined) delete process.env[key];
      else process.env[key] = values[key];
    }
    return await import("./whatsapp-delivery");
  }

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = { ...original };
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("does nothing at all when the channel is unconfigured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { sendWhatsAppNotification } = await load({});

    await expect(sendWhatsAppNotification(submission())).resolves.toEqual({ status: "skipped" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts a template message to the versioned Cloud API endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { sendWhatsAppNotification } = await load({ ...CONFIG });

    await expect(sendWhatsAppNotification(submission())).resolves.toEqual({ status: "sent" });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/^https:\/\/graph\.facebook\.com\/v\d+\.\d+\/123456789012345\/messages$/);
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer EAAG-test-token");
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");

    const body = JSON.parse(String(init.body));
    expect(body.messaging_product).toBe("whatsapp");
    expect(body.to).toBe("919509017150");
    expect(body.type).toBe("template");
    expect(body.template.name).toBe("new_enquiry");
    expect(body.template.components[0].parameters).toHaveLength(4);
  });

  it("honours an overridden template name and language", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { sendWhatsAppNotification } = await load({
      ...CONFIG,
      MARKETING_SITE_WHATSAPP_TEMPLATE: "site_enquiry_v2",
      MARKETING_SITE_WHATSAPP_TEMPLATE_LANGUAGE: "en_GB",
    });

    await sendWhatsAppNotification(submission());
    const body = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(body.template.name).toBe("site_enquiry_v2");
    expect(body.template.language.code).toBe("en_GB");
  });

  it("reports a rejected send without throwing, so the email path is untouched", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ error: { message: "Template not found" } }), { status: 400 }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const { sendWhatsAppNotification } = await load({ ...CONFIG });

    await expect(sendWhatsAppNotification(submission())).resolves.toEqual({
      status: "failed",
      reason: "whatsapp-400",
    });
    // The body carries the only actionable diagnosis, so it must be logged.
    expect(console.error).toHaveBeenCalled();
  });

  it("reports an unreachable API without throwing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ETIMEDOUT")));
    const { sendWhatsAppNotification } = await load({ ...CONFIG });

    await expect(sendWhatsAppNotification(submission())).resolves.toEqual({
      status: "failed",
      reason: "network",
    });
  });

  it("warns when the recipient has no country code — the commonest misconfiguration", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 200 })));
    const { sendWhatsAppNotification } = await load({
      ...CONFIG,
      MARKETING_SITE_WHATSAPP_TO: "9509017150",
    });

    await sendWhatsAppNotification(submission());
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("country code"));
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

  it("whatsapp-delivery.ts is marked server-only", () => {
    expect(read("./whatsapp-delivery.ts")).toMatch(/^import ["']server-only["'];$/m);
  });

  it("never gives the WhatsApp token a NEXT_PUBLIC_ prefix", () => {
    expect(read("../../shared/env.ts")).not.toMatch(/NEXT_PUBLIC_[A-Z_]*WHATSAPP/);
  });

  it("keeps the token and the recipient's number out of the client form component", () => {
    const form = read("./contact-form.tsx");
    expect(form).not.toContain("MARKETING_SITE_WHATSAPP");
    expect(form).not.toMatch(/from ["']\.\/whatsapp-delivery["']/);
  });

  it("hardcodes no phone number in the source — the repository is public", () => {
    const source = read("./whatsapp-delivery.ts");
    /* Any run of 10+ digits that is not part of a comment's example. The
       recipient is configuration; a personal mobile number must never be
       committed. */
    const digits = source.match(/\b\d{10,}\b/g) ?? [];
    expect(digits).toEqual([]);
  });
});
