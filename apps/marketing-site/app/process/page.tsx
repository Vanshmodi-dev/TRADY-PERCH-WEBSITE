import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { DeferredPageNotice } from "@/shared/components/deferred-page-notice";

export const metadata: Metadata = pageMetadata({
  title: "Process",
  description: "Discover, Design, Build, Deploy, Support — how we work.",
  path: "/process",
  noIndex: true,
});

export default function ProcessPage() {
  return (
    <DeferredPageNotice
      eyebrow="Process"
      heading="This page doesn't exist yet — on purpose."
      description="Our process already has a home: the How We Work section on the homepage covers it in full. A separate Process page would only repeat it in different words."
      redirectHref="/#how-we-work-heading"
      redirectLabel="Read how we work"
    />
  );
}
