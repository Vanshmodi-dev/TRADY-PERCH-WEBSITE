import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides and resources on AI automation for established businesses.",
};

export default function ResourcesPage() {
  return (
    <PageStub
      eyebrow="Resources"
      heading="Resources"
      description="Guides, explainers, and practical resources on AI automation for established businesses."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
