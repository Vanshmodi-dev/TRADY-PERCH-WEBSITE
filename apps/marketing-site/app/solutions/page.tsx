import type { Metadata } from "next";
import { SolutionsHubPage } from "@/features/solutions/solutions-hub-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Solutions — AI Agents, Workflow Automation & More";
const DESCRIPTION =
  "AI agents, workflow automation, custom integrations, and intelligent systems for established businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/solutions` },
  openGraph: { type: "website", url: `${SITE_URL}/solutions`, title: TITLE, description: DESCRIPTION },
};

export default function SolutionsPage() {
  return <SolutionsHubPage />;
}
