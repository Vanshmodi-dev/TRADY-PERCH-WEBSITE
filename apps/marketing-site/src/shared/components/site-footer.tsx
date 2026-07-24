import { Footer } from "@trady-perch/ui";
import { NextLinkAdapter } from "./next-link-adapter";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "../navigation";

export function SiteFooter() {
  return (
    <Footer
      logoIconSrc="/logo-mark.jpeg"
      columns={FOOTER_COLUMNS}
      legalLinks={FOOTER_LEGAL_LINKS}
      copyrightText={`© ${new Date().getFullYear()} Trady Perch. All rights reserved.`}
      linkComponent={NextLinkAdapter}
    />
  );
}
