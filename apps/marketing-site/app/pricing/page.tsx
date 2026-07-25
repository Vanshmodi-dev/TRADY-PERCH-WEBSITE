import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing/pricing-page";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const TITLE = "Pricing";
const DESCRIPTION = "Scope-based engagement, not fixed SaaS-style pricing tiers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: { type: "website", url: `${SITE_URL}/pricing`, title: TITLE, description: DESCRIPTION },
};

// Ch.40 §3: "a pricing page's template knows it produces a
// Product-or-Service-equivalent block." `Service`, not `Product` — Trady
// Perch sells scoped engineering engagements, not a fixed, purchasable
// SKU (this page's own entire point, per pricing-data.ts). No `offers`/
// price field: Ch.5.4 prohibits any price signal anywhere on the site,
// including a "starting at" figure — that rule applies to structured data
// exactly as it applies to visible copy, not just to what a human reads.
const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI automation engineering",
  name: "Trady Perch AI automation engagements",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
  url: `${SITE_URL}/pricing`,
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_JSON_LD} />
      <PricingPage />
    </>
  );
}
