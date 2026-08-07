import { Badge, Button, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { PRICING_PACKAGES, PRICING_SHOW_AMOUNTS, type PricingPackage } from "../pricing-config";
import { formatRupees } from "../pricing-format";
import { IncludedIcon } from "../components/pricing-icons";
import styles from "./pricing-packages.module.css";

/**
 * The price slot. Both branches are real and typechecked; which one ships is
 * decided by `PRICING_SHOW_AMOUNTS` alone (see pricing-config.ts for why it is
 * currently off). `startingFrom` being null falls back to the label even when
 * the flag is on, so turning the flag on with an unfilled tier degrades to
 * "Custom Quote" rather than rendering "Starting from ₹NaN".
 */
function InvestmentSlot({ tier }: { tier: PricingPackage }) {
  const showFigure = PRICING_SHOW_AMOUNTS && tier.startingFrom !== null;

  return (
    <div className={styles.investment}>
      {showFigure ? (
        <>
          <p className={styles.investmentPrefix}>Starting from</p>
          <p className={styles.investmentAmount}>{formatRupees(tier.startingFrom as number)}</p>
        </>
      ) : (
        <p className={styles.investmentAmount}>{tier.investmentLabel}</p>
      )}
      <p className={styles.investmentNote}>{tier.investmentNote}</p>
    </div>
  );
}

/**
 * Three tiers, one featured. Ch.7's 4/4/4 symmetric span is explicitly
 * permitted "where symmetry itself is intentional (e.g. three pricing tiers
 * before selection)" — this is that case, named in the source.
 *
 * Ch.18 Bt-1 / Master Vision §6.1 allow exactly one dominant action per
 * screen, and Primary emphasis stays reserved for the fixed nav CTA sitewide.
 *
 * All three tier CTAs are Secondary rather than one Secondary and two Ghost.
 * Ghost renders as bare label text with no container (see button.module.css) —
 * inside a card footer that reads as a caption, not as the action the whole
 * card exists to produce, which is a worse failure than the one the mixed
 * hierarchy was avoiding. The single dominant action is instead signalled
 * where it actually belongs: on the featured *card* — gold border, badge,
 * standing lift — plus a gold border on its own CTA. No button on this page
 * takes the filled gold treatment that would make it a second Primary.
 */
export function PricingPackages() {
  return (
    <Reveal>
      <section className={styles.section} aria-labelledby="pricing-packages-heading">
        <div className={styles.container}>
          <h2 id="pricing-packages-heading" className={styles.heading}>
            Three ways to start.
          </h2>
          <p className={styles.subheading}>
            Each tier is a starting shape, not a fixed menu — every engagement is scoped to what your
            business actually needs before anything is agreed.
          </p>

          <ul className={styles.grid}>
            {PRICING_PACKAGES.map((tier) => (
              <li
                key={tier.id}
                className={`${styles.card} ${tier.featured ? styles.featured : ""}`}
                /* Reads as a whole-surface panel to the cursor, the same as a
                   work card does — decorative only. */
                data-cursor="card"
              >
                {/* Rendered on every card, empty on two of them. Showing it
                    only on the featured tier pushed that card's contents down
                    by the badge's height, so no tier name, price, or timeline
                    line agreed with its neighbours across the row. The row
                    reserves the space instead and everything below it aligns. */}
                <div className={styles.badgeRow} aria-hidden={!tier.featuredBadge}>
                  {tier.featured && tier.featuredBadge ? (
                    <Badge color="accent" size="sm">
                      {tier.featuredBadge}
                    </Badge>
                  ) : null}
                </div>

                <div className={styles.cardHead}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <p className={styles.positioning}>{tier.positioning}</p>
                </div>

                <InvestmentSlot tier={tier} />

                <dl className={styles.meta}>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Timeline</dt>
                    <dd className={styles.metaValue}>{tier.timeline}</dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Support</dt>
                    <dd className={styles.metaValue}>{tier.support}</dd>
                  </div>
                </dl>

                {tier.inheritsFrom ? (
                  <p className={styles.inherits}>
                    Everything in <strong>{tier.inheritsFrom}</strong>, plus:
                  </p>
                ) : null}

                <ul className={styles.features}>
                  {tier.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <IncludedIcon className={styles.featureIcon} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <Button
                    href={tier.cta.href}
                    linkComponent={NextLinkAdapter}
                    emphasis="secondary"
                    className={`${styles.cardCta} ${tier.featured ? styles.cardCtaFeatured : ""}`}
                    /* The three CTAs share a label, so an unqualified
                       "Book a strategy call" would give a screen-reader user
                       three identically-named links with no way to tell which
                       tier each belongs to. */
                    aria-label={`${tier.cta.label} about the ${tier.name} package`}
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
