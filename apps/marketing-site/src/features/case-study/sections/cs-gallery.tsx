import Image from "next/image";
import type { CaseStudyImage } from "../case-study-types";
import { CaseStudySection } from "../components/cs-section";
import { CaseStudyLightbox } from "../components/cs-lightbox";
import styles from "./cs-gallery.module.css";

/**
 * The screenshot gallery.
 *
 * ── Server-rendered thumbnails, client-rendered viewer ────────────────────
 *
 * The thumbnails — the bulk of the markup, and every `next/image` element —
 * are rendered on the server and passed into `CaseStudyLightbox` as children.
 * Only the overlay logic ships to the browser. An unlimited number of images
 * therefore costs a fixed, small amount of JavaScript.
 *
 * ── Device grouping ───────────────────────────────────────────────────────
 *
 * Images tagged with a `device` are grouped under a heading, because a
 * desktop screenshot and a phone screenshot at the same tile size tells a
 * visitor nothing about either. Untagged images fall into one unlabelled
 * group, so grouping is opt-in rather than mandatory.
 *
 * Every thumbnail is a real `<button>`: it performs an action (opening the
 * viewer) rather than navigating, so it must not be an anchor, and it needs
 * to be keyboard-operable and focus-visible, which a `<div onClick>` is not.
 */

const DEVICE_LABEL: Record<NonNullable<CaseStudyImage["device"]>, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

const DEVICE_ORDER: Array<NonNullable<CaseStudyImage["device"]>> = ["desktop", "tablet", "mobile"];

interface CaseStudyGalleryProps {
  gallery?: { lede?: string; images: readonly CaseStudyImage[] };
}

export function CaseStudyGallery({ gallery }: CaseStudyGalleryProps) {
  if (!gallery || gallery.images.length === 0) return null;

  const images = gallery.images;

  // Grouped for display, but the lightbox indexes into the flat list, so
  // arrow-key navigation runs through every image in visual order regardless
  // of which group it is in.
  const groups = [
    ...DEVICE_ORDER.map((device) => ({
      label: DEVICE_LABEL[device],
      items: images.filter((image) => image.device === device),
    })),
    { label: null, items: images.filter((image) => !image.device) },
  ].filter((group) => group.items.length > 0);

  return (
    <CaseStudySection
      id="gallery"
      eyebrow="Gallery"
      heading="Every surface, as shipped"
      lede={gallery.lede}
      tone="alt"
    >
      {/*
        `images` is plain data and the grid below is already-rendered server
        markup — both serialisable. The lightbox finds these triggers by
        delegating on `data-lightbox-index` rather than taking a render prop,
        because a function cannot cross the server/client boundary. See
        cs-lightbox.tsx.
      */}
      <CaseStudyLightbox images={images}>
        <div className={styles.groups}>
          {groups.map((group) => (
            <div key={group.label ?? "ungrouped"} className={styles.group}>
              {group.label ? <h3 className={styles.groupTitle}>{group.label}</h3> : null}

              <ul className={styles.grid}>
                {group.items.map((image) => {
                  const index = images.indexOf(image);
                  return (
                    <li key={image.src} className={styles.item}>
                      <button
                        type="button"
                        className={styles.tile}
                        // Read by the lightbox's delegated listener. Indexes
                        // into the flat list, so arrow-key navigation runs
                        // through every image regardless of its group.
                        data-lightbox-index={index}
                        // The alt text describes the image; this describes
                        // the action. Without it a screen reader announces
                        // only the image description and gives no hint that
                        // activating it opens a viewer.
                        aria-label={`Open ${image.caption ?? image.alt} at full size`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className={styles.image}
                          loading="lazy"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                        <span className={styles.zoom} aria-hidden="true">
                          <svg viewBox="0 0 16 16" className={styles.zoomIcon} focusable="false">
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              d="M7 3.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6ZM9.9 9.9l3 3M7 5.4v3.2M5.4 7h3.2"
                            />
                          </svg>
                        </span>
                      </button>
                      {image.caption ? <p className={styles.caption}>{image.caption}</p> : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </CaseStudyLightbox>
    </CaseStudySection>
  );
}
