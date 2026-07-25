import type { Metadata } from "next";
import { IndustryDetailPage } from "@/features/industries/industry-detail-page";
import { getIndustryDetailBySlug } from "@/features/industries/industries-data";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const industry = getIndustryDetailBySlug("legal")!;

const CANONICAL = `${SITE_URL}/industries/legal`;
// "Legal Industry", not "Legal" — disambiguates from /legal (the
// legal/compliance hub page), which would otherwise produce an identical
// <title> on two unrelated, both-indexable pages.
const TITLE = "Legal Industry";
const DESCRIPTION = "AI automation for legal practices: intake, document review, and case management workflows.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { type: "website", url: CANONICAL, title: TITLE, description: DESCRIPTION },
};

// Ch.40 §3, the same Service-template principle used for the four Solution
// detail pages, applied here: an industries detail page is architecturally
// the same kind of service-description template, just sliced by vertical
// instead of by capability. `name` uses the disambiguated TITLE for the
// same reason the metadata block does.
const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: `AI automation for ${TITLE}`,
  name: `Trady Perch — ${TITLE}`,
  description: industry.detail.heroDescription,
  provider: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
  url: CANONICAL,
};

export default function LegalIndustryPage() {
  return (
    <>
      <JsonLd data={SERVICE_JSON_LD} />
      <IndustryDetailPage industry={industry} />
    </>
  );
}
