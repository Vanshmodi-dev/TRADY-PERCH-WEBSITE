import { Button } from "@trady-perch/ui";
import { ExternalIcon, GitHubIcon } from "@/features/projects/project-icons";
import { STATUS_COPY, formatAbsoluteDate, formatRelativeTime } from "@/features/projects/project-format";
import type { Project } from "@/features/projects/github-types";
import type { CaseStudyFact, CaseStudySnapshot } from "../case-study-types";
import { CaseStudyCounter } from "../components/cs-counter";
import styles from "./cs-snapshot.module.css";

/**
 * The executive summary — the whole project in fifteen seconds.
 *
 * ── Why an open list of facts, not named fields ───────────────────────────
 *
 * The requirement is that this survives future fields — client, budget,
 * region, users served, compliance, API count — without a redesign. A schema
 * of named properties cannot do that: each new one needs a slot, and the slot
 * needs a place in the layout.
 *
 * So the panel renders `CaseStudyFact[]`, and the grid is
 * `repeat(auto-fit, minmax(...))`. Six facts or sixteen, the layout reflows
 * and stays balanced. Adding "Compliance: SOC 2" is a one-line data edit.
 *
 * ── Curated facts, then live ones ─────────────────────────────────────────
 *
 * Authored facts (duration, team, platform) come from the case-study data.
 * Live facts (status, last updated, language) are derived from the GitHub
 * feed and appended, so they cannot go stale in the prose. Neither list
 * knows about the other; both are just facts by the time they reach the grid.
 *
 * A Server Component apart from the counters, which are small client islands
 * that already have their real value in the server-rendered HTML.
 */

interface CaseStudySnapshotProps {
  snapshot?: CaseStudySnapshot;
  project: Project | null;
  /**
   * Technology names for the panel's badge row.
   *
   * Sourced from the study's own `stack` — the authored, grouped list — and
   * flattened here. Falls back to the project's auto-derived tags only when
   * no stack has been written. That ordering matters: the derived tags come
   * from the portfolio keyword matcher, which for this site's own repository
   * produces the single word "Website" — technically correct and useless as a
   * technology summary next to a hand-written six-group stack.
   */
  technologies?: readonly string[];
  /** Semantic version or release label, when the project publishes one. */
  version?: string;
}

/**
 * Facts derived from the live feed rather than authored.
 *
 * Deliberately additive and last: a hand-written "Status: Live" would be
 * wrong the moment a deployment goes down, whereas this is read from the same
 * hourly-revalidated source as the portfolio grid.
 */
function liveFacts(project: Project | null): CaseStudyFact[] {
  if (!project) return [];

  const facts: CaseStudyFact[] = [
    { label: "Status", value: STATUS_COPY[project.status].label },
    { label: "Built", value: String(project.buildYear) },
  ];

  if (project.language) {
    facts.push({ label: "Primary language", value: project.language });
  }

  facts.push({
    label: "Last updated",
    value: formatRelativeTime(project.updatedAt),
    note: formatAbsoluteDate(project.updatedAt),
  });

  return facts;
}

function FactCell({ fact }: { fact: CaseStudyFact }) {
  return (
    // <div> inside a <dl>, not a bare dt/dd pair: the wrapper is what lets
    // each fact be a grid cell, and a <div> between <dl> and <dt> is
    // explicitly permitted by HTML for exactly this grouping purpose.
    <div className={styles.fact}>
      <dt className={styles.factLabel}>{fact.label}</dt>
      <dd className={styles.factValue}>
        {typeof fact.countTo === "number" ? (
          <CaseStudyCounter value={fact.countTo} suffix={fact.suffix ?? ""} />
        ) : (
          fact.value
        )}
      </dd>
      {fact.note ? <dd className={styles.factNote}>{fact.note}</dd> : null}
    </div>
  );
}

export function CaseStudySnapshotSection({
  snapshot,
  project,
  technologies,
  version,
}: CaseStudySnapshotProps) {
  const authored = snapshot?.facts ?? [];
  const live = liveFacts(project);
  const versionFact: CaseStudyFact[] = version ? [{ label: "Version", value: version }] : [];
  const facts = [...authored, ...live, ...versionFact];

  const stack = technologies?.length ? technologies : (project?.tags ?? []);
  const hasActions = Boolean(project?.liveUrl || project?.githubUrl);
  if (facts.length === 0 && stack.length === 0 && !hasActions) return null;

  return (
    <section className={styles.section} aria-labelledby="snapshot-heading">
      <div className={styles.container}>
        {/*
          Visually hidden. The panel is designed to be read at a glance rather
          than introduced, and a visible "Project snapshot" heading directly
          under the hero would be the third stacked title in a row. The
          landmark still needs a name, so the heading stays in the document.
        */}
        <h2 id="snapshot-heading" className={styles.srOnly}>
          Project snapshot
        </h2>

        <div className={styles.panel}>
          {facts.length > 0 ? (
            <dl className={styles.grid}>
              {facts.map((fact) => (
                <FactCell key={fact.label} fact={fact} />
              ))}
            </dl>
          ) : null}

          {stack.length > 0 ? (
            <div className={styles.stackRow}>
              <p className={styles.stackLabel} id="snapshot-stack-label">
                Technology
              </p>
              <ul className={styles.stack} aria-labelledby="snapshot-stack-label">
                {stack.map((item) => (
                  <li key={item} className={styles.stackItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasActions && project ? (
            <div className={styles.actions}>
              {project.liveUrl ? (
                <Button
                  href={project.liveUrl}
                  emphasis="secondary"
                  size="sm"
                  target="_blank"
                  trailingIcon={<ExternalIcon className={styles.actionIcon} />}
                  aria-label={`Open the live deployment (opens in a new tab)`}
                >
                  Live demo
                </Button>
              ) : null}
              <Button
                href={project.githubUrl}
                emphasis="ghost"
                size="sm"
                target="_blank"
                leadingIcon={<GitHubIcon className={styles.actionIcon} />}
                aria-label={`View the ${project.repoName} repository on GitHub (opens in a new tab)`}
              >
                Repository
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
