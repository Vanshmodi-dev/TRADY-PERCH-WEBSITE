import type { Metadata } from "next";
import { DeferredPageNotice } from "@/shared/components/deferred-page-notice";

export const metadata: Metadata = {
  title: "Blog",
  description: "Perspectives on AI automation from Trady Perch.",
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <DeferredPageNotice
      eyebrow="Blog"
      heading="This page doesn't exist yet — on purpose."
      description="A blog with three posts from a year ago is a worse signal than no blog at all. This one starts only once we can commit to a real, sustained publishing cadence."
      redirectHref="/work/case-studies"
      redirectLabel="Read our case studies instead"
    />
  );
}
