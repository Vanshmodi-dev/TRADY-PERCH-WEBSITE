import { Button, Card, CardBody, CardTitle, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { SOLUTIONS } from "./solutions-data";
import styles from "./solutions-hub-page.module.css";

/**
 * Milestone 5 / Ch.9.3: the hero is visible without scrolling, so it isn't
 * wrapped in Reveal (nothing to reveal); the grid section is, since it's
 * reached by scrolling.
 */
export function SolutionsHubPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <SectionHeading
            eyebrow="Solutions"
            heading="AI systems built for how you actually work"
            description="Four categories of systems, each solving a specific class of manual work — described by what changes for your business, not by which tools we used."
            level="h1"
            size="h1"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="solutions-grid-heading">
          <div className={styles.container}>
            <h2 id="solutions-grid-heading" className={styles.srOnly}>
              All solutions
            </h2>
            <div className={styles.grid}>
              {SOLUTIONS.map(({ slug, title, icon: Icon, summary }) => (
                <Card
                  key={slug}
                  interactivity="interactive"
                  href={`/solutions/${slug}`}
                  linkComponent={NextLinkAdapter}
                >
                  <Icon className={styles.cardIcon} aria-hidden="true" />
                  <CardTitle>{title}</CardTitle>
                  <CardBody>{summary}</CardBody>
                </Card>
              ))}
            </div>
            <div className={styles.actions}>
              <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="secondary">
                Book a strategy call
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
