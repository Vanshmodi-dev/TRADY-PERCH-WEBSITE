import { Reveal } from "@trady-perch/ui";
import { PRICING_PRINCIPLES } from "../pricing-config";
import { PrincipleGlyph } from "../components/pricing-icons";
import styles from "./pricing-principles.module.css";

/**
 * Master Vision §5.4's actual reasoning, honoured structurally: the philosophy
 * is stated *before* any tier, so whatever a visitor eventually reads as a
 * price lands against an established frame rather than in a vacuum where it
 * defaults to being compared with the cheapest competitor.
 *
 * A list, not a set of Cards — these are four short assertions, and Ch.19's
 * Card carries more container weight than a one-line claim deserves.
 */
export function PricingPrinciples() {
  return (
    <Reveal>
      <section className={styles.section} aria-labelledby="pricing-principles-heading">
        <div className={styles.container}>
          <h2 id="pricing-principles-heading" className={styles.heading}>
            How we think about what this costs.
          </h2>
          <ul className={styles.grid}>
            {PRICING_PRINCIPLES.map((principle, index) => (
              <li
                key={principle.id}
                className={styles.item}
                /* Drives the stagger delay in CSS — see .item's transition-delay.
                   A custom property rather than an inline transition so the
                   reduced-motion query can still zero it out globally. */
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <span className={styles.glyph}>
                  <PrincipleGlyph name={principle.icon} />
                </span>
                <h3 className={styles.itemTitle}>{principle.title}</h3>
                <p className={styles.itemBody}>{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
