import type { CaseStudy } from "./case-study-types";
import { LEAD_FINDER } from "./studies/lead-finder";
import { MODI_STORE } from "./studies/modi-store";
import { TRADY_PERCH_PLATFORM } from "./studies/trady-perch-platform";

/**
 * The case-study registry.
 *
 * ── Adding a case study ───────────────────────────────────────────────────
 *
 * 1. Write `studies/<slug>.ts` exporting a `CaseStudy`.
 * 2. Import it and add it to `CASE_STUDIES` below.
 *
 * That is the whole procedure. The route, `generateStaticParams`, the
 * metadata, the JSON-LD, the sitemap entry, the breadcrumb trail, the related
 * cards on every other study, and the "Case study" action on the portfolio
 * card all derive from this array. There is no second place to remember.
 *
 * ── Ordering ──────────────────────────────────────────────────────────────
 *
 * Array order is editorial and load-bearing: it decides which studies surface
 * as "related" at the foot of another. Deepest first, so a reader who
 * finishes one is offered the strongest remaining one rather than whichever
 * happened to be adjacent.
 *
 * ── Slugs are permanent ───────────────────────────────────────────────────
 *
 * A slug is a public URL. Once one has been shared or indexed, changing it
 * breaks every inbound link — rename the file and the title freely, but treat
 * the slug as immutable.
 */
export const CASE_STUDIES: readonly CaseStudy[] = [
  TRADY_PERCH_PLATFORM,
  LEAD_FINDER,
  MODI_STORE,
];

/**
 * Route segments that must never be shadowed by a case-study slug.
 *
 * The studies live at `/work/<slug>`, alongside real static routes at
 * `/work/projects` and `/work/case-studies`. Next.js resolves a static
 * segment ahead of a dynamic one, so a study slugged `projects` would build
 * a page that is permanently unreachable — a silent failure with no error
 * anywhere. `case-study-data.test.ts` asserts against this list.
 */
export const RESERVED_WORK_SEGMENTS: readonly string[] = ["projects", "case-studies"];

/** Every slug with real content behind it. Drives `generateStaticParams` and
 *  the sitemap, so neither can advertise a page the route does not build. */
export function caseStudySlugs(): string[] {
  return CASE_STUDIES.map((study) => study.slug);
}

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** The case study documenting a given repository, if one has been written. */
export function findCaseStudyForRepo(repoName: string): CaseStudy | undefined {
  const target = repoName.toLowerCase();
  return CASE_STUDIES.find((study) => study.repoName?.toLowerCase() === target);
}

/**
 * Studies to surface at the foot of `slug`, in registry order, excluding
 * itself.
 *
 * Capped at two rather than showing everything: the section exists to offer a
 * next step, and a reader presented with every remaining option is a reader
 * choosing between them instead of taking one.
 */
export function relatedCaseStudies(slug: string, limit = 2): CaseStudy[] {
  return CASE_STUDIES.filter((study) => study.slug !== slug).slice(0, limit);
}
