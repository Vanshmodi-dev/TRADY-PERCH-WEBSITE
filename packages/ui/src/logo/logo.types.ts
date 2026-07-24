import type { LinkComponent } from "../primitives/link/link.types";

export interface LogoProps {
  /** The icon mark image (the gold "TP" monogram). */
  iconSrc: string;
  href?: string;
  linkComponent?: LinkComponent;
  className?: string;
}
