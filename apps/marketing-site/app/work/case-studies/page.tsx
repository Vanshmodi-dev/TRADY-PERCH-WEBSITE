import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { CaseStudiesIndexPage } from "@/features/case-studies/case-studies-index-page";

const TITLE = "Case Studies";
const DESCRIPTION = "Measurable outcomes from AI automation systems we've designed and deployed.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/work/case-studies",
});

export default function CaseStudiesPage() {
  return <CaseStudiesIndexPage />;
}
