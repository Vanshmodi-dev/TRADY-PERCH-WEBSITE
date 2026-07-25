import { Badge, Button, Card, CardBody, CardFooter, CardTitle, Stat } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { CASE_STUDIES } from "@/features/case-studies/case-studies-data";
import styles from "./portfolio.module.css";

/**
 * Master Vision Ch.13 item 8 / Ch.15: portfolio-level cards surface only
 * problem + headline result, never the full narrative (that's Case
 * Studies, next). These three are honestly labeled illustrative examples,
 * not claims of completed client work — no real engagements exist to
 * report yet, and presenting invented results as real client outcomes
 * would be a false claim, not a design shortcut. Static, not Interactive
 * (Ch.19 Cd-1): the single "View our work" link below goes to the real
 * /work index rather than mixing a per-card link into this grid.
 */
export function Portfolio() {
  return (
    <section className={styles.section} aria-labelledby="portfolio-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Portfolio"
          heading="Show me. Proof, not promises."
          description="A taste of the kind of outcome these systems produce — full case studies follow."
          headingId="portfolio-heading"
        />
        {/* No aria-label — Static cards, see industries.tsx for why. */}
        <div className={styles.grid}>
          {CASE_STUDIES.map((caseStudy) => (
            <Card key={caseStudy.slug}>
              <Badge className={styles.badge}>Illustrative example</Badge>
              <CardTitle>{caseStudy.businessLabel}</CardTitle>
              <CardBody>{caseStudy.portfolioSummary}</CardBody>
              <CardFooter>
                <Stat value={caseStudy.headlineStat.value} label={caseStudy.headlineStat.label} size="sm" />
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className={styles.footer}>
          <Button href="/work" linkComponent={NextLinkAdapter} emphasis="secondary">
            View our work
          </Button>
        </div>
      </div>
    </section>
  );
}
