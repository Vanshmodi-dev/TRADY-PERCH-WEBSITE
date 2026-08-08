import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { DeferredPageNotice } from "@/shared/components/deferred-page-notice";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "Trady Perch is the AI automation partner that operates like a private bank.",
  path: "/about",
  noIndex: true,
});

export default function AboutPage() {
  return (
    <DeferredPageNotice
      eyebrow="About"
      heading="This page doesn't exist yet — on purpose."
      description="A real story earns an About page; a few paragraphs about being 'passionate' don't. The part that's actually load-bearing — the engineering disciplines this company is built on — already lives on the homepage."
      redirectHref="/#technology-stack-heading"
      redirectLabel="See what we're built on"
    />
  );
}
