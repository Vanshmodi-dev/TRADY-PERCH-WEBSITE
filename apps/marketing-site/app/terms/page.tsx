import type { Metadata } from "next";
import { LegalDocumentPage, type LegalSection } from "@/features/legal/legal-document-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Terms of Service";
const DESCRIPTION = "The terms governing use of Trady Perch's website and services.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/terms` },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    paragraphs: [
      "These terms govern your use of tradyperch.com, and using the site indicates your acceptance of them. A specific client engagement is governed by that engagement's own signed agreement, which takes precedence over this page for anything it covers.",
    ],
  },
  {
    heading: "About this site",
    paragraphs: [
      "This website is informational — it describes Trady Perch's AI automation services and lets visitors get in touch. It is not itself a software product, and using it does not create a client relationship on its own.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "You agree not to misuse this site — including attempting to disrupt it, scrape it at a scale that degrades service for others, or use the contact form to submit anything unlawful, abusive, or fraudulent.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The content on this site — including its design, copy, and code — belongs to Trady Perch unless otherwise noted. You're welcome to reference or link to it; reproducing it wholesale elsewhere isn't permitted without permission.",
    ],
  },
  {
    heading: "No warranty",
    paragraphs: [
      "This site is provided \"as is,\" without warranties of any kind, express or implied. We work to keep it accurate and available, but we don't guarantee it will be error-free or uninterrupted.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, Trady Perch is not liable for indirect, incidental, or consequential damages arising from your use of this site. Nothing here limits liability that can't legally be limited.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "This site may link to third-party sites we don't control. We're not responsible for their content or practices — check their own terms and privacy policies before using them.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The current version will always be posted here with its effective date.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: ["Questions about these terms can be sent to hello@tradyperch.com."],
  },
];

export default function TermsPage() {
  return <LegalDocumentPage title={TITLE} lastUpdated="July 24, 2026" sections={SECTIONS} />;
}
