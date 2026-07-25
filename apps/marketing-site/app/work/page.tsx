import type { Metadata } from "next";
import { PortfolioPage } from "@/features/work/portfolio-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Work";
const DESCRIPTION = "Portfolio of AI automation work delivered for established businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: { type: "website", url: `${SITE_URL}/work`, title: TITLE, description: DESCRIPTION },
};

export default function WorkPage() {
  return <PortfolioPage />;
}
