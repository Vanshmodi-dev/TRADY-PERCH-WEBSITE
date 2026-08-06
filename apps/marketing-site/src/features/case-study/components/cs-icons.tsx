import styles from "./cs-icons.module.css";

/**
 * Feature icons.
 *
 * ── Why a registry rather than a component per icon ───────────────────────
 *
 * Features are content, and content lives in a data file. A data file cannot
 * hold a React component, so it holds a string key and this module resolves
 * it. That keeps `case-study-data.ts` free of JSX and lets a new case study be
 * authored without touching any component.
 *
 * An unknown key falls back to a neutral mark rather than rendering nothing.
 * A missing icon should leave the feature card looking intentional, not
 * subtly broken with a hole where the others have a glyph.
 *
 * All icons are 24x24, 1.5px stroke, `currentColor`, and drawn on the same
 * grid — a set that shares a construction reads as a family, which is most of
 * what makes an icon set look bought rather than assembled.
 */

const PATHS: Record<string, React.ReactNode> = {
  /** Search, discovery, scraping. */
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  /** AI, generation, intelligence. */
  spark: (
    <>
      <path d="M12 3.5 13.9 9.4a1 1 0 0 0 .7.7l5.9 1.9-5.9 1.9a1 1 0 0 0-.7.7L12 20.5l-1.9-5.9a1 1 0 0 0-.7-.7L3.5 12l5.9-1.9a1 1 0 0 0 .7-.7Z" />
    </>
  ),
  /** Automation, pipelines, workflows. */
  flow: (
    <>
      <rect x="3" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="15" y="14.5" width="6" height="6" rx="1.5" />
      <path d="M9 6.5h5a4 4 0 0 1 4 4v4" />
    </>
  ),
  /** Security, authentication, access control. */
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.4 3.1 8.3 7.5 9.4 4.4-1.1 7.5-5 7.5-9.4V6Z" />
      <path d="m9.2 12 2 2 3.6-4" />
    </>
  ),
  /** Performance, speed. */
  bolt: (
    <>
      <path d="M13.5 3 5.5 13.5h5L10 21l8.5-10.5h-5.2Z" />
    </>
  ),
  /** Accessibility, inclusive design. */
  access: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
      <path d="M7.5 10.4h9M12 10.8v4M12 14.8l-2.2 3.7M12 14.8l2.2 3.7" />
    </>
  ),
  /** Data, database, storage. */
  data: (
    <>
      <ellipse cx="12" cy="6.2" rx="7.5" ry="3" />
      <path d="M4.5 6.2v11.6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6.2" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  /** Integrations, APIs, connections. */
  link: (
    <>
      <path d="M10 14a4 4 0 0 1 0-5.7l2.5-2.5a4 4 0 0 1 5.7 5.7L17 12.7" />
      <path d="M14 10a4 4 0 0 1 0 5.7l-2.5 2.5a4 4 0 0 1-5.7-5.7L7 11.3" />
    </>
  ),
  /** Layout, design system, components. */
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
      <path d="m3.5 17 8.5 4.5 8.5-4.5" />
    </>
  ),
  /** Email, messaging, delivery. */
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 7.2 5.4a1.7 1.7 0 0 0 2 0L20.2 7" />
    </>
  ),
  /** Deployment, infrastructure, cloud. */
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17.3 9a3.8 3.8 0 0 1 .2 7.5" />
      <path d="M12 12v7.5M9.5 17 12 19.5 14.5 17" />
    </>
  ),
  /** Testing, verification, quality. */
  check: (
    <>
      <path d="M20.5 11.3V12a8.5 8.5 0 1 1-5-7.8" />
      <path d="m8.5 11.5 3 3 9-9" />
    </>
  ),
};

const FALLBACK: React.ReactNode = (
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8.5v7M8.5 12h7" />
  </>
);

interface FeatureIconProps {
  name: string;
  className?: string;
}

export function FeatureIcon({ name, className }: FeatureIconProps) {
  return (
    <span className={`${styles.wrapper} ${className ?? ""}`}>
      <svg
        viewBox="0 0 24 24"
        className={styles.svg}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Decorative: every icon sits directly above its own heading, so
        // naming it would make a screen reader announce the feature twice.
        aria-hidden="true"
        focusable="false"
      >
        {PATHS[name] ?? FALLBACK}
      </svg>
    </span>
  );
}

/** Exported for the test that asserts every icon key used in the data file
 *  actually resolves — a typo would otherwise degrade silently to the
 *  fallback glyph and nobody would notice until a client did. */
export const FEATURE_ICON_NAMES = Object.keys(PATHS);
