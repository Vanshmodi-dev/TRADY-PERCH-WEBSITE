import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import styles from "./final-cta.module.css";

/**
 * Master Vision Ch.13 item 14. Purpose: "how do I actually start," with
 * the lowest-friction possible action. Secondary emphasis, not Primary —
 * Ch.5.2's single-CTA physics means the nav's always-visible gold CTA is
 * the page's one Primary action; this section reinforces the same
 * destination and label rather than competing with it for gold.
 */
export function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <div className={styles.container}>
        <h2 id="final-cta-heading" className={styles.heading}>
          Let&apos;s talk about what&apos;s slowing you down.
        </h2>
        <p className={styles.body}>
          One conversation, no pressure — book a strategy call and we&apos;ll tell you honestly
          whether we&apos;re a fit.
        </p>
        <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="secondary" size="lg">
          Book a Strategy Call
        </Button>
      </div>
    </section>
  );
}
