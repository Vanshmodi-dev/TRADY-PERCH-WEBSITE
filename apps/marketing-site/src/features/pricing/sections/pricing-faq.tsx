import { Accordion, Reveal } from "@trady-perch/ui";
import { PRICING_FAQ_COPY, PRICING_FAQ_ITEMS } from "../pricing-config";
import styles from "./pricing-faq.module.css";

/**
 * Reuses the Ch.37 Accordion from packages/ui rather than reimplementing an
 * expandable — it already carries the aria-expanded/aria-controls wiring, the
 * chevron rotation, the Quick-tier content fade, and Ac-1's one-open-at-a-time
 * behaviour. A second accordion built for this page would be a second thing to
 * keep accessible.
 *
 * Master Vision §16.3: answers are written as replies to real objections, not
 * softened into non-answers — the first item takes the hardest one head on
 * (why there is no price on the page) and is open by default, per §18.8.
 */
export function PricingFaq() {
  return (
    <Reveal>
      <section className={styles.section} aria-labelledby="pricing-faq-heading">
        <div className={styles.container}>
          <p className={styles.eyebrow}>{PRICING_FAQ_COPY.eyebrow}</p>
          <h2 id="pricing-faq-heading" className={styles.heading}>
            {PRICING_FAQ_COPY.heading}
          </h2>
          <div className={styles.accordionWrapper}>
            <Accordion
              items={PRICING_FAQ_ITEMS}
              defaultOpenId={PRICING_FAQ_ITEMS[0]!.id}
              aria-label="Pricing questions"
            />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
