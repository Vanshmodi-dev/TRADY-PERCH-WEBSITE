import type { ActivityWeek } from "../github-detail-types";
import { formatAbsoluteDate } from "../project-format";
import styles from "./detail-rail.module.css";

/**
 * Weekly commit activity for the trailing quarter.
 *
 * A bar sparkline built from `<span>`s rather than an SVG chart: thirteen bars
 * need no path arithmetic, no viewBox, and no library, and each one can carry
 * a native `title` giving the exact figure for that week.
 *
 * Bars are scaled against the busiest week rather than an absolute ceiling.
 * The strip is there to show *shape* — where the activity clustered — and a
 * fixed scale flattens every quiet quarter into an unreadable line.
 */

interface DetailActivityProps {
  weeks: readonly ActivityWeek[];
}

export function DetailActivity({ weeks }: DetailActivityProps) {
  if (weeks.length === 0) return null;

  const peak = Math.max(...weeks.map((week) => week.commits));
  const total = weeks.reduce((sum, week) => sum + week.commits, 0);

  // Every week empty: GitHub's statistics endpoint answered, and the honest
  // reading is that nothing was pushed. A row of zero-height bars communicates
  // that worse than the sentence below does, so the strip is dropped.
  if (peak === 0) return null;

  return (
    <section className={styles.panel} aria-labelledby="activity-heading">
      <h2 id="activity-heading" className={styles.panelTitle}>
        Recent activity
      </h2>

      <div className={styles.sparkline} aria-hidden="true">
        {weeks.map((week) => (
          <span
            key={week.weekStart}
            className={styles.sparkBar}
            /* A floor of 6% so a week with a single commit is still a visible
               mark rather than a gap indistinguishable from zero. */
            style={{ height: `${Math.max(6, (week.commits / peak) * 100)}%` }}
            title={`${week.commits} ${week.commits === 1 ? "commit" : "commits"} in the week of ${formatAbsoluteDate(week.weekStart)}`}
          />
        ))}
      </div>

      {/* The accessible representation. The bars above convey shape; this
          conveys the same data as a sentence, which is what a screen reader
          needs rather than thirteen individually announced values. */}
      <p className={styles.panelNote}>
        {total} {total === 1 ? "commit" : "commits"} across the last {weeks.length} weeks, peaking
        at {peak} in a single week.
      </p>
    </section>
  );
}
