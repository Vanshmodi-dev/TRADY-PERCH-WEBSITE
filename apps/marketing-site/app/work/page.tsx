import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Work",
  description: "Portfolio of AI automation work delivered for established businesses.",
};

export default function WorkPage() {
  return (
    <PageStub
      eyebrow="Work"
      heading="Proof, not promises"
      description="A portfolio of the systems we've designed and deployed — see our full case studies for measurable outcomes."
      milestoneNote="Full page content, including a portfolio grid and featured case studies, arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
