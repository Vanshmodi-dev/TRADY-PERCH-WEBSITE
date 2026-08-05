import { describe, expect, it } from "vitest";
import { buildProjectsSchema } from "./projects-schema";
import { project } from "@/test/project-fixtures";


describe("buildProjectsSchema", () => {
  it("emits a CollectionPage with the fields the schema audit requires", () => {
    const schema = buildProjectsSchema([project()]);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema).toHaveProperty("name");
    expect(schema).toHaveProperty("description");
    expect(schema).toHaveProperty("url");
  });

  it("describes each project as SoftwareSourceCode with its repository", () => {
    const schema = buildProjectsSchema([project()]);
    const list = schema.mainEntity as { itemListElement: Array<{ item: Record<string, unknown> }> };
    expect(list.itemListElement[0]?.item).toMatchObject({
      "@type": "SoftwareSourceCode",
      name: "AI Booking Agent",
      codeRepository: "https://github.com/acme/ai-booking-agent",
      programmingLanguage: "Python",
      dateModified: "2026-07-28T00:00:00Z",
    });
  });

  it("numbers positions from 1, not 0", () => {
    // Google's validator rejects position: 0.
    const schema = buildProjectsSchema([project({ id: 1 }), project({ id: 2 })]);
    const list = schema.mainEntity as { itemListElement: Array<{ position: number }> };
    expect(list.itemListElement.map((entry) => entry.position)).toEqual([1, 2]);
  });

  it("omits programmingLanguage entirely rather than emitting a null", () => {
    const schema = buildProjectsSchema([project({ language: null })]);
    const list = schema.mainEntity as { itemListElement: Array<{ item: Record<string, unknown> }> };
    expect(list.itemListElement[0]?.item).not.toHaveProperty("programmingLanguage");
  });

  it("points url at the live demo when there is one, and the repo otherwise", () => {
    const withDemo = buildProjectsSchema([project()]);
    const withoutDemo = buildProjectsSchema([project({ liveUrl: null })]);
    const url = (schema: Record<string, unknown>) =>
      (schema.mainEntity as { itemListElement: Array<{ item: { url: string } }> }).itemListElement[0]?.item.url;

    expect(url(withDemo)).toBe("https://demo.example.com/");
    expect(url(withoutDemo)).toBe("https://github.com/acme/ai-booking-agent");
  });

  /**
   * Ch.5.4's site-wide zero-price-signal rule, which
   * `scripts/schema-audit.mjs` enforces across every emitted block.
   */
  it("emits no pricing signal of any kind", () => {
    const serialised = JSON.stringify(buildProjectsSchema([project()]));
    for (const forbidden of ["offers", "price", "priceRange", "priceCurrency"]) {
      expect(serialised).not.toContain(`"${forbidden}"`);
    }
  });

  it("reports a count that matches the number of items", () => {
    const schema = buildProjectsSchema([project({ id: 1 }), project({ id: 2 }), project({ id: 3 })]);
    const list = schema.mainEntity as { numberOfItems: number; itemListElement: unknown[] };
    expect(list.numberOfItems).toBe(3);
    expect(list.itemListElement).toHaveLength(3);
  });
});
