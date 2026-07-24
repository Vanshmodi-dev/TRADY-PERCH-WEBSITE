import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Process",
  description: "Discover, Design, Build, Deploy, Support — how we work.",
};

export default function ProcessPage() {
  return (
    <PageStub
      eyebrow="Process"
      heading="A repeatable, professional method"
      description="Discover → Design → Build → Deploy → Support — a clear, evidence-of-process-rigor engagement, not an improvised one."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
