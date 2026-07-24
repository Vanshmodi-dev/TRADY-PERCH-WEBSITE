"use client";

import { useEffect, useRef } from "react";
import styles from "./drawer.module.css";
import type { DrawerProps } from "./drawer.types";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Ch.24 Drawers & Sheets. This component inherently requires browser state
 * (open/close, focus management, keyboard listeners) — a documented
 * exception to packages/ui's default of not baking in "use client", per
 * docs/adr/0005-shared-ui-portability.md.
 */
export function Drawer({
  open,
  onClose,
  anchor = "right",
  backdrop = "dimmed",
  header,
  children,
  footer,
  "aria-label": ariaLabel,
  id,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const isTrapped = backdrop === "dimmed";

  // Ch.42 Kb-3: focus moves into the trapped region on open, and returns
  // precisely to the triggering element on close — never the page top.
  //
  // Focus lands on the first focusable descendant, not the panel container
  // itself: the panel has tabIndex=-1, so it is never a member of
  // FOCUSABLE_SELECTOR, and the Tab-wrap logic below only engages once
  // document.activeElement is already `first` or `last` — focusing the
  // container left that condition permanently false immediately after open,
  // so a single Shift+Tab escaped the trap entirely onto page content
  // behind it. Falls back to the panel container only if it has no
  // focusable descendant at all.
  useEffect(() => {
    if (open) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (firstFocusable ?? panelRef.current)?.focus();
    } else {
      triggerElementRef.current?.focus();
    }
  }, [open]);

  // Ch.24 §9 / Master Vision Ch.21: a backdrop-present drawer makes the
  // underlying page genuinely unusable while open — lock background scroll.
  useEffect(() => {
    if (!open || !isTrapped) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, isTrapped]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      // Ch.42 Kb-4: Escape always closes the nearest dismissible context.
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // Ch.42 Kb-3: focus trap applies only when a backdrop is present.
      if (event.key === "Tab" && isTrapped && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (focusable.length === 0) return;
        // Non-null: `focusable.length > 0` is already verified above.
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, isTrapped, onClose]);

  return (
    <>
      {backdrop === "dimmed" ? (
        <div
          className={classNames(styles.backdrop, open && styles.open)}
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}
      <div
        ref={panelRef}
        id={id}
        role={isTrapped ? "dialog" : undefined}
        aria-modal={isTrapped || undefined}
        aria-label={ariaLabel}
        aria-hidden={!open}
        tabIndex={-1}
        className={classNames(styles.panel, styles[anchor], open && styles.open)}
        inert={!open ? true : undefined}
      >
        {header ? <div className={styles.header}>{header}</div> : null}
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </>
  );
}
