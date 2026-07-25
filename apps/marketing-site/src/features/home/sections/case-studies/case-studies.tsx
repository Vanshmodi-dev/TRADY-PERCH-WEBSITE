import { Badge, Button, Stat } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { CASE_STUDIES } from "@/features/case-studies/case-studies-data";
import styles from "./case-studies.module.css";

const FEATURED = CASE_STUDIES[0]!;

/**
 * Master Vision Ch.13 item 9 / Ch.15: the same proof as Portfolio, one
 * layer deeper. Ch.15's "taste, not the full narrative" exemption is
 * explicitly scoped to "the portfolio grid (homepage/index level)" only —
 * a Case Study is supposed to carry the full 7-part spine (Business
 * Problem, Solution, Technologies Used, Implementation Process, Business
 * Impact, Measurable Results, Lessons Learned). This homepage teaser
 * surfaces 5 of the 7 (Implementation Process is Milestone 4's full
 * /work/case-studies/[slug] page's job, linked below); content now lives
 * in the shared case-studies-data.ts so this teaser can never drift from
 * that full page. Kept to a single illustrative example rather than three
 * shallow ones, matching Ch.15's "long-form depth for a careful reader"
 * framing. Same honesty disclosure as Portfolio: clearly labeled
 * illustrative, not a real completed engagement.
 */
export function CaseStudies() {
  return (
    <section className={styles.section} aria-labelledby="case-studies-heading">
      <div className={styles.container}>
        <div>
          <Badge className={styles.badge}>Illustrative example</Badge>
          <h2 id="case-studies-heading" className={styles.heading}>
            {FEATURED.title}
          </h2>
          <div className={styles.narrative}>
            <div>
              <p className={styles.label}>The problem</p>
              <p className={styles.paragraph}>{FEATURED.businessProblem}</p>
            </div>
            <div>
              <p className={styles.label}>What we built</p>
              <p className={styles.paragraph}>{FEATURED.solution}</p>
            </div>
            <div>
              <p className={styles.label}>Built with</p>
              <p className={styles.paragraph}>{FEATURED.technologiesUsed}</p>
            </div>
            <div>
              <p className={styles.label}>The impact</p>
              <p className={styles.paragraph}>{FEATURED.businessImpact}</p>
            </div>
            <div>
              <p className={styles.label}>What we&rsquo;d do differently</p>
              <p className={styles.paragraph}>{FEATURED.lessonsLearned}</p>
            </div>
          </div>
          <Button
            href={`/work/case-studies/${FEATURED.slug}`}
            linkComponent={NextLinkAdapter}
            emphasis="ghost"
            className={styles.readMore}
          >
            Read the full case study
          </Button>
        </div>
        <div className={styles.stats}>
          {FEATURED.measurableResults.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
