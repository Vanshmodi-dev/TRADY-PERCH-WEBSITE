import type { PortfolioStats } from "./github-detail-types";
import { ContributionGraph } from "./contribution-graph";
import { CountUp } from "./count-up";
import styles from "./portfolio-stats-bar.module.css";

/**
 * The account-level figures above the grid.
 *
 * A Server Component that renders real numbers into the HTML, wrapping each in
 * a tiny client island (`CountUp`) that animates from zero to that number once
 * it scrolls into view. The order matters: the *value* is server-rendered, so
 * a crawler, a reader with JavaScript disabled, and the first paint all show
 * the true figure. The animation is decoration layered over content that is
 * already correct — never the mechanism that produces it.
 *
 * Tiles whose data is unavailable are omitted rather than zeroed. See
 * `github-contributions.ts` for why the contribution figures can be absent on
 * a perfectly healthy deployment.
 */

interface PortfolioStatsBarProps {
  stats: PortfolioStats;
}

interface Tile {
  key: string;
  value: number;
  label: string;
  /** Expanded label for screen readers, where the visible one is terse. */
  description: string;
  suffix?: string;
}

export function PortfolioStatsBar({ stats }: PortfolioStatsBarProps) {
  const tiles: Tile[] = [
    {
      key: "repositories",
      value: stats.repositories,
      label: "Projects",
      description: "Published projects, read live from GitHub",
    },
    {
      key: "languages",
      value: stats.languages,
      label: "Languages",
      description: "Distinct primary languages across the portfolio",
    },
    {
      key: "stars",
      value: stats.stars,
      label: "Stars",
      description: "Total GitHub stars across every published project",
    },
    {
      key: "forks",
      value: stats.forks,
      label: "Forks",
      description: "Total forks across every published project",
    },
  ];

  // Only when the calendar was actually obtained. A zeroed contribution tile
  // is a false statement, not a graceful degradation.
  if (stats.contributions !== null) {
    tiles.push({
      key: "contributions",
      value: stats.contributions,
      label: "Contributions",
      description: "Contributions in the last twelve months",
    });
  }
  if (stats.currentStreak !== null && stats.currentStreak > 0) {
    tiles.push({
      key: "streak",
      value: stats.currentStreak,
      label: "Day streak",
      description: "Consecutive days with at least one contribution",
      suffix: "d",
    });
  }

  return (
    <div className={styles.wrapper}>
      {/*
        A definition list, not a row of divs. Each tile is genuinely a
        term-and-value pair, and <dl> is what conveys that pairing to a screen
        reader — a grid of anonymous divs announces six numbers and six words
        with nothing tying them together.
      */}
      <dl className={styles.grid}>
        {tiles.map((tile, index) => (
          <div
            key={tile.key}
            className={styles.tile}
            style={{ "--tile-index": index } as React.CSSProperties}
          >
            <dt className={styles.label}>
              <span aria-hidden="true">{tile.label}</span>
              <span className={styles.srOnly}>{tile.description}</span>
            </dt>
            <dd className={styles.value}>
              <CountUp value={tile.value} />
              {tile.suffix ? <span className={styles.suffix}>{tile.suffix}</span> : null}
            </dd>
          </div>
        ))}
      </dl>

      {stats.calendar.length > 0 ? <ContributionGraph days={stats.calendar} /> : null}
    </div>
  );
}
