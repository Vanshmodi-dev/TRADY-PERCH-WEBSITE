"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import styles from "./drawer.module.css";
import type { DrawerProps } from "./drawer.types";

/**
 * "Has this hydrated on the client yet?", as an external store rather than a
 * `useState` + `useEffect` pair.
 *
 * The state version calls `setState` synchronously inside an effect, which
 * React's own lint rule rejects for triggering a cascading render — and it is
 * genuinely the wrong shape here, because whether `document` exists is not
 * React state, it is a fact about the environment. `useSyncExternalStore`
 * says exactly that: the snapshot differs between server and client, and
 * nothing ever changes afterwards, so `subscribe` is a no-op.
 */
const NEVER_CHANGES = () => () => {};
const onClient = () => true;
const onServer = () => false;

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

  /*
   * ── Why this renders into <body> instead of where it is written ──────────
   *
   * A `position: fixed` element is only positioned against the viewport while
   * NO ancestor establishes a containing block for it. Any ancestor carrying
   * `transform`, `filter`, `backdrop-filter`, `perspective`, `contain`, or a
   * `will-change` naming one of those silently becomes that containing block,
   * and every fixed offset and percentage size inside resolves against the
   * ancestor's box instead.
   *
   * That is not hypothetical here — it shipped. This drawer is written inside
   * the site header, and the header is glass: it carries `backdrop-filter`.
   * So `height: 100%` on the panel resolved against the header's 79px rather
   * than the viewport's 844px. On a phone the menu opened as a 78px-tall
   * sliver with 648px of navigation crushed into 48px of scrollable space —
   * one item visible, the rest unreachable.
   *
   * Fixing the header's CSS would have fixed the symptom and left the trap
   * armed for the next person who adds a filter, a transform, or a scroll
   * animation to any wrapper between here and <body>. A portal removes the
   * possibility instead of the instance: rendered as a direct child of
   * <body>, this panel has no ancestor that could ever capture it.
   *
   * `hydrated` gates the portal because `document` does not exist during a
   * server render. The first client render therefore matches the server's
   * (nothing), and the drawer attaches immediately afterwards — invisible to
   * a visitor, since a drawer is closed on arrival by definition.
   */
  const hydrated = useSyncExternalStore(NEVER_CHANGES, onClient, onServer);

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

  if (!hydrated) return null;

  return createPortal(
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
    </>,
    document.body,
  );
}
