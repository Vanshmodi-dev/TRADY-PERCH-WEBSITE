import styles from "./cs-progress.module.css";

/**
 * Reading-progress bar for a case study.
 *
 * A Server Component rendering two empty elements — the animation is a CSS
 * scroll-driven timeline, so this ships no JavaScript at all. See the
 * stylesheet for why that approach was chosen over a scroll listener.
 *
 * `aria-hidden`, and deliberately not a `progressbar` role: the information
 * is already available to assistive technology through the scrollbar and the
 * document structure, and announcing a continuously-changing value while
 * someone reads would be noise, not help.
 */
export function CaseStudyProgress() {
  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} />
    </div>
  );
}
