import type { Metadata } from "next";
import { IndustryDetailPage } from "@/features/industries/industry-detail-page";
import { getIndustryDetailBySlug } from "@/features/industries/industries-data";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const industry = getIndustryDetailBySlug("manufacturing")!;

const CANONICAL = `${SITE_URL}/industries/manufacturing`;
const DESCRIPTION = "AI automation for manufacturing: quoting, order processing, and supply chain workflows.";

export const metadata: Metadata = {
  title: industry.title,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { type: "website", url: CANONICAL, title: industry.title, description: DESCRIPTION },
};

// Ch.40 §3, the same Service-template principle used for the four Solution
// detail pages, applied here: an industries detail page is architecturally
// the same kind of service-description template, just sliced by vertical
// instead of by capability.
const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: `AI automation for ${industry.title}`,
  name: `Trady Perch — ${industry.title}`,
  description: industry.detail.heroDescription,
  provider: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
  url: CANONICAL,
};

export default function ManufacturingIndustryPage() {
  return (
    <>
      <JsonLd data={SERVICE_JSON_LD} />
      <IndustryDetailPage industry={industry} />
    </>
  );
}
