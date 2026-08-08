import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { PricingPage } from "@/features/pricing/pricing-page";
import { PRICING_FAQ_ITEMS } from "@/features/pricing/pricing-config";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const TITLE = "Pricing";
const DESCRIPTION =
  "Three engagement packages — Launch, Growth, and Scale — scoped to your business, plus an ROI calculator and a full feature comparison.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/pricing",
});

// Ch.40 §3: "a pricing page's template knows it produces a
// Product-or-Service-equivalent block." `Service`, not `Product` — Trady Perch
// sells scoped engineering engagements, not a fixed, purchasable SKU.
//
// No `offers`/price field, and that is not an oversight: Master Vision §5.4's
// rule against a published price signal applies to structured data exactly as
// it does to visible copy — emitting a figure here that the page itself does
// not show would be worse than either, since it would surface in search
// results with no surrounding context at all. The three packages are still
// declared, as an OfferCatalog without prices, so a crawler sees the real
// shape of what is sold.
//
// When PRICING_SHOW_AMOUNTS is turned on in pricing-config.ts, add an `offers`
// block here with the same `startingFrom` values (as `priceSpecification` with
// `minPrice`), so the two never disagree.
const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI automation engineering",
  name: "Trady Perch AI automation engagements",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
  url: `${SITE_URL}/pricing`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement packages",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Launch" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Growth" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scale" } },
    ],
  },
};

// Projected from the same PRICING_FAQ_ITEMS the visible accordion renders, so
// the structured data cannot drift from what a visitor actually reads —
// Google's FAQPage guidelines require exactly that correspondence.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_JSON_LD} />
      <JsonLd data={FAQ_JSON_LD} />
      <PricingPage />
    </>
  );
}
