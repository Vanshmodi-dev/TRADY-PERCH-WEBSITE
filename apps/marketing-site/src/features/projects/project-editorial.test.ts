import { describe, expect, it } from "vitest";
import { PROJECT_EDITORIAL, editorialFor } from "./project-editorial";
import { CASE_STUDIES } from "@/features/case-study/case-study-data";
import { selectProjects, toBuildYear, toStatus } from "./github-service";
import { githubRepository as repo } from "@/test/project-fixtures";

describe("editorialFor", () => {
  it("finds an entry regardless of the repository's casing", () => {
    // GitHub preserves whatever casing an account used at creation time, so
    // MODI-STORE and modi-store must resolve to the same entry.
    expect(editorialFor("MODI-STORE")).toBe(editorialFor("modi-store"));
    expect(editorialFor("MODI-STORE").category).toBe("Commerce");
  });

  it("returns an empty entry for an uncurated repository rather than undefined", () => {
    // Callers read properties off this directly; returning undefined would
    // make every access a null check.
    expect(editorialFor("no-such-repo")).toEqual({});
  });
});

describe("editorial integrity", () => {
  /**
   * The editorial layer must not carry its own case-study link. It used to,
   * and that made it possible for a card to advertise a study that was never
   * written — a "Case study" action leading to a 404, since `dynamicParams`
   * is false on that route. The link is now derived from the registry, and
   * this asserts the duplicate field has not crept back in.
   */
  it("does not duplicate the case-study link, which is derived from the registry", () => {
    for (const entry of Object.values(PROJECT_EDITORIAL)) {
      expect(entry).not.toHaveProperty("caseStudySlug");
    }
    // And the registry itself has real studies to derive from.
    expect(CASE_STUDIES.length).toBeGreaterThan(0);
  });

  /**
   * The asymmetric grid only reads as a hierarchy while most cells are
   * standard size. Featuring everything is featuring nothing.
   */
  it("keeps the featured set small enough for the layout to mean something", () => {
    const featured = Object.values(PROJECT_EDITORIAL).filter((entry) => entry.featured);
    expect(featured.length).toBeLessThanOrEqual(2);
  });

  it("keys every entry in lowercase, which is what the lookup normalises to", () => {
    for (const key of Object.keys(PROJECT_EDITORIAL)) {
      expect(key).toBe(key.toLowerCase());
    }
  });
});

describe("toStatus", () => {
  const now = Date.parse("2026-07-31T12:00:00Z");

  it("reports live whenever a deployment exists, regardless of push age", () => {
    // A reachable deployment is a stronger claim than a recent commit, and a
    // visitor reading one badge should get the strongest true thing.
    expect(toStatus("https://example.com", "2020-01-01T00:00:00Z", now)).toBe("live");
  });

  it("reports active for a recent push with no deployment", () => {
    expect(toStatus(null, "2026-07-20T00:00:00Z", now)).toBe("active");
  });

  it("reports maintained once the push falls outside the window", () => {
    expect(toStatus(null, "2026-01-01T00:00:00Z", now)).toBe("maintained");
  });

  it("places the boundary at 90 days", () => {
    expect(toStatus(null, "2026-05-05T12:00:00Z", now)).toBe("active"); // 87 days
    expect(toStatus(null, "2026-04-20T12:00:00Z", now)).toBe("maintained"); // 102 days
  });

  it("degrades to maintained rather than throwing on an unparseable date", () => {
    expect(toStatus(null, "nonsense", now)).toBe("maintained");
  });
});

describe("toBuildYear", () => {
  it("uses the repository's creation year", () => {
    expect(toBuildYear(repo({ created_at: "2023-11-02T00:00:00Z" }))).toBe(2023);
  });

  it("falls back through pushed_at and updated_at rather than rendering NaN", () => {
    expect(
      toBuildYear(repo({ created_at: "nonsense", pushed_at: "2024-06-01T00:00:00Z" })),
    ).toBe(2024);
  });

  it("never returns a non-finite year even when every date is unusable", () => {
    const year = toBuildYear(
      repo({ created_at: "x", pushed_at: "y", updated_at: "z" }),
    );
    expect(Number.isInteger(year)).toBe(true);
    expect(year).toBeGreaterThan(2000);
  });
});

describe("editorial merged into projects", () => {
  it("prefers the editorial title over the humanised repository name", () => {
    const [merged] = selectProjects([repo({ name: "MODI-STORE" })]);
    expect(merged?.title).toBe("Modi Store");
    // The raw name is still carried, for the source link's accessible label.
    expect(merged?.repoName).toBe("MODI-STORE");
  });

  it("prefers the editorial summary over the repository's GitHub description", () => {
    const [merged] = selectProjects([
      repo({ name: "MODI-STORE", description: "A developer-facing blurb." }),
    ]);
    expect(merged?.description).not.toBe("A developer-facing blurb.");
    expect(merged?.description).toContain("storefront");
  });

  it("promotes a curated featured project to the front of the grid", () => {
    const projects = selectProjects([
      repo({ id: 1, name: "some-website", stargazers_count: 50 }),
      repo({ id: 2, name: "MODI-STORE" }),
    ]);
    // MODI-STORE is featured and has zero stars; it must still lead, because
    // the lead cell is an editorial choice, not a popularity contest.
    expect(projects[0]?.repoName).toBe("MODI-STORE");
    expect(projects[0]?.featured).toBe(true);
  });

  it("falls back to the matched category for an uncurated repository", () => {
    const [merged] = selectProjects([repo({ name: "some-website" })]);
    expect(merged?.featured).toBe(false);
    expect(merged?.category).toBe("Website");
    expect(merged?.narrative).toBeNull();
    expect(merged?.caseStudySlug).toBeNull();
  });
});
