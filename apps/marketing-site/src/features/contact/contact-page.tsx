import { SectionHeading } from "@/shared/components/section-heading";
import { ContactForm } from "./contact-form";
import styles from "./contact-page.module.css";

/**
 * Master Vision Ch.14.1: Contact is "the terminal conversion point of the
 * entire site" and warrants its own dedicated page rather than staying an
 * in-page section. No scheduling-tool embed here — that would require a
 * real third-party account this project has no credentials for, and a
 * fake embed would be a worse trust failure than a plain form (Ch.17.4
 * calls forms "a critical trust surface"). See the Milestone 4 Completion
 * Report for the pre-launch checklist this produces (an ESP API key).
 */
export function ContactPage() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Contact"
          heading="How do I actually start?"
          description="Tell us what you're looking to build. A real person reads every message and responds within one business day — this isn't routed through a sales queue."
          level="h1"
          size="h1"
        />
        <div className={styles.grid}>
          <ContactForm />
          <aside className={styles.direct} aria-labelledby="direct-contact-heading">
            <h2 id="direct-contact-heading" className={styles.directHeading}>
              Prefer email?
            </h2>
            <p className={styles.directBody}>
              Reach us directly at{" "}
              <a className={styles.directLink} href="mailto:hello@tradyperch.com">
                hello@tradyperch.com
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
