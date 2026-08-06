import type { ContributionDay } from "./github-detail-types";
import styles from "./contribution-graph.module.css";

/**
 * The trailing year's contribution calendar.
 *
 * A Server Component drawing a CSS grid of `<span>`s — no canvas, no SVG, no
 * client JavaScript. 365 empty spans is a smaller payload than the equivalent
 * SVG path data, they inherit the token palette directly, and each one can
 * carry its own `title` so a pointer gets the real figure for that day.
 *
 * ── Layout ────────────────────────────────────────────────────────────────
 *
 * Columns are weeks, rows are weekdays — GitHub's own arrangement, because
 * this is a graph people already know how to read and inventing a different
 * axis order would cost recognition for nothing. `grid-auto-flow: column`
 * with seven explicit rows is what produces that from a flat, chronologically
 * ordered list.
 *
 * ── Accessibility ─────────────────────────────────────────────────────────
 *
 * The squares are decorative in the strict sense: they encode information that
 * is stated in full by the summary sentence beside them, and 365 individually
 * announced cells would be hostile. So the grid is `aria-hidden` and the
 * summary is the accessible content.
 */

interface ContributionGraphProps {
  days: readonly ContributionDay[];
}

/**
 * Pads the series so the first column starts on a Sunday.
 *
 * GitHub's calendar already begins on a Sunday, but only when the range is the
 * default trailing year — a defensive pad costs one array operation and stops
 * a shifted range rendering as a diagonal smear.
 */
function leadingBlanks(days: readonly ContributionDay[]): number {
  const first = days[0];
  if (!first) return 0;
  const parsed = Date.parse(first.date);
  if (!Number.isFinite(parsed)) return 0;
  return new Date(parsed).getUTCDay();
}

function formatDay(isoDate: string): string {
  const timestamp = Date.parse(isoDate);
  if (!Number.isFinite(timestamp)) return isoDate;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(timestamp);
}

export function ContributionGraph({ days }: ContributionGraphProps) {
  if (days.length === 0) return null;

  const total = days.reduce((sum, day) => sum + day.count, 0);
  const activeDays = days.filter((day) => day.count > 0).length;
  const blanks = leadingBlanks(days);
  const first = days[0];
  const last = days[days.length - 1];

  return (
    <figure className={styles.graph}>
      <div className={styles.scroll}>
        {/*
          Fixed cell size with horizontal scroll rather than a fluid grid: a
          year of 53 columns squeezed into a phone's width gives sub-pixel
          cells that render as a grey smudge. At a fixed 11px the graph stays
          legible and the container scrolls — which is also why the scroll
          container is focusable and labelled.
        */}
        <div className={styles.cells} aria-hidden="true">
          {Array.from({ length: blanks }, (_, index) => (
            <span key={`blank-${index}`} className={styles.blank} />
          ))}
          {days.map((day) => (
            <span
              key={day.date}
              className={styles.cell}
              data-level={day.level}
              /* The native tooltip is deliberate: a custom one would need
                 client JavaScript and a positioning strategy for 365 targets,
                 to deliver exactly this string. */
              title={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatDay(day.date)}`}
            />
          ))}
        </div>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.summary}>
          <strong className={styles.summaryValue}>{total.toLocaleString("en-GB")}</strong>{" "}
          contributions on {activeDays.toLocaleString("en-GB")} days
          {first && last ? (
            <>
              {" "}
              between{" "}
              <time dateTime={first.date}>{formatDay(first.date)}</time> and{" "}
              <time dateTime={last.date}>{formatDay(last.date)}</time>
            </>
          ) : null}
        </span>

        <span className={styles.legend} aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={styles.cell} data-level={level} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
