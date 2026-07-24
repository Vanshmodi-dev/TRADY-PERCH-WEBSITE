import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Industries",
  description: "Real estate, medical, legal, manufacturing, education, finance, and e-commerce.",
};

export default function IndustriesPage() {
  return (
    <PageStub
      eyebrow="Industries"
      heading="Built for the way your industry actually operates"
      description="Real estate, medical, legal, manufacturing, education, finance, and e-commerce — automation designed around each industry's real operational pain points, not a generic template."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
