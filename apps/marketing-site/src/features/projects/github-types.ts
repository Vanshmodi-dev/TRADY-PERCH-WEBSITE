/**
 * Types for the GitHub-backed portfolio (`/work/projects`).
 *
 * Two distinct layers, deliberately not merged:
 *
 *  - `GitHubRepository` is the *wire* shape — a narrowed subset of GitHub's
 *    `GET /users/{username}/repos` response, describing only the fields this
 *    feature reads. It is untrusted input, not a guarantee.
 *  - `Project` is the *domain* shape — what the UI renders. Every field is
 *    non-optional except the ones the design genuinely treats as absent
 *    (`description`, `liveUrl`, `language`), so a component never has to
 *    defend against a half-populated record.
 *
 * `github-service.ts` is the only place that converts one into the other.
 */

/**
 * The fields of a GitHub repository object this feature depends on.
 *
 * Every property is declared exactly as the API documents it, but nothing
 * here is trusted at runtime — `isGitHubRepository` below is the real gate.
 * A structural `interface` alone would let a malformed payload (a 200 with an
 * error envelope, a proxy injecting HTML, an account rename returning a
 * redirect body) flow straight into the render as `undefined.toLowerCase()`.
 *
 * @see https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
  /** ISO 8601. The only source for a project's build year. */
  created_at: string;
  /** Repository content size in KB. `0` means the repo has no commits yet. */
  size: number;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  is_template: boolean;
  owner: { login: string };
}

/**
 * A project's lifecycle state, shown as the card's status marker.
 *
 * Derived from observable facts, never asserted: `live` means a reachable
 * deployment URL exists, `active` means code was pushed inside the recency
 * window, `maintained` is everything else. Nothing here claims a commercial
 * outcome, because nothing in the GitHub API can evidence one.
 */
export type ProjectStatus = "live" | "active" | "maintained";

/** A repository that survived filtering, reshaped for the UI. */
export interface Project {
  /** GitHub's numeric repo id — stable across renames, so it's the React key. */
  id: number;
  /** Raw repository name, used for the GitHub URL and the `og:` image path. */
  repoName: string;
  /** `repoName` humanised for display: `lead-generation` -> `Lead Generation`. */
  title: string;
  /** `null` when the repository has no description set on GitHub. */
  description: string | null;
  /**
   * Technology badges. Derived from topics + primary language + the matched
   * portfolio categories, deduplicated and capped — see `github-service.ts`.
   */
  tags: string[];
  /** GitHub's detected primary language, or `null` for an unclassified repo. */
  language: string | null;
  stars: number;
  /** ISO 8601. Rendered through `formatRelativeTime` at the component boundary. */
  updatedAt: string;
  githubUrl: string;
  /** The repo's `homepage`, but only when it is a syntactically valid https URL. */
  liveUrl: string | null;
  /** GitHub's generated Open Graph card for this repo (1200x600). */
  openGraphImageUrl: string;
  /** Which of the `PORTFOLIO_CATEGORIES` this repo matched, in canonical order. */
  categories: string[];

  /* --- Editorial layer (see project-editorial.ts) ----------------------- */

  /**
   * Earns the large cell in the asymmetric grid.
   *
   * Curated, never inferred from stars: a portfolio's lead project is an
   * editorial judgement about what best represents the practice, and on an
   * account where every repo has zero stars an automatic rule would rank
   * them arbitrarily and call it significance.
   */
  featured: boolean;
  /**
   * Editorial discipline label — "Commerce", "Applied AI". Distinct from
   * `categories`, which are the keyword-matcher's output. Falls back to the
   * first matched category when no editorial entry exists.
   */
  category: string;
  /**
   * The long-form paragraph shown only on a featured card. `null` when no
   * editorial entry supplies one — featured cards then fall back to the same
   * summary a standard card shows, rather than padding with filler.
   */
  narrative: string | null;
  status: ProjectStatus;
  /** Four-digit year the repository was created. */
  buildYear: number;
  /**
   * Present only once a real case study exists for this project. The card's
   * "Case study" action is omitted entirely when absent — a link to an empty
   * page is worse than no link.
   */
  caseStudySlug: string | null;
}

/**
 * Why the feed produced no projects. The UI renders a different state for
 * each, because "the token is wrong" and "you have no matching repos" are
 * not the same message to show a visitor — the first is an error worth a
 * retry button, the second is an intentional, calm empty state.
 */
export type ProjectsFailureReason =
  /** Neither username nor token configured — expected on a fresh clone/CI. */
  | "not-configured"
  /** Token rejected (401) or lacks the scope to read this account (403). */
  | "unauthorized"
  /** GitHub's primary or secondary rate limit is exhausted. */
  | "rate-limited"
  /** The configured username does not exist (404). */
  | "account-not-found"
  /** DNS/TLS/timeout, a 5xx from GitHub, or an unparseable body. */
  | "unavailable";

export type ProjectsResult =
  | { status: "ok"; projects: Project[] }
  | { status: "error"; reason: ProjectsFailureReason };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringOrNull(value: unknown): value is string | null {
  return typeof value === "string" || value === null;
}

/**
 * Runtime gate between the wire shape and everything downstream.
 *
 * Only the fields that would *break* if absent are checked, and each is
 * checked for the exact type the mapper assumes. `topics` is the notable one:
 * GitHub omits it entirely on some responses (it was a preview-header field
 * for years), so the service normalises a missing array rather than requiring
 * it here — see `normaliseTopics`.
 */
export function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.html_url === "string" &&
    typeof value.updated_at === "string" &&
    typeof value.stargazers_count === "number" &&
    typeof value.size === "number" &&
    typeof value.created_at === "string" &&
    isStringOrNull(value.description ?? null) &&
    isStringOrNull(value.homepage ?? null) &&
    isStringOrNull(value.language ?? null)
  );
}
