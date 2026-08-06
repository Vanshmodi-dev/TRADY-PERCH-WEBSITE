import "server-only";

import { getProjects } from "@/features/projects/github-service";
import { CASE_STUDIES, findCaseStudy, relatedCaseStudies } from "./case-study-data";
import type { ResolvedCaseStudy } from "./case-study-types";

/**
 * Joins a case study to its live GitHub project.
 *
 * ── Why the join exists ───────────────────────────────────────────────────
 *
 * Prose ages. "Last updated three days ago", the primary language, the star
 * count and the deployment URL all change without anyone editing this file,
 * and a case study that hardcodes them is wrong within a week. Reading them
 * from the same hourly-revalidated feed the portfolio grid uses means the
 * page's live facts and the grid's can never disagree.
 *
 * ── Degradation ───────────────────────────────────────────────────────────
 *
 * `project` is `null` whenever the repository cannot be found — renamed, made
 * private, deleted, or simply a feed outage. The page still renders in full:
 * the prose is the case study, and the live metadata is an enhancement on top
 * of it. A GitHub outage must never take a marketing page down.
 */
export async function resolveCaseStudy(slug: string): Promise<ResolvedCaseStudy | null> {
  const study = findCaseStudy(slug);
  if (!study) return null;

  return {
    study,
    project: study.repoName ? await findProject(study.repoName) : null,
    related: relatedCaseStudies(slug),
  };
}

async function findProject(repoName: string) {
  const result = await getProjects();
  if (result.status !== "ok") return null;

  const target = repoName.toLowerCase();
  return result.projects.find((project) => project.repoName.toLowerCase() === target) ?? null;
}

/**
 * Repositories that have a case study but were filtered out of the portfolio
 * feed — logged at build time as a warning, never surfaced to a visitor.
 *
 * This catches a genuinely confusing state: a study exists and its page
 * builds, but its `repoName` matches nothing in the feed, so the hero has no
 * action buttons and the snapshot has no live facts, for no visible reason.
 * The usual causes are a repository being archived, made private, renamed, or
 * failing `project-filters.ts`.
 */
export async function reportOrphanedCaseStudies(): Promise<void> {
  const result = await getProjects();
  if (result.status !== "ok") return;

  const known = new Set(result.projects.map((project) => project.repoName.toLowerCase()));

  for (const study of CASE_STUDIES) {
    if (study.repoName && !known.has(study.repoName.toLowerCase())) {
      console.warn(
        `[case-study] "${study.slug}" references repository "${study.repoName}", which is not in the projects feed. ` +
          "The page will render without live metadata. Check whether the repo was renamed, archived, or made private.",
      );
    }
  }
}
