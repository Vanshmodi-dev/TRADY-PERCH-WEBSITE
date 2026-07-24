import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "About",
  description: "Trady Perch is the AI automation partner that operates like a private bank.",
};

export default function AboutPage() {
  return (
    <PageStub
      eyebrow="About"
      heading="The AI automation partner that operates like a private bank"
      description="Not a freelance automation shop optimizing for speed of delivery over quality of outcome. Not an enterprise consultancy optimizing for scope of contract over speed of value."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
