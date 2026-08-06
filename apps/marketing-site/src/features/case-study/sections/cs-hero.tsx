import Image from "next/image";
import { Link } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { ProjectsAtmosphere } from "@/features/projects/projects-atmosphere";
import type { CaseStudyHero } from "../case-study-types";
import styles from "./cs-hero.module.css";

/**
 * The cinematic opening.
 *
 * A Server Component. The entrance animation is CSS with a per-element
 * `--enter-index` stagger, so the whole hero — including the large image —
 * arrives without a single line of client JavaScript.
 *
 * Breadcrumbs are real navigation, not decoration: this page is reachable
 * directly from search and from a shared link, where the browser's Back
 * button has nowhere useful to go.
 */

interface CaseStudyHeroProps {
  hero: CaseStudyHero;
}

export function CaseStudyHeroSection({ hero }: CaseStudyHeroProps) {
  return (
    <header className={styles.hero}>
      <ProjectsAtmosphere />

      <div className={styles.container}>
        {/* A real <nav> landmark with an ordered list — the structure the
            BreadcrumbList JSON-LD on this page describes. The two must agree;
            structured data that has no visible counterpart is exactly what
            search engines penalise. */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/work" linkComponent={NextLinkAdapter} className={styles.crumb}>
                Work
              </Link>
            </li>
            <li aria-hidden="true" className={styles.crumbSeparator}>
              /
            </li>
            <li>
              {/* aria-current marks the terminal crumb; it is not a link,
                  because a link to the page you are on is a dead control. */}
              <span className={styles.crumbCurrent} aria-current="page">
                {hero.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className={styles.intro}>
          <p className={styles.category} style={{ "--enter-index": 0 } as React.CSSProperties}>
            <span className={styles.categoryMark} aria-hidden="true" />
            {hero.category}
          </p>

          <h1 className={styles.title} style={{ "--enter-index": 1 } as React.CSSProperties}>
            {hero.title}
          </h1>

          {/*
            No action buttons here.

            They live in the Project Snapshot immediately below, which is the
            section designed to hold them. Rendering them in both put two
            links to the same destination inside a single viewport — visually
            redundant, and in a screen reader's link list two entries with
            near-identical names and no way to tell them apart.

            The hero keeps its narrative focus: category, title, standfirst.
            The snapshot is where a reader goes for the specification, and the
            specification is where "open the deployment" belongs.
          */}
          <p className={styles.standfirst} style={{ "--enter-index": 2 } as React.CSSProperties}>
            {hero.standfirst}
          </p>
        </div>
      </div>

      {hero.image ? (
        <div className={styles.media} style={{ "--enter-index": 3 } as React.CSSProperties}>
          <div className={styles.mediaFrame}>
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              className={styles.mediaImage}
              /* The one image on the page worth preloading: it is the LCP
                 element, and lazy-loading it would delay the largest paint
                 by a full round trip. Everything below the fold is lazy. */
              priority
              sizes="(min-width: 1600px) 1400px, 92vw"
            />
          </div>
          <span className={styles.mediaGlow} aria-hidden="true" />
        </div>
      ) : null}
    </header>
  );
}
