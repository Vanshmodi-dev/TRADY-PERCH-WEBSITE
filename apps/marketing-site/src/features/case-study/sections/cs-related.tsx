import { Link } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { ArrowIcon } from "@/features/projects/project-icons";
import type { CaseStudy } from "../case-study-types";
import { CaseStudySection } from "../components/cs-section";
import styles from "./cs-related.module.css";

/**
 * Related work.
 *
 * ── Why the whole card is one link here ───────────────────────────────────
 *
 * The portfolio grid's cards are deliberately *not* single links, because
 * each has several destinations (source, deployment, case study). These have
 * exactly one, so the entire surface being that link is both the correct
 * pattern (Ch.19 Cd-1) and by far the largest target — which matters for a
 * control whose job is to keep a reader who has finished one story moving to
 * the next.
 *
 * Renders nothing when there is no other case study to point at, rather than
 * a section containing one lonely card or, worse, a link back to itself.
 */

interface CaseStudyRelatedProps {
  related: readonly CaseStudy[];
}

export function CaseStudyRelated({ related }: CaseStudyRelatedProps) {
  if (related.length === 0) return null;

  return (
    <CaseStudySection
      id="related"
      eyebrow="Keep reading"
      heading="Other things we have built"
    >
      <ul className={styles.grid}>
        {related.map((study) => (
          <li key={study.slug} className={styles.item}>
            <Link
              href={`/work/${study.slug}`}
              linkComponent={NextLinkAdapter}
              className={styles.card}
            >
              <p className={styles.category}>{study.hero.category}</p>
              <h3 className={styles.title}>{study.hero.title}</h3>
              <p className={styles.body}>{study.hero.standfirst}</p>
              <span className={styles.action}>
                Read the case study
                <ArrowIcon className={styles.actionIcon} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}
