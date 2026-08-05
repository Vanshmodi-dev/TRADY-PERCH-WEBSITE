import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { ProjectsAtmosphere } from "@/features/projects/projects-atmosphere";
import styles from "./cs-cta.module.css";

/**
 * The closing conversion section.
 *
 * ── Why the copy is written the way it is ─────────────────────────────────
 *
 * A reader who reaches this point has just spent several minutes on
 * architecture decisions and tradeoffs. They are not deciding whether to
 * "learn more" — they are deciding whether these are the people to build
 * their thing. So the heading names that decision, and the primary action
 * describes what actually happens next rather than what it is called
 * internally: "Start a conversation", not "Contact us", and certainly not
 * "Submit".
 *
 * The secondary action is deliberately low-commitment. A single primary CTA
 * with no alternative sends a reader who is interested but not ready straight
 * to the browser's Back button; an escape hatch keeps them on the site.
 */

interface CaseStudyCtaProps {
  cta?: { heading: string; body?: string };
}

const DEFAULT_HEADING = "Let's build the thing you can't buy off the shelf.";
const DEFAULT_BODY =
  "If you have read this far, you already know how we work. Tell us what you are trying to build and we will tell you honestly whether we are the right people for it.";

export function CaseStudyCta({ cta }: CaseStudyCtaProps) {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <ProjectsAtmosphere />

      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowMark} aria-hidden="true" />
          What happens next
        </p>

        <h2 id="cta-heading" className={styles.heading}>
          {cta?.heading ?? DEFAULT_HEADING}
        </h2>

        <p className={styles.body}>{cta?.body ?? DEFAULT_BODY}</p>

        <div className={styles.actions}>
          <Button href="/contact" linkComponent={NextLinkAdapter} size="lg">
            Start a conversation
          </Button>
          <Button href="/work/projects" linkComponent={NextLinkAdapter} emphasis="ghost" size="lg">
            See more work
          </Button>
        </div>
      </div>
    </section>
  );
}
