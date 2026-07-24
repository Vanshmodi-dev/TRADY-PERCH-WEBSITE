import type { Metadata } from "next";
import { PageStub } from "@/shared/components/page-stub";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false }, // a query-driven results page has no fixed content of its own to index
};

export default function SearchPage() {
  return (
    <PageStub
      eyebrow="Search"
      heading="Search"
      description="Search functionality has not been built yet — Design System Bible Ch.29 (Search Interfaces) has not been read/implemented. This route exists so the page is real and reachable once it is."
      milestoneNote="Not yet linked from navigation. Scheduled for Milestone 4 once search is implemented."
    />
  );
}
