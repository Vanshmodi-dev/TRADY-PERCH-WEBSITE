import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal information for Trady Perch, including privacy policy and terms of service.",
};

export default function LegalPage() {
  return (
    <PageStub
      eyebrow="Legal"
      heading="Legal"
      description="Compliance and licensing information, plus links to our Privacy Policy and Terms of Service."
      milestoneNote="Full page content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
