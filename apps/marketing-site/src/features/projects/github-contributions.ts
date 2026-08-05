import "server-only";

import { env } from "@/shared/env";
import { GITHUB_CACHE_TAG, GITHUB_REVALIDATE_SECONDS } from "./github-api";
import type { ContributionDay } from "./github-detail-types";

/**
 * The contribution calendar — the only thing on this feature that GitHub's
 * REST API cannot answer.
 *
 * ── Why GraphQL, only here ────────────────────────────────────────────────
 *
 * There is no REST endpoint for the contribution graph. It exists solely as
 * `user.contributionsCollection.contributionCalendar` on the GraphQL API, so
 * this one query is the whole reason the dependency exists. Everything else in
 * the feature stays on REST, where the caching story is simpler and a failure
 * maps onto an HTTP status the rest of the code already understands.
 *
 * ── Why it can be absent ──────────────────────────────────────────────────
 *
 * GitHub's GraphQL API requires authentication *unconditionally* — there is no
 * unauthenticated tier the way there is for REST. A deployment without
 * `MARKETING_SITE_GITHUB_TOKEN` therefore cannot obtain this data at all, and
 * no amount of retrying changes that. So this module returns `null` rather
 * than an error, and the UI omits the graph. That is a deliberate choice about
 * honesty: a contribution graph rendered as all-zero squares is a false
 * statement about someone's year, and an error panel over a decorative bonus
 * element is disproportionate.
 */

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const REQUEST_TIMEOUT_MS = 8000;

/**
 * `from`/`to` are deliberately omitted: with neither, GitHub returns exactly
 * the trailing twelve months, which is the same window the graph on a real
 * profile shows. Supplying dates ourselves would drift out of step with that
 * every day the page was not rebuilt.
 */
const CONTRIBUTIONS_QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/**
 * GitHub's `ContributionLevel` enum, mapped onto the 0-4 intensity the graph
 * renders. Using GitHub's own buckets rather than deriving thresholds from the
 * data means this graph shades identically to the one on the profile page —
 * a locally-computed quartile would look plausible and be subtly different.
 */
const LEVEL_BY_NAME: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export interface ContributionCalendar {
  totalContributions: number;
  days: ContributionDay[];
  /** Consecutive days ending today (or yesterday) with at least one contribution. */
  currentStreak: number;
  /** The longest run anywhere in the trailing year. */
  longestStreak: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Walks the nested GraphQL response into a flat, chronologically ordered list.
 *
 * Written defensively at every level rather than cast: a GraphQL response with
 * `errors` still arrives as a 200 with `data: { user: null }`, so an
 * unchecked `data.user.contributionsCollection` is a runtime crash on the
 * ordinary "this login does not exist" path.
 */
function toDays(payload: unknown): ContributionDay[] | null {
  if (!isRecord(payload)) return null;
  const data = payload.data;
  if (!isRecord(data)) return null;
  const user = data.user;
  if (!isRecord(user)) return null;
  const collection = user.contributionsCollection;
  if (!isRecord(collection)) return null;
  const calendar = collection.contributionCalendar;
  if (!isRecord(calendar)) return null;
  const weeks = calendar.weeks;
  if (!Array.isArray(weeks)) return null;

  const days: ContributionDay[] = [];
  for (const week of weeks) {
    if (!isRecord(week) || !Array.isArray(week.contributionDays)) continue;
    for (const day of week.contributionDays) {
      if (!isRecord(day)) continue;
      if (typeof day.date !== "string" || typeof day.contributionCount !== "number") continue;
      days.push({
        date: day.date,
        count: day.contributionCount,
        level:
          typeof day.contributionLevel === "string"
            ? (LEVEL_BY_NAME[day.contributionLevel] ?? 0)
            : 0,
      });
    }
  }
  return days;
}

function totalFrom(payload: unknown): number {
  if (!isRecord(payload)) return 0;
  const data = payload.data;
  if (!isRecord(data)) return 0;
  const user = data.user;
  if (!isRecord(user)) return 0;
  const collection = user.contributionsCollection;
  if (!isRecord(collection)) return 0;
  const calendar = collection.contributionCalendar;
  if (!isRecord(calendar)) return 0;
  return typeof calendar.totalContributions === "number" ? calendar.totalContributions : 0;
}

/**
 * The current streak, counted backwards from the most recent day.
 *
 * The subtlety is the first day. A streak should not be reported as broken at
 * 00:01 simply because today has no commits yet, so a zero-contribution
 * *final* day is skipped rather than terminating the count — the streak is
 * then measured from yesterday. A zero on any earlier day does terminate it.
 *
 * Exported for direct unit testing; the boundary behaviour above is exactly
 * the kind of thing that is easy to get subtly wrong and impossible to notice.
 */
export function currentStreakFrom(days: readonly ContributionDay[]): number {
  let streak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    const day = days[index];
    if (!day) break;

    if (day.count > 0) {
      streak += 1;
      continue;
    }
    // Today with nothing committed yet does not break a streak; any other
    // empty day does.
    if (index === days.length - 1) continue;
    break;
  }
  return streak;
}

/** The longest consecutive run of contributing days in the window. */
export function longestStreakFrom(days: readonly ContributionDay[]): number {
  let longest = 0;
  let running = 0;
  for (const day of days) {
    running = day.count > 0 ? running + 1 : 0;
    if (running > longest) longest = running;
  }
  return longest;
}

/**
 * The trailing year's calendar, or `null` when it cannot be obtained.
 *
 * `null` covers every reason equally — no token, no username, a network
 * failure, a GraphQL error, a renamed account. The caller has exactly one
 * decision to make (render the graph or don't), so a typed failure union here
 * would be detail with no consumer.
 */
export async function fetchContributionCalendar(): Promise<ContributionCalendar | null> {
  const login = env.MARKETING_SITE_GITHUB_USERNAME;
  const token = env.MARKETING_SITE_GITHUB_TOKEN;

  // Not an error worth logging loudly on every revalidation: an unauthenticated
  // deployment is a supported configuration, and github-api.ts already warns
  // once about the missing username.
  if (!login || !token) return null;

  let response: Response;
  try {
    response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "trady-perch-marketing-site",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { login },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      // A POST is uncacheable by default in Next's fetch cache; naming a
      // revalidate window and tag opts this one back in. Safe because the
      // request body is a constant for a given deployment — this is a read
      // expressed as a POST, which is GraphQL's convention, not a mutation.
      next: { revalidate: GITHUB_REVALIDATE_SECONDS, tags: [GITHUB_CACHE_TAG] },
    });
  } catch (cause) {
    console.error("[github-contributions] Could not reach the GraphQL API", cause);
    return null;
  }

  if (!response.ok) {
    console.error(`[github-contributions] GraphQL responded ${response.status}.`);
    return null;
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    console.error("[github-contributions] GraphQL returned an unparseable body", cause);
    return null;
  }

  // A GraphQL error arrives as HTTP 200 with an `errors` array, so the status
  // check above is not sufficient on its own.
  if (isRecord(payload) && Array.isArray(payload.errors) && payload.errors.length > 0) {
    console.error(
      `[github-contributions] GraphQL reported an error: ${JSON.stringify(payload.errors).slice(0, 300)}`,
    );
    return null;
  }

  const days = toDays(payload);
  if (!days || days.length === 0) return null;

  return {
    totalContributions: totalFrom(payload),
    days,
    currentStreak: currentStreakFrom(days),
    longestStreak: longestStreakFrom(days),
  };
}
