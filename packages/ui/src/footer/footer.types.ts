import type { LinkComponent } from "../primitives/link/link.types";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

/** The platforms this component can draw a mark for. */
export type SocialPlatform = "GitHub" | "LinkedIn" | "Instagram";

export interface SocialLink {
  platform: SocialPlatform;
  /**
   * Full profile URL. An empty string means "not set up yet" and the entry is
   * skipped entirely — a footer icon linking nowhere is worse than one fewer
   * icon, so the absence is designed for rather than guarded against.
   */
  href: string;
}

export interface FooterProps {
  logoIconSrc: string;
  columns: FooterColumn[];
  legalLinks: FooterLink[];
  copyrightText: string;
  /**
   * Where the work is done and who it is for. Two short lines under the
   * tagline — provenance, which for a services business is a credential
   * rather than a detail.
   */
  originLines?: string[];
  /** Rendered in source order; entries with an empty `href` are omitted. */
  socialLinks?: SocialLink[];
  linkComponent?: LinkComponent;
}
