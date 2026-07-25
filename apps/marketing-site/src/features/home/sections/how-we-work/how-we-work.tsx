import { SectionHeading } from "@/shared/components/section-heading";
import styles from "./how-we-work.module.css";

const STEPS = [
  {
    title: "Discover",
    body: "We learn how your business actually runs — not how a generic template assumes it does.",
  },
  {
    title: "Design",
    body: "We map the exact system before writing a line of code, so you know what you're getting before you commit to it.",
  },
  {
    title: "Build",
    body: "Real engineering, tested against your actual workflows — not a demo dressed up to look finished.",
  },
  {
    title: "Deploy",
    body: "We roll it out carefully, alongside your team, so the transition doesn't disrupt the work still in flight.",
  },
  {
    title: "Support",
    body: "We stay involved after launch — a system nobody maintains slowly stops working, quietly, until it doesn't.",
  },
];

/**
 * Master Vision Ch.13 item 7 / Ch.16.3: "short, numbered, confident... a
 * promise of a controlled process." Step numerals are NOT gold — Ch.4
 * Ty-5's proof-point treatment applies to result/metric numerals, not
 * ordinal sequence markers (the same "incidental numeral" exception that
 * covers page numbers).
 */
export function HowWeWork() {
  return (
    <section className={styles.section} aria-labelledby="how-we-work-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="How We Work"
          heading="A repeatable process, not an open-ended engagement."
          description="Five stages, every time — so you always know what happens next."
          headingId="how-we-work-heading"
          align="center"
        />
        <ol className={styles.sequence}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
