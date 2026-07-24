import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Intelligent Systems",
  description: "Custom intelligent systems designed and deployed with enterprise-grade rigor.",
};

export default function IntelligentSystemsPage() {
  return (
    <PageStub
      eyebrow="Solutions"
      heading="Intelligent Systems"
      description="Custom intelligent systems designed and deployed with the rigor of enterprise software and the judgment of a trusted advisor."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
