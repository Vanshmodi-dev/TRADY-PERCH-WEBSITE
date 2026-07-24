import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a strategy call with Trady Perch.",
};

export default function ContactPage() {
  return (
    <PageStub
      eyebrow="Contact"
      heading="How do I actually start?"
      description="Book a strategy call — a real conversation about your operations, not a sales pitch."
      milestoneNote="A full contact form arrives in Milestone 4 (Remaining Marketing Pages)."
    />
  );
}
