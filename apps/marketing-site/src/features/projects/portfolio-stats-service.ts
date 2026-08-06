import "server-only";

import { fetchContributionCalendar } from "./github-contributions";
import type { PortfolioStats } from "./github-detail-types";
import { getProjects } from "./github-service";
import type { Project } from "./github-types";

/**
 * The account-wide figures above the grid.
 *
 * ── Everything here is counted, never claimed ─────────────────────────────
 *
 * Each figure is derived from the same `Project[]` the grid renders, so the
 * headline numbers and the cards below them can never disagree — "12 projects"
 * above a grid of nine is the specific failure this rules out by construction.
 *
 * That does mean the counts describe the *published portfolio*, not the whole
 * GitHub account: forks, archives and uncategorised repositories are excluded
 * from both. The section's label says "projects", not "repositories", for
 * exactly that reason.
 *
 * ── Total commits ─────────────────────────────────────────────────────────
 *
 * Deliberately absent from this aggregate. A true per-account commit total
 * would mean one paginated request per repository — thirty-plus calls per
 * revalidation to produce a vanity number. The contribution calendar already
 * carries the honest, GitHub-computed equivalent (`contributions`, the
 * trailing year), so that is what the tile shows, labelled as the year it is.
 */

/** Pure aggregation over the published feed. Exported for direct testing. */
export function summariseProjects(projects: readonly Project[]): Omit<
  PortfolioStats,
  "contributions" | "currentStreak" | "calendar"
> {
  const languages = new Set<string>();
  let stars = 0;
  let forks = 0;

  for (const project of projects) {
    stars += project.stars;
    forks += project.forks;
    // Case-folded: GitHub reports "TypeScript" consistently, but a topic-
    // derived language on a future code path should not double-count.
    if (project.language) languages.add(project.language.toLowerCase());
  }

  return {
    repositories: projects.length,
    stars,
    forks,
    languages: languages.size,
  };
}

/**
 * The stats bar's payload.
 *
 * Never fails: a failing feed yields zeroes across the board, and the section
 * that renders this checks the project count before showing anything. There is
 * no error state here because there is no error worth interrupting a page for
 * — the grid beneath already explains itself when the feed is down.
 */
export async function getPortfolioStats(): Promise<PortfolioStats> {
  // In parallel: the calendar is a separate API on a separate origin and
  // nothing in the aggregate depends on it.
  const [result, calendar] = await Promise.all([getProjects(), fetchContributionCalendar()]);

  const projects = result.status === "ok" ? result.projects : [];

  return {
    ...summariseProjects(projects),
    // `null` rather than 0 when the calendar is unavailable — see
    // github-contributions.ts. The UI omits these tiles rather than
    // stating a figure it does not have.
    contributions: calendar?.totalContributions ?? null,
    currentStreak: calendar?.currentStreak ?? null,
    calendar: calendar?.days ?? [],
  };
}
