import { NextResponse } from "next/server";
import { GITHUB_REVALIDATE_SECONDS } from "@/features/projects/github-api";
import { getProjects } from "@/features/projects/github-service";
import type { ProjectsFailureReason } from "@/features/projects/github-types";

export const runtime = "nodejs";

/**
 * Public, read-only JSON view of the portfolio feed.
 *
 * Note what this route is *not*: the page at `/work/projects` does not call
 * it. A Server Component calling its own app's HTTP endpoint would pay a
 * needless network hop and defeat static generation — the page imports
 * `getProjects()` directly instead. Both entry points share that one service
 * function, so they can never disagree about what the portfolio contains.
 *
 * This endpoint exists for consumers that genuinely need HTTP: a future
 * client-side filter or "load more" control, an external dashboard, or a
 * smoke check that the token is live in a given environment. It returns
 * exactly the `Project[]` the UI renders — already filtered, ranked, and
 * stripped of the ~90 GitHub fields the site has no use for.
 *
 * Safe to expose publicly: every field derives from public repository
 * metadata, and the token is used only to authenticate *this server's*
 * upstream call — it is never echoed, and no request parameter can influence
 * which account is queried.
 */

/**
 * Status codes for the states a visitor's browser can meaningfully act on.
 *
 * `unauthorized` maps to 503, not 401/403: the credential that failed is this
 * server's, not the caller's, and a 401 would incorrectly invite the client to
 * retry with credentials of their own. From the caller's side a broken server
 * token is exactly a temporary backend outage.
 */
const STATUS_BY_REASON: Record<ProjectsFailureReason, number> = {
  "not-configured": 503,
  unauthorized: 503,
  "rate-limited": 503,
  "account-not-found": 503,
  unavailable: 502,
};

/**
 * Visitor-safe failure copy. Intentionally coarse — the precise cause is in
 * the server logs, and telling an anonymous caller whether a token is invalid
 * versus rate-limited leaks the account's configuration state for no benefit.
 */
const MESSAGE_BY_REASON: Record<ProjectsFailureReason, string> = {
  "not-configured": "The project feed is not configured yet.",
  unauthorized: "The project feed is temporarily unavailable.",
  "rate-limited": "The project feed is busy — please try again shortly.",
  "account-not-found": "The project feed is temporarily unavailable.",
  unavailable: "Could not reach GitHub. Please try again shortly.",
};

export async function GET(): Promise<Response> {
  const result = await getProjects();

  if (result.status === "error") {
    return NextResponse.json(
      { ok: false, reason: result.reason, message: MESSAGE_BY_REASON[result.reason] },
      {
        status: STATUS_BY_REASON[result.reason],
        // An error must never be cached at the edge — otherwise a single
        // rate-limited moment is served to every visitor for the next hour.
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return NextResponse.json(
    { ok: true, count: result.projects.length, projects: result.projects },
    {
      headers: {
        // Mirrors the server-side revalidation window, plus a
        // stale-while-revalidate tail so a request arriving the moment the
        // cache expires is served instantly from the stale copy while the
        // refresh happens behind it, rather than blocking on GitHub.
        "Cache-Control": `public, max-age=0, s-maxage=${GITHUB_REVALIDATE_SECONDS}, stale-while-revalidate=${GITHUB_REVALIDATE_SECONDS * 24}`,
      },
    },
  );
}
