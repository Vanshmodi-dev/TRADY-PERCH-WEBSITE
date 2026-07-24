import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Manufacturing",
  description: "AI automation for manufacturing: quoting, order processing, and supply chain workflows.",
};

export default function ManufacturingIndustryPage() {
  return (
    <PageStub
      eyebrow="Industries"
      heading="Manufacturing"
      description="Quoting, order processing, and supply chain automation built for the operational realities of manufacturing businesses."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
