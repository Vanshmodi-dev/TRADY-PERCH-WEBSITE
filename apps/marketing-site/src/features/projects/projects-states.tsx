import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import styles from "./projects-states.module.css";

/**
 * The three non-content states of the portfolio grid: loading, empty, error.
 *
 * All three are Server Components except the error state's retry control,
 * which is isolated into its own tiny client island (`projects-retry.tsx`) so
 * that a single button does not turn the whole error panel — heading, copy,
 * illustration — into client-rendered markup.
 */

/* ------------------------------------------------------------------ */
/* Loading                                                             */
/* ------------------------------------------------------------------ */

/**
 * Skeleton cards, sized to match a real `ProjectCard` so the layout does not
 * shift when content replaces them (a direct CLS win, not just a nicety).
 *
 * `aria-hidden` with a sibling live region: a screen reader should hear
 * "Loading projects" once, not nine cards' worth of meaningless placeholder
 * geometry.
 */
export function ProjectsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      <p role="status" aria-live="polite" className={styles.srOnly}>
        Loading projects from GitHub.
      </p>
      <ul className={styles.grid} aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <li
            key={index}
            // The first placeholder spans two columns, mirroring the featured
            // card the real grid leads with — a uniform skeleton followed by
            // an asymmetric grid is itself a layout shift.
            className={`${styles.skeletonItem} ${index === 0 ? styles.skeletonItemFeatured : ""}`}
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <div className={styles.skeletonCard}>
              <div className={`${styles.shimmer} ${styles.skeletonMedia}`} />
              <div className={styles.skeletonContent}>
                <div className={`${styles.shimmer} ${styles.skeletonEyebrow}`} />
                <div className={`${styles.shimmer} ${styles.skeletonTitle}`} />
                <div className={`${styles.shimmer} ${styles.skeletonLine}`} />
                <div className={`${styles.shimmer} ${styles.skeletonLineShort}`} />
                <div className={styles.skeletonTags}>
                  <div className={`${styles.shimmer} ${styles.skeletonTag}`} />
                  <div className={`${styles.shimmer} ${styles.skeletonTag}`} />
                  <div className={`${styles.shimmer} ${styles.skeletonTag}`} />
                </div>
              </div>
              <div className={styles.skeletonFooter}>
                <div className={`${styles.shimmer} ${styles.skeletonFacts}`} />
                <div className={`${styles.shimmer} ${styles.skeletonActions}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Empty                                                               */
/* ------------------------------------------------------------------ */

/**
 * A drawn illustration rather than a stock graphic or an emoji: inline SVG
 * costs no request, scales without artefacts, inherits `currentColor` so it
 * cannot drift from the palette, and stays crisp on the retina displays
 * Ch.49 cares about. `aria-hidden` because the heading beside it already
 * says everything it says.
 */
function EmptyIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 220 140"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="projects-empty-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Three cards in perspective — the grid this state stands in for. */}
      <rect x="16" y="42" width="56" height="72" rx="8" fill="url(#projects-empty-fade)" />
      <rect
        x="16" y="42" width="56" height="72" rx="8"
        stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5"
      />
      <rect x="148" y="42" width="56" height="72" rx="8" fill="url(#projects-empty-fade)" />
      <rect
        x="148" y="42" width="56" height="72" rx="8"
        stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5"
      />

      {/* The centre card sits forward and is the only one with content —
          the one being prepared. */}
      <rect x="80" y="26" width="60" height="88" rx="9" fill="url(#projects-empty-fade)" />
      <rect
        x="80" y="26" width="60" height="88" rx="9"
        stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.75"
      />
      <rect x="92" y="42" width="36" height="22" rx="4" fill="currentColor" fillOpacity="0.14" />
      <rect x="92" y="72" width="36" height="4" rx="2" fill="currentColor" fillOpacity="0.3" />
      <rect x="92" y="82" width="24" height="4" rx="2" fill="currentColor" fillOpacity="0.18" />
      <rect x="92" y="94" width="30" height="8" rx="4" fill="currentColor" fillOpacity="0.12" />

      <circle cx="110" cy="16" r="3.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

export function ProjectsEmpty() {
  return (
    <div className={styles.panel}>
      <EmptyIllustration />
      <h3 className={styles.panelTitle}>Projects are currently being prepared.</h3>
      <p className={styles.panelBody}>
        Our engineering work is being readied for publication. In the meantime, the case studies
        cover the systems we have delivered and the results they produced.
      </p>
      <div className={styles.panelActions}>
        <Button href="/work/case-studies" linkComponent={NextLinkAdapter} emphasis="secondary">
          Read the case studies
        </Button>
        <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="ghost">
          Book a strategy call
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Error                                                               */
/* ------------------------------------------------------------------ */

function ErrorIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 220 140"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="projects-error-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* A broken connection: two nodes, a severed link between them. */}
      <circle cx="52" cy="70" r="26" fill="url(#projects-error-fade)" />
      <circle cx="52" cy="70" r="26" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="168" cy="70" r="26" fill="url(#projects-error-fade)" />
      <circle cx="168" cy="70" r="26" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />

      <path
        d="M78 70h18"
        stroke="currentColor" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round"
      />
      <path
        d="M124 70h18"
        stroke="currentColor" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* The gap, marked rather than merely empty. */}
      <path
        d="m104 62 12 16M116 62l-12 16"
        stroke="currentColor" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round"
      />

      <rect x="40" y="62" width="24" height="4" rx="2" fill="currentColor" fillOpacity="0.28" />
      <rect x="40" y="74" width="16" height="4" rx="2" fill="currentColor" fillOpacity="0.16" />
      <rect x="156" y="62" width="24" height="4" rx="2" fill="currentColor" fillOpacity="0.28" />
      <rect x="156" y="74" width="16" height="4" rx="2" fill="currentColor" fillOpacity="0.16" />
    </svg>
  );
}

interface ProjectsErrorProps {
  /**
   * Visitor-facing explanation, chosen by the caller from the typed failure
   * reason. Kept non-technical: "GitHub returned 403" is a server-log fact,
   * not something a prospective client should have to read.
   */
  message: string;
  /** The retry control, injected so this panel stays a Server Component. */
  action: React.ReactNode;
}

export function ProjectsError({ message, action }: ProjectsErrorProps) {
  return (
    // role="alert" is deliberately NOT used: this panel is present in the
    // initial server-rendered HTML rather than appearing in response to
    // something the visitor did, and an alert on page load interrupts a
    // screen reader mid-sentence. The heading in the document flow is the
    // correct, non-interrupting announcement.
    <div className={`${styles.panel} ${styles.panelError}`}>
      <ErrorIllustration />
      <h3 className={styles.panelTitle}>We couldn&rsquo;t load the projects.</h3>
      <p className={styles.panelBody}>{message}</p>
      <div className={styles.panelActions}>
        {action}
        <Button href="/work/case-studies" linkComponent={NextLinkAdapter} emphasis="ghost">
          Read the case studies instead
        </Button>
      </div>
    </div>
  );
}
