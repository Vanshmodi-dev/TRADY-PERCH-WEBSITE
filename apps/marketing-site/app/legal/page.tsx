import type { Metadata } from "next";
import { pageMetadata } from "@/shared/seo";
import { Card, CardBody, CardTitle } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import styles from "./legal.module.css";

const TITLE = "Legal";
const DESCRIPTION = "Legal information for Trady Perch, including privacy policy and terms of service.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/legal",
});

const DOCUMENTS = [
  {
    href: "/privacy",
    title: "Privacy Policy",
    body: "What information this site collects, how it's used, and how to request a copy or deletion of yours.",
  },
  {
    href: "/terms",
    title: "Terms of Service",
    body: "The terms governing use of this website.",
  },
];

export default function LegalPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Legal"
          heading="Legal"
          description="Compliance and licensing information, plus links to our Privacy Policy and Terms of Service."
          level="h1"
          size="h1"
        />
        <div className={styles.grid}>
          {DOCUMENTS.map((doc) => (
            <Card
              key={doc.href}
              interactivity="interactive"
              href={doc.href}
              linkComponent={NextLinkAdapter}
              density="compact"
            >
              <CardTitle as="h2">{doc.title}</CardTitle>
              <CardBody>{doc.body}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
