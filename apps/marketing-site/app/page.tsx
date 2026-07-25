import type { Metadata } from "next";
import { HomePage } from "@/features/home/home-page";
import { FAQ_ITEMS } from "@/features/home/sections/faq/faq-data";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

const TITLE = "Trady Perch — Build. Automate. Grow.";
const DESCRIPTION =
  "The AI automation partner that operates like a private bank, not like a marketplace freelancer. AI agents, workflow automation, and custom integrations for established businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Trady Perch",
    title: TITLE,
    description: DESCRIPTION,
    // 862x581 is logo-mark.jpeg's real, measured size (Milestone 3 review
    // caught the previous 1024x683 figure as simply wrong — platforms that
    // validate declared dimensions against the fetched asset can reject or
    // mis-render the preview). This is still a placeholder, not a designed
    // share card: a proper 1200x630 OG asset is a design task (not
    // buildable without real brand asset production), tracked as a known
    // follow-up — see the Milestone 3 completion report.
    images: [{ url: `${SITE_URL}/logo-mark.jpeg`, width: 862, height: 581, alt: "Trady Perch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/logo-mark.jpeg`],
  },
};

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
