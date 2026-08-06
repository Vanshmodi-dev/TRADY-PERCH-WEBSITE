import styles from "./projects-atmosphere.module.css";

/**
 * Purely decorative depth behind the projects section — a soft light source,
 * an almost-invisible engineering grid, and a sparse dot field.
 *
 * A Server Component rendering four empty elements. All three layers are
 * CSS background-images (see the stylesheet for why this is not a canvas), so
 * this ships no JavaScript and costs nothing after first paint.
 *
 * `aria-hidden` on the container, and nothing inside is focusable or carries
 * text, so the entire construct is invisible to assistive technology — which
 * is correct: it conveys no information a screen-reader user is missing.
 */
export function ProjectsAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <span className={styles.glow} />
      <span className={styles.grid} />
      <span className={styles.particles} />
      <span className={styles.fade} />
    </div>
  );
}
