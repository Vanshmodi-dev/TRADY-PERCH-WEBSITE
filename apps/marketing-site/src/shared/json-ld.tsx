// Product Implementation Constitution Ch.40 §3 — structured data, defined
// once per page template. Extracted here once a third page template
// (case studies, after home-page.tsx and faq's route file) needed the
// identical safe-serialization + <script> embedding, previously
// duplicated verbatim in each.

/** Escapes "<" so a content value can never accidentally close the
 * surrounding <script> tag — Next.js's documented safe-embedding pattern
 * for inline JSON-LD. */
function toSafeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Controlled, non-user-supplied JSON-LD only — every caller in this
 * codebase passes a schema.org object built from typed, authored content
 * data, never raw user input. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(data) }} />;
}
