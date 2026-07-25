import type { Metadata } from "next";
import { ContactPage } from "@/features/contact/contact-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Contact";
const DESCRIPTION = "Book a strategy call with Trady Perch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { type: "website", url: `${SITE_URL}/contact`, title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return <ContactPage />;
}
