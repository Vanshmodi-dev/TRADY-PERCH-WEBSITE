import type { Project } from "./github-types";
import { SITE_URL } from "@/shared/site-config";

/**
 * schema.org structured data for `/work/projects` (Ch.40 §3).
 *
 * `CollectionPage` with an `ItemList` of `SoftwareSourceCode`, rather than
 * the `Article` shape the case-study pages use: these entries are source
 * repositories, and `SoftwareSourceCode` is the type that carries
 * `codeRepository` and `programmingLanguage` — the two fields that actually
 * describe what a visitor is looking at here.
 *
 * Projected from the same `Project[]` the grid renders, never hand-authored.
 * Structured data that disagrees with the visible page is a search-engine
 * penalty rather than a boost, and the only way to guarantee agreement is to
 * derive both from one source. This is the same one-array-two-projections
 * discipline `app/page.tsx` already applies to the FAQ schema.
 *
 * No `offers`/`price` field, per the site-wide zero-price-signal rule that
 * `scripts/schema-audit.mjs` enforces.
 */
export function buildProjectsSchema(projects: readonly Project[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description:
      "Open-source websites, AI agents and automation systems built by Trady Perch, generated directly from our public GitHub repositories.",
    url: `${SITE_URL}/work/projects`,
    isPartOf: { "@type": "WebSite", name: "Trady Perch", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        // 1-based: schema.org treats `position` as an ordinal, and a 0 is
        // rejected by Google's structured-data validator.
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.description ?? `${project.categories.join(", ")} project.`,
          codeRepository: project.githubUrl,
          url: project.liveUrl ?? project.githubUrl,
          // Omitted entirely rather than emitted as null when GitHub has not
          // detected a language — an empty value is worse than an absent one.
          ...(project.language ? { programmingLanguage: project.language } : {}),
          ...(project.tags.length > 0 ? { keywords: project.tags.join(", ") } : {}),
          dateModified: project.updatedAt,
          author: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
        },
      })),
    },
  };
}
