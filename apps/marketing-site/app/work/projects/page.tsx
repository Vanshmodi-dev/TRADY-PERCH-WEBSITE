import type { Metadata } from "next";
import { Suspense } from "react";
import { GITHUB_REVALIDATE_SECONDS } from "@/features/projects/github-api";
import { ProjectsAtmosphere } from "@/features/projects/projects-atmosphere";
import { ProjectsSection } from "@/features/projects/projects-section";
import { ProjectsSkeleton } from "@/features/projects/projects-states";
import { SITE_URL } from "@/shared/site-config";
import styles from "./page.module.css";

const TITLE = "Projects";
const DESCRIPTION =
  "Live from our GitHub: the open-source websites, AI agents and automation systems Trady Perch builds, generated directly from our public repositories.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/work/projects` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/work/projects`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Incremental Static Regeneration, one hour — matched to the same constant
 * `github-api.ts` puts on its own `fetch`, so the page cache and the data
 * cache expire together instead of the page serving hour-old HTML built from
 * data that had already refreshed underneath it.
 *
 * This is what preserves Ch.2 §4's static-first default while still showing a
 * live feed. The page is prerendered at build time and served from the CDN as
 * a static document; the first request after the hour elapses triggers a
 * background rebuild and still gets an instant response from the existing
 * copy. Visitors never wait on GitHub, and GitHub sees one request an hour
 * rather than one per visitor.
 */
export const revalidate = 3600;

// Fails the build if the two ever drift apart in a future edit — a silent
// mismatch here would be invisible in review and produce stale pages in
// production, which is exactly the class of bug worth spending a line on.
const _revalidateMatchesFetch: typeof revalidate = GITHUB_REVALIDATE_SECONDS;
void _revalidateMatchesFetch;

export default function ProjectsPage() {
  return (
    <>
      {/*
        A bespoke editorial header rather than the shared SectionHeading.
        SectionHeading is built for a uniform eyebrow/title/description stack
        at a consistent scale across the site; this page's opening needs a
        larger display measure, a hairline rule, and a lede held to a narrower
        column than its heading — three things that would each have to become
        a prop on a component every other section is happy with.
      */}
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
