import { toDisplayTitle } from "../github-service";
import styles from "./detail-rail.module.css";

/**
 * The repository's own GitHub topics.
 *
 * These are the author's labels, not this codebase's inferred categories — the
 * distinction the `topics` field's docblock draws. Each links back to GitHub's
 * topic page, which is where the label actually means something: a visitor who
 * clicks "automation" is asking to see other automation repositories, and this
 * site has no such index.
 */

interface DetailTopicsProps {
  topics: readonly string[];
}

export function DetailTopics({ topics }: DetailTopicsProps) {
  if (topics.length === 0) return null;

  return (
    <section className={styles.panel} aria-labelledby="topics-heading">
      <h2 id="topics-heading" className={styles.panelTitle}>
        Topics
      </h2>

      <ul className={styles.topics}>
        {topics.map((topic) => (
          <li key={topic}>
            <a
              className={styles.topic}
              /* Topics arrive already lowercase-hyphenated and GitHub
                 restricts them to that character set, but encoding is not
                 conditional on trusting the source. */
              href={`https://github.com/topics/${encodeURIComponent(topic)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Browse the ${topic} topic on GitHub (opens in a new tab)`}
            >
              {/* Displayed as written words to match the rest of the site's
                  typography; the raw slug is still what the href uses. */}
              {toDisplayTitle(topic)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
