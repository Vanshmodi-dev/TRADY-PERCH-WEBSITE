import { Button, Card, CardBody, CardTitle, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { getSolutionBySlug } from "@/features/solutions/solutions-data";
import type { IndustryData, IndustryDetail } from "./industries-data";
import styles from "./industry-detail-page.module.css";

interface IndustryDetailPageProps {
  industry: IndustryData & { detail: IndustryDetail };
}

export function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const { title, icon: Icon, detail } = industry;
  const { heroDescription, painPoints, relatedSolutionSlugs } = detail;
  const relatedSolutions = relatedSolutionSlugs
    .map((slug) => getSolutionBySlug(slug))
    .filter((solution) => solution !== undefined);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <Icon className={styles.heroIcon} aria-hidden="true" />
          <SectionHeading
            eyebrow="Industries"
            heading={title}
            description={heroDescription}
            level="h1"
            size="h1"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="pain-points-heading">
          <div className={styles.container}>
            <h2 id="pain-points-heading" className={styles.sectionLabel}>
              Where the friction actually is
            </h2>
            <ul className={styles.list}>
              {painPoints.map(({ title: painTitle, body }) => (
                <li key={painTitle} className={styles.item}>
                  <p className={styles.itemTitle}>{painTitle}</p>
                  <p className={styles.itemBody}>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="related-solutions-heading">
          <div className={styles.container}>
            <h2 id="related-solutions-heading" className={styles.sectionLabel}>
              Where we usually start
            </h2>
            <div className={styles.solutionsGrid}>
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
              <Button href="/industries" linkComponent={NextLinkAdapter} emphasis="ghost">
                See all industries
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
