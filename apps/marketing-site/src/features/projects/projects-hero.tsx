import { Suspense } from "react";
import { ProjectsAtmosphere } from "./projects-atmosphere";
import { ProjectsSection } from "./projects-section";
import { ProjectsSkeleton } from "./projects-states";
import styles from "./projects-hero.module.css";

/**
 * The Work page — the live GitHub portfolio, hero and all.
 *
 * ── Why this is a component rather than a route file ──────────────────────
 *
 * It used to be the body of `app/work/projects/page.tsx`, which is where the
 * portfolio lived when it was a sub-page. It is now what `/work` renders, and
 * putting it here rather than inlining it in the route keeps the route file to
 * what a route file should be: metadata, caching policy, and one component.
 *
 * ── Why /work and not /work/projects ──────────────────────────────────────
 *
 * The navigation's "Work" link has always pointed at `/work`, which rendered a
 * separate page of three hand-written "Illustrative example" cards. The live
 * portfolio sat at `/work/projects` and was linked from nowhere in the
 * navigation at all — so the rebuilt Work section was, from a visitor's point
 * of view, invisible. That is not a discoverability nicety; it is the section
 * not existing.
 *
 * The old `/work` page is gone rather than kept alongside this one, because
 * its content duplicated `/work/case-studies` exactly — the same three studies
 * from the same registry. `/work/projects` now permanently redirects here.
 */

/**
 * A bespoke editorial header rather than the shared SectionHeading.
 *
 * SectionHeading is built for a uniform eyebrow/title/description stack at a
 * consistent scale across the site; this page's opening needs a larger display
 * measure, a hairline rule, and a lede held to a narrower column than its
 * heading — three things that would each have to become a prop on a component
 * every other section is happy with.
 */
export function ProjectsPageHero() {
  return (
    <>
      <section className={styles.hero}>
        <ProjectsAtmosphere />
        <div className={styles.heroContainer}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            Selected work
          </p>
          <h1 className={styles.title}>
            Built with precision.
            <span className={styles.titleAccent}> Open to inspection.</span>
          </h1>
          <p className={styles.lede}>
            Most portfolios ask you to take their word for it. This one doesn&rsquo;t. Every project
            below is a live repository — read the architecture, read the commits, open the
            deployment.
          </p>
        </div>
      </section>

      {/*
        With ISR the grid is already in the prerendered HTML, so this fallback
        is not the common path — it exists for the genuine cases where it is:
        the very first request after a deploy that invalidated the cache, and
        an on-demand revalidation. Without a boundary, those requests would
        block the entire document on GitHub's response; with it, the hero
        above streams immediately and only the grid waits.
      */}
      <Suspense fallback={<ProjectsSkeletonSection />}>
        <ProjectsSection />
      </Suspense>
    </>
  );
}

/** The skeleton wrapped in the same section scaffolding the real grid uses,
 *  so the fallback occupies the identical footprint and swapping in the real
 *  content shifts nothing. */
function ProjectsSkeletonSection() {
  return (
    <section className={styles.skeletonSection} aria-labelledby="projects-loading-heading">
      <div className={styles.skeletonContainer}>
        <h2 id="projects-loading-heading" className={styles.srOnly}>
          Projects
        </h2>
        <ProjectsSkeleton count={6} />
      </div>
    </section>
  );
}
