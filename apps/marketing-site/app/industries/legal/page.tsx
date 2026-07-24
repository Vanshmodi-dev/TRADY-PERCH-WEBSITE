import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  // "Legal Industry", not "Legal" — disambiguates from /legal (the
  // legal/compliance hub page), which would otherwise produce an identical
  // <title> on two unrelated, both-indexable pages.
  title: "Legal Industry",
  description: "AI automation for legal practices: intake, document review, and case management workflows.",
};

export default function LegalIndustryPage() {
  return (
    <PageStub
      eyebrow="Industries"
      heading="Legal"
      description="Intake, document review, and case management automation built with the precision a legal practice requires."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
