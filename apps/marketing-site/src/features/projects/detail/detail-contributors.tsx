import Image from "next/image";
import type { ProjectContributor } from "../github-detail-types";
import { formatCount } from "../project-format";
import styles from "./detail-rail.module.css";

/**
 * The contributor list.
 *
 * Avatar, login and commit count per row, ordered by contribution — which is
 * the order GitHub returns and the only ordering that is not an editorial
 * claim about who mattered most.
 *
 * Bots are filtered upstream in `toContributors`: dependabot at the top of a
 * contributor list is technically accurate and communicates nothing about who
 * built the thing.
 */

/** Rows before the list collapses into a "and N more" line. */
const VISIBLE_LIMIT = 8;

interface DetailContributorsProps {
  contributors: readonly ProjectContributor[];
}

export function DetailContributors({ contributors }: DetailContributorsProps) {
  if (contributors.length === 0) return null;

  const visible = contributors.slice(0, VISIBLE_LIMIT);
  const remaining = contributors.length - visible.length;

  return (
    <section className={styles.panel} aria-labelledby="contributors-heading">
      <h2 id="contributors-heading" className={styles.panelTitle}>
        Contributors
        <span className={styles.panelCount}>{contributors.length}</span>
      </h2>

      <ul className={styles.people}>
        {visible.map((contributor) => (
          <li key={contributor.login} className={styles.person}>
            <a
              className={styles.personLink}
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.avatar}
                src={contributor.avatarUrl}
                /* Empty alt, deliberately: the login is rendered as text
                   immediately beside it, so describing the avatar would make a
                   screen reader announce the same person twice. */
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
              <span className={styles.personName}>{contributor.login}</span>
              <span className={styles.personMeta}>
                <span aria-hidden="true">{formatCount(contributor.contributions)}</span>
                <span className={styles.srOnly}>
                  {contributor.contributions}{" "}
                  {contributor.contributions === 1 ? "commit" : "commits"}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {remaining > 0 ? (
        <p className={styles.panelNote}>
          and {remaining} {remaining === 1 ? "other contributor" : "other contributors"}
        </p>
      ) : null}
    </section>
  );
}
