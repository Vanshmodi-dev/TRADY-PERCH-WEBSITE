/**
 * Types for the per-repository case study at `/work/projects/<repo>`.
 *
 * Kept separate from `github-types.ts` rather than appended to it. That file
 * describes the *list* endpoint — one wire shape, one domain shape — and is
 * imported by the card, the grid, the filters and the JSON route. This one
 * describes seven further endpoints that only the detail page reads. Merging
 * them would put ~400 lines of contributor/commit/release shapes into the
 * import graph of every module that only ever wanted `Project`.
 *
 * The same two-layer discipline applies throughout: a `GitHub*` interface is
 * the untrusted wire shape with a runtime guard beside it, and the `Project*`
 * type is the domain shape the UI renders. Nothing crosses that line except
 * through `github-service.ts`.
 */

import type { Project } from "./github-types";

/* ------------------------------------------------------------------ */
/* Wire shapes                                                         */
/* ------------------------------------------------------------------ */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * The extra fields `GET /repos/{owner}/{repo}` carries that the list endpoint
 * does not — forks, open issues, licence, watchers, default branch.
 *
 * Deliberately declared as a standalone shape rather than as an extension of
 * `GitHubRepository`: the detail call is made independently and may succeed
 * when the list call is stale, so the two are validated independently too.
 */
export interface GitHubRepositoryDetail {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  /**
   * GitHub counts pull requests as issues here, so this is *issues plus open
   * PRs* — not the number shown on the Issues tab. `github-service.ts`
   * subtracts the PR count to recover the real figure; see `toRepositoryStats`.
   */
  open_issues_count: number;
  subscribers_count?: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  private: boolean;
  archived: boolean;
  fork: boolean;
  license: { key: string; name: string; spdx_id: string | null } | null;
  owner: { login: string; avatar_url: string; html_url: string };
}

export function isGitHubRepositoryDetail(value: unknown): value is GitHubRepositoryDetail {
  if (!isRecord(value)) return false;
  return (
    typeof value.name === "string" &&
    typeof value.html_url === "string" &&
    typeof value.default_branch === "string" &&
    typeof value.stargazers_count === "number" &&
    typeof value.forks_count === "number" &&
    typeof value.open_issues_count === "number" &&
    typeof value.created_at === "string" &&
    typeof value.pushed_at === "string" &&
    isRecord(value.owner) &&
    typeof value.owner.login === "string"
  );
}

/** One entry from `GET /repos/{owner}/{repo}/contributors`. */
export interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export function isGitHubContributor(value: unknown): value is GitHubContributor {
  if (!isRecord(value)) return false;
  return (
    typeof value.login === "string" &&
    typeof value.avatar_url === "string" &&
    typeof value.html_url === "string" &&
    typeof value.contributions === "number"
  );
}

/**
 * One entry from `GET /repos/{owner}/{repo}/commits`.
 *
 * `author` (the GitHub account) is nullable and distinct from `commit.author`
 * (the name/email baked into the commit object). A commit authored from an
 * email address not attached to any GitHub account has the second but not the
 * first — common on this account's older repos — so the mapper falls back
 * rather than rendering a blank byline.
 */
export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name?: string; email?: string; date?: string } | null;
  };
  author: { login: string; avatar_url: string; html_url: string } | null;
}

export function isGitHubCommit(value: unknown): value is GitHubCommit {
  if (!isRecord(value)) return false;
  if (typeof value.sha !== "string") return false;
  if (!isRecord(value.commit)) return false;
  return typeof value.commit.message === "string";
}

/** One entry from `GET /repos/{owner}/{repo}/releases`. */
export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  created_at: string;
  draft: boolean;
  prerelease: boolean;
}

export function isGitHubRelease(value: unknown): value is GitHubRelease {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "number" &&
    typeof value.tag_name === "string" &&
    typeof value.html_url === "string" &&
    typeof value.draft === "boolean" &&
    typeof value.prerelease === "boolean"
  );
}

/* ------------------------------------------------------------------ */
/* Domain shapes                                                       */
/* ------------------------------------------------------------------ */

/** A language and its share of the repository, ready to render as a bar. */
export interface LanguageSlice {
  name: string;
  bytes: number;
  /** 0-100, rounded to one decimal. Shares always sum to ~100. */
  percentage: number;
  /** GitHub's linguist colour, or a deterministic fallback. */
  color: string;
}

/** Everything the detail page's statistics grid renders. */
export interface RepositoryStats {
  stars: number;
  forks: number;
  watchers: number;
  /** Real issue count — open issues with the open-PR count already removed. */
  openIssues: number;
  openPullRequests: number;
  contributors: number;
  /**
   * Commits on the default branch. `null` when GitHub's pagination headers did
   * not disclose a total (a repo with a single page of commits and no `Link`
   * header), because guessing is worse than omitting the tile.
   */
  commits: number | null;
  createdAt: string;
  pushedAt: string;
  /** SPDX id where GitHub knows one — "MIT", "Apache-2.0" — else the name. */
  license: string | null;
  defaultBranch: string;
  /** Always "Public": private repositories never reach the published feed. */
  visibility: "Public";
}

/** A contributor, reshaped for the avatar row. */
export interface ProjectContributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
}

/** A commit, reshaped for the history timeline. */
export interface ProjectCommit {
  /** Seven characters, the length GitHub itself abbreviates to. */
  shortSha: string;
  /** First line only — a commit body belongs on GitHub, not in a timeline. */
  subject: string;
  url: string;
  authorName: string;
  authorUrl: string | null;
  authoredAt: string | null;
}

/** A published release, reshaped for the releases list. */
export interface ProjectRelease {
  id: number;
  tag: string;
  /** Falls back to the tag when a release was published without a title. */
  title: string;
  url: string;
  publishedAt: string | null;
  prerelease: boolean;
  /** Truncated release notes, plain text. Full notes stay on GitHub. */
  summary: string | null;
}

/** One week of push activity, for the repository activity sparkline. */
export interface ActivityWeek {
  /** ISO date of the week's Sunday, as GitHub reports it. */
  weekStart: string;
  commits: number;
}

/**
 * The complete payload behind one case study page.
 *
 * Every field beyond `project` is independently optional, because each comes
 * from its own request. A repository with no releases, no README and a
 * contributors endpoint that 403s (GitHub returns that for repos with more
 * than 10,000 contributors, and 204 for empty ones) still renders a complete,
 * correct page — it simply has fewer sections. Partial failure degrades the
 * page; it never fails it.
 */
export interface ProjectDetail {
  project: Project;
  stats: RepositoryStats;
  /** Raw README markdown, or `null` when the repo has none. */
  readme: string | null;
  /**
   * Absolute base URL for resolving relative links and images inside the
   * README — `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/`.
   */
  readmeBaseUrl: string;
  languages: LanguageSlice[];
  contributors: ProjectContributor[];
  commits: ProjectCommit[];
  releases: ProjectRelease[];
  activity: ActivityWeek[];
  /** The repo's own topics, unmodified — distinct from inferred categories. */
  topics: string[];
}

/* ------------------------------------------------------------------ */
/* Account-level statistics                                            */
/* ------------------------------------------------------------------ */

/** One day of the GitHub contribution calendar. */
export interface ContributionDay {
  date: string;
  count: number;
  /** 0-4, GitHub's own intensity bucket, so the graph matches the real one. */
  level: 0 | 1 | 2 | 3 | 4;
}

/**
 * The account-wide figures above the grid.
 *
 * `contributions` and `currentStreak` are `null` whenever the contribution
 * calendar is unavailable — it lives behind GitHub's GraphQL API, which
 * requires authentication unconditionally, so an unauthenticated deployment
 * has no way to obtain it. The UI omits those tiles rather than showing zero,
 * because "0 commits" is a false statement and "—" is a confusing one.
 */
export interface PortfolioStats {
  repositories: number;
  stars: number;
  forks: number;
  languages: number;
  /** Total contributions in the trailing year, or `null` when unavailable. */
  contributions: number | null;
  /** Consecutive days with at least one contribution, or `null`. */
  currentStreak: number | null;
  /** The trailing year's calendar, oldest first. Empty when unavailable. */
  calendar: ContributionDay[];
}
