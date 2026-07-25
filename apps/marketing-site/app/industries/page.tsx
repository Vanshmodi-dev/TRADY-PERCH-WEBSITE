import type { Metadata } from "next";
import { IndustriesHubPage } from "@/features/industries/industries-hub-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Industries — Real Estate, Medical, Legal & More";
const DESCRIPTION = "Real estate, medical, legal, manufacturing, education, finance, and e-commerce.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: { type: "website", url: `${SITE_URL}/industries`, title: TITLE, description: DESCRIPTION },
};

export default function IndustriesPage() {
  return <IndustriesHubPage />;
}
