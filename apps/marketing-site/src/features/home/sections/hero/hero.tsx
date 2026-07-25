import styles from "./hero.module.css";

/**
 * Master Vision Ch.13, item 2. Purpose: answer "what is this, in one
 * sentence" and set the tonal register in the first viewport. No CTA here
 * — Ch.5.2's single-CTA physics means the nav's "Book a Strategy Call" is
 * the page's only Primary-emphasis action; a second one here would compete
 * with it for the entire rest of the page, since the nav is always visible.
 *
 * The full ceremonial intro sequence (Ch.9.2 — golden line ignition,
 * reflection sweep, wordmark resolution) is a deliberately deferred,
 * separate set-piece for Milestone 5 (Interactive elements & animations).
 * This section ships with a real, spec-compliant staggered entrance
 * (Ch.10.3) so the homepage is complete and correct without it.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <p className={styles.tagline}>Build. Automate. Grow.</p>
      <h1 id="hero-heading" className={styles.headline}>
        The manual work slowing your business down, rebuilt into systems that run themselves.
      </h1>
      <p className={styles.subheadline}>
        Trady Perch designs and deploys AI agents, workflow automation, and custom integrations for
        established businesses ready to stop doing everything by hand.
      </p>
    </section>
  );
}
