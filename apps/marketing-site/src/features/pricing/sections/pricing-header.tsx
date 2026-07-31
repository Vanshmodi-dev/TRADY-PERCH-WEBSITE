import { SectionHeading } from "@/shared/components/section-heading";
import { PRICING_HEADER } from "../pricing-config";
import styles from "./pricing-header.module.css";

/**
 * The page's one real `<h1>`. Rendered at the h1 *scale* rather than Display —
 * Ch.20.8 keeps Display as a homepage-only signal of primacy, so an interior
 * page hero is semantically h1 but visually one step down.
 *
 * Not wrapped in `Reveal`: this is above the fold and is the LCP candidate for
 * the route. Fading it in would delay the largest paint for no benefit, since
 * nothing has been scrolled to yet.
 */
export function PricingHeader() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow={PRICING_HEADER.eyebrow}
          heading={PRICING_HEADER.heading}
          description={PRICING_HEADER.description}
          level="h1"
          size="h1"
          align="center"
        />
        <div className={styles.divider} aria-hidden="true" />
      </div>
    </section>
  );
}
