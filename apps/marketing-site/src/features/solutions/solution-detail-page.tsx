import { Button, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { CheckIcon } from "@/shared/components/icons";
import type { SolutionData } from "./solutions-data";
import styles from "./solution-detail-page.module.css";

interface SolutionDetailPageProps {
  solution: SolutionData;
}

export function SolutionDetailPage({ solution }: SolutionDetailPageProps) {
  const { title, icon: Icon, heroDescription, capabilities, builtFor } = solution;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <Icon className={styles.heroIcon} aria-hidden="true" />
          <SectionHeading
            eyebrow="Solutions"
            heading={title}
            description={heroDescription}
            level="h1"
            size="h1"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="capabilities-heading">
          <div className={styles.container}>
            <h2 id="capabilities-heading" className={styles.sectionLabel}>
              What this includes
            </h2>
            <ul className={styles.list}>
              {capabilities.map(({ title: capabilityTitle, body }) => (
                <li key={capabilityTitle} className={styles.item}>
                  <CheckIcon className={styles.itemIcon} aria-hidden="true" />
                  <div>
                    <p className={styles.itemTitle}>{capabilityTitle}</p>
                    <p className={styles.itemBody}>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="built-for-heading">
          <div className={styles.container}>
            <h2 id="built-for-heading" className={styles.builtForLabel}>
              Who it&rsquo;s built for
            </h2>
            <p className={styles.builtForText}>{builtFor}</p>
            <div className={styles.actions}>
              <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="secondary">
                Book a strategy call
              </Button>
              <Button href="/solutions" linkComponent={NextLinkAdapter} emphasis="ghost">
                See all solutions
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
