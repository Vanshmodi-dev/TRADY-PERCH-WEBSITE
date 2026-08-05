"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudyImage } from "../case-study-types";
import styles from "./cs-lightbox.module.css";

/**
 * Fullscreen gallery viewer.
 *
 * ── Why `<dialog>` ────────────────────────────────────────────────────────
 *
 * `showModal()` gives, natively and correctly, everything a hand-rolled
 * lightbox gets wrong: focus is trapped inside the dialog, the rest of the
 * page is inert to both pointer and screen reader, Escape closes it, and
 * focus returns to the trigger on close. Every one of those is a bug in the
 * average portfolio lightbox. The only things left to implement are the two
 * behaviours the platform does not provide — arrow-key navigation between
 * images, and locking background scroll.
 *
 * ── How server-rendered thumbnails stay server-rendered ───────────────────
 *
 * The obvious API for this is a render prop — `children(open)` — so the
 * gallery can wire each thumbnail to the opener. That does not work across
 * the server/client boundary: a function is not serialisable, and passing one
 * into a Client Component is a build error ("Functions cannot be passed
 * directly to Client Components"). It is worth stating plainly because the
 * render-prop version type-checks perfectly and only fails at prerender.
 *
 * So this takes two serialisable things instead: `images` (plain data) and
 * `children` (already-rendered server markup), and finds the triggers by
 * delegating a single click listener on the wrapper, reading the index off a
 * `data-lightbox-index` attribute. The thumbnails — the bulk of the markup
 * and every `next/image` element — never enter the client bundle, and the
 * cost stays fixed no matter how many images a gallery holds.
 *
 * Delegation also covers the keyboard for free: the triggers are real
 * `<button>` elements, and Enter and Space fire a genuine click event on a
 * button, so there is no separate key handler to keep in sync.
 */

interface CaseStudyLightboxProps {
  images: readonly CaseStudyImage[];
  /**
   * Server-rendered thumbnail grid. Each trigger must be a `<button>` (or
   * contain one) carrying `data-lightbox-index` with its position in `images`.
   */
  children: React.ReactNode;
}

export function CaseStudyLightbox({ images, children }: CaseStudyLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((next: number) => {
    setIndex(next);
    setIsOpen(true);
  }, []);

  /** Delegated opener. One listener for the whole grid. */
  const onGridClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest<HTMLElement>("[data-lightbox-index]");
    if (!trigger) return;

    const next = Number(trigger.dataset.lightboxIndex);
    // Guards a malformed or out-of-range attribute rather than opening the
    // viewer on `undefined` and rendering a blank panel.
    if (!Number.isInteger(next) || next < 0 || next >= images.length) return;

    open(next);
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // `showModal()` must be called imperatively — there is no declarative React
  // prop for it, and calling it during render would be a side effect.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
  }, [isOpen]);

  // Background scroll lock. The dialog is modal for focus and hit-testing,
  // but the page behind it still scrolls, which is disorienting when the
  // viewer is dismissed and the reader is somewhere else entirely.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const step = useCallback(
    (delta: number) => {
      // Wraps in both directions, so neither arrow ever dead-ends.
      setIndex((current) => (current + delta + images.length) % images.length);
    },
    [images.length],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (images.length < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    // Escape is handled by <dialog> itself and must not be intercepted.
  };

  const current = images[index];

  return (
    <>
      {/* Not interactive itself — it only carries the delegated listener for
          the real <button> triggers rendered inside it. No keyboard handler
          is needed to pair with this click: Enter and Space fire a genuine
          click event on a <button>, so the delegation already covers both. */}
      <div onClick={onGridClick}>{children}</div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={() => setIsOpen(false)}
        onKeyDown={onKeyDown}
        aria-label="Image viewer"
        // Clicking the backdrop closes. The check is what distinguishes the
        // backdrop from the content: a click inside the panel has a different
        // target and must not dismiss.
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        {isOpen && current ? (
          <div className={styles.panel}>
            <div className={styles.toolbar}>
              <p className={styles.counter} aria-live="polite">
                {/* Announced on change so a screen-reader user navigating with
                    the arrow keys knows the image moved. */}
                {index + 1} of {images.length}
                {current.caption ? ` — ${current.caption}` : ""}
              </p>
              <button type="button" className={styles.close} onClick={close} aria-label="Close image viewer">
                <svg viewBox="0 0 16 16" className={styles.closeIcon} aria-hidden="true" focusable="false">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    d="m4 4 8 8M12 4l-8 8"
                  />
                </svg>
              </button>
            </div>

            <figure className={styles.figure}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className={styles.image}
                /* The viewer is the one place the full-resolution asset is
                   warranted, so this is not lazy and not downscaled. */
                sizes="90vw"
                priority
              />
              {current.caption ? (
                <figcaption className={styles.caption}>{current.caption}</figcaption>
              ) : null}
            </figure>

            {images.length > 1 ? (
              <div className={styles.nav}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => step(1)}
                  aria-label="Next image"
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
