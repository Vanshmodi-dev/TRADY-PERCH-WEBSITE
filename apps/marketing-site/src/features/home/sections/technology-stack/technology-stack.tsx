import {
  CloudIcon,
  DataIcon,
  IntegrationIcon,
  ShieldIcon,
  SparkIcon,
  WorkflowIcon,
} from "@/shared/components/icons";
import styles from "./technology-stack.module.css";

const DISCIPLINES = [
  { icon: SparkIcon, label: "Large Language Models" },
  { icon: WorkflowIcon, label: "Workflow Orchestration" },
  { icon: IntegrationIcon, label: "Systems Integration" },
  { icon: CloudIcon, label: "Cloud Infrastructure" },
  { icon: DataIcon, label: "Data Pipelines" },
  { icon: ShieldIcon, label: "Enterprise Security" },
];

/**
 * Master Vision Ch.13 item 3. Purpose: answer "is this real engineering,"
 * quietly, before any sales language. No named third-party vendor logos
 * are shown — this repo has no confirmed technology-partner relationships
 * to claim, and fabricating specific vendor logos would be a false claim,
 * not a design shortcut. Disciplines, not brand marks, carry the same
 * credibility signal honestly.
 */
export function TechnologyStack() {
  return (
    <section className={styles.section} aria-labelledby="technology-stack-heading">
      <div className={styles.container}>
        <h2 id="technology-stack-heading" className={styles.label}>
          Built on real engineering disciplines
        </h2>
        <ul className={styles.grid}>
          {DISCIPLINES.map(({ icon: Icon, label }) => (
            <li key={label} className={styles.item}>
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={styles.itemLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
