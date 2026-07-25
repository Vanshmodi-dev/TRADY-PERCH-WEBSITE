import { Button, Card, CardBody, CardTitle } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { INDUSTRIES } from "@/features/industries/industries-data";
import { SectionHeading } from "@/shared/components/section-heading";
import styles from "./industries.module.css";

/**
 * Master Vision Ch.13 item 6. All seven verticals render as Static cards
 * (Ch.19 Cd-4: every card in one grid shares identical anatomy) even
 * though only four currently have a dedicated page — mixing interactive
 * and static cards in the same grid isn't permitted, so the single "View
 * all industries" link below carries navigation instead.
 */
export function Industries() {
  return (
    <section className={styles.section} aria-labelledby="industries-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Industries"
          heading="Built for how your industry actually operates."
          description="You're not a special case we have to improvise for — these are the operational patterns we already know."
          headingId="industries-heading"
          align="center"
        />
        {/* No aria-label on these Static cards: they're plain, roleless
            containers — aria-label has no well-defined accessible-name
            effect there and would just duplicate the visible CardTitle
            (Milestone 3 review). Only meaningful on Interactive cards. */}
        <div className={styles.grid}>
          {INDUSTRIES.map(({ slug, icon: Icon, title, summary }) => (
            <Card key={slug} density="compact">
              <Icon className={styles.icon} aria-hidden="true" />
              <CardTitle as="h3">{title}</CardTitle>
              <CardBody>{summary}</CardBody>
            </Card>
          ))}
        </div>
        <div className={styles.footer}>
          <Button href="/industries" linkComponent={NextLinkAdapter} emphasis="secondary">
            View all industries
          </Button>
        </div>
      </div>
    </section>
  );
}
