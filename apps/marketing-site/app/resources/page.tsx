import type { Metadata } from "next";
import { DeferredPageNotice } from "@/shared/components/deferred-page-notice";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides and resources on AI automation for established businesses.",
  robots: { index: false, follow: true },
};

export default function ResourcesPage() {
  return (
    <DeferredPageNotice
      eyebrow="Resources"
      heading="This page doesn't exist yet — on purpose."
      description="We haven't published anything here yet, and an empty resource library isn't a resource library. When there's something worth your time, it will appear here — not before."
      redirectHref="/faq"
      redirectLabel="Read the FAQ instead"
    />
  );
}
