import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of Trady Perch's website and services.",
};

export default function TermsPage() {
  return (
    <PageStub
      eyebrow="Legal"
      heading="Terms of Service"
      description="The terms governing use of Trady Perch's website and services."
      milestoneNote="Full legal content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
