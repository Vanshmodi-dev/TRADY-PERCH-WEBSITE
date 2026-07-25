import { Accordion, Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { FAQ_ITEMS } from "@/features/home/sections/faq/faq-data";
import { EXTENDED_FAQ_ITEMS } from "./extended-faq-data";
import styles from "./faq-page.module.css";

const ALL_ITEMS = [...FAQ_ITEMS, ...EXTENDED_FAQ_ITEMS];

export function FaqPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="FAQ"
          heading="The objections you haven't voiced yet"
          description="Every question here is a real one — asked directly, answered the same way."
          level="h1"
          size="h1"
          align="center"
        />
        <div className={styles.accordionWrapper}>
          <Accordion
            items={ALL_ITEMS}
            defaultOpenId={ALL_ITEMS[0]!.id}
            aria-label="Frequently asked questions"
            headingLevel="h2"
          />
        </div>
        <div className={styles.actions}>
          <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="secondary">
            Still have a question? Ask us
          </Button>
        </div>
      </div>
    </section>
  );
}
