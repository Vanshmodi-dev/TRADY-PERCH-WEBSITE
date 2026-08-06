import type { ProjectRelease } from "../github-detail-types";
import { formatAbsoluteDate, formatRelativeTime } from "../project-format";
import { ArrowIcon, TagIcon } from "../project-icons";
import styles from "./detail-sections.module.css";

/**
 * Published releases, newest first.
 *
 * Drafts are excluded upstream in `toReleases` — a draft is unpublished by
 * definition, and surfacing one leaks work in progress onto a public page.
 * Prereleases *are* shown, marked as such: shipping a beta is a fact worth
 * stating, and hiding it would make the version history look discontinuous.
 */

interface DetailReleasesProps {
  releases: readonly ProjectRelease[];
  repoUrl: string;
}

export function DetailReleases({ releases, repoUrl }: DetailReleasesProps) {
  if (releases.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="releases-heading">
      <header className={styles.header}>
        <h2 id="releases-heading" className={styles.title}>
          Releases
        </h2>
        <a
          className={styles.headerLink}
          href={`${repoUrl}/releases`}
          target="_blank"
          rel="noopener noreferrer"
        >
          All releases
          <ArrowIcon className={styles.headerLinkIcon} />
        </a>
      </header>

      <ul className={styles.releases}>
        {releases.map((release, index) => (
          <li key={release.id} className={styles.release}>
            <a
              className={styles.releaseLink}
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.releaseHead}>
                <TagIcon className={styles.releaseIcon} />
                <span className={styles.releaseTitle}>{release.title}</span>

                {/* The newest non-prerelease is the one a visitor is looking
                    for; marking it saves them comparing version strings. */}
                {index === 0 && !release.prerelease ? (
                  <span className={styles.releaseBadge}>Latest</span>
                ) : null}
                {release.prerelease ? (
                  <span className={`${styles.releaseBadge} ${styles.releaseBadgePre}`}>
                    Pre-release
                  </span>
                ) : null}
              </span>

              <span className={styles.releaseMeta}>
                <code className={styles.sha}>{release.tag}</code>
                {release.publishedAt ? (
                  <time
                    dateTime={release.publishedAt}
                    title={formatAbsoluteDate(release.publishedAt)}
                  >
                    {formatRelativeTime(release.publishedAt)}
                  </time>
                ) : null}
              </span>

              {release.summary ? (
                <span className={styles.releaseSummary}>{release.summary}</span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
