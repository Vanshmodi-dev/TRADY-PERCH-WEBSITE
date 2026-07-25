import { Footer } from "@trady-perch/ui";
import { NextLinkAdapter } from "./next-link-adapter";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "../navigation";

export function SiteFooter() {
  return (
    <Footer
      // See site-header.tsx's identical prop for why this isn't the raw
      // source JPEG (Ch.37 §2 / Pf-1, Milestone 8 review).
      logoIconSrc="/logo-mark-icon.webp"
      columns={FOOTER_COLUMNS}
      legalLinks={FOOTER_LEGAL_LINKS}
      copyrightText={`© ${new Date().getFullYear()} Trady Perch. All rights reserved.`}
      linkComponent={NextLinkAdapter}
    />
  );
}
