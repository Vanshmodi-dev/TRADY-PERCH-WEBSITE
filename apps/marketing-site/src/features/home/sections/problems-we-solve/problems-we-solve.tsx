import { BellOffIcon, HourglassIcon, KeyboardIcon, UnlinkIcon } from "@/shared/components/icons";
import { SectionHeading } from "@/shared/components/section-heading";
import styles from "./problems-we-solve.module.css";

const PROBLEMS = [
  { icon: KeyboardIcon, text: "Hours a week disappear into manual data entry." },
  { icon: BellOffIcon, text: "Leads go cold because follow-up depends on someone remembering." },
  { icon: HourglassIcon, text: "Quotes take days when they should take minutes." },
  { icon: UnlinkIcon, text: "Your tools don't talk to each other — so you do, manually, every time." },
];

/**
 * Master Vision Ch.13 item 4 / Ch.16.3: named concrete pain points, second
 * person, so the visitor recognizes their own operation rather than reading
 * generic "inefficiency" language.
 */
export function ProblemsWeSolve() {
  return (
    <section className={styles.section} aria-labelledby="problems-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Sound familiar?"
          heading="The busywork you've stopped noticing is still costing you."
          description="None of this is a technology problem you don't understand — it's a set of specific, recognizable friction points most growing businesses just learn to live with."
          headingId="problems-heading"
        />
        <ul className={styles.list}>
          {PROBLEMS.map(({ icon: Icon, text }) => (
            <li key={text} className={styles.item}>
              <Icon className={styles.icon} aria-hidden="true" />
              <p className={styles.itemText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
