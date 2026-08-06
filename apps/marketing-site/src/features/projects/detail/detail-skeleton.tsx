import styles from "./detail-skeleton.module.css";

/**
 * The case study page's loading state.
 *
 * Shaped to the real page — hero block, ten-tile statistics grid, two-column
 * body — rather than a generic spinner, so the layout does not jump when
 * content replaces it. That is a Cumulative Layout Shift win, not decoration:
 * a spinner collapses to nothing and pushes the whole document down at swap.
 *
 * `aria-hidden` with a single live region beside it. A screen reader should
 * hear "Loading" once, not narrate thirty placeholder rectangles.
 */
export function ProjectDetailSkeleton() {
  return (
    <div className={styles.page}>
      <p role="status" aria-live="polite" className={styles.srOnly}>
        Loading project details from GitHub.
      </p>

      <div className={styles.container} aria-hidden="true">
        <div className={styles.hero}>
          <div className={`${styles.shimmer} ${styles.crumbs}`} />
          <div className={`${styles.shimmer} ${styles.eyebrow}`} />
          <div className={`${styles.shimmer} ${styles.title}`} />
          <div className={`${styles.shimmer} ${styles.repo}`} />
          <div className={`${styles.shimmer} ${styles.lede}`} />
          <div className={`${styles.shimmer} ${styles.ledeShort}`} />
          <div className={styles.actions}>
            <div className={`${styles.shimmer} ${styles.button}`} />
            <div className={`${styles.shimmer} ${styles.button}`} />
          </div>
        </div>

        <div className={styles.stats}>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className={styles.statTile}>
              <div className={`${styles.shimmer} ${styles.statLabel}`} />
              <div className={`${styles.shimmer} ${styles.statValue}`} />
            </div>
          ))}
        </div>

        <div className={styles.body}>
          <div className={styles.main}>
            <div className={`${styles.shimmer} ${styles.sectionTitle}`} />
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={`${styles.shimmer} ${styles.line}`}
                /* A ragged right edge reads as prose; nine identical bars read
                   as a table, which is not what is loading. */
                style={{ width: `${[100, 94, 97, 62, 100, 88, 100, 91, 54][index]}%` }}
              />
            ))}
          </div>

          <div className={styles.rail}>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className={styles.panel}>
                <div className={`${styles.shimmer} ${styles.panelTitle}`} />
                <div className={`${styles.shimmer} ${styles.panelBody}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
