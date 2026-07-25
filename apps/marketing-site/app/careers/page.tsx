import type { Metadata } from "next";
import { DeferredPageNotice } from "@/shared/components/deferred-page-notice";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Trady Perch.",
  robots: { index: false, follow: true },
};

export default function CareersPage() {
  return (
    <DeferredPageNotice
      eyebrow="Careers"
      heading="This page doesn't exist yet — on purpose."
      description="We're not hiring at the moment, and a careers page with no open roles is a worse signal than no careers page. If you think you'd be a fit anyway, reach out directly."
      redirectHref="/contact"
      redirectLabel="Get in touch"
    />
  );
}
