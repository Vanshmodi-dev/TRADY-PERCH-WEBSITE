import type { CaseStudyFact } from "../case-study-types";
import { CaseStudySection } from "../components/cs-section";
import { CaseStudyCounter } from "../components/cs-counter";
import styles from "./cs-results.module.css";

/**
 * Results and metrics.
 *
 * ── The honesty constraint this section is built around ───────────────────
 *
 * This is the easiest section on the page to fake and the most damaging one
 * to fake, because the hero links to the source. A visitor can check.
 *
 * So the schema treats a metric as a `CaseStudyFact` with no notion of
 * "improvement" or "before/after" — there is no field here in which to assert
 * an uplift that nothing evidences. Where a project has no client engagement
 * behind it, the metrics are verifiable technical facts (route counts, audit
 * outcomes, test totals); where one does, they are numbers the client agreed
 * to publish. Both flow through the same component.
 *
 * `countTo` is opt-in per metric, so "0 accessibility violations" animates and
 * a version string does not.
 */

interface CaseStudyResultsProps {
  results?: { lede?: string; metrics: readonly CaseStudyFact[]; body?: readonly string[] };
}

export function CaseStudyResults({ results }: CaseStudyResultsProps) {
  if (!results || (results.metrics.length === 0 && !results.body?.length)) return null;

  return (
    <CaseStudySection
      id="results"
      eyebrow="Outcome"
      heading="What it delivered"
      lede={results.lede}
      tone="alt"
    >
      {results.metrics.length > 0 ? (
        <dl className={styles.metrics}>
          {results.metrics.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <dd className={styles.value}>
                {typeof metric.countTo === "number" ? (
                  <CaseStudyCounter value={metric.countTo} suffix={metric.suffix ?? ""} />
                ) : (
                  metric.value
                )}
              </dd>
              {/* dt after dd in source order is intentional and valid: the
                  label reads as a caption *under* the numeral visually, and
                  a <dl> imposes no ordering requirement between the two. */}
              <dt className={styles.label}>{metric.label}</dt>
              {metric.note ? <dd className={styles.note}>{metric.note}</dd> : null}
            </div>
          ))}
        </dl>
      ) : null}

      {results.body && results.body.length > 0 ? (
        <div className={styles.prose}>
          {results.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </CaseStudySection>
  );
}
