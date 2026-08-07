import { Footer } from "@trady-perch/ui";
import { NextLinkAdapter } from "./next-link-adapter";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS, FOOTER_SOCIAL_LINKS } from "../navigation";

/**
 * Where the work is done, and who it is done for.
 *
 * Two lines rather than one, because they answer two separate questions a
 * prospect actually has — and separating them stops "Built in India, serving
 * businesses globally" reading as a single defensive sentence.
 */
const ORIGIN_LINES = ["Built in India.", "Serving businesses globally."];

export function SiteFooter() {
  return (
    <Footer
      // See site-header.tsx's identical prop for why this isn't the raw
      // source JPEG (Ch.37 §2 / Pf-1, Milestone 8 review).
      logoIconSrc="/logo-mark-icon.webp"
      columns={FOOTER_COLUMNS}
      legalLinks={FOOTER_LEGAL_LINKS}
      originLines={ORIGIN_LINES}
      // Entries with no URL are omitted by the component — see
      // FOOTER_SOCIAL_LINKS for why they ship blank rather than guessed.
      socialLinks={FOOTER_SOCIAL_LINKS}
      copyrightText={`© ${new Date().getFullYear()} Trady Perch. All rights reserved.`}
      linkComponent={NextLinkAdapter}
    />
  );
}
