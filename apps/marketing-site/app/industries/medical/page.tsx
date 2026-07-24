import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Medical",
  description: "AI automation for medical practices: scheduling, intake, and administrative workflows.",
};

export default function MedicalIndustryPage() {
  return (
    <PageStub
      eyebrow="Industries"
      heading="Medical"
      description="Scheduling, intake, and administrative automation designed around the compliance and trust requirements medical practices actually operate under."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
