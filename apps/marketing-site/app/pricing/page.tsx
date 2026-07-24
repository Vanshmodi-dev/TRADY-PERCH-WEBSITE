import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Scope-based engagement, not fixed SaaS-style pricing tiers.",
};

export default function PricingPage() {
  return (
    <PageStub
      eyebrow="Pricing"
      heading="Roughly what this costs, and why it's fair"
      description="A custom-automation engagement is scoped and priced around the outcome, not a fixed subscription tier — here's how that works and what to expect."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
