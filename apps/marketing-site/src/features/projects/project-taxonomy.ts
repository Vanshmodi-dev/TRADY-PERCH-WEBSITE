import type { Project } from "./github-types";

/**
 * The filter bar's vocabulary, and the search that runs beside it.
 *
 * ── Distinct from `project-filters.ts` ────────────────────────────────────
 *
 * That module decides *publication*: which repositories are portfolio work at
 * all, using nine fine-grained categories. This one decides *navigation*: the
 * six or seven chips a visitor uses to narrow the grid. They are deliberately
 * different vocabularies — "Next.js" and "React" are useful classifications
 * and useless filters, because everything on this account matches both.
 *
 * Every predicate here reads the project's *inferred categories* and its own
 * GitHub topics. Nothing is hand-assigned per repository, so a new repo is
 * filed correctly the moment it is pushed, which is the entire premise of the
 * section.
 *
 * ── Pure, and deliberately client-safe ────────────────────────────────────
 *
 * No `server-only`, no environment access, no imports beyond a type. The
 * filter bar is a client island and needs these predicates; keeping them free
 * of the service layer is what allows that without pulling a GitHub token
 * anywhere near the browser bundle.
 */

export interface ProjectFilter {
  /** Stable identifier used in the URL query and as the React key. */
  readonly id: string;
  readonly label: string;
  /** Short description for the chip's accessible name. */
  readonly description: string;
  /** `null` on "All", which matches unconditionally. */
  readonly matches: ((project: Project) => boolean) | null;
}

/** Case-insensitive topic test against a repository's own GitHub topics. */
function hasTopic(project: Project, ...topics: readonly string[]): boolean {
  const owned = new Set(project.topics.map((topic) => topic.toLowerCase()));
  return topics.some((topic) => owned.has(topic));
}

function hasCategory(project: Project, ...categories: readonly string[]): boolean {
  return categories.some((category) => project.categories.includes(category));
}

/**
 * The filters, in display order.
 *
 * "All" leads and is always present. The rest are rendered only when at least
 * one project matches — see `availableFilters`. A chip that yields an empty
 * grid is worse than no chip: it advertises work that does not exist.
 */
export const PROJECT_FILTERS: readonly ProjectFilter[] = [
  {
    id: "all",
    label: "All",
    description: "Every published project",
    matches: null,
  },
  {
    id: "ai",
    label: "AI",
    description: "Language models, agents and applied machine learning",
    // Agent work is AI work: the publication vocabulary splits them because
    // the distinction is meaningful in a description, but a visitor filtering
    // for "AI" who is not shown the agents has been misled by a taxonomy.
    matches: (project) =>
      hasCategory(project, "AI", "Agent") ||
      hasTopic(project, "ai", "llm", "machine-learning", "rag", "agent", "agents", "chatbot"),
  },
  {
    id: "web",
    label: "Web",
    description: "Websites, storefronts and web applications",
    matches: (project) =>
      hasCategory(project, "Website") ||
      hasTopic(project, "website", "web", "webapp", "frontend", "landing-page", "ecommerce"),
  },
  {
    id: "automation",
    label: "Automation",
    description: "Pipelines, integrations and workflow systems",
    matches: (project) =>
      hasCategory(project, "Automation") ||
      hasTopic(project, "automation", "workflow", "pipeline", "scraper", "integration", "webhook"),
  },
  {
    id: "apps",
    label: "Apps",
    description: "Installable and mobile applications",
    matches: (project) =>
      hasTopic(project, "app", "application", "mobile", "ios", "android", "desktop", "electron", "react-native") ||
      hasCategory(project, "SaaS"),
  },
  {
    id: "open-source",
    label: "Open source",
    description: "Projects published under an explicit licence",
    // A licence, not merely public visibility. Every repository in this feed
    // is public; what distinguishes open source is a licence that says what
    // anyone else may do with it, and claiming the label without one is the
    // kind of overstatement this codebase's editorial rules exist to prevent.
    matches: (project) => project.license !== null || hasTopic(project, "open-source", "oss"),
  },
  {
    id: "internal",
    label: "Internal tools",
    description: "Tooling built for our own engineering practice",
    matches: (project) =>
      hasTopic(project, "internal", "internal-tool", "internal-tools", "tooling", "devtools") ||
      hasCategory(project, "Custom software"),
  },
] as const;

export const DEFAULT_FILTER_ID = "all";

/**
 * The filters worth rendering for a given feed: "All", plus every filter that
 * actually matches something.
 */
export function availableFilters(projects: readonly Project[]): ProjectFilter[] {
  return PROJECT_FILTERS.filter(
    (filter) => filter.matches === null || projects.some((project) => filter.matches?.(project)),
  );
}

/** How many projects a filter would show. Rendered as the chip's count. */
export function countFor(filter: ProjectFilter, projects: readonly Project[]): number {
  if (filter.matches === null) return projects.length;
  const predicate = filter.matches;
  return projects.filter((project) => predicate(project)).length;
}

/**
 * Search over the fields a visitor would plausibly type.
 *
 * Every term must match *something* (AND across terms, OR across fields), so
 * "python automation" narrows rather than widens. Matching is substring rather
 * than token-prefix: someone typing "auth" should find "authentication", and
 * on a corpus of a few dozen projects the precision cost is nil.
 */
export function matchesQuery(project: Project, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const haystack = [
    project.title,
    project.repoName,
    project.description ?? "",
    project.category,
    project.language ?? "",
    ...project.tags,
    ...project.topics,
    ...project.categories,
  ]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => haystack.includes(term));
}

/**
 * The grid's contents for a given filter and query.
 *
 * Order is never recomputed — `github-service.ts` already ranked the feed, and
 * re-sorting by "relevance" here would make the lead project move as the
 * visitor types, which reads as the page malfunctioning rather than as search
 * working.
 */
export function applyFilters(
  projects: readonly Project[],
  filterId: string,
  query: string,
): Project[] {
  const filter = PROJECT_FILTERS.find((candidate) => candidate.id === filterId);
  const predicate = filter?.matches ?? null;

  return projects.filter(
    (project) => (predicate === null || predicate(project)) && matchesQuery(project, query),
  );
}
