import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { SolutionsHubPage } from "@/features/solutions/solutions-hub-page";

const TITLE = "Solutions — AI Agents, Workflow Automation & More";
const DESCRIPTION =
  "AI agents, workflow automation, custom integrations, and intelligent systems for established businesses.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/solutions",
});

export default function SolutionsPage() {
  return <SolutionsHubPage />;
}
