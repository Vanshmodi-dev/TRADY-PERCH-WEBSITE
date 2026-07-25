import styles from "./section-heading.module.css";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  headingId?: string;
  /**
   * Semantic tag vs. visual size are independent: an interior page's hero
   * is the page's one real `<h1>` but must render one step below the
   * homepage Hero's Display scale (Ch.20.8 typographic hierarchy — Display
   * stays a homepage-only signal of primacy), so `level="h1"` pairs with
   * the default `size="h2"` scale in that usage. @default "h2"
   */
  level?: "h1" | "h2";
  /** @default "h2" */
  size?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  headingId,
  level = "h2",
  size = "h2",
}: SectionHeadingProps) {
  const HeadingTag = level;
  return (
    <div className={`${styles.heading} ${align === "center" ? styles.center : ""}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <HeadingTag
        className={`${styles.title} ${size === "h1" ? styles.titleLarge : ""}`}
        id={headingId}
      >
        {heading}
      </HeadingTag>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
