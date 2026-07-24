import styles from "./home-page.module.css";

/**
 * Milestone 1 scaffold placeholder — proves the design-token pipeline
 * (packages/tokens -> CSS custom properties -> this component) renders
 * correctly end-to-end. This is NOT the real homepage; the actual
 * Design-System-Bible-Ch.7-compliant homepage composition (Hero, Technology
 * Stack, Problems We Solve, Solutions, Industries, How We Work, Portfolio,
 * Case Studies, Interactive Demo, Testimonials, Pricing, FAQ, Contact)
 * is built in Milestone 3, after the required component chapters are read.
 */
export function HomePage() {
  return (
    <main className={styles.hero}>
      <p className={styles.eyebrow}>Trady Perch — Milestone 1</p>
      <h1 className={styles.headline}>BUILD. AUTOMATE. GROW.</h1>
      <p className={styles.subheadline}>
        The AI automation partner that operates like a private bank, not like a marketplace
        freelancer.
      </p>
      <p className={styles.scaffoldNote}>
        This is the project-setup milestone, not the finished homepage. It exists to prove the
        token pipeline — colors, type scale, spacing, and the dark-native theme — renders
        correctly before real page composition begins in Milestone 3.
      </p>
    </main>
  );
}
