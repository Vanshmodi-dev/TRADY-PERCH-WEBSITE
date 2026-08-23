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
 * Shared layout for /privacy and /terms.
 *
 * These documents have not been reviewed by a lawyer. That remains true and
 * is worth knowing internally, but it belonged in this comment rather than in
 * a notice rendered to every visitor: a banner announcing that a live
 * company's own terms are unfinished undermines the document it sits above,
 * and tells a prospective client something about the business that has
 * nothing to do with their privacy or their rights.
 *
 * The remedy is a legal review, not a disclaimer. Until one happens, the
 * pages state only what is actually true of this site — see the note in the
 * audit report about the sections a real review would be expected to add.
 */
export function LegalDocumentPage({ title, lastUpdated, sections }: LegalDocumentPageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.updated}>Last updated: {lastUpdated}</p>
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
