import "server-only";

import { env } from "@/shared/env";
import {
  isGitHubContributor,
  isGitHubCommit,
  isGitHubRelease,
  isGitHubRepositoryDetail,
  type GitHubCommit,
  type GitHubContributor,
  type GitHubRelease,
  type GitHubRepositoryDetail,
} from "./github-detail-types";
import { isGitHubRepository, type GitHubRepository, type ProjectsFailureReason } from "./github-types";

/**
 * The single point of contact with the GitHub REST API.
 *
 * `import "server-only"` is the load-bearing line: it makes any attempt to
 * import this module — transitively, from anywhere — into a `"use client"`
 * component a hard *build* failure rather than a token leak discovered in
 * production. Combined with the absence of a `NEXT_PUBLIC_` prefix on the
 * token (the only way Next.js inlines a variable into the browser bundle),
 * the credential cannot reach the client by construction, not by convention.
 *
 * Nothing here throws. Every failure path — network, auth, rate limit,
 * malformed body — resolves to a typed `ProjectsFailureReason` so callers
 * render a state instead of catching an exception.
 */

const GITHUB_API_ORIGIN = "https://api.github.com";

/** GitHub's documented maximum for the list endpoints used here. */
const PER_PAGE = 100;

/**
 * Pagination ceiling. Three pages = 300 repositories, which is far beyond any
 * plausible portfolio and bounds the worst case at 3 API calls per
 * revalidation rather than an unbounded loop against a large organisation.
 */
const MAX_PAGES = 3;

/**
 * One hour, matched to `revalidate` on the consuming route.
 *
 * Sizing: at 5,000 authenticated requests/hour, an hourly revalidation of at
 * most 3 pages uses 0.06% of the budget. The binding constraint is freshness,
 * not quota — a portfolio that reflects a push within the hour is well inside
 * what anyone expects from a marketing site.
 */
export const GITHUB_REVALIDATE_SECONDS = 3600;

/**
 * Cache tag for on-demand invalidation. `revalidateTag(GITHUB_CACHE_TAG)` from
 * a webhook or admin action refreshes the feed without waiting out the hour.
 */
export const GITHUB_CACHE_TAG = "github-repositories";

/** Abort budget for a single request, so a hung socket cannot stall a render. */
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Transient-failure retries, on top of the first attempt.
 *
 * Two, not more. A 5xx or a dropped socket is usually gone by the second
 * attempt; past that the failure is real, and a detail page issues seven
 * requests, so a generous retry budget multiplies into a page that takes a
 * minute to fail. A rate limit is deliberately *not* retried — the ceiling
 * does not lift within a request, and hammering it is what triggers GitHub's
 * secondary limits.
 */
const MAX_RETRIES = 2;

/** Base backoff. Doubles per attempt: 200ms, then 400ms. */
const RETRY_BASE_DELAY_MS = 200;

export type FetchRepositoriesResult =
  | { status: "ok"; repositories: GitHubRepository[] }
  | { status: "error"; reason: ProjectsFailureReason };

/** The generic result of one API call. */
type ApiResult<T> =
  | { status: "ok"; data: T; headers: Headers }
  | { status: "error"; reason: ProjectsFailureReason };

function requestHeaders(accept: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: accept,
    // Pinning the API version means a future breaking change to the response
    // shape arrives as a deliberate upgrade here, not as a silent field
    // rename that reaches production through an unversioned request.
    "X-GitHub-Api-Version": "2022-11-28",
    // GitHub rejects unidentified clients on some paths and rate-limits them
    // harder on others; this is required, not decorative.
    "User-Agent": "trady-perch-marketing-site",
  };

  const token = env.MARKETING_SITE_GITHUB_TOKEN;
  if (token && !tokenRejected) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Set once GitHub has rejected the configured token, after which every request
 * from this server instance goes out unauthenticated.
 *
 * ── Why this exists ───────────────────────────────────────────────────────
 *
 * A personal access token expires. That is not an edge case, it is the
 * documented behaviour of the credential — GitHub offers 7, 30, 60 and 90-day
 * options and warns about the date in advance, which does not help a token
 * sitting in a hosting dashboard nobody is looking at.
 *
 * Before this, an expired token took the entire Work section down and replaced
 * it with "our connection to GitHub needs attention" — even though every
 * endpoint this module reads is PUBLIC and answers perfectly well with no
 * credential at all. The token buys a higher rate limit (5,000/hour against
 * 60) and the GraphQL contribution graph; it is not what makes the feed
 * possible. Failing closed on its expiry traded a small degradation for a
 * total outage, which is exactly backwards.
 *
 * So a 401 demotes the client to the unauthenticated path rather than ending
 * the request. The feed keeps working on a smaller budget, the contribution
 * graph disappears (it has no unauthenticated tier), and the log says plainly
 * that the token needs rotating.
 *
 * Module-level rather than per-request: once the credential is known bad,
 * re-sending it on every subsequent call would waste a round trip per request
 * to learn the same thing. It resets when the instance restarts, which is what
 * a redeploy after fixing the token does anyway.
 */
let tokenRejected = false;

/**
 * Maps an HTTP status onto a failure reason.
 *
 * The 403 case is the subtle one: GitHub returns 403 both for "your token
 * cannot do this" and for "you have exhausted the rate limit", and those
 * warrant different UI. `x-ratelimit-remaining: 0` is what distinguishes
 * them. A 429 (secondary rate limit) is unambiguous.
 */
function reasonForStatus(status: number, headers: Headers): ProjectsFailureReason {
  if (status === 401) return "unauthorized";
  if (status === 429) return "rate-limited";
  if (status === 403) {
    return headers.get("x-ratelimit-remaining") === "0" ? "rate-limited" : "unauthorized";
  }
  if (status === 404) return "account-not-found";
  return "unavailable";
}

/**
 * Logs the rate-limit budget when it drops below a quarter of the allowance —
 * an early warning that revalidation frequency needs revisiting, visible in
 * server logs before it becomes a visitor-facing outage.
 */
function warnIfRateLimitLow(headers: Headers): void {
  const remaining = Number(headers.get("x-ratelimit-remaining"));
  const limit = Number(headers.get("x-ratelimit-limit"));
  if (!Number.isFinite(remaining) || !Number.isFinite(limit) || limit === 0) return;

  if (remaining / limit < 0.25) {
    const resetAt = new Date(Number(headers.get("x-ratelimit-reset")) * 1000).toISOString();
    console.warn(
      `[github-api] Rate limit at ${remaining}/${limit}, resets ${resetAt}. ` +
        (env.MARKETING_SITE_GITHUB_TOKEN
          ? "Consider raising GITHUB_REVALIDATE_SECONDS."
          : "No token configured — the unauthenticated ceiling is 60/hour."),
    );
  }
}

/**
 * Reads a failed response's body for the log line without ever throwing.
 *
 * A `Response` body is a single-use stream. On the second attempt of a retried
 * request the mocked-or-cached instance may already be drained, and a drained
 * body rejects — in some runtimes it throws synchronously rather than
 * returning a rejected promise, which a bare `.catch()` would not catch. The
 * diagnostic must never be the thing that breaks the request.
 */
async function readBodySafely(response: Response): Promise<string> {
  try {
    return (await response.text()).slice(0, 500);
  } catch {
    return "<unreadable body>";
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Worth trying again: the server faltered, or the socket did. */
function isTransient(reason: ProjectsFailureReason): boolean {
  return reason === "unavailable";
}

/**
 * One authenticated GitHub request, with timeout, caching, retry and typed
 * failure — the single primitive every fetcher below is built from.
 *
 * `parse` exists because not every endpoint returns JSON: the README is
 * requested as raw markdown (`application/vnd.github.raw`), which is both
 * smaller than the base64-in-JSON envelope and free of a decoding step.
 *
 * `allowMissing` turns a 404 into a successful `null` rather than an error.
 * That is the difference between "this repository does not exist" (a real
 * failure) and "this repository has no README" (an ordinary fact about a
 * perfectly healthy repo) — GitHub reports both with the same status code, and
 * only the caller knows which one it is asking about.
 */
async function githubRequest<T>(
  path: string,
  options: {
    parse: "json" | "text";
    accept?: string;
    /** Returns `{ status: "ok", data: null }` on 404/204 instead of failing. */
    allowMissing?: boolean;
    revalidate?: number;
  } = { parse: "json" },
): Promise<ApiResult<T | null>> {
  const url = `${GITHUB_API_ORIGIN}${path}`;
  const accept = options.accept ?? "application/vnd.github+json";

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    let response: Response;
    try {
      response = await fetch(url, {
        headers: requestHeaders(accept),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        // Next.js caches this on the server and shares it across every request
        // and every route that asks for the same URL, so a burst of traffic
        // produces one upstream call, not one per visitor.
        next: {
          revalidate: options.revalidate ?? GITHUB_REVALIDATE_SECONDS,
          tags: [GITHUB_CACHE_TAG],
        },
      });
    } catch (cause) {
      // DNS failure, TLS error, or the timeout above. Distinguished from a bad
      // response because there is nothing to read status or headers from.
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_BASE_DELAY_MS * 2 ** attempt);
        continue;
      }
      console.error(`[github-api] Could not reach GitHub (${path})`, cause);
      return { status: "error", reason: "unavailable" };
    }

    // 204 is how the contributors endpoint reports "this repository has no
    // contributors yet" — a valid, empty answer with no body to parse.
    if (response.status === 204 && options.allowMissing) {
      return { status: "ok", data: null, headers: response.headers };
    }

    if (!response.ok) {
      if (response.status === 404 && options.allowMissing) {
        return { status: "ok", data: null, headers: response.headers };
      }

      /* An expired or revoked token, on endpoints that are public anyway.
         Drop the credential and try again immediately — see `tokenRejected`.
         `attempt` is rewound because this is not a transient retry: nothing
         was flaky, and spending the backoff budget on it would leave a genuine
         5xx afterwards with fewer attempts than it should have. */
      if (response.status === 401 && env.MARKETING_SITE_GITHUB_TOKEN && !tokenRejected) {
        tokenRejected = true;
        console.error(
          `[github-api] GitHub rejected the configured token on ${path}: ` +
            `${await readBodySafely(response)} — continuing without it. ` +
            `The feed now runs on the 60/hour unauthenticated limit and the ` +
            `contribution graph is unavailable until MARKETING_SITE_GITHUB_TOKEN is replaced.`,
        );
        attempt -= 1;
        continue;
      }

      const reason = reasonForStatus(response.status, response.headers);
      if (isTransient(reason) && attempt < MAX_RETRIES) {
        await delay(RETRY_BASE_DELAY_MS * 2 ** attempt);
        continue;
      }

      // The body carries GitHub's actual explanation ("Bad credentials", "API
      // rate limit exceeded for user ID ..."). Logging only the status would
      // leave a misconfigured token indistinguishable from a revoked one.
      console.error(
        `[github-api] GitHub responded ${response.status} (${reason}) on ${path}: ` +
          (await readBodySafely(response)),
      );
      return { status: "error", reason };
    }

    warnIfRateLimitLow(response.headers);

    try {
      const data = (options.parse === "text"
        ? await response.text()
        : await response.json()) as T;
      return { status: "ok", data, headers: response.headers };
    } catch (cause) {
      console.error(`[github-api] GitHub returned an unparseable body on ${path}`, cause);
      return { status: "error", reason: "unavailable" };
    }
  }

  /* Unreachable: every loop path returns or continues, and the final attempt
     cannot continue. Present because TypeScript cannot prove that. */
  return { status: "error", reason: "unavailable" };
}

/** The configured account, or `null` when the feature is unconfigured. */
function accountOrNull(): string | null {
  return env.MARKETING_SITE_GITHUB_USERNAME ?? null;
}

/** Path-safe `owner/repo` prefix, or `null` when no account is configured. */
function repoPath(repo: string): string | null {
  const owner = accountOrNull();
  if (!owner) return null;
  return `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
}

/* ------------------------------------------------------------------ */
/* Repository list                                                     */
/* ------------------------------------------------------------------ */

/**
 * Fetches every publishable page of the configured account's repositories.
 *
 * Sorted by `pushed` rather than `updated`: GitHub bumps `updated_at` for
 * metadata-only events such as a star or a description edit, so `updated`
 * ordering lets a repo nobody has touched in a year jump to the top of the
 * portfolio because a stranger starred it. `pushed` orders by actual code
 * activity, which is what "recent work" means on a portfolio.
 */
export async function fetchRepositories(): Promise<FetchRepositoriesResult> {
  const username = accountOrNull();
  if (!username) {
    console.warn(
      "[github-api] MARKETING_SITE_GITHUB_USERNAME is not set — the projects feed will render its empty state.",
    );
    return { status: "error", reason: "not-configured" };
  }

  const repositories: GitHubRepository[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    // `type=owner` excludes repositories the account merely collaborates on:
    // someone else's codebase is not this account's portfolio work, and it
    // would otherwise pass every filter in project-filters.ts.
    const path =
      `/users/${encodeURIComponent(username)}/repos` +
      `?per_page=${PER_PAGE}&page=${page}&sort=pushed&direction=desc&type=owner`;

    const result = await githubRequest<unknown>(path, { parse: "json" });
    if (result.status === "error") return result;

    const payload = result.data;
    if (!Array.isArray(payload)) {
      console.error(
        `[github-api] Expected an array of repositories on page ${page}, received ${typeof payload}.`,
      );
      return { status: "error", reason: "unavailable" };
    }

    // Individually validated, not trusted wholesale: one malformed entry in an
    // otherwise good page should cost that one card, not the entire portfolio.
    const valid = payload.filter(isGitHubRepository);
    if (valid.length !== payload.length) {
      console.warn(
        `[github-api] Discarded ${payload.length - valid.length} repository object(s) on page ${page} that did not match the expected shape.`,
      );
    }
    repositories.push(...valid);

    // A short page is the last page — stop rather than spending a request to
    // confirm an empty one.
    if (payload.length < PER_PAGE) break;
  }

  return { status: "ok", repositories };
}

/* ------------------------------------------------------------------ */
/* Single repository                                                   */
/* ------------------------------------------------------------------ */

export async function fetchRepositoryDetail(
  repo: string,
): Promise<ApiResult<GitHubRepositoryDetail | null>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const result = await githubRequest<unknown>(base, { parse: "json", allowMissing: true });
  if (result.status === "error") return result;
  if (result.data === null) return { status: "ok", data: null, headers: result.headers };

  if (!isGitHubRepositoryDetail(result.data)) {
    console.error(`[github-api] Repository detail for ${repo} did not match the expected shape.`);
    return { status: "error", reason: "unavailable" };
  }
  return { status: "ok", data: result.data, headers: result.headers };
}

/**
 * The README as raw markdown.
 *
 * `application/vnd.github.raw` rather than the default JSON envelope: the
 * default returns the file base64-encoded inside a metadata object, so the
 * raw media type saves both a decode step and roughly a third of the transfer.
 *
 * GitHub's own `.html` media type was the obvious alternative and is
 * deliberately not used — it would mean injecting third-party HTML into the
 * page with `dangerouslySetInnerHTML`, trusting GitHub's sanitiser as the only
 * thing between a README and this site's DOM. Parsing the markdown ourselves
 * (see `markdown/`) produces React elements instead, so no HTML string is ever
 * evaluated and the CSP does not have to be relaxed to accommodate one.
 */
export async function fetchReadme(repo: string): Promise<ApiResult<string | null>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  return githubRequest<string>(`${base}/readme`, {
    parse: "text",
    accept: "application/vnd.github.raw",
    // A repository without a README is ordinary, not an error.
    allowMissing: true,
  });
}

/** Byte counts per language: `{ TypeScript: 91234, CSS: 12000 }`. */
export async function fetchLanguages(repo: string): Promise<ApiResult<Record<string, number>>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const result = await githubRequest<unknown>(`${base}/languages`, {
    parse: "json",
    allowMissing: true,
  });
  if (result.status === "error") return result;

  const data = result.data;
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return { status: "ok", data: {}, headers: result.headers };
  }

  // Values are byte counts; anything non-numeric is dropped rather than
  // coerced, so a malformed entry cannot produce a NaN-wide bar.
  const languages: Record<string, number> = {};
  for (const [name, bytes] of Object.entries(data as Record<string, unknown>)) {
    if (typeof bytes === "number" && Number.isFinite(bytes) && bytes > 0) {
      languages[name] = bytes;
    }
  }
  return { status: "ok", data: languages, headers: result.headers };
}

/**
 * Contributors, most commits first.
 *
 * Capped at one page. GitHub sorts this endpoint by contribution count, so the
 * first thirty are the ones worth showing; a repository with more than that
 * has a "and N others" line rather than a second request.
 */
export async function fetchContributors(repo: string): Promise<ApiResult<GitHubContributor[]>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const result = await githubRequest<unknown>(`${base}/contributors?per_page=30&anon=0`, {
    parse: "json",
    // 204 for an empty repository, 404 for one GitHub has not indexed yet.
    allowMissing: true,
  });
  if (result.status === "error") return result;

  const payload = result.data;
  const contributors = Array.isArray(payload) ? payload.filter(isGitHubContributor) : [];
  return { status: "ok", data: contributors, headers: result.headers };
}

/**
 * The most recent commits on the default branch, plus the repository's total
 * commit count where GitHub discloses one.
 *
 * The total is not a field on any endpoint. The standard trick is to ask for a
 * single commit and read the `Link: ...rel="last"` header, whose `page`
 * parameter *is* the total when `per_page=1`. That costs one extra request,
 * which is why it is folded into this call's result rather than exposed as a
 * fetcher of its own.
 */
export async function fetchCommits(
  repo: string,
  limit = 10,
): Promise<ApiResult<{ commits: GitHubCommit[]; total: number | null }>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const [recent, counter] = await Promise.all([
    githubRequest<unknown>(`${base}/commits?per_page=${limit}`, {
      parse: "json",
      // 409 Conflict for an empty repository; 404 when the branch is missing.
      allowMissing: true,
    }),
    githubRequest<unknown>(`${base}/commits?per_page=1`, { parse: "json", allowMissing: true }),
  ]);

  if (recent.status === "error") return recent;

  const payload = recent.data;
  const commits = Array.isArray(payload) ? payload.filter(isGitHubCommit) : [];
  const total =
    counter.status === "ok" ? lastPageFromLinkHeader(counter.headers.get("link")) : null;

  return { status: "ok", data: { commits, total }, headers: recent.headers };
}

/**
 * The `page` value of the `rel="last"` entry in a GitHub `Link` header.
 *
 * ```
 * <https://api.github.com/...&page=2>; rel="next", <...&page=87>; rel="last"
 * ```
 *
 * Returns `null` when the header is absent, which is itself meaningful:
 * GitHub omits `Link` entirely when the result fits on one page. With
 * `per_page=1` that means either zero or one item, and the caller cannot tell
 * which — so `null` propagates and the tile is omitted rather than guessed.
 */
export function lastPageFromLinkHeader(header: string | null): number | null {
  if (!header) return null;

  for (const part of header.split(",")) {
    if (!/rel="last"/.test(part)) continue;
    const match = /[?&]page=(\d+)/.exec(part);
    if (!match) return null;
    const page = Number(match[1]);
    return Number.isFinite(page) && page > 0 ? page : null;
  }
  return null;
}

/** Open pull requests. Counted the same way as commits, via the Link header. */
export async function fetchOpenPullRequestCount(repo: string): Promise<ApiResult<number | null>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const result = await githubRequest<unknown>(`${base}/pulls?state=open&per_page=1`, {
    parse: "json",
    allowMissing: true,
  });
  if (result.status === "error") return result;

  const fromHeader = lastPageFromLinkHeader(result.headers.get("link"));
  if (fromHeader !== null) {
    return { status: "ok", data: fromHeader, headers: result.headers };
  }

  // No Link header means the whole result fit on one page, so the array length
  // — 0 or 1 — is the exact answer rather than an unknown.
  const payload = result.data;
  const count = Array.isArray(payload) ? payload.length : 0;
  return { status: "ok", data: count, headers: result.headers };
}

/** Published releases, newest first. Drafts are excluded by the mapper. */
export async function fetchReleases(repo: string, limit = 5): Promise<ApiResult<GitHubRelease[]>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const result = await githubRequest<unknown>(`${base}/releases?per_page=${limit}`, {
    parse: "json",
    allowMissing: true,
  });
  if (result.status === "error") return result;

  const payload = result.data;
  const releases = Array.isArray(payload) ? payload.filter(isGitHubRelease) : [];
  return { status: "ok", data: releases, headers: result.headers };
}

/**
 * Weekly commit counts for the trailing year.
 *
 * This endpoint is asynchronous on GitHub's side: the first request for a
 * repository whose statistics are not cached returns `202 Accepted` with an
 * empty body while the numbers are computed, and a later request returns the
 * data. There is nothing useful to do about that inside one render, so a 202
 * resolves to an empty array and the activity strip is simply omitted — the
 * next hourly revalidation picks up the computed figures.
 */
export async function fetchCommitActivity(
  repo: string,
): Promise<ApiResult<Array<{ week: number; total: number }>>> {
  const base = repoPath(repo);
  if (!base) return { status: "error", reason: "not-configured" };

  const result = await githubRequest<unknown>(`${base}/stats/commit_activity`, {
    parse: "json",
    allowMissing: true,
  });
  if (result.status === "error") return result;

  const payload = result.data;
  if (!Array.isArray(payload)) {
    return { status: "ok", data: [], headers: result.headers };
  }

  const weeks = payload.filter(
    (entry): entry is { week: number; total: number } =>
      typeof entry === "object" &&
      entry !== null &&
      typeof (entry as { week?: unknown }).week === "number" &&
      typeof (entry as { total?: unknown }).total === "number",
  );
  return { status: "ok", data: weeks, headers: result.headers };
}
