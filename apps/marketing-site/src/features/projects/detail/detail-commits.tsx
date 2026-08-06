import type { ProjectCommit } from "../github-detail-types";
import { formatAbsoluteDate, formatRelativeTime } from "../project-format";
import { ArrowIcon } from "../project-icons";
import styles from "./detail-sections.module.css";

/**
 * Recent commit history.
 *
 * A timeline rather than a table: the connecting rule down the left is what
 * makes ten rows read as one continuous history instead of ten unrelated
 * facts, and it costs one pseudo-element.
 *
 * Only the subject line is shown. A commit body — a conventional-commit
 * footer, a co-author trailer, a squashed PR's bullet list — is several lines
 * long and belongs on GitHub, which every row links to.
 */

interface DetailCommitsProps {
  commits: readonly ProjectCommit[];
  repoUrl: string;
}

export function DetailCommits({ commits, repoUrl }: DetailCommitsProps) {
  if (commits.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="commits-heading">
      <header className={styles.header}>
        <h2 id="commits-heading" className={styles.title}>
          Commit history
        </h2>
        <a
          className={styles.headerLink}
          href={`${repoUrl}/commits`}
          target="_blank"
          rel="noopener noreferrer"
        >
          All commits
          <ArrowIcon className={styles.headerLinkIcon} />
        </a>
      </header>

      <ol className={styles.timeline}>
        {commits.map((commit) => (
          <li key={commit.shortSha} className={styles.commit}>
            <span className={styles.commitDot} aria-hidden="true" />

            <a
              className={styles.commitSubject}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {commit.subject}
            </a>

            <p className={styles.commitMeta}>
              <code className={styles.sha}>{commit.shortSha}</code>
              <span className={styles.commitAuthor}>{commit.authorName}</span>
              {commit.authoredAt ? (
                <time
                  dateTime={commit.authoredAt}
                  title={formatAbsoluteDate(commit.authoredAt)}
                  className={styles.commitDate}
                >
                  {formatRelativeTime(commit.authoredAt)}
                </time>
              ) : null}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
