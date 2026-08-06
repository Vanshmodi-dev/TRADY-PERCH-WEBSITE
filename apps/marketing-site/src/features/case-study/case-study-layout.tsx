import type { ResolvedCaseStudy } from "./case-study-types";
import { CaseStudyProgress } from "./components/cs-progress";
import { CaseStudyHeroSection } from "./sections/cs-hero";
import { CaseStudySnapshotSection } from "./sections/cs-snapshot";
import {
  CaseStudyChallenges,
  CaseStudyEngineering,
  CaseStudyOverview,
  CaseStudyResearch,
  CaseStudySolution,
  CaseStudyStack,
  CaseStudyTestimonials,
} from "./sections/cs-blocks";
import { CaseStudyFeatures } from "./sections/cs-features";
import { CaseStudyGallery } from "./sections/cs-gallery";
import { CaseStudyTimeline } from "./sections/cs-timeline";
import { CaseStudyResults } from "./sections/cs-results";
import { CaseStudyRelated } from "./sections/cs-related";
import { CaseStudyCta } from "./sections/cs-cta";

/**
 * The one layout every case study uses.
 *
 * ── Why this composes unconditionally ─────────────────────────────────────
 *
 * Every section is listed here every time, and each one returns `null` when
 * its data is absent. The alternative — conditionals in this file — would put
 * the "does this study have a gallery?" question in two places and let them
 * disagree. Here the ordering of the narrative is stated once, plainly, and
 * reads top to bottom exactly as a visitor experiences it.
 *
 * ── The narrative order is the product ────────────────────────────────────
 *
 * Problem → thinking → strategy → design → engineering → launch → outcome →
 * decision. That sequence is not arbitrary and is not reorderable per study:
 * it answers a prospective client's questions in the order they actually ask
 * them. A study that has nothing to say at one beat skips it; it never
 * answers them out of order.
 *
 * Everything here is a Server Component. The only client JavaScript on a case
 * study page is the metric counters and the gallery lightbox.
 */

export function CaseStudyLayout({ study, project, related }: ResolvedCaseStudy) {
  return (
    <>
      <CaseStudyProgress />

      {/* One <article>: the page is a single self-contained document, which
          is what lets a reader-mode or a syndication tool extract it whole. */}
      <article>
        <CaseStudyHeroSection hero={study.hero} />
        <CaseStudySnapshotSection
          snapshot={study.snapshot}
          project={project}
          // Flattened from the authored stack so the panel's badge row shows
          // the real technology list rather than the portfolio matcher's
          // single-word category. Capped, because the panel is a summary —
          // the full grouped breakdown is the Technology section below.
          technologies={study.stack?.flatMap((group) => group.items).slice(0, 8)}
        />

        <CaseStudyOverview overview={study.overview} />
        <CaseStudyChallenges challenges={study.challenges} />
        <CaseStudyResearch research={study.research} />
        <CaseStudySolution solution={study.solution} />
        <CaseStudyFeatures features={study.features} />
        <CaseStudyEngineering engineering={study.engineering} />
        <CaseStudyGallery gallery={study.gallery} />
        <CaseStudyTimeline timeline={study.timeline} />
        <CaseStudyResults results={study.results} />
        <CaseStudyTestimonials testimonials={study.testimonials} />
        <CaseStudyStack stack={study.stack} />
      </article>

      {/* Outside the <article>: neither is part of this project's story —
          one points at other stories, the other asks for a decision. */}
      <CaseStudyRelated related={related} />
      <CaseStudyCta cta={study.cta} />
    </>
  );
}
