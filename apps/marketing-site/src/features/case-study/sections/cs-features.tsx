import Image from "next/image";
import type { CaseStudyFeature } from "../case-study-types";
import { CaseStudySection } from "../components/cs-section";
import { FeatureIcon } from "../components/cs-icons";
import styles from "./cs-features.module.css";

/**
 * The feature showcase.
 *
 * ── Alternating rhythm ────────────────────────────────────────────────────
 *
 * Features with an image render as a full-width two-column band, and the
 * columns swap sides on every other one. That alternation is what stops a
 * long feature list reading as a spreadsheet: the eye is walked left, right,
 * left down the page instead of straight down a single rail.
 *
 * Features without an image fall back to a compact card in a grid. A single
 * list therefore mixes both treatments cleanly, which matters because feature
 * counts are unbounded and screenshots usually are not.
 *
 * A Server Component. The alternation is `:nth-child(even)` and the hover
 * states are CSS, so an unlimited number of features costs no JavaScript.
 */

interface CaseStudyFeaturesProps {
  features?: { lede?: string; items: readonly CaseStudyFeature[] };
}

export function CaseStudyFeatures({ features }: CaseStudyFeaturesProps) {
  if (!features || features.items.length === 0) return null;

  const banded = features.items.filter((item) => item.image);
  const compact = features.items.filter((item) => !item.image);

  return (
    <CaseStudySection
      id="features"
      eyebrow="Capabilities"
      heading="What it does"
      lede={features.lede}
    >
      {banded.length > 0 ? (
        <div className={styles.bands}>
          {banded.map((feature) => (
            <article key={feature.title} className={styles.band}>
              <div className={styles.bandContent}>
                <FeatureIcon name={feature.icon} className={styles.icon} />
                <h3 className={styles.bandTitle}>{feature.title}</h3>
                <p className={styles.bandBody}>{feature.description}</p>
                {feature.benefits && feature.benefits.length > 0 ? (
                  <ul className={styles.benefits}>
                    {feature.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className={styles.bandMedia}>
                {feature.image ? (
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={feature.image.width}
                    height={feature.image.height}
                    className={styles.bandImage}
                    loading="lazy"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {compact.length > 0 ? (
        <ul className={styles.grid}>
          {compact.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <FeatureIcon name={feature.icon} className={styles.icon} />
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardBody}>{feature.description}</p>
              {feature.benefits && feature.benefits.length > 0 ? (
                <ul className={styles.benefits}>
                  {feature.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </CaseStudySection>
  );
}
