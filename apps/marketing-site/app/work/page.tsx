import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { GITHUB_REVALIDATE_SECONDS } from "@/features/projects/github-api";
import { ProjectsPageHero } from "@/features/projects/projects-hero";

/**
 * The Work section — `/work`.
 *
 * ── What changed, and why it mattered ─────────────────────────────────────
 *
 * This route used to render a page of three hand-written "Illustrative
 * example" cards, while the live GitHub portfolio sat at `/work/projects`.
 * The navigation's only "Work" link points here, and nothing in the
 * navigation pointed at `/work/projects` — so the rebuilt Work section was
 * unreachable by anyone who did not already know its URL.
 *
 * The old page is not kept alongside this one because its content was a
 * duplicate of `/work/case-studies`: the same three studies, from the same
 * registry, rendered as the same cards. `/work/projects` now permanently
 * redirects here (see `next.config.ts`).
 *
 * The generated case studies keep their `/work/projects/<repo>` URLs. Those
 * are already indexed and shared, and the alternative — `/work/<repo>` —
 * would collide with the hand-written studies that already own that segment.
 *
 * ── Rendering ─────────────────────────────────────────────────────────────
 *
 * Incremental Static Regeneration, one hour, matched to the constant
 * `github-api.ts` puts on its own `fetch`, so the page cache and the data
 * cache expire together instead of the page serving hour-old HTML built from
 * data that had already refreshed underneath it.
 */

const TITLE = "Work";
const DESCRIPTION =
  "Live from our GitHub: the open-source websites, AI agents and automation systems Trady Perch builds, generated directly from our public repositories.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/work",
});

export const revalidate = 3600;

// Fails the build if the two ever drift apart in a future edit — a silent
// mismatch here would be invisible in review and produce stale pages in
// production, which is exactly the class of bug worth spending a line on.
const _revalidateMatchesFetch: typeof revalidate = GITHUB_REVALIDATE_SECONDS;
void _revalidateMatchesFetch;

export default function WorkPage() {
  return <ProjectsPageHero />;
}
