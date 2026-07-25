import { Reveal } from "@trady-perch/ui";
import { CaseStudies } from "./sections/case-studies/case-studies";
import { Faq } from "./sections/faq/faq";
import { FinalCta } from "./sections/final-cta/final-cta";
import { Hero } from "./sections/hero/hero";
import { IntroSequence } from "./sections/hero/intro-sequence";
import { HowWeWork } from "./sections/how-we-work/how-we-work";
import { Industries } from "./sections/industries/industries";
import { InteractiveAiDemo } from "./sections/interactive-ai-demo/interactive-ai-demo";
import { Portfolio } from "./sections/portfolio/portfolio";
import { PricingPhilosophy } from "./sections/pricing-philosophy/pricing-philosophy";
import { ProblemsWeSolve } from "./sections/problems-we-solve/problems-we-solve";
import { Solutions } from "./sections/solutions/solutions";
import { Testimonials } from "./sections/testimonials/testimonials";
import { TechnologyStack } from "./sections/technology-stack/technology-stack";

/**
 * Master Vision Ch.13 (Homepage Blueprint) + Ch.11.2 (Visitor's Internal
 * Monologue) + Ch.4.3 (Section-by-Section Emotional Specification). This
 * order is load-bearing, not a reasonable default (Ch.4.4: "Emotional
 * Debt") — sections answer the visitor's questions in the exact sequence
 * they're actually asked, and may not be reordered, compressed, or
 * skipped. Navigation (item 1) and Footer (item 15) are already rendered
 * by the root layout (Milestone 2); this component owns items 2–14.
 *
 * No top-level <main> here — the root layout already provides the page's
 * one <main> landmark around {children}.
 *
 * Milestone 5 / Ch.9.3 (Scroll Choreography): every section past the
 * first viewport reveals as it's scrolled to, wrapped here rather than in
 * each section file — Reveal wraps whole sections, not individual cards
 * within them, so Ch.40 Ag-2's "no more than three simultaneously
 * animating elements" is satisfied by construction (ordinary scrolling
 * brings sections into view one at a time). Hero is deliberately excluded:
 * it's the only section visible without scrolling at all, so there's
 * nothing to "reveal" — it keeps its own bespoke mount-triggered stagger
 * instead (see hero.tsx).
 */
export function HomePage() {
  return (
    <>
      <IntroSequence />
      <Hero />
      <Reveal>
        <TechnologyStack />
      </Reveal>
      <Reveal>
        <ProblemsWeSolve />
      </Reveal>
      <Reveal>
        <Solutions />
      </Reveal>
      <Reveal>
        <Industries />
      </Reveal>
      <Reveal>
        <HowWeWork />
      </Reveal>
      <Reveal>
        <Portfolio />
      </Reveal>
      <Reveal>
        <CaseStudies />
      </Reveal>
      <Reveal>
        <InteractiveAiDemo />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <PricingPhilosophy />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
