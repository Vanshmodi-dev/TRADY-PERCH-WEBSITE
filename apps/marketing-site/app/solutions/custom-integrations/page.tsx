import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Custom Integrations",
  description: "Connecting the systems your business already runs on.",
};

export default function CustomIntegrationsPage() {
  return (
    <PageStub
      eyebrow="Solutions"
      heading="Custom Integrations"
      description="Purpose-built connections between the systems your business already runs on — no disconnected tools, no duplicate data entry."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
