import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { ContactPage } from "@/features/contact/contact-page";

const TITLE = "Contact";
const DESCRIPTION = "Book a strategy call with Trady Perch.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
