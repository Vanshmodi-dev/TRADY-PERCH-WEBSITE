import styles from "./legal-document-page.module.css";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalDocumentPageProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Standard, reasonable template content for an early-stage service
 * business — not a substitute for review by qualified legal counsel
 * before this site takes real visitors. Flagged honestly (the notice
 * below, and the Milestone 4 Completion Report's pre-launch checklist)
 * rather than presented as finished legal advice, consistent with the
 * disclosure pattern already used for the AI demo and Portfolio content.
 */
export function LegalDocumentPage({ title, lastUpdated, sections }: LegalDocumentPageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.updated}>Last updated: {lastUpdated}</p>
        <div className={styles.notice} role="note">
          This is template content prepared as part of the site build, not a substitute for review
          by qualified legal counsel — it should be reviewed and adapted before this site is used
          with real visitors.
        </div>
        <div className={styles.body}>
          {sections.map((section) => (
            <div key={section.heading} className={styles.docSection}>
              <h2 className={styles.docSectionHeading}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                // Static, unreordered content authored once at build time —
                // index is a stable, appropriate key here.
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
