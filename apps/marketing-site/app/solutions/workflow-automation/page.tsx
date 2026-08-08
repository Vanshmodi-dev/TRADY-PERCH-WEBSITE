import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { SolutionDetailPage } from "@/features/solutions/solution-detail-page";
import { getSolutionBySlug } from "@/features/solutions/solutions-data";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const solution = getSolutionBySlug("workflow-automation")!;

const CANONICAL = `${SITE_URL}/solutions/workflow-automation`;

export const metadata: Metadata = pageMetadata({
  title: solution.title,
  description: solution.summary,
  path: "/solutions/workflow-automation",
});

// Ch.40 §3, the same principle as the pricing page's Service block, applied
// to each of the four solution templates: each describes a real service
// category, not a fixed product.
const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: solution.title,
  name: `Trady Perch — ${solution.title}`,
  description: solution.heroDescription,
  provider: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
  url: CANONICAL,
};

export default function WorkflowAutomationPage() {
  return (
    <>
      <JsonLd data={SERVICE_JSON_LD} />
      <SolutionDetailPage solution={solution} />
    </>
  );
}
