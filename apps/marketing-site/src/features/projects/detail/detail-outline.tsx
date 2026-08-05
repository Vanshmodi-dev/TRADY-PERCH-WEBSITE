import styles from "./detail-rail.module.css";

/**
 * An in-page contents list for the rendered README.
 *
 * Plain anchor links to the heading ids `markdown-view.tsx` generates, and the
 * ids come from the same parse the body renders — a second, independent scan
 * is how a contents list ends up pointing at an anchor that is not on the page.
 *
 * No scroll-spy. Highlighting the current section requires an
 * IntersectionObserver over every heading, which turns a static list into a
 * client island for a decoration; `scroll-margin-top` on the headings already
 * solves the only real problem (a target landing under the fixed header).
 */

interface DetailOutlineProps {
  items: ReadonlyArray<{ id: string; text: string; depth: number }>;
}

export function DetailOutline({ items }: DetailOutlineProps) {
  // One heading is not a structure worth listing — the page it describes is
  // already visible in a single screen.
  if (items.length < 2) return null;

  // The shallowest depth present, so indentation is relative to the document's
  // own hierarchy. A README whose top level is `##` should not render its
  // entire contents list indented one step.
  const baseDepth = Math.min(...items.map((item) => item.depth));

  return (
    <nav className={styles.panel} aria-labelledby="outline-heading">
      <h2 id="outline-heading" className={styles.panelTitle}>
        On this page
      </h2>

      <ul className={styles.outline}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.outlineItem}
            style={{ "--outline-depth": item.depth - baseDepth } as React.CSSProperties}
          >
            <a className={styles.outlineLink} href={`#${item.id}`}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
