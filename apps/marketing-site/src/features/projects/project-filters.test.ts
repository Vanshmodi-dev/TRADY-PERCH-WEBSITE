import { describe, expect, it } from "vitest";
import { isPublishableRepository, matchCategories, normaliseTopics } from "./project-filters";
import { githubRepository as repo } from "@/test/project-fixtures";


describe("isPublishableRepository", () => {
  it("publishes an ordinary public repository with content", () => {
    expect(isPublishableRepository(repo())).toBe(true);
  });

  // The five exclusions named in the brief, plus `disabled` — each asserted
  // in isolation so a regression names the exact gate that broke.
  it.each([
    ["a fork", { fork: true }],
    ["an archived repository", { archived: true }],
    ["a private repository", { private: true }],
    ["a template repository", { is_template: true }],
    ["a repository GitHub has disabled", { disabled: true }],
  ])("never publishes %s", (_label, overrides) => {
    expect(isPublishableRepository(repo(overrides))).toBe(false);
  });

  it("never publishes an empty repository", () => {
    // size === 0 is GitHub's signal for "initialised but no commits". A repo
    // with just a README reports a non-zero size, so this must not be an
    // off-by-one that also excludes a one-file project.
    expect(isPublishableRepository(repo({ size: 0 }))).toBe(false);
    expect(isPublishableRepository(repo({ size: 1 }))).toBe(true);
  });
});

describe("matchCategories", () => {
  it("matches a topic exactly", () => {
    expect(matchCategories(repo({ topics: ["automation"] }))).toContain("Automation");
  });

  it("matches a word in the repository name", () => {
    expect(matchCategories(repo({ name: "TRADY-PERCH-WEBSITE" }))).toContain("Website");
  });

  it("matches a word in the description", () => {
    expect(
      matchCategories(repo({ description: "An autonomous agent that books appointments." })),
    ).toContain("Agent");
  });

  it("returns every category a repository belongs to, not just the first", () => {
    const categories = matchCategories(
      repo({ name: "ai-agent-crm", description: "Next.js dashboard", topics: ["saas"] }),
    );
    expect(categories).toEqual(
      expect.arrayContaining(["AI", "Agent", "Business", "Next.js", "SaaS"]),
    );
  });

  it("returns categories in the canonical display order, not match order", () => {
    // `saas` appears first in the topics, but SaaS is 8th in the canonical
    // list — ordering must come from PORTFOLIO_CATEGORIES so the badge row
    // reads consistently across cards.
    const categories = matchCategories(repo({ topics: ["saas", "website"] }));
    expect(categories).toEqual(["Website", "SaaS"]);
  });

  it("returns nothing for a repository outside every category", () => {
    expect(matchCategories(repo({ name: "dotfiles", description: "My shell config." }))).toEqual([]);
  });

  /**
   * The regression this whole matcher exists to prevent. A naive
   * `text.includes("ai")` classifies every one of these as an AI project.
   */
  describe("token boundaries, not substrings", () => {
    it.each(["email-parser", "retail-inventory", "domain-checker", "chain-of-custody", "maintenance-log"])(
      "does not classify %s as AI",
      (name) => {
        expect(matchCategories(repo({ name }))).not.toContain("AI");
      },
    );

    it("still matches AI when it is a real token", () => {
      expect(matchCategories(repo({ name: "ai-toolkit" }))).toContain("AI");
      expect(matchCategories(repo({ description: "Powered by AI." }))).toContain("AI");
      expect(matchCategories(repo({ topics: ["ai"] }))).toContain("AI");
    });

    it("does not treat 'next' on its own as Next.js", () => {
      // "next" is an ordinary English word; only the framework spellings count.
      expect(matchCategories(repo({ name: "next-steps-planner" }))).not.toContain("Next.js");
      expect(matchCategories(repo({ name: "nextjs-starter" }))).toContain("Next.js");
      expect(matchCategories(repo({ topics: ["next-js"] }))).toContain("Next.js");
    });
  });

  describe("multi-word patterns", () => {
    it("matches a hyphenated pattern written as separate words", () => {
      expect(matchCategories(repo({ description: "Machine learning pipeline." }))).toContain("AI");
    });

    it("does not match a multi-word pattern whose words are merely both present", () => {
      // "machine" and "learning" both appear, but not adjacently — this is a
      // CNC repo, not an ML one.
      const categories = matchCategories(
        repo({ description: "Machine shop scheduling for people learning the trade." }),
      );
      expect(categories).not.toContain("AI");
    });
  });

  describe("language as a signal", () => {
    it("treats a website-native language as Website even with no topics", () => {
      expect(matchCategories(repo({ name: "zzz", language: "Svelte" }))).toContain("Website");
    });

    it("is case-insensitive about the language name", () => {
      expect(matchCategories(repo({ name: "zzz", language: "html" }))).toContain("Website");
    });

    /**
     * The guard that keeps this filter a filter. Nearly every modern repo is
     * TypeScript or JavaScript, so if either counted as evidence of a
     * category, everything would pass and the nine categories would be
     * decorative.
     */
    it.each(["TypeScript", "JavaScript"])(
      "does not let %s alone qualify a repository",
      (language) => {
        expect(matchCategories(repo({ name: "zzz", language }))).toEqual([]);
      },
    );
  });
});

describe("normaliseTopics", () => {
  it("passes through a well-formed array", () => {
    expect(normaliseTopics(["ai", "saas"])).toEqual(["ai", "saas"]);
  });

  // GitHub omitted `topics` entirely for years unless a preview header was
  // sent; a response without it must not crash the mapper.
  it.each([undefined, null, "ai", 42, {}])("returns an empty array for %s", (value) => {
    expect(normaliseTopics(value)).toEqual([]);
  });

  it("discards non-string entries rather than the whole array", () => {
    expect(normaliseTopics(["ai", 7, null, "saas"])).toEqual(["ai", "saas"]);
  });
});
