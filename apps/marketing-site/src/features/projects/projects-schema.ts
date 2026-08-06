import type { ProjectDetail } from "./github-detail-types";
import type { Project } from "./github-types";
import { SITE_URL } from "@/shared/site-config";

/** The canonical, absolute URL of a project's case study page. */
export function projectUrl(slug: string): string {
  return `${SITE_URL}/work/projects/${slug}`;
}

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
    url: `${SITE_URL}/work`,
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
          // The case study on this site, not the repository: `url` is the
          // canonical page *about* the item, and pointing it at GitHub tells a
          // crawler this site has no page for something it demonstrably does.
          url: projectUrl(project.slug),
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

/**
 * Structured data for one project's case study page.
 *
 * `SoftwareSourceCode` again rather than `Article`, for the same reason: the
 * page's subject is a repository, and this is the type carrying
 * `codeRepository`, `programmingLanguage` and `codeSampleType`. The written
 * case studies under `/work/<slug>` remain `Article`, because their subject is
 * a piece of writing about an engagement.
 *
 * Every value is projected from the same `ProjectDetail` the page renders. No
 * `aggregateRating`, no `offers` — the first would need reviews this site does
 * not collect, and the second is barred site-wide by `scripts/schema-audit.mjs`.
 */
export function buildProjectDetailSchema(detail: ProjectDetail): Record<string, unknown> {
  const { project, stats } = detail;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    alternateName: project.repoName,
    description: project.description ?? `${project.categories.join(", ")} project.`,
    url: projectUrl(project.slug),
    codeRepository: project.githubUrl,
    dateCreated: stats.createdAt,
    dateModified: stats.pushedAt,
    ...(project.language ? { programmingLanguage: project.language } : {}),
    ...(detail.topics.length > 0 ? { keywords: detail.topics.join(", ") } : {}),
    // Only when the repository declares a licence. A missing licence is a
    // meaningful absence — see the "Open source" filter's own reasoning.
    ...(stats.license ? { license: stats.license } : {}),
    // The generated OG card doubles as the page's social image, so the two
    // cannot drift apart.
    image: project.openGraphImageUrl,
    author: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
    maintainer: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
    isPartOf: {
      "@type": "CollectionPage",
      name: "Projects",
      url: `${SITE_URL}/work`,
    },
    ...(project.liveUrl
      ? {
          // A reachable deployment is genuinely a different entity from the
          // source, so it is expressed as one rather than folded into `url`.
          targetProduct: {
            "@type": "SoftwareApplication",
            name: project.title,
            url: project.liveUrl,
            applicationCategory: "WebApplication",
            operatingSystem: "Any",
          },
        }
      : {}),
  };
}

/**
 * The breadcrumb trail for a project page.
 *
 * Mirrors the visible `<nav aria-label="Breadcrumb">` in `detail-hero.tsx`
 * exactly. Structured data describing a trail the page does not show is the
 * textbook mismatch Google demotes for.
 */
export function buildProjectBreadcrumbSchema(project: Project): Record<string, unknown> {
  // Two crumbs. `/work` is the portfolio itself, so the "Projects" crumb this
  // trail used to carry would name the same page twice — and point at a
  // redirect. `detail-hero.tsx` renders exactly this trail.
  const trail = [
    { name: "Work", url: `${SITE_URL}/work` },
    { name: project.title, url: projectUrl(project.slug) },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
