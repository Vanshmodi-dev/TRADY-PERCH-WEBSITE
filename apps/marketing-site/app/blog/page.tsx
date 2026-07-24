import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Blog",
  description: "Perspectives on AI automation from Trady Perch.",
};

export default function BlogPage() {
  return (
    <PageStub
      eyebrow="Blog"
      heading="Blog"
      description="Perspectives on AI automation, operator credibility, and what actually separates a real system from a demo."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
