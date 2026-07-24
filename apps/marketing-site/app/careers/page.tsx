import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Trady Perch.",
};

export default function CareersPage() {
  return (
    <PageStub
      eyebrow="Careers"
      heading="Careers"
      description="We're not hiring at scale yet — this page is built ahead of need, ready for when that changes."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
