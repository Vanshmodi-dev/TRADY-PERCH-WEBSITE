import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { HomePage } from "@/features/home/home-page";
import { FAQ_ITEMS } from "@/features/home/sections/faq/faq-data";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const TITLE = "Trady Perch — Build. Automate. Grow.";
const DESCRIPTION =
  "The AI automation partner that operates like a private bank, not like a marketplace freelancer. AI agents, workflow automation, and custom integrations for established businesses.";

// The share asset itself (862x581 logo-mark.jpeg, its real measured size) now
// lives in shared/seo.ts as the site-wide default, so no route restates it. It
// is still a placeholder rather than a designed 1200x630 card — producing one
// is a brand design task, tracked as a known follow-up.
export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

// FAQ JSON-LD is projected from the same FAQ_ITEMS array `faq.tsx` renders
// (src/features/home/sections/faq/faq-data.ts) — previously hand-
// duplicated here, which Milestone 3 review flagged as a drift risk even
// though the two happened to be word-for-word identical at the time. One
// array, two projections (visible UI + this schema.org shape); structurally
// impossible to drift now.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trady Perch",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.jpeg`,
  description: DESCRIPTION,
  slogan: "Build. Automate. Grow.",
};

export default function Page() {
  return (
    <>
      <JsonLd data={ORGANIZATION_JSON_LD} />
      <JsonLd data={FAQ_JSON_LD} />
      <HomePage />
    </>
  );
}
