import "server-only";

import { env } from "@/shared/env";
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

/** GitHub's documented maximum for this endpoint. */
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

export type FetchRepositoriesResult =
  | { status: "ok"; repositories: GitHubRepository[] }
  | { status: "error"; reason: ProjectsFailureReason };

function requestHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    // Pinning the API version means a future breaking change to the response
    // shape arrives as a deliberate upgrade here, not as a silent field
    // rename that reaches production through an unversioned request.
    "X-GitHub-Api-Version": "2022-11-28",
    // GitHub rejects unidentified clients on some paths and rate-limits them
    // harder on others; this is required, not decorative.
    "User-Agent": "trady-perch-marketing-site",
  };

  const token = env.MARKETING_SITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

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
 * Fetches every publishable page of the configured account's repositories.
 *
 * Sorted by `pushed` rather than `updated`: GitHub bumps `updated_at` for
 * metadata-only events such as a star or a description edit, so `updated`
 * ordering lets a repo nobody has touched in a year jump to the top of the
 * portfolio because a stranger starred it. `pushed` orders by actual code
 * activity, which is what "recent work" means on a portfolio.
 */
export async function fetchRepositories(): Promise<FetchRepositoriesResult> {
  const username = env.MARKETING_SITE_GITHUB_USERNAME;
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
    const url =
      `${GITHUB_API_ORIGIN}/users/${encodeURIComponent(username)}/repos` +
      `?per_page=${PER_PAGE}&page=${page}&sort=pushed&direction=desc&type=owner`;

    let response: Response;
    try {
      response = await fetch(url, {
        headers: requestHeaders(),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        // Next.js caches this on the server for an hour and shares it across
        // every request and every route that asks for the same URL, so a
        // burst of traffic produces one upstream call, not one per visitor.
        next: { revalidate: GITHUB_REVALIDATE_SECONDS, tags: [GITHUB_CACHE_TAG] },
      });
    } catch (cause) {
      // DNS failure, TLS error, or the 8s timeout above. Distinguished from a
      // bad response because there is nothing to read status or headers from.
      console.error(`[github-api] Could not reach GitHub (page ${page})`, cause);
      return { status: "error", reason: "unavailable" };
    }

    if (!response.ok) {
      const reason = reasonForStatus(response.status, response.headers);
      // The body carries GitHub's actual explanation ("Bad credentials",
      // "API rate limit exceeded for user ID ..."). Logging only the status
      // would leave a misconfigured token indistinguishable from a revoked
      // one. Truncated because an HTML error page from an intercepting proxy
      // would otherwise dump a full document into the logs.
      console.error(
        `[github-api] GitHub responded ${response.status} (${reason}) on page ${page}: ` +
          (await response.text().catch(() => "<unreadable body>")).slice(0, 500),
      );
      return { status: "error", reason };
    }

    warnIfRateLimitLow(response.headers);

    let payload: unknown;
    try {
      payload = await response.json();
    } catch (cause) {
      console.error(`[github-api] GitHub returned an unparseable body on page ${page}`, cause);
      return { status: "error", reason: "unavailable" };
    }

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
