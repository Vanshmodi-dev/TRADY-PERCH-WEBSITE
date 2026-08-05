import type {
  CaseStudyChallenge,
  CaseStudyChapter,
  CaseStudyDecision,
  CaseStudyEngineeringLayer,
  CaseStudyStackGroup,
  CaseStudyTestimonial,
} from "../case-study-types";
import { CaseStudySection } from "../components/cs-section";
import styles from "./cs-blocks.module.css";

/**
 * The prose and card chapters: Overview, Challenge, Research, Solution,
 * Engineering, Technology Stack, Testimonials.
 *
 * ── Why these seven share a file ──────────────────────────────────────────
 *
 * Features, Gallery, Timeline, Results, Related and the CTA each own a
 * genuinely distinct layout engine and live in their own modules. These seven
 * do not: every one is a heading plus either paragraphs or a card grid, all
 * on the same measure and the same spacing scale. Splitting them into seven
 * near-identical files would spread one design across seven places to change,
 * which is how a "reusable system" quietly becomes seven bespoke sections.
 *
 * Every export returns `null` when its data is absent, so the page composes
 * the whole set unconditionally and a short case study simply renders fewer.
 */

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

export function CaseStudyOverview({ overview }: { overview?: CaseStudyChapter }) {
  if (!overview) return null;

  return (
    <CaseStudySection
      id="overview"
      eyebrow="Overview"
      heading={overview.heading}
      lede={overview.lede}
      width="prose"
    >
      <div className={styles.prose}>
        {overview.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </CaseStudySection>
  );
}

/* ------------------------------------------------------------------ */
/* Challenge                                                           */
/* ------------------------------------------------------------------ */

export function CaseStudyChallenges({
  challenges,
}: {
  challenges?: { lede?: string; items: readonly CaseStudyChallenge[] };
}) {
  if (!challenges || challenges.items.length === 0) return null;

  return (
    <CaseStudySection
      id="challenge"
      eyebrow="The challenge"
      heading="What made this hard"
      lede={challenges.lede}
      tone="alt"
    >
      <ul className={styles.cardGrid}>
        {challenges.items.map((item, index) => (
          <li key={item.title} className={styles.card}>
            {/* The index is presentational — a numbered set reads as a
                considered list rather than an arbitrary pile — so it is
                hidden from assistive technology, which already gets the
                count from the list itself. */}
            <span className={styles.cardIndex} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}

/* ------------------------------------------------------------------ */
/* Research & strategy                                                 */
/* ------------------------------------------------------------------ */

export function CaseStudyResearch({
  research,
}: {
  research?: { lede?: string; decisions: readonly CaseStudyDecision[] };
}) {
  if (!research || research.decisions.length === 0) return null;

  return (
    <CaseStudySection
      id="research"
      eyebrow="Research & strategy"
      heading="The decisions behind it"
      lede={research.lede}
    >
      <div className={styles.decisions}>
        {research.decisions.map((decision) => (
          <article key={decision.question} className={styles.decision}>
            <h3 className={styles.decisionQuestion}>{decision.question}</h3>

            <p className={styles.decisionChoice}>
              <span className={styles.decisionLabel}>Chose</span>
              {decision.choice}
            </p>

            <p className={styles.decisionBody}>{decision.rationale}</p>

            {/* The tradeoff is the part that makes the rest credible. A list
                of decisions where nothing was given up reads as a sales
                document to anyone who has made these choices themselves. */}
            {decision.tradeoff ? (
              <p className={styles.decisionTradeoff}>
                <span className={styles.decisionLabel}>Tradeoff</span>
                {decision.tradeoff}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </CaseStudySection>
  );
}

/* ------------------------------------------------------------------ */
/* Solution                                                            */
/* ------------------------------------------------------------------ */

export function CaseStudySolution({ solution }: { solution?: CaseStudyChapter }) {
  if (!solution) return null;

  return (
    <CaseStudySection
      id="solution"
      eyebrow="The solution"
      heading={solution.heading}
      lede={solution.lede}
      width="prose"
      tone="alt"
    >
      <div className={styles.prose}>
        {solution.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </CaseStudySection>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

export function CaseStudyEngineering({
  engineering,
}: {
  engineering?: { lede?: string; layers: readonly CaseStudyEngineeringLayer[] };
}) {
  if (!engineering || engineering.layers.length === 0) return null;

  return (
    <CaseStudySection
      id="engineering"
      eyebrow="Engineering"
      heading="How it is built"
      lede={engineering.lede}
    >
      {/* A definition list, because that is exactly the shape of the content:
          each layer is a term and its description. The visual rendering is a
          two-column editorial layout; the semantics stay correct underneath. */}
      <dl className={styles.layers}>
        {engineering.layers.map((layer) => (
          <div key={layer.area} className={styles.layer}>
            <dt className={styles.layerArea}>{layer.area}</dt>
            <dd className={styles.layerBody}>
              <p className={styles.layerSummary}>{layer.summary}</p>
              {layer.detail && layer.detail.length > 0 ? (
                <ul className={styles.layerDetail}>
                  {layer.detail.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </CaseStudySection>
  );
}

/* ------------------------------------------------------------------ */
/* Technology stack                                                    */
/* ------------------------------------------------------------------ */

export function CaseStudyStack({ stack }: { stack?: readonly CaseStudyStackGroup[] }) {
  if (!stack || stack.length === 0) return null;

  return (
    <CaseStudySection
      id="stack"
      eyebrow="Technology"
      heading="The stack, by layer"
      lede="Grouped the way the system is actually organised, not as an alphabetical logo wall."
      tone="alt"
    >
      <div className={styles.stackGroups}>
        {stack.map((group) => (
          <section key={group.group} className={styles.stackGroup} aria-labelledby={`stack-${group.group}`}>
            <h3 id={`stack-${group.group}`} className={styles.stackGroupTitle}>
              {group.group}
            </h3>
            <ul className={styles.stackList}>
              {group.items.map((item) => (
                <li key={item} className={styles.stackBadge}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </CaseStudySection>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

/**
 * Renders nothing at all when no testimonial exists — which is the current
 * state for every project here, and is why the section hides rather than
 * showing an empty frame or a placeholder quote. An invented endorsement on a
 * page built to be verifiable would undo the whole page.
 */
export function CaseStudyTestimonials({
  testimonials,
}: {
  testimonials?: readonly CaseStudyTestimonial[];
}) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <CaseStudySection id="testimonials" eyebrow="In their words" heading="What the client said">
      <div className={styles.quotes}>
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className={styles.quote}>
            <blockquote className={styles.quoteBody}>
              <p>{testimonial.quote}</p>
            </blockquote>
            <figcaption className={styles.quoteAttribution}>
              <span className={styles.quoteName}>{testimonial.name}</span>
              <span className={styles.quoteRole}>
                {testimonial.role}, {testimonial.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </CaseStudySection>
  );
}
