import { Badge, Card, CardBody, CardFooter, CardTitle, Reveal, Stat } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { CASE_STUDIES } from "./case-studies-data";
import styles from "./case-studies-index-page.module.css";

/**
 * Master Vision Ch.13 item 9 / Ch.15: "Case Studies should function as
 * long-form depth for a careful reader," distinct from Portfolio's fast
 * scan — so this index shows the full narrative title and two measurable
 * results per card (not one), even though it links to the same three
 * underlying engagements as /work.
 */
export function CaseStudiesIndexPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <SectionHeading
            eyebrow="Work"
            heading="Case Studies"
            description="Real engagement structure, real numbers — the full story behind each result, including what we'd do differently."
            level="h1"
            size="h1"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="case-studies-grid-heading">
          <div className={styles.container}>
            <h2 id="case-studies-grid-heading" className={styles.srOnly}>
              All case studies
            </h2>
            <div className={styles.grid}>
              {CASE_STUDIES.map((caseStudy) => (
                <Card
                  key={caseStudy.slug}
                  interactivity="interactive"
                  href={`/work/case-studies/${caseStudy.slug}`}
                  linkComponent={NextLinkAdapter}
                >
                  <Badge className={styles.badge}>Illustrative example</Badge>
                  <CardTitle>{caseStudy.title}</CardTitle>
                  <CardBody>{caseStudy.businessImpact}</CardBody>
                  <CardFooter>
                    <div className={styles.statsRow}>
                      {caseStudy.measurableResults.slice(0, 2).map((stat) => (
                        <Stat key={stat.label} value={stat.value} label={stat.label} size="sm" />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
