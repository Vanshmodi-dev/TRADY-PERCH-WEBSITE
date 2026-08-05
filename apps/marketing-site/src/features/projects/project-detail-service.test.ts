import { describe, expect, it } from "vitest";
import type {
  GitHubCommit,
  GitHubContributor,
  GitHubRelease,
  GitHubRepositoryDetail,
} from "./github-detail-types";
import {
  projectSlug,
  toActivity,
  toContributors,
  toCommits,
  toLanguageSlices,
  toReleases,
  toRepositoryStats,
} from "./project-detail-service";

/**
 * The detail page's mappers.
 *
 * Every one is a pure transform, tested directly — the network layer above
 * them is covered by `github-api.test.ts`, and the composition that joins them
 * has no logic of its own beyond "use an empty value when a request failed".
 */

function repositoryDetail(
  overrides: Partial<GitHubRepositoryDetail> = {},
): GitHubRepositoryDetail {
  return {
    name: "widget",
    full_name: "acme/widget",
    description: null,
    html_url: "https://github.com/acme/widget",
    homepage: null,
    language: "TypeScript",
    topics: [],
    stargazers_count: 12,
    watchers_count: 12,
    forks_count: 3,
    open_issues_count: 7,
    subscribers_count: 5,
    default_branch: "main",
    created_at: "2025-03-14T00:00:00Z",
    updated_at: "2026-07-01T00:00:00Z",
    pushed_at: "2026-07-01T00:00:00Z",
    size: 128,
    private: false,
    archived: false,
    fork: false,
    license: null,
    owner: {
      login: "acme",
      avatar_url: "https://avatars.githubusercontent.com/u/1",
      html_url: "https://github.com/acme",
    },
    ...overrides,
  };
}

describe("toLanguageSlices", () => {
  it("computes shares and orders by size", () => {
    const slices = toLanguageSlices({ CSS: 2500, TypeScript: 7500 });
    expect(slices.map((slice) => slice.name)).toEqual(["TypeScript", "CSS"]);
    expect(slices.map((slice) => slice.percentage)).toEqual([75, 25]);
  });

  it("returns an empty list for a repository with no detected languages", () => {
    expect(toLanguageSlices({})).toEqual([]);
  });

  /**
   * Every repository has a handful of near-zero entries — a Dockerfile, a
   * stray shell script. As individual legend rows they bury the languages the
   * project is actually written in.
   */
  it("folds sub-2% languages into a single Other slice", () => {
    const slices = toLanguageSlices({
      TypeScript: 9700,
      Shell: 100,
      Dockerfile: 100,
      Makefile: 100,
    });
    expect(slices.map((slice) => slice.name)).toEqual(["TypeScript", "Other"]);
    expect(slices[1]?.percentage).toBeCloseTo(3, 1);
  });

  it("does not fold when nothing clears the threshold", () => {
    // Otherwise the chart becomes one grey bar labelled "Other", which
    // conveys strictly less than the real names.
    const slices = toLanguageSlices({ A: 1, B: 1, C: 1 });
    expect(slices.map((slice) => slice.name)).toEqual(["A", "B", "C"]);
  });

  it("assigns a stable colour to an unknown language", () => {
    const first = toLanguageSlices({ Zig: 100 })[0]?.color;
    const second = toLanguageSlices({ Zig: 100 })[0]?.color;
    expect(first).toBe(second);
    expect(first).toMatch(/^hsl\(/);
  });
});

describe("toRepositoryStats", () => {
  /**
   * GitHub's long-standing trap: `open_issues_count` counts pull requests as
   * issues. A repository with 3 issues and 4 open PRs reports 7, and showing
   * that as "7 open issues" is simply wrong.
   */
  it("subtracts open pull requests from GitHub's conflated issue count", () => {
    const stats = toRepositoryStats(repositoryDetail({ open_issues_count: 7 }), 4, 2, 100);
    expect(stats.openIssues).toBe(3);
    expect(stats.openPullRequests).toBe(4);
  });

  it("clamps the issue count at zero when the two figures disagree", () => {
    // The counts come from separate requests and can be a moment apart.
    expect(toRepositoryStats(repositoryDetail({ open_issues_count: 2 }), 5, 1, null).openIssues).toBe(
      0,
    );
  });

  it("prefers subscribers_count as the watcher figure", () => {
    // GitHub's `watchers_count` is a legacy alias for the star count; the
    // number a visitor means by "watchers" is `subscribers_count`.
    const stats = toRepositoryStats(
      repositoryDetail({ watchers_count: 12, subscribers_count: 5 }),
      0,
      1,
      null,
    );
    expect(stats.watchers).toBe(5);
  });

  it("falls back to watchers_count when subscribers_count is absent", () => {
    const detail = repositoryDetail();
    delete (detail as { subscribers_count?: number }).subscribers_count;
    expect(toRepositoryStats(detail, 0, 1, null).watchers).toBe(12);
  });

  it("prefers the SPDX id over the licence's full name", () => {
    const stats = toRepositoryStats(
      repositoryDetail({ license: { key: "mit", name: "MIT License", spdx_id: "MIT" } }),
      0,
      1,
      null,
    );
    expect(stats.license).toBe("MIT");
  });

  it("reports a null licence rather than inventing one", () => {
    expect(toRepositoryStats(repositoryDetail({ license: null }), 0, 1, null).license).toBeNull();
  });

  it("always reports Public, since private repos never reach this page", () => {
    expect(toRepositoryStats(repositoryDetail({ private: true }), 0, 1, null).visibility).toBe(
      "Public",
    );
  });

  it("passes an unknown commit total through as null rather than zero", () => {
    expect(toRepositoryStats(repositoryDetail(), 0, 1, null).commits).toBeNull();
  });
});

describe("toContributors", () => {
  function contributor(overrides: Partial<GitHubContributor> = {}): GitHubContributor {
    return {
      login: "octocat",
      avatar_url: "https://avatars.githubusercontent.com/u/1",
      html_url: "https://github.com/octocat",
      contributions: 42,
      type: "User",
      ...overrides,
    };
  }

  it("reshapes a contributor for the avatar row", () => {
    expect(toContributors([contributor()])[0]).toEqual({
      login: "octocat",
      avatarUrl: "https://avatars.githubusercontent.com/u/1",
      profileUrl: "https://github.com/octocat",
      contributions: 42,
    });
  });

  /**
   * Dependabot at the top of a contributor list is technically accurate and
   * communicates nothing about who built the project.
   */
  it("drops bots, by type and by login suffix", () => {
    const people = toContributors([
      contributor({ login: "dependabot", type: "Bot" }),
      contributor({ login: "renovate[bot]", type: "User" }),
      contributor({ login: "real-person", type: "User" }),
    ]);
    expect(people.map((person) => person.login)).toEqual(["real-person"]);
  });
});

describe("toCommits", () => {
  function commit(overrides: Partial<GitHubCommit> = {}): GitHubCommit {
    return {
      sha: "abcdef1234567890",
      html_url: "https://github.com/acme/widget/commit/abcdef1234567890",
      commit: {
        message: "feat: add the thing",
        author: { name: "Vansh", email: "v@example.com", date: "2026-07-01T00:00:00Z" },
      },
      author: null,
      ...overrides,
    };
  }

  it("abbreviates the sha to seven characters, as GitHub does", () => {
    expect(toCommits([commit()], "https://github.com/acme/widget")[0]?.shortSha).toBe("abcdef1");
  });

  /**
   * A conventional-commit body, a squashed PR's bullet list, or a co-author
   * trailer would otherwise dump five lines into a single timeline row.
   */
  it("keeps only the subject line", () => {
    const [mapped] = toCommits(
      [commit({ commit: { message: "feat: thing\n\nLong body\nCo-authored-by: X", author: null } })],
      "https://github.com/acme/widget",
    );
    expect(mapped?.subject).toBe("feat: thing");
  });

  it("falls back to the commit author's name when no GitHub account is linked", () => {
    // Commits authored from an email not attached to any account have the
    // embedded name but no `author` object.
    expect(toCommits([commit()], "https://github.com/acme/widget")[0]?.authorName).toBe("Vansh");
  });

  it("prefers the linked GitHub login when there is one", () => {
    const [mapped] = toCommits(
      [
        commit({
          author: {
            login: "vansh",
            avatar_url: "https://avatars.githubusercontent.com/u/2",
            html_url: "https://github.com/vansh",
          },
        }),
      ],
      "https://github.com/acme/widget",
    );
    expect(mapped?.authorName).toBe("vansh");
    expect(mapped?.authorUrl).toBe("https://github.com/vansh");
  });

  it("derives a commit URL when GitHub omits html_url, so no row is unlinked", () => {
    const [mapped] = toCommits([commit({ html_url: "" })], "https://github.com/acme/widget");
    expect(mapped?.url).toBe("https://github.com/acme/widget/commit/abcdef1234567890");
  });

  it("never renders an empty subject", () => {
    const [mapped] = toCommits(
      [commit({ commit: { message: "   ", author: null } })],
      "https://github.com/acme/widget",
    );
    expect(mapped?.subject).toBe("(no commit message)");
  });
});

describe("toReleases", () => {
  function release(overrides: Partial<GitHubRelease> = {}): GitHubRelease {
    return {
      id: 1,
      tag_name: "v1.0.0",
      name: "First release",
      body: null,
      html_url: "https://github.com/acme/widget/releases/tag/v1.0.0",
      published_at: "2026-06-01T00:00:00Z",
      created_at: "2026-06-01T00:00:00Z",
      draft: false,
      prerelease: false,
      ...overrides,
    };
  }

  /** A draft is unpublished by definition; showing one leaks work in progress. */
  it("excludes drafts", () => {
    expect(toReleases([release({ draft: true })])).toEqual([]);
  });

  it("keeps prereleases, marked as such", () => {
    expect(toReleases([release({ prerelease: true })])[0]?.prerelease).toBe(true);
  });

  it("falls back to the tag when a release has no title", () => {
    expect(toReleases([release({ name: null })])[0]?.title).toBe("v1.0.0");
    expect(toReleases([release({ name: "   " })])[0]?.title).toBe("v1.0.0");
  });

  it("flattens markdown out of the summary line", () => {
    const [mapped] = toReleases([release({ body: "## What's new\n\n- **Faster** builds" })]);
    expect(mapped?.summary).toBe("What's new - Faster builds");
  });

  it("truncates a long body with an ellipsis", () => {
    const [mapped] = toReleases([release({ body: "x".repeat(400) })]);
    expect(mapped?.summary?.length).toBeLessThanOrEqual(181);
    expect(mapped?.summary?.endsWith("…")).toBe(true);
  });

  it("reports a null summary for an empty body rather than an empty string", () => {
    expect(toReleases([release({ body: "" })])[0]?.summary).toBeNull();
    expect(toReleases([release({ body: "   \n\n" })])[0]?.summary).toBeNull();
  });
});

describe("toActivity", () => {
  const weeks = Array.from({ length: 52 }, (_, index) => ({
    week: Math.floor(Date.UTC(2026, 0, 4 + index * 7) / 1000),
    total: index,
  }));

  it("keeps only the trailing quarter", () => {
    // 52 bars at this strip's width are 3px each and convey nothing.
    expect(toActivity(weeks)).toHaveLength(13);
  });

  it("keeps the most recent weeks, not the oldest", () => {
    const activity = toActivity(weeks);
    expect(activity[activity.length - 1]?.commits).toBe(51);
  });

  it("converts GitHub's Unix seconds into an ISO date", () => {
    expect(toActivity(weeks)[0]?.weekStart).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("handles a series shorter than the window", () => {
    expect(toActivity(weeks.slice(0, 3))).toHaveLength(3);
  });
});

describe("projectSlug", () => {
  it("lowercases the repository name", () => {
    expect(projectSlug("MODI-STORE")).toBe("modi-store");
  });

  it("leaves GitHub's permitted punctuation intact", () => {
    // Re-slugifying would break the round-trip: two repos differing only in
    // punctuation would collide on one URL.
    expect(projectSlug("next.js_config-v2")).toBe("next.js_config-v2");
  });

  /**
   * The grid links with `Project.slug` and this route resolves with
   * `projectSlug`. If the two ever diverge, every card 404s.
   */
  it("agrees with the slug the service puts on a Project", () => {
    const repoName = "Trady-Perch-Website";
    expect(projectSlug(repoName)).toBe(repoName.toLowerCase());
  });
});
