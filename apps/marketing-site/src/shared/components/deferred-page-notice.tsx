import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "./next-link-adapter";
import styles from "./deferred-page-notice.module.css";

interface DeferredPageNoticeProps {
  eyebrow: string;
  heading: string;
  description: string;
  redirectHref: string;
  redirectLabel: string;
}

/**
 * Master Vision Ch.14.2 / Ch.12.1: About, Blog, Careers, and similar pages
 * are deliberately deferred, not launched thin — "a thin About page...
 * actively damages credibility more than having no About page at all."
 * This applies that same honesty to the page itself instead of silently
 * shipping filler: it tells a visitor the omission is a decision, not an
 * abandoned build (see ADR-0007), and points them at wherever the real
 * content already lives.
 */
export function DeferredPageNotice({
  eyebrow,
  heading,
  description,
  redirectHref,
  redirectLabel,
}: DeferredPageNoticeProps) {
  return (
    <section className={styles.notice}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <Button href={redirectHref} linkComponent={NextLinkAdapter} emphasis="secondary">
          {redirectLabel}
        </Button>
        <Button href="/" linkComponent={NextLinkAdapter} emphasis="ghost">
          Back to homepage
        </Button>
      </div>
    </section>
  );
}
