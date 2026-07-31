import { Button, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { PRICING_CTA } from "../pricing-config";
import styles from "./pricing-cta.module.css";

/**
 * The page's terminal conversion point (UX Blueprint Ch.34).
 *
 * Both actions are non-Primary: Ch.18 Bt-1 reserves Primary emphasis for the
 * fixed nav CTA sitewide, and §6.1's "one dominant action per screen" is
 * satisfied by Secondary-over-Ghost rather than by promoting anything here.
 */
export function PricingCta() {
  return (
    <Reveal>
      <section className={styles.section} aria-labelledby="pricing-cta-heading">
        {/* Purely decorative gold bloom behind the copy — no content, and
            removed from the accessibility tree entirely. */}
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.container}>
          <h2 id="pricing-cta-heading" className={styles.heading}>
            {PRICING_CTA.heading}
          </h2>
          <p className={styles.description}>{PRICING_CTA.description}</p>
          <div className={styles.actions}>
            <Button
              href={PRICING_CTA.primary.href}
              linkComponent={NextLinkAdapter}
              emphasis="secondary"
              size="lg"
            >
              {PRICING_CTA.primary.label}
            </Button>
            <Button
              href={PRICING_CTA.secondary.href}
              linkComponent={NextLinkAdapter}
              emphasis="ghost"
              size="lg"
            >
              {PRICING_CTA.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
