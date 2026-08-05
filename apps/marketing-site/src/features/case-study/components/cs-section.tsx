import type { ReactNode } from "react";
import { Reveal } from "@trady-perch/ui";
import styles from "./cs-section.module.css";

/**
 * The shared shell every case-study chapter is built from.
 *
 * One component owning eyebrow, heading, lede, spacing and reveal is what
 * makes fourteen sections read as one document rather than fourteen designs.
 * It is also what makes a four-section case study look deliberate rather than
 * unfinished — the rhythm is identical, there is simply less of it.
 *
 * Wrapped in `Reveal` (packages/ui) so each chapter settles in as it is
 * scrolled to. Reveal wraps whole sections rather than individual items,
 * which satisfies Ch.40 Ag-2's "no more than three elements animate
 * simultaneously" by construction: ordinary scrolling brings sections into
 * view one at a time.
 */

interface CaseStudySectionProps {
  /** Anchors the section heading for `aria-labelledby` and in-page links. */
  id: string;
  /** Small caps label above the heading. */
  eyebrow: string;
  heading: string;
  /** One or two sentences under the heading, held to a narrow measure. */
  lede?: string;
  children: ReactNode;
  /** Paints the alternate background, to break up a long scroll. */
  tone?: "default" | "alt";
  /** Centres the header block. Used by the closing CTA. */
  align?: "start" | "center";
  /** Widens the content column past the default for galleries and grids. */
  width?: "prose" | "wide";
}

export function CaseStudySection({
  id,
  eyebrow,
  heading,
  lede,
  children,
  tone = "default",
  align = "start",
  width = "wide",
}: CaseStudySectionProps) {
  return (
    <Reveal>
      <section
        className={tone === "alt" ? styles.sectionAlt : styles.section}
        aria-labelledby={`${id}-heading`}
      >
        <div
          className={[
            styles.container,
            width === "prose" ? styles.containerProse : "",
            align === "center" ? styles.containerCenter : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <header className={styles.header}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden="true" />
              {eyebrow}
            </p>
            {/* h2 throughout: the page's single h1 is the hero title, and
                every chapter is a peer of every other. Nesting them would
                imply a hierarchy the narrative does not have. */}
            <h2 id={`${id}-heading`} className={styles.heading}>
              {heading}
            </h2>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
          </header>

          <div className={styles.body}>{children}</div>
        </div>
      </section>
    </Reveal>
  );
}
