import { describe, expect, it } from "vitest";
import { project } from "@/test/project-fixtures";
import {
  PROJECT_FILTERS,
  applyFilters,
  availableFilters,
  countFor,
  matchesQuery,
} from "./project-taxonomy";

/**
 * The filter bar's vocabulary.
 *
 * These predicates decide what a visitor can find, so the tests are about
 * *inclusion boundaries* — what each chip claims, and what it must not claim.
 */

function filterById(id: string) {
  const filter = PROJECT_FILTERS.find((candidate) => candidate.id === id);
  if (!filter) throw new Error(`no filter ${id}`);
  return filter;
}

describe("filter definitions", () => {
  it("leads with an All filter that matches unconditionally", () => {
    expect(PROJECT_FILTERS[0]?.id).toBe("all");
    expect(PROJECT_FILTERS[0]?.matches).toBeNull();
  });

  it("gives every filter a unique id", () => {
    const ids = PROJECT_FILTERS.map((filter) => filter.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("matches on inferred categories", () => {
    expect(filterById("ai").matches?.(project({ categories: ["AI"], topics: [] }))).toBe(true);
    expect(filterById("web").matches?.(project({ categories: ["Website"], topics: [] }))).toBe(true);
  });

  it("matches on the repository's own topics", () => {
    expect(filterById("automation").matches?.(project({ categories: [], topics: ["workflow"] }))).toBe(
      true,
    );
  });

  it("matches topics case-insensitively", () => {
    expect(filterById("ai").matches?.(project({ categories: [], topics: ["LLM"] }))).toBe(true);
  });

  /**
   * The publication vocabulary splits AI from Agent because the distinction is
   * meaningful in prose. As a *filter* it is not: a visitor narrowing to "AI"
   * who is then shown no agents has been misled by an internal taxonomy.
   */
  it("folds Agent work into the AI filter", () => {
    expect(filterById("ai").matches?.(project({ categories: ["Agent"], topics: [] }))).toBe(true);
  });

  /**
   * "Open source" is a claim about licensing, not about visibility. Every
   * repository in this feed is public; only some say what anyone else may do
   * with them.
   */
  describe("open source", () => {
    it("matches a repository with a licence", () => {
      expect(filterById("open-source").matches?.(project({ license: "MIT" }))).toBe(true);
    });

    it("does not match a public repository with no licence", () => {
      expect(filterById("open-source").matches?.(project({ license: null, topics: [] }))).toBe(false);
    });

    it("matches an explicit open-source topic even without a detected licence", () => {
      expect(
        filterById("open-source").matches?.(project({ license: null, topics: ["open-source"] })),
      ).toBe(true);
    });
  });
});

describe("availableFilters", () => {
  /**
   * A chip that yields an empty grid advertises work that does not exist.
   */
  it("omits a filter nothing matches", () => {
    const filters = availableFilters([project({ categories: ["Website"], topics: [], license: null })]);
    expect(filters.map((filter) => filter.id)).toContain("web");
    expect(filters.map((filter) => filter.id)).not.toContain("ai");
  });

  it("always keeps All, even for an empty feed", () => {
    expect(availableFilters([]).map((filter) => filter.id)).toEqual(["all"]);
  });
});

describe("countFor", () => {
  it("counts All as the whole feed", () => {
    const projects = [project({ id: 1 }), project({ id: 2 })];
    expect(countFor(filterById("all"), projects)).toBe(2);
  });

  it("counts only matching projects for a real filter", () => {
    const projects = [
      project({ id: 1, categories: ["AI"] }),
      project({ id: 2, categories: ["Website"], topics: [] }),
    ];
    expect(countFor(filterById("ai"), projects)).toBe(1);
  });
});

describe("matchesQuery", () => {
  const subject = project({
    title: "Lead Finder",
    repoName: "lead-generation-trady-perch",
    description: "Sources and qualifies inbound prospects.",
    language: "Python",
    tags: ["Automation"],
    topics: ["outreach"],
  });

  it("matches an empty query", () => {
    expect(matchesQuery(subject, "")).toBe(true);
    expect(matchesQuery(subject, "   ")).toBe(true);
  });

  it.each(["lead", "python", "prospects", "outreach", "automation"])(
    "matches on %s",
    (term) => {
      expect(matchesQuery(subject, term)).toBe(true);
    },
  );

  it("is case-insensitive", () => {
    expect(matchesQuery(subject, "PYTHON")).toBe(true);
  });

  it("matches a substring, so a partial word still finds the project", () => {
    expect(matchesQuery(subject, "qualif")).toBe(true);
  });

  /**
   * AND across terms, not OR: "python automation" should narrow to projects
   * that are both, which is what anyone typing two words expects.
   */
  it("requires every term to match something", () => {
    expect(matchesQuery(subject, "python outreach")).toBe(true);
    expect(matchesQuery(subject, "python rust")).toBe(false);
  });

  it("returns false for a term that appears nowhere", () => {
    expect(matchesQuery(subject, "kubernetes")).toBe(false);
  });
});

describe("applyFilters", () => {
  const feed = [
    project({ id: 1, title: "Agent", categories: ["AI"], topics: [], language: "Python" }),
    project({ id: 2, title: "Storefront", categories: ["Website"], topics: [], language: "TypeScript" }),
  ];

  it("combines filter and query", () => {
    expect(applyFilters(feed, "ai", "python").map((entry) => entry.id)).toEqual([1]);
    expect(applyFilters(feed, "ai", "typescript")).toEqual([]);
  });

  it("treats an unknown filter id as All rather than as an empty grid", () => {
    // Defensive: a stale id must degrade to showing everything, not to a
    // blank page with no explanation.
    expect(applyFilters(feed, "nonexistent", "")).toHaveLength(2);
  });

  /**
   * Re-sorting by relevance as someone types makes the lead project jump
   * around, which reads as the page malfunctioning. The service already ranked
   * the feed; filtering must only remove.
   */
  it("preserves the incoming order rather than re-ranking", () => {
    const ordered = applyFilters(feed, "all", "");
    expect(ordered.map((entry) => entry.id)).toEqual([1, 2]);
  });
});
