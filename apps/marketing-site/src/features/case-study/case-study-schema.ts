import { SITE_URL } from "@/shared/site-config";
import type { Project } from "@/features/projects/github-types";
import type { CaseStudy } from "./case-study-types";

/**
 * Structured data for a case study (Ch.40 §3).
 *
 * Two blocks, both projected from the same object the page renders — never
 * hand-authored. Structured data that disagrees with the visible page is a
 * search penalty rather than a boost, and deriving both from one source is
 * the only way to guarantee they agree.
 */

/** Canonical URL for a case study. One definition, used by the page metadata,
 *  both schema blocks and the sitemap, so they cannot drift. */
export function caseStudyUrl(slug: string): string {
  return `${SITE_URL}/work/${slug}`;
}

/**
 * `Article` rather than `CreativeWork` or `Product`: this is a written piece
 * *about* a project, which is exactly what Article describes. Tagging it as
 * the software itself would misrepresent the page to a crawler.
 *
 * No `offers`, `price` or `priceRange` — the site-wide zero-price-signal rule
 * that `scripts/schema-audit.mjs` enforces on every emitted block.
 */
export function buildCaseStudyArticleSchema(
  study: CaseStudy,
  project: Project | null,
): Record<string, unknown> {
  const url = caseStudyUrl(study.slug);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.seo?.title ?? study.hero.title,
    description: study.seo?.description ?? study.hero.standfirst,
    url,
    author: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
    isPartOf: { "@type": "WebSite", name: "Trady Perch", url: SITE_URL },
    articleSection: study.hero.category,
    // Omitted rather than emitted as null when the feed is unavailable: a
    // dateModified a crawler cannot trust is worse than none at all.
    ...(project ? { dateModified: project.updatedAt } : {}),
    ...(study.hero.image ? { image: [`${SITE_URL}${study.hero.image.src}`] } : {}),
    ...(project?.tags.length ? { keywords: project.tags.join(", ") } : {}),
    ...(study.repoName && project
      ? {
          about: {
            "@type": "SoftwareSourceCode",
            name: study.hero.title,
            codeRepository: project.githubUrl,
            ...(project.language ? { programmingLanguage: project.language } : {}),
          },
        }
      : {}),
  };
}

/**
 * `BreadcrumbList` for the Work → Projects → this-study trail.
 *
 * Mirrors the visible `<nav aria-label="Breadcrumb">` in the hero exactly.
 * Breadcrumb markup with no on-page counterpart is precisely the mismatch
 * Google's structured-data guidelines call out, so the two are built to the
 * same three-item shape and a test asserts they stay that way.
 */
export function buildBreadcrumbSchema(study: CaseStudy): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/work/projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: study.hero.title,
        item: caseStudyUrl(study.slug),
      },
    ],
  };
}
