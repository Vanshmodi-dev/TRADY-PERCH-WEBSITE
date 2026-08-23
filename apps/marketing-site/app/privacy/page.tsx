import type { Metadata } from "next";
import { LegalDocumentPage, type LegalSection } from "@/features/legal/legal-document-page";
import { SITE_URL } from "@/shared/site-config";

const TITLE = "Privacy Policy";
const DESCRIPTION = "How Trady Perch collects, uses, and protects your data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Overview",
    paragraphs: [
      "This policy explains what information Trady Perch collects through this website, how it's used, and the choices you have. It applies to tradyperch.com and does not cover any client system or integration built for a specific customer, which is governed by that engagement's own agreement.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "Contact form submissions: when you submit the contact form, we collect your name, email address, company (if provided), and the content of your message.",
      "This site does not currently use tracking cookies or third-party analytics. If that changes, this policy will be updated first, and this section will describe exactly what's collected and why.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "Contact form submissions are used solely to respond to your inquiry and, if you become a client, to begin that engagement. We do not sell, rent, or trade your information to third parties for their own marketing purposes.",
    ],
  },
  {
    heading: "How information is delivered and stored",
    paragraphs: [
      "Contact form submissions reach us two ways: as an email sent through a transactional email provider, and as a notification to a private team messaging account so an inquiry is seen promptly. Both are delivery channels for the same message — the content is what you submitted, and nothing further is added to it.",
      "We retain submitted inquiries only as long as reasonably necessary to respond to them and maintain a record of the conversation, unless you ask us to delete them sooner.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us what information we hold about you, request a correction, or request deletion at any time by contacting us using the details below. We'll respond within a reasonable timeframe.",
    ],
  },
  {
    heading: "Data security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect the information we hold, but no method of transmission or storage is completely secure, and we can't guarantee absolute security.",
    ],
  },
  {
    heading: "Children's privacy",
    paragraphs: [
      "This site is not directed at children, and we do not knowingly collect information from anyone under 16. If you believe a child has provided us information, contact us and we'll remove it.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If this policy changes, the updated version will be posted here with a new \"last updated\" date. Material changes will be flagged clearly, not buried in a routine update.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: ["Questions about this policy can be sent to hello@tradyperch.com."],
  },
];

export default function PrivacyPage() {
  return <LegalDocumentPage title={TITLE} lastUpdated="July 24, 2026" sections={SECTIONS} />;
}
