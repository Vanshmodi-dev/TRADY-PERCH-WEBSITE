import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "AI agents, workflow automation, custom integrations, and intelligent systems for established businesses.",
};

export default function SolutionsPage() {
  return (
    <PageStub
      eyebrow="Solutions"
      heading="AI systems built for how you actually work"
      description="AI agents, workflow automation, custom integrations, and intelligent systems — delivered in outcomes language, not tool-stack language."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
