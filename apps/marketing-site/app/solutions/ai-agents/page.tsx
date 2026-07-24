import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "AI Agents",
  description: "Chat-based and autonomous AI agents that qualify leads, answer questions, and take action.",
};

export default function AiAgentsPage() {
  return (
    <PageStub
      eyebrow="Solutions"
      heading="AI Agents"
      description="Conversational and autonomous agents that handle lead qualification, document processing, and routine decisions — built with the rigor of enterprise software."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
