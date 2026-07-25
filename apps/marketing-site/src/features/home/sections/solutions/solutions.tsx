import { Card, CardBody, CardTitle } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { SOLUTIONS } from "@/features/solutions/solutions-data";
import styles from "./solutions.module.css";

/**
 * Master Vision Ch.13 item 5 / Ch.16.3: outcome-first copy, four
 * categories exactly matching the primary nav's Solutions dropdown
 * (docs/adr/0006), each linking to its real route from Milestone 2.
 */
export function Solutions() {
  return (
    <section className={styles.section} aria-labelledby="solutions-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Solutions"
          heading="Here's our actual answer."
          description="Four categories of systems, each solving a specific class of manual work — described by what changes for your business, not by which tools we used."
          headingId="solutions-heading"
        />
        <div className={styles.grid}>
          {SOLUTIONS.map(({ slug, icon: Icon, title, summary }) => (
            <Card
              key={slug}
              interactivity="interactive"
              href={`/solutions/${slug}`}
              linkComponent={NextLinkAdapter}
              // No aria-label: it would override the accessible name with
              // just the title, silently dropping the outcome description
              // a sighted user reads before clicking (Milestone 3 review).
              // The link's name computes correctly from its visible
              // content (icon is aria-hidden, title + body are real text).
            >
              <Icon className={styles.cardIcon} aria-hidden="true" />
              <CardTitle>{title}</CardTitle>
              <CardBody>{summary}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
