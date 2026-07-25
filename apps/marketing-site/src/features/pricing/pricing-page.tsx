import { Button, Card, CardBody, CardTitle, Reveal } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { SectionHeading } from "@/shared/components/section-heading";
import { ENGAGEMENT_SHAPES, PRICING_FACTORS } from "./pricing-data";
import styles from "./pricing-page.module.css";

/**
 * Master Vision Ch.13 item 12 / Ch.5.4: transparent about HOW pricing
 * works, never a specific number, "even a 'starting at' figure" — that
 * rule applies to this whole page, not just the homepage teaser it
 * expands on.
 */
export function PricingPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <SectionHeading
            eyebrow="Pricing"
            heading="Roughly what this costs, and why it's fair"
            description="A custom-automation engagement is scoped and priced around the outcome, not a fixed subscription tier — here's how that actually works."
            level="h1"
            size="h1"
            align="center"
          />
        </div>
      </section>

      <Reveal>
        <section className={styles.section} aria-labelledby="factors-heading">
          <div className={styles.container}>
            <h2 id="factors-heading" className={styles.srOnly}>
              How pricing works
            </h2>
            <div className={styles.factorsGrid}>
              {PRICING_FACTORS.map((factor) => (
                <Card key={factor.title}>
                  <CardTitle>{factor.title}</CardTitle>
                  <CardBody>{factor.body}</CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="scoping-heading">
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Discover"
              heading="The investment gets scoped before you commit to anything."
              description="Pricing conversations happen during Discover, the first stage of How We Work — you'll have a specific figure in hand before any build work starts, not a vague range you have to chase down later."
              headingId="scoping-heading"
            />
            <div className={styles.actions}>
              <Button href="/#how-we-work-heading" linkComponent={NextLinkAdapter} emphasis="ghost">
                See the full process
              </Button>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section} aria-labelledby="shapes-heading">
          <div className={styles.container}>
            <h2 id="shapes-heading" className={styles.sectionLabel}>
              How engagements typically shape up
            </h2>
            <div className={styles.shapesGrid}>
              {ENGAGEMENT_SHAPES.map((shape) => (
                <Card key={shape.title} density="compact">
                  <CardTitle as="h3">{shape.title}</CardTitle>
                  <CardBody>{shape.body}</CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.sectionAlt} aria-labelledby="pricing-cta-heading">
          <div className={styles.container}>
            <h2 id="pricing-cta-heading" className={styles.ctaHeading}>
              The only way to get an actual number is to talk to us.
            </h2>
            <div className={styles.actions}>
              <Button href="/contact" linkComponent={NextLinkAdapter} emphasis="secondary">
                Book a strategy call
              </Button>
              <Button href="/faq" linkComponent={NextLinkAdapter} emphasis="ghost">
                Read the FAQ
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
