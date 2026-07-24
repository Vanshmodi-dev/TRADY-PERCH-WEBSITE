import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Measurable outcomes from AI automation systems we've designed and deployed.",
};

export default function CaseStudiesPage() {
  return (
    <PageStub
      eyebrow="Work"
      heading="Case Studies"
      description="Real engagements, real outcomes — evidence of past results for businesses like yours."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
