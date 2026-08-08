import { Link } from "../primitives/link";
import styles from "./logo.module.css";
import type { LogoProps } from "./logo.types";

export function Logo({
  iconSrc,
  iconWidth,
  iconHeight,
  href = "/",
  linkComponent,
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      linkComponent={linkComponent}
      className={[styles.logo, className].filter(Boolean).join(" ")}
      aria-label="Trady Perch — home"
    >
      {/* Plain <img>, not next/image — packages/ui is framework-agnostic (ADR-0005).
          `iconWidth`/`iconHeight` are the asset's INTRINSIC size, not its
          display size: the stylesheet sizes the box (24px tall, width from the
          ratio), and these two attributes are what let the browser reserve the
          right width before a single byte of the image has arrived. Without
          them the mark occupies zero width until it decodes and the wordmark
          beside it jumps sideways on first paint — a layout shift inside a
          position:fixed header, which counts against CLS like any other. */}
      <img
        className={styles.icon}
        src={iconSrc}
        alt=""
        width={iconWidth}
        height={iconHeight}
        decoding="async"
      />
      <span className={styles.wordmark}>Trady Perch</span>
    </Link>
  );
}
