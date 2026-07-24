import type { LinkComponent } from "../primitives/link/link.types";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterProps {
  logoIconSrc: string;
  columns: FooterColumn[];
  legalLinks: FooterLink[];
  copyrightText: string;
  linkComponent?: LinkComponent;
}
