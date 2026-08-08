import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { IndustriesHubPage } from "@/features/industries/industries-hub-page";

const TITLE = "Industries — Real Estate, Medical, Legal & More";
const DESCRIPTION = "Real estate, medical, legal, manufacturing, education, finance, and e-commerce.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/industries",
});

export default function IndustriesPage() {
  return <IndustriesHubPage />;
}
