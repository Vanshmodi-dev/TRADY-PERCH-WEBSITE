import { Badge, Button, Card, CardBody, CardTitle, Reveal, Stat } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { getSolutionBySlug } from "@/features/solutions/solutions-data";
import { getIndustryBySlug } from "@/features/industries/industries-data";
import type { CaseStudyData } from "./case-studies-data";
import styles from "./case-study-detail-page.module.css";

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudyData;
}

const SPINE = (caseStudy: CaseStudyData) => [
  { label: "The business problem", body: caseStudy.businessProblem },
  { label: "The solution", body: caseStudy.solution },
  { label: "Technologies used", body: caseStudy.technologiesUsed },
  { label: "Implementation process", body: caseStudy.implementationProcess },
  { label: "Business impact", body: caseStudy.businessImpact },
];

/**
 * Master Vision Ch.15's full 7-part narrative spine, in order: Business
 * Problem, Solution, Technologies Used, Implementation Process, Business
 * Impact, Measurable Results, Lessons Learned. Lessons Learned renders in
 * its own visually distinct closing block — Ch.15 calls it out as "one of
 * the most powerful trust signals available," not just another paragraph.
 */
export function CaseStudyDetailPage({ caseStudy }: CaseStudyDetailPageProps) {
  const industry = getIndustryBySlug(caseStudy.industrySlug);
  const relatedSolutions = caseStudy.solutionSlugs
    .map((slug) => getSolutionBySlug(slug))
    .filter((solution) => solution !== undefined);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <Badge>Illustrative example</Badge>
          <h1 className={styles.heading}>{caseStudy.title}</h1>
          <p className={styles.industryLine}>{caseStudy.industryLabel}</p>
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="narrative-heading">
          <div className={styles.container}>
            <h2 id="narrative-heading" className={styles.srOnly}>
              Case study narrative
            </h2>
            <div className={styles.narrative}>
              {SPINE(caseStudy).map(({ label, body }) => (
                <div key={label}>
                  <p className={styles.label}>{label}</p>
                  <p className={styles.paragraph}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="results-heading">
          <div className={styles.container}>
            <h2 id="results-heading" className={styles.sectionLabel}>
              Measurable results
            </h2>
            <div className={styles.statsGrid}>
              {caseStudy.measurableResults.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section} aria-labelledby="lessons-heading">
          <div className={styles.container}>
            <div className={styles.lessonsBlock}>
              <h2 id="lessons-heading" className={styles.sectionLabel}>
                What we&rsquo;d do differently
              </h2>
              <p className={styles.paragraph}>{caseStudy.lessonsLearned}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="related-heading">
          <div className={styles.container}>
            <h2 id="related-heading" className={styles.sectionLabel}>
              Related reading
            </h2>
            <div className={styles.relatedGrid}>
              {industry?.detail ? (
                <Card
                  interactivity="interactive"
                  href={`/industries/${industry.slug}`}
                  linkComponent={NextLinkAdapter}
                  density="compact"
                >
                  <CardTitle as="h3">{industry.title}</CardTitle>
                  <CardBody>See how we approach {industry.title.toLowerCase()} more broadly.</CardBody>
                </Card>
              ) : null}
              {relatedSolutions.map((solution) => (
                <Card
                  key={solution.slug}
                  interactivity="interactive"
                  href={`/solutions/${solution.slug}`}
                  linkComponent={NextLinkAdapter}
                  density="compact"
                >
                  <CardTitle as="h3">{solution.title}</CardTitle>
                  <CardBody>{solution.summary}</CardBody>
                </Card>
              ))}
            </div>
            <div className={styles.actions}>
              <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="secondary">
                Book a strategy call
              </Button>
              <Button href="/work/case-studies" linkComponent={NextLinkAdapter} emphasis="ghost">
                Read more case studies
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
