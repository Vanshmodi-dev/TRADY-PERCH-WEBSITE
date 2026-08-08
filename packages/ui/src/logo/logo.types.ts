import type { LinkComponent } from "../primitives/link/link.types";

export interface LogoProps {
  /** The icon mark image (the gold "TP" monogram). */
  iconSrc: string;
  /**
   * The mark's INTRINSIC pixel dimensions — the size of the file itself, not
   * the size it is displayed at (the stylesheet owns that).
   *
   * Supplying them is what lets the browser reserve the correct width before
   * the image decodes, so the wordmark beside the mark does not shift on first
   * paint. Optional so a consumer that genuinely does not know its asset's
   * size still renders; omitting them costs a small layout shift, not a break.
   */
  iconWidth?: number;
  iconHeight?: number;
  href?: string;
  linkComponent?: LinkComponent;
  className?: string;
}
