import type { Metadata } from "next";
import { DeferredPageNotice } from "@/shared/components/deferred-page-notice";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

/**
 * Design System Bible Ch.29 (Search Interfaces) has not been read/
 * implemented — real site search is a standalone feature (indexing, query
 * UX, result ranking), not a "remaining marketing page," so it stays out
 * of Milestone 4's scope (ADR-0007). Not linked from nav/footer (ADR-0006)
 * until it's real.
 */
export default function SearchPage() {
  return (
    <DeferredPageNotice
      eyebrow="Search"
      heading="This page doesn't exist yet — on purpose."
      description="Site search hasn't been built yet. Until it has, the navigation above covers every real destination on this site more reliably than a half-built search box would."
      redirectHref="/contact"
      redirectLabel="Can't find something? Ask us"
    />
  );
}
