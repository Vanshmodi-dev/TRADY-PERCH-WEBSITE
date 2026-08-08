import type { LinkComponent } from "../primitives/link/link.types";

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  /** Present for a flat item (Work, Pricing, Contact) — absent when `dropdown` is used instead. */
  href?: string;
  /** Ch.20 Nv-2 — no more than four sub-items, enforced with a dev-time warning, not a hard runtime failure. */
  dropdown?: NavDropdownItem[];
  /** Ch.20 Nv-2's permitted escape hatch — does not count against the four-item ceiling. */
  viewAllHref?: string;
  viewAllLabel?: string;
}

export interface HeaderProps {
  /** Ch.20 Nv-1 — five items, hard ceiling, enforced with a dev-time warning. */
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  logoIconSrc: string;
  /**
   * The logo mark's intrinsic pixel size, forwarded to Logo. See LogoProps —
   * these reserve the mark's width before it decodes; they are not its
   * display size.
   */
  logoIconWidth?: number;
  logoIconHeight?: number;
  linkComponent?: LinkComponent;
  /** The current route, for Ch.20 §6's persistent active-item underline. */
  currentPath?: string;
}
