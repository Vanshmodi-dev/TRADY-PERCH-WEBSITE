import type { LanguageSlice } from "../github-detail-types";
import { formatShare } from "../project-format";
import styles from "./detail-rail.module.css";

/**
 * The language breakdown.
 *
 * A single stacked bar plus a legend, rather than a pie or a donut. The
 * quantity being shown is parts of one whole, in a narrow rail — a bar reads
 * that correctly at any width, and comparing two adjacent slices of a bar is
 * a length judgement rather than an angle judgement, which people are far
 * better at.
 *
 * ── Accessibility ─────────────────────────────────────────────────────────
 *
 * The bar is `aria-hidden` and the legend beneath it carries every figure as
 * text. A screen reader therefore hears "TypeScript, 64%" rather than being
 * offered a graphic it cannot interrogate — and the legend is not a fallback,
 * it is the primary representation, with the bar as the visual summary.
 */

interface DetailLanguagesProps {
  languages: readonly LanguageSlice[];
}

export function DetailLanguages({ languages }: DetailLanguagesProps) {
  if (languages.length === 0) return null;

  return (
    <section className={styles.panel} aria-labelledby="languages-heading">
      <h2 id="languages-heading" className={styles.panelTitle}>
        Languages
      </h2>

      <div className={styles.bar} aria-hidden="true">
        {languages.map((slice) => (
          <span
            key={slice.name}
            className={styles.barSlice}
            style={{
              // Percentage as flex-basis rather than width: the slices then
              // always total exactly 100% of the track even when rounding
              // leaves the individual figures a tenth short.
              flexGrow: slice.percentage,
              backgroundColor: slice.color,
            }}
          />
        ))}
      </div>

      <ul className={styles.legend}>
        {languages.map((slice) => (
          <li key={slice.name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: slice.color }}
              aria-hidden="true"
            />
            <span className={styles.legendName}>{slice.name}</span>
            <span className={styles.legendValue}>{formatShare(slice.percentage)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
