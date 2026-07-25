import { Card, CardBody, CardTitle, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { INDUSTRIES } from "./industries-data";
import styles from "./industries-hub-page.module.css";

const WITH_DETAIL_PAGE = INDUSTRIES.filter((industry) => industry.detail !== undefined);
const WITHOUT_DETAIL_PAGE = INDUSTRIES.filter((industry) => industry.detail === undefined);

/**
 * Two separate grids, not one mixed grid — Ch.19 Cd-4 requires identical
 * anatomy within a single grid instance, and a "Learn more" link on only
 * some cards (Milestone 4 review Finding #2) breaks that even though the
 * static/interactive line itself (Cd-1) was already unambiguous. Each
 * grid below is now internally uniform: the first is entirely Interactive
 * (the whole card is the link, so its accessible name comes from the full
 * card content rather than a repeated bare "Learn more" — Finding #3),
 * the second entirely Static.
 */
export function IndustriesHubPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <SectionHeading
            eyebrow="Industries"
            heading="Built for the way your industry actually operates"
            description="Real estate, medical, legal, manufacturing, education, finance, and e-commerce — automation designed around each industry's real operational pain points, not a generic template."
            level="h1"
            size="h1"
            align="center"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="industries-detail-heading">
          <div className={styles.container}>
            <h2 id="industries-detail-heading" className={styles.sectionLabel}>
              See how we approach your industry
            </h2>
            <div className={styles.grid}>
              {WITH_DETAIL_PAGE.map(({ slug, title, icon: Icon, summary }) => (
                <Card
                  key={slug}
                  interactivity="interactive"
                  href={`/industries/${slug}`}
                  linkComponent={NextLinkAdapter}
                  density="compact"
                >
                  <Icon className={styles.icon} aria-hidden="true" />
                  <CardTitle as="h3">{title}</CardTitle>
                  <CardBody>{summary}</CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="industries-more-heading">
          <div className={styles.container}>
            <h2 id="industries-more-heading" className={styles.sectionLabel}>
              More industries we work with
            </h2>
            {/* No aria-label — Static cards, see home/sections/industries.tsx for why. */}
            <div className={styles.grid}>
              {WITHOUT_DETAIL_PAGE.map(({ slug, title, icon: Icon, summary }) => (
                <Card key={slug} density="compact">
                  <Icon className={styles.icon} aria-hidden="true" />
                  <CardTitle as="h3">{title}</CardTitle>
                  <CardBody>{summary}</CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
