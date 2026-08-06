import { describe, expect, it } from "vitest";
import {
  selectProjects,
  toDisplayTitle,
  toLiveUrl,
  toOpenGraphImageUrl,
  toTags,
} from "./github-service";
import { githubRepository as repo } from "@/test/project-fixtures";


describe("toDisplayTitle", () => {
  it.each([
    ["TRADY-PERCH-REVIEWS-ENGINE", "Trady Perch Reviews Engine"],
    ["lead-generation-trady-perch", "Lead Generation Trady Perch"],
    ["MODI-STORE", "Modi Store"],
    ["my_snake_case_repo", "My Snake Case Repo"],
    ["single", "Single"],
  ])("humanises %s into %s", (input, expected) => {
    expect(toDisplayTitle(input)).toBe(expected);
  });

  it("keeps recognised acronyms uppercase", () => {
    expect(toDisplayTitle("ai-agent-sdk")).toBe("AI Agent SDK");
    expect(toDisplayTitle("crm-api")).toBe("CRM API");
  });

  it("preserves vendor casing for known names", () => {
    expect(toDisplayTitle("nextjs-starter")).toBe("Next.js Starter");
  });

  it("leaves an author's deliberate mixed casing alone", () => {
    // `myApp` is a considered choice; flattening it to `Myapp` would be worse
    // than leaving it, and title-casing cannot tell the difference.
    expect(toDisplayTitle("myApp-toolkit")).toBe("myApp Toolkit");
  });

  it("returns the raw name rather than an empty string when there is nothing to split", () => {
    expect(toDisplayTitle("---")).toBe("---");
  });
});

describe("toLiveUrl", () => {
  it("accepts a well-formed https URL", () => {
    expect(toLiveUrl("https://modi-store.vercel.app")).toBe("https://modi-store.vercel.app/");
  });

  it("repairs a bare domain, which is the common way people fill this field", () => {
    expect(toLiveUrl("tradyperch.com")).toBe("https://tradyperch.com/");
  });

  it.each([null, "", "   ", "coming soon", "tbd"])(
    "returns null for the non-URL value %s",
    (value) => {
      expect(toLiveUrl(value)).toBeNull();
    },
  );

  it("rejects a localhost or schemeless-single-word value", () => {
    expect(toLiveUrl("http://localhost:3000")).toBeNull();
    expect(toLiveUrl("localhost")).toBeNull();
  });

  /**
   * The security case. GitHub accepts free text in `homepage`, so an attacker
   * who controls a repo in a monitored org could put a `javascript:` URL
   * there and have it rendered as this page's "Live demo" href.
   */
  it.each(["javascript:alert(1)", "data:text/html,<script>alert(1)</script>", "file:///etc/passwd"])(
    "rejects the dangerous scheme in %s",
    (value) => {
      expect(toLiveUrl(value)).toBeNull();
    },
  );
});

describe("toOpenGraphImageUrl", () => {
  it("builds GitHub's OG card URL with a push-derived cache key", () => {
    const url = toOpenGraphImageUrl(repo({ pushed_at: "2026-07-01T00:00:00Z", name: "widget" }));
    expect(url).toBe(`https://opengraph.githubassets.com/${Date.parse("2026-07-01T00:00:00Z")}/acme/widget`);
  });

  it("changes when the repository is pushed to, so the card refreshes", () => {
    const before = toOpenGraphImageUrl(repo({ pushed_at: "2026-07-01T00:00:00Z" }));
    const after = toOpenGraphImageUrl(repo({ pushed_at: "2026-07-02T00:00:00Z" }));
    expect(before).not.toBe(after);
  });

  it("is stable across calls for an unchanged repository, so the image stays cacheable", () => {
    expect(toOpenGraphImageUrl(repo())).toBe(toOpenGraphImageUrl(repo()));
  });

  it("falls back to a fixed key rather than emitting NaN for an unparseable date", () => {
    expect(toOpenGraphImageUrl(repo({ pushed_at: "nonsense" }))).not.toContain("NaN");
  });
});

describe("toTags", () => {
  it("puts hand-written topics ahead of inferred categories", () => {
    const tags = toTags(repo({ topics: ["lead-generation"] }), ["Automation"]);
    expect(tags).toEqual(["Lead Generation", "Automation"]);
  });

  /**
   * The language has its own slot in the card's meta row, beside a coloured
   * dot. Emitting it here as well printed it twice on the same card.
   */
  it("does not repeat the primary language, which the meta row already shows", () => {
    expect(toTags(repo({ topics: [], language: "Python" }), ["AI"])).toEqual(["AI"]);
  });

  it("deduplicates case-insensitively across the three sources", () => {
    const tags = toTags(repo({ topics: ["react"], language: "TypeScript" }), ["React"]);
    // "react" the topic and "React" the category are the same badge.
    expect(tags.filter((tag) => tag.toLowerCase() === "react")).toHaveLength(1);
  });

  it("caps the badge count so the row cannot wrap past two lines", () => {
    const tags = toTags(
      repo({ topics: ["a", "b", "c", "d", "e", "f", "g", "h"] }),
      ["Website", "AI"],
    );
    expect(tags).toHaveLength(6);
  });

  it("discards a blank topic rather than rendering an empty badge", () => {
    // The `saas` topic and the `SaaS` category collapse into one badge with
    // the canonical vendor casing, rather than appearing as "SAAS" and
    // "SaaS" side by side.
    expect(toTags(repo({ topics: ["", "  ", "saas"] }), ["SaaS"])).toEqual(["SaaS"]);
  });
});

describe("selectProjects", () => {
  it("drops repositories that fail the hard exclusions", () => {
    const projects = selectProjects([
      repo({ id: 1, name: "good-website" }),
      repo({ id: 2, name: "forked-website", fork: true }),
      repo({ id: 3, name: "archived-website", archived: true }),
      repo({ id: 4, name: "empty-website", size: 0 }),
    ]);
    expect(projects.map((project) => project.repoName)).toEqual(["good-website"]);
  });

  it("drops repositories that match no category", () => {
    const projects = selectProjects([
      repo({ id: 1, name: "dotfiles", description: "Shell config.", language: "Shell" }),
      repo({ id: 2, name: "client-website", description: null }),
    ]);
    expect(projects.map((project) => project.repoName)).toEqual(["client-website"]);
  });

  describe("ranking", () => {
    it("ranks by stars first", () => {
      const projects = selectProjects([
        repo({ id: 1, name: "a-website", stargazers_count: 2 }),
        repo({ id: 2, name: "b-website", stargazers_count: 9 }),
      ]);
      expect(projects.map((project) => project.repoName)).toEqual(["b-website", "a-website"]);
    });

    it("prefers a repository with a live demo when stars are equal", () => {
      const projects = selectProjects([
        repo({ id: 1, name: "a-website", homepage: null }),
        repo({ id: 2, name: "b-website", homepage: "https://example.com" }),
      ]);
      expect(projects.map((project) => project.repoName)).toEqual(["b-website", "a-website"]);
    });

    it("falls back to most-recently-pushed", () => {
      const projects = selectProjects([
        repo({ id: 1, name: "a-website", pushed_at: "2026-01-01T00:00:00Z" }),
        repo({ id: 2, name: "b-website", pushed_at: "2026-07-01T00:00:00Z" }),
      ]);
      expect(projects.map((project) => project.repoName)).toEqual(["b-website", "a-website"]);
    });

    /**
     * A non-total sort order would let two otherwise-identical repos swap
     * places between builds, producing a spurious diff in the prerendered
     * HTML on every revalidation.
     */
    it("is deterministic for otherwise identical repositories", () => {
      const input = [
        repo({ id: 7, name: "a-website" }),
        repo({ id: 3, name: "b-website" }),
      ];
      const first = selectProjects(input).map((project) => project.id);
      const second = selectProjects([...input].reverse()).map((project) => project.id);
      expect(first).toEqual(second);
      expect(first).toEqual([3, 7]);
    });
  });

  it("maps every field the card renders", () => {
    const [project] = selectProjects([
      repo({
        id: 42,
        name: "ai-booking-agent",
        description: "  Books appointments.  ",
        homepage: "https://demo.example.com",
        language: "Python",
        topics: ["automation"],
        stargazers_count: 12,
        pushed_at: "2026-07-01T00:00:00Z",
        html_url: "https://github.com/acme/ai-booking-agent",
      }),
    ]);

    expect(project).toMatchObject({
      id: 42,
      repoName: "ai-booking-agent",
      title: "AI Booking Agent",
      description: "Books appointments.", // trimmed
      language: "Python",
      stars: 12,
      updatedAt: "2026-07-01T00:00:00Z",
      githubUrl: "https://github.com/acme/ai-booking-agent",
      liveUrl: "https://demo.example.com/",
    });
    expect(project?.categories).toEqual(expect.arrayContaining(["AI", "Agent", "Automation"]));
  });

  it("normalises a whitespace-only description to null so the fallback copy runs", () => {
    const [project] = selectProjects([repo({ name: "a-website", description: "   " })]);
    expect(project?.description).toBeNull();
  });
});
