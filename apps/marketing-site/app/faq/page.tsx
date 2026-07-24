import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the objections you haven't voiced yet.",
};

export default function FaqPage() {
  return (
    <PageStub
      eyebrow="FAQ"
      heading="The objections you haven't voiced yet"
      description="Straight answers to the questions a skeptical, busy operator actually has before booking a call."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
