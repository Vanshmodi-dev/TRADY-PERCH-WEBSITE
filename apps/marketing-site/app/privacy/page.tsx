import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Trady Perch collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <PageStub
      eyebrow="Legal"
      heading="Privacy Policy"
      description="How Trady Perch collects, uses, and protects your data."
      milestoneNote="Full legal content arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
