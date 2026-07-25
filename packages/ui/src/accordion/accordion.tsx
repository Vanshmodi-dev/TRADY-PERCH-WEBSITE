"use client";

import { useId, useState } from "react";
import styles from "./accordion.module.css";
import type { AccordionProps } from "./accordion.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

function ChevronIcon() {
  // Ch.11: 24x24 base grid, 1.5px stroke at that base, scaled via CSS
  // width/height (.chevron, 20px) so the rendered stroke scales
  // proportionally (1.5px * 20/24 = 1.25px, exactly Ch.11's spec at this
  // size) — see packages/ui/src/header/header.tsx's identical fix
  // (Milestone 3 review: both chevrons previously used a mismatched
  // 16x16 viewBox that baked in a too-thick fixed stroke).
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.chevron}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Ch.37 Accordions & Expandable Content. This component inherently
 * requires browser state (which item is open) — a documented exception to
 * packages/ui's default of not baking in "use client", per ADR-0005.
 */
export function Accordion({
  items,
  defaultOpenId,
  "aria-label": ariaLabel,
  headingLevel = "h3",
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const baseId = useId();
  const HeadingTag = headingLevel;

  return (
    <div className={styles.accordion} aria-label={ariaLabel}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className={classNames(styles.item, isOpen && styles.open)}>
            <HeadingTag>
              <button
                type="button"
                id={headerId}
                className={styles.header}
                aria-expanded={isOpen}
                aria-controls={panelId}
                // Ch.37 Ac-1: opening a new item closes the previously open
                // one; clicking the already-open item's header closes it.
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.question}
                <ChevronIcon />
              </button>
            </HeadingTag>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={styles.panel}
              hidden={!isOpen}
            >
              {isOpen ? <div className={styles.panelContent}>{item.answer}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
