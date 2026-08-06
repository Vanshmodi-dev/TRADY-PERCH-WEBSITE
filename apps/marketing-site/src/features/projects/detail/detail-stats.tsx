import type { ReactNode } from "react";
import type { RepositoryStats } from "../github-detail-types";
import { formatAbsoluteDate, formatCount, formatMonthYear, formatRelativeTime } from "../project-format";
import {
  CalendarIcon,
  CommitIcon,
  ContributorsIcon,
  EyeIcon,
  ForkIcon,
  IssueIcon,
  PullRequestIcon,
  ScaleIcon,
  StarIcon,
} from "../project-icons";
import styles from "./detail-stats.module.css";

/**
 * The repository statistics grid.
 *
 * Every tile is a fact GitHub reports. Tiles whose value is genuinely unknown
 * — a commit total GitHub's pagination headers did not disclose, an
 * unlicensed repository — are omitted, while tiles whose value is legitimately
 * zero are kept. That distinction is the whole design of this component: "0
 * open issues" is information, and "— commits" is noise.
 */

interface DetailStatsProps {
  stats: RepositoryStats;
}

interface Tile {
  key: string;
  icon: ReactNode;
  label: string;
  value: string;
  /** Optional `<time>` machine value, when the tile shows a date. */
  dateTime?: string;
  title?: string;
}

export function DetailStats({ stats }: DetailStatsProps) {
  const tiles: Tile[] = [
    {
      key: "stars",
      icon: <StarIcon className={styles.icon} />,
      label: "Stars",
      value: formatCount(stats.stars),
    },
    {
      key: "forks",
      icon: <ForkIcon className={styles.icon} />,
      label: "Forks",
      value: formatCount(stats.forks),
    },
    {
      key: "watchers",
      icon: <EyeIcon className={styles.icon} />,
      label: "Watchers",
      value: formatCount(stats.watchers),
    },
    {
      key: "issues",
      icon: <IssueIcon className={styles.icon} />,
      label: "Open issues",
      value: formatCount(stats.openIssues),
    },
    {
      key: "pulls",
      icon: <PullRequestIcon className={styles.icon} />,
      label: "Open PRs",
      value: formatCount(stats.openPullRequests),
    },
    {
      key: "contributors",
      icon: <ContributorsIcon className={styles.icon} />,
      label: "Contributors",
      value: formatCount(stats.contributors),
    },
  ];

  // Omitted rather than zeroed when GitHub did not disclose a total — see the
  // `commits` field's docblock in github-detail-types.ts.
  if (stats.commits !== null) {
    tiles.push({
      key: "commits",
      icon: <CommitIcon className={styles.icon} />,
      label: "Commits",
      value: formatCount(stats.commits),
    });
  }

  if (stats.license) {
    tiles.push({
      key: "license",
      icon: <ScaleIcon className={styles.icon} />,
      label: "Licence",
      value: stats.license,
    });
  }

  tiles.push(
    {
      key: "created",
      icon: <CalendarIcon className={styles.icon} />,
      label: "Created",
      value: formatMonthYear(stats.createdAt),
      dateTime: stats.createdAt,
      title: formatAbsoluteDate(stats.createdAt),
    },
    {
      key: "pushed",
      icon: <CommitIcon className={styles.icon} />,
      label: "Last commit",
      value: formatRelativeTime(stats.pushedAt),
      dateTime: stats.pushedAt,
      title: formatAbsoluteDate(stats.pushedAt),
    },
  );

  return (
    <section className={styles.section} aria-labelledby="repository-stats-heading">
      <h2 id="repository-stats-heading" className={styles.srOnly}>
        Repository statistics
      </h2>

      {/* A definition list: each tile is a label-and-value pair, and <dl> is
          what carries that pairing to assistive technology. */}
      <dl className={styles.grid}>
        {tiles.map((tile, index) => (
          <div
            key={tile.key}
            className={styles.tile}
            style={{ "--tile-index": index } as React.CSSProperties}
          >
            <dt className={styles.label}>
              <span className={styles.iconWrap} aria-hidden="true">
                {tile.icon}
              </span>
              {tile.label}
            </dt>
            <dd className={styles.value}>
              {tile.dateTime ? (
                <time dateTime={tile.dateTime} title={tile.title}>
                  {tile.value}
                </time>
              ) : (
                tile.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
