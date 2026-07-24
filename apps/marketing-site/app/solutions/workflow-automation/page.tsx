import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Workflow Automation",
  description: "Automating manual data entry, missed follow-ups, and disconnected tools.",
};

export default function WorkflowAutomationPage() {
  return (
    <PageStub
      eyebrow="Solutions"
      heading="Workflow Automation"
      description="Ending manual data entry, missed follow-ups, and slow quote turnaround by connecting the tools you already use."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
