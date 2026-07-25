import { Accordion } from "@trady-perch/ui";
import { SectionHeading } from "@/shared/components/section-heading";
import { FAQ_ITEMS } from "./faq-data";
import styles from "./faq.module.css";

/**
 * Master Vision Ch.13 item 13 / Ch.16.3: "written as real objections a
 * skeptical prospect actually has, answered directly and briefly — never
 * softened into non-answers." The named themes (timeline, data security,
 * "what if it doesn't work," team size, ongoing support) come directly
 * from the source; a sixth (technical-team) was added for genuine
 * completeness, following the same directness standard. Content lives in
 * `faq-data.ts`, shared with `app/page.tsx`'s FAQPage JSON-LD projection.
 */
export function Faq() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="FAQ"
          heading="The objections you haven't voiced yet."
          headingId="faq-heading"
          align="center"
        />
        <div className={styles.accordionWrapper}>
          {/* Ch.37 §5/Ac-1, inherited from Master Vision §18.8: "Default open items: 1." */}
          <Accordion
            items={FAQ_ITEMS}
            defaultOpenId={FAQ_ITEMS[0]!.id}
            aria-label="Frequently asked questions"
          />
        </div>
      </div>
    </section>
  );
}
