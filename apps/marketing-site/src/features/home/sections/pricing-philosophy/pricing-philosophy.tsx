import { Button, Card, CardBody, CardTitle } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { PRICING_FACTORS } from "@/features/pricing/pricing-data";
import styles from "./pricing-philosophy.module.css";

/**
 * Master Vision Ch.13 item 12 / Ch.5.4: this section explains HOW pricing
 * works, never a specific number — Ch.5.4 forbids showing a price
 * ("even a 'starting at' figure") anywhere on the page, including here,
 * so that any eventual number is anchored against value already
 * demonstrated (Portfolio, Case Studies, Testimonials), not judged in a
 * vacuum against the cheapest competitor.
 */
export function PricingPhilosophy() {
  return (
    <section className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Pricing"
          heading="Roughly what this costs, and why it's fair."
          description="Custom automation doesn't price like a SaaS subscription — here's how we actually scope and price an engagement."
          headingId="pricing-heading"
          align="center"
        />
        {/* No aria-label — Static cards, see industries.tsx for why. */}
        <div className={styles.grid}>
          {PRICING_FACTORS.map((factor) => (
            <Card key={factor.title}>
              <CardTitle>{factor.title}</CardTitle>
              <CardBody>{factor.body}</CardBody>
            </Card>
          ))}
        </div>
        <div className={styles.footer}>
          <Button href="/pricing" linkComponent={NextLinkAdapter} emphasis="secondary">
            How scoping works
          </Button>
        </div>
      </div>
    </section>
  );
}
