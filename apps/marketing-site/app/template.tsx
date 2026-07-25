import styles from "./template.module.css";

/**
 * Master Vision §10.5 (Page Transition Philosophy): no shared-element
 * anchor exists between arbitrary route pairs on this site (a homepage
 * card and its own case-study page share one, but the general case
 * doesn't), so per §10.5's own stated fallback — "a simple, quick,
 * Standard-tier fade is always preferable to a novel, attention-seeking
 * transition effect" — this is a plain opacity fade, nothing more.
 *
 * `template.tsx` (unlike `layout.tsx`) remounts on every navigation, so a
 * plain CSS `@keyframes` animation re-triggers automatically on each new
 * page — no client JS, no state, and it stays a Server Component.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.pageTransition}>{children}</div>;
}
