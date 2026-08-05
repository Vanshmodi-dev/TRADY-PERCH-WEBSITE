import type { CaseStudyPhase } from "../case-study-types";
import { CaseStudySection } from "../components/cs-section";
import styles from "./cs-timeline.module.css";

/**
 * The development timeline.
 *
 * ── An ordered list, not a decorated div stack ────────────────────────────
 *
 * A timeline is a sequence, and `<ol>` is the element that says so. A screen
 * reader announces "list, 5 items" and numbers each phase; the visual rail,
 * nodes and connecting line are drawn from that same list with pseudo-
 * elements. No extra markup exists purely to be decorated.
 *
 * ── The animated line ─────────────────────────────────────────────────────
 *
 * The rail draws itself as the section scrolls into view, using a CSS
 * scroll-driven animation with a `view()` timeline — so the drawing is bound
 * to the element's own position in the viewport, on the compositor, with no
 * observer and no JavaScript. Where scroll-driven animations are unsupported
 * the rail simply renders fully drawn, which is the correct fallback: the
 * line is structure, and only its arrival is the enhancement.
 */

interface CaseStudyTimelineProps {
  timeline?: { lede?: string; phases: readonly CaseStudyPhase[] };
}

export function CaseStudyTimeline({ timeline }: CaseStudyTimelineProps) {
  if (!timeline || timeline.phases.length === 0) return null;

  return (
    <CaseStudySection
      id="timeline"
      eyebrow="Process"
      heading="How it was built"
      lede={timeline.lede}
    >
      <ol className={styles.timeline}>
        {timeline.phases.map((phase, index) => (
          <li
            key={phase.name}
            className={styles.phase}
            style={{ "--phase-index": index } as React.CSSProperties}
          >
            <div className={styles.marker} aria-hidden="true">
              <span className={styles.node} />
            </div>

            <div className={styles.content}>
              <p className={styles.period}>{phase.period}</p>
              <h3 className={styles.name}>{phase.name}</h3>
              <p className={styles.summary}>{phase.summary}</p>

              {phase.outputs && phase.outputs.length > 0 ? (
                <ul className={styles.outputs}>
                  {phase.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </CaseStudySection>
  );
}
