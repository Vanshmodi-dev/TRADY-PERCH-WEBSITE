import type { GitHubRepository, Project } from "@/features/projects/github-types";

/**
 * Shared fixtures for the projects feature.
 *
 * Extracted here after the fourth test file grew its own copy of the same
 * object literal: when `Project` gained the editorial fields, every one of
 * those copies failed to compile independently. One factory per type means a
 * future field is added once.
 *
 * Both factories return a complete, valid value and take a partial override,
 * so a test states only the property under test and the reader can see at a
 * glance what the case is actually about.
 */

export function githubRepository(overrides: Partial<GitHubRepository> = {}): GitHubRepository {
  return {
    id: 1,
    name: "example-project",
    full_name: "acme/example-project",
    // Null by default, deliberately. A fixture default that carries meaning
    // leaks into every test that did not ask for it — a description reading
    // "An automation project." silently added an Automation category to
    // filter tests that were asserting on something else entirely.
    description: null,
    html_url: "https://github.com/acme/example-project",
    homepage: null,
    language: "TypeScript",
    topics: [],
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    // Null by default for the same reason `description` is: a licence is what
    // the "Open source" filter matches on, so a fixture that carried one would
    // silently place every test repository in that category.
    license: null,
    updated_at: "2026-07-01T00:00:00Z",
    pushed_at: "2026-07-01T00:00:00Z",
    created_at: "2025-03-14T00:00:00Z",
    size: 128,
    fork: false,
    archived: false,
    disabled: false,
    private: false,
    is_template: false,
    owner: { login: "acme" },
    ...overrides,
  };
}

export function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 1,
    repoName: "ai-booking-agent",
    slug: "ai-booking-agent",
    title: "AI Booking Agent",
    description: "Books appointments from inbound email.",
    tags: ["Automation", "AI"],
    language: "Python",
    stars: 12,
    forks: 3,
    topics: [],
    license: null,
    visibility: "Public",
    updatedAt: "2026-07-28T00:00:00Z",
    createdAt: "2025-03-14T00:00:00Z",
    githubUrl: "https://github.com/acme/ai-booking-agent",
    liveUrl: "https://demo.example.com/",
    openGraphImageUrl: "https://opengraph.githubassets.com/1/acme/ai-booking-agent",
    categories: ["AI", "Agent"],
    featured: false,
    category: "Applied AI",
    narrative: null,
    impact: null,
    status: "live",
    buildYear: 2025,
    caseStudySlug: null,
    ...overrides,
  };
}

/** The raw JSON shape GitHub returns, for tests that stub `fetch` and must
 *  therefore produce an untyped payload rather than a `GitHubRepository`. */
export function repositoryPayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return { ...githubRepository(), ...overrides };
}
