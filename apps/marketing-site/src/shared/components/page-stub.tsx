import styles from "./page-stub.module.css";

interface PageStubProps {
  eyebrow: string;
  heading: string;
  description: string;
  milestoneNote: string;
}

/**
 * Milestone 2 scope is routing/IA, not page content — every required page
 * (docs/adr/0006-sitemap-and-navigation-ia.md) gets a real, crawlable route
 * today so no nav/footer link ever 404s, with full content arriving in
 * Milestone 3 (Homepage) or Milestone 4 (remaining marketing pages).
 */
export function PageStub({ eyebrow, heading, description, milestoneNote }: PageStubProps) {
  return (
    <section className={styles.stub}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.description}>{description}</p>
      <p className={styles.note}>{milestoneNote}</p>
    </section>
  );
}
