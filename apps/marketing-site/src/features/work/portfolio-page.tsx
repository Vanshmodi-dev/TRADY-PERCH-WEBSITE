import { Badge, Button, Card, CardBody, CardFooter, CardTitle, Reveal, Stat } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { CASE_STUDIES } from "@/features/case-studies/case-studies-data";
import styles from "./portfolio-page.module.css";

/**
 * Ch.15 presentation rule ("the portfolio grid... should surface only the
 * problem, the headline result, and a clean visual") applies here too, not
 * just on the homepage — each card is Interactive (Ch.19 Cd-1), linking
 * straight to its real case-study detail route. The homepage's own
 * teaser keeps its equivalent cards Static instead, for a different
 * reason: Cd-1/Cd-4 consistency with a single "View our work" link
 * (see home/sections/portfolio/portfolio.tsx) — both pages now have
 * somewhere real to send a click; the two components differ by design,
 * not by which one predates real case-study routes existing.
 */
export function PortfolioPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <SectionHeading
            eyebrow="Work"
            heading="Proof, not promises"
            description="A portfolio of the systems we design and deploy — see the full case study behind any of these for the complete story."
            level="h1"
            size="h1"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="portfolio-grid-heading">
          <div className={styles.container}>
            <h2 id="portfolio-grid-heading" className={styles.srOnly}>
              Portfolio
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
                  <CardTitle>{caseStudy.businessLabel}</CardTitle>
                  <CardBody>{caseStudy.portfolioSummary}</CardBody>
                  <CardFooter>
                    <Stat value={caseStudy.headlineStat.value} label={caseStudy.headlineStat.label} size="sm" />
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className={styles.actions}>
              <Button href="/work/case-studies" linkComponent={NextLinkAdapter} emphasis="secondary">
                Read all case studies
              </Button>
              <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="ghost">
                Book a strategy call
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
