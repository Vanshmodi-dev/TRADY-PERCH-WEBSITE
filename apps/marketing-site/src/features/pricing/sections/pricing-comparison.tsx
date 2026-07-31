import { Reveal } from "@trady-perch/ui";
import {
  COMPARISON_GROUPS,
  PRICING_PACKAGES,
  type ComparisonValue,
} from "../pricing-config";
import { ExcludedIcon, IncludedIcon } from "../components/pricing-icons";
import styles from "./pricing-comparison.module.css";

/**
 * A boolean renders as a mark with a visually-hidden word beside it — an icon
 * alone would announce as nothing, leaving a screen-reader user with a row
 * label and silence where the answer should be. A string renders as itself.
 */
function ValueCell({ value, tierName, rowLabel }: {
  value: ComparisonValue;
  tierName: string;
  rowLabel: string;
}) {
  if (typeof value === "string") {
    return <span className={styles.valueText}>{value}</span>;
  }
  return value ? (
    <>
      <IncludedIcon className={styles.included} aria-hidden="true" />
      <span className={styles.srOnly}>{`${rowLabel} is included in ${tierName}`}</span>
    </>
  ) : (
    <>
      <ExcludedIcon className={styles.excluded} aria-hidden="true" />
      <span className={styles.srOnly}>{`${rowLabel} is not included in ${tierName}`}</span>
    </>
  );
}

/**
 * One real `<table>` at every breakpoint — never a desktop table plus a
 * duplicated mobile card list, which would ship the same content twice to
 * assistive technology and to crawlers.
 *
 * Below 1024px the CSS switches the table's display boxes to blocks so each
 * row becomes a stacked card. That is exactly the change that normally
 * destroys a table's semantics, so every element carries its matching ARIA
 * role explicitly: the roles survive `display` changes, the implicit ones do
 * not. Tier names are re-emitted per cell as visible labels in that layout
 * (`data-tier`), since the column header is no longer adjacent to its value.
 */
export function PricingComparison() {
  return (
    <Reveal>
      <section className={styles.section} aria-labelledby="pricing-comparison-heading">
        <div className={styles.container}>
          <h2 id="pricing-comparison-heading" className={styles.heading}>
            Compare the packages in full.
          </h2>
          <p className={styles.subheading}>
            Every line below is a real deliverable, not a feature-count filler row.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table} role="table">
              <caption className={styles.srOnly}>
                Feature comparison across the Launch, Growth, and Scale packages
              </caption>
              <thead className={styles.thead} role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader" className={styles.rowHeadCol}>
                    Feature
                  </th>
                  {PRICING_PACKAGES.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      role="columnheader"
                      className={`${styles.tierHead} ${tier.featured ? styles.tierHeadFeatured : ""}`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {COMPARISON_GROUPS.map((group) => (
                <tbody key={group.id} className={styles.tbody} role="rowgroup">
                  <tr role="row" className={styles.groupRow}>
                    <th
                      scope="colgroup"
                      role="columnheader"
                      colSpan={PRICING_PACKAGES.length + 1}
                      className={styles.groupLabel}
                    >
                      {group.label}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.id} role="row" className={styles.row}>
                      <th scope="row" role="rowheader" className={styles.rowHead}>
                        {row.label}
                      </th>
                      {PRICING_PACKAGES.map((tier) => (
                        <td
                          key={tier.id}
                          role="cell"
                          className={`${styles.cell} ${tier.featured ? styles.cellFeatured : ""}`}
                          data-tier={tier.name}
                        >
                          <ValueCell
                            value={row.values[tier.id] ?? false}
                            tierName={tier.name}
                            rowLabel={row.label}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
