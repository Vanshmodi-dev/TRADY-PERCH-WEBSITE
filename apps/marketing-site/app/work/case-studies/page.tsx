import type { Metadata } from "next";
import { CaseStudiesIndexPage } from "@/features/case-studies/case-studies-index-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Case Studies";
const DESCRIPTION = "Measurable outcomes from AI automation systems we've designed and deployed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/work/case-studies` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/work/case-studies`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndexPage />;
}
