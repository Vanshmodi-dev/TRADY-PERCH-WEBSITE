import "server-only";

import { env } from "@/shared/env";
import { fetchRepositories } from "./github-api";
import { isPublishableRepository, matchCategories, normaliseTopics } from "./project-filters";
import { editorialFor } from "./project-editorial";
import { findCaseStudyForRepo } from "@/features/case-study/case-study-data";
import type { GitHubRepository, Project, ProjectStatus, ProjectsResult } from "./github-types";

/**
 * Turns raw GitHub repositories into the `Project[]` the portfolio renders.
 *
 * This module owns every editorial decision about the feed — which repos
 * qualify, how they are ordered, what a badge says — so `github-api.ts` stays
 * a pure transport layer and the components stay pure presentation.
 */

/**
 * Badge ceiling per card. Six is where the badge row wraps to a third line at
 * the narrowest card width (320px viewport), which unbalances the grid; the
 * cap keeps every card's badge region to at most two lines.
 */
const MAX_TAGS_PER_PROJECT = 6;

/** Words that stay capitalised when a repo name is humanised into a title. */
const TITLE_ACRONYMS = new Set([
  "ai", "api", "cli", "crm", "css", "erp", "html", "http", "id", "io", "llm",
  "mcp", "ml", "nlp", "ocr", "pdf", "rag", "sdk", "seo", "sql", "ui",
  "ux", "url", "b2b", "b2c",
]);

/**
 * Names whose humanised form keeps a specific vendor casing.
 *
 * `saas` lives here rather than in the acronym set above: it is not a
 * uniformly-uppercase initialism, and treating it as one produced the badge
 * "SAAS" next to the category badge "SaaS" — visibly two spellings of the
 * same word on one card.
 */
const TITLE_SPECIAL_CASE = new Map([
  ["nextjs", "Next.js"],
  ["nodejs", "Node.js"],
  ["saas", "SaaS"],
  ["js", "JS"],
  ["ts", "TS"],
]);

/**
 * `TRADY-PERCH-REVIEWS-ENGINE` -> `Trady Perch Reviews Engine`
 * `ai-agent-sdk`               -> `AI Agent SDK`
 *
 * Repository names are machine identifiers; rendering them raw puts
 * `SCREAMING-KEBAB-CASE` into an h3 on a page whose entire premise is premium
 * presentation. The original name is still shown — as the GitHub link's
 * accessible label — so nothing is hidden, only titled.
 */
export function toDisplayTitle(repoName: string): string {
  const words = repoName.split(/[-_.\s]+/).filter(Boolean);
  if (words.length === 0) return repoName;

  return words
    .map((word) => {
      const lower = word.toLowerCase();
      const special = TITLE_SPECIAL_CASE.get(lower);
      if (special) return special;
      if (TITLE_ACRONYMS.has(lower)) return lower.toUpperCase();
      // Already mixed-case (`myApp`, `GitHub`) is an author's deliberate
      // casing — preserve it rather than flattening to `Myapp`.
      if (word !== word.toLowerCase() && word !== word.toUpperCase()) return word;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/**
 * A repo's `homepage` field, but only if it is a usable public https URL.
 *
 * GitHub accepts free text in `homepage` — people put `coming soon`,
 * `localhost:3000`, and bare domains in it. Rendering an unvalidated value as
 * a "Live Demo" href produces a dead button at best; `javascript:` in that
 * field would be an XSS sink at worst. Only absolute http(s) URLs survive.
 */
export function toLiveUrl(homepage: string | null): string | null {
  const raw = homepage?.trim();
  if (!raw) return null;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    // Bare domains (`tradyperch.com`) are common and recoverable — a missing
    // scheme is a typo, not a different intent. Anything still unparseable
    // after this is genuinely not a URL.
    try {
      parsed = new URL(`https://${raw}`);
    } catch {
      return null;
    }
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  // A localhost or bare-hostname URL is someone's dev note, not a live demo.
  if (!parsed.hostname.includes(".") || parsed.hostname === "localhost") return null;

  return parsed.toString();
}

/**
 * GitHub's generated Open Graph card for a repository (1200x600).
 *
 * The leading path segment is a cache key that GitHub echoes rather than
 * validates. Deriving it from `pushed_at` means the image URL changes when
 * the repo changes — so a card refreshes after a push instead of serving a
 * stale card forever — while staying byte-identical between builds for an
 * untouched repo, which is what keeps it cacheable at all.
 */
export function toOpenGraphImageUrl(repo: GitHubRepository): string {
  const cacheKey = Date.parse(repo.pushed_at ?? repo.updated_at);
  const segment = Number.isFinite(cacheKey) ? String(cacheKey) : "1";
  return `https://opengraph.githubassets.com/${segment}/${repo.owner?.login ?? ""}/${repo.name}`;
}

/**
 * Badges for a card: the repo's own topics first, then the categories it
 * matched.
 *
 * Ordering matters because the list is truncated. A hand-written topic is the
 * author's own description of the project and is always more informative than
 * a category this code inferred, so topics claim the limited slots first and
 * inferred categories fill whatever remains.
 *
 * The primary language is deliberately *not* a badge. It already has its own
 * dedicated slot in the card's meta row, rendered with GitHub's familiar
 * coloured dot — emitting it here too put "Python" on the same card twice,
 * once as a pill and once beside a dot, which reads as a bug rather than as
 * emphasis. The brief lists "Technology badges" and "Primary language" as
 * separate card elements, and this is what keeps them separate.
 */
export function toTags(repo: GitHubRepository, categories: readonly string[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];

  const push = (value: string | null | undefined) => {
    const label = value?.trim();
    if (!label) return;
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    tags.push(label);
  };

  // Topics arrive lowercase-hyphenated from GitHub (`lead-generation`);
  // presented as written words to match the rest of the site's typography.
  for (const topic of normaliseTopics(repo.topics)) {
    push(toDisplayTitle(topic));
  }
  for (const category of categories) push(category);

  return tags.slice(0, MAX_TAGS_PER_PROJECT);
}

/**
 * How recently a repository must have been pushed to count as `active`.
 *
 * Ninety days, not thirty: a finished, working system is not stale because
 * nobody touched it last month, and a thirty-day window would mark a
 * completed project "maintained" almost immediately. A quarter is long
 * enough that the label means "this is current work" without being so long
 * that it means nothing.
 */
const ACTIVE_WINDOW_DAYS = 90;

/**
 * Status is derived from evidence, never asserted.
 *
 * `live` outranks `active` because a reachable deployment is a stronger
 * claim than a recent commit, and a visitor reading one badge should get the
 * strongest true thing about the project.
 */
export function toStatus(
  liveUrl: string | null,
  pushedAt: string,
  now: number = Date.now(),
): ProjectStatus {
  if (liveUrl) return "live";

  const pushed = Date.parse(pushedAt);
  if (!Number.isFinite(pushed)) return "maintained";

  const daysSincePush = (now - pushed) / 86_400_000;
  return daysSincePush <= ACTIVE_WINDOW_DAYS ? "active" : "maintained";
}

/** Four-digit creation year, falling back to the push year and then to the
 *  current year — a card must never render "Build NaN". */
export function toBuildYear(repo: GitHubRepository): number {
  for (const candidate of [repo.created_at, repo.pushed_at, repo.updated_at]) {
    const parsed = Date.parse(candidate ?? "");
    if (Number.isFinite(parsed)) return new Date(parsed).getUTCFullYear();
  }
  return new Date().getUTCFullYear();
}

/**
 * A count GitHub may have omitted, as a number that cannot poison arithmetic.
 *
 * `forks_count` and `open_issues_count` are declared non-optional on the wire
 * type and are not checked by `isGitHubRepository` — the same latitude
 * `topics` already gets, and for the same reason: a field missing from an
 * otherwise valid payload should cost that one figure, not the whole card.
 * Without this, an absent count reaches the UI as `NaN` and renders literally.
 */
function safeCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function toProject(repo: GitHubRepository, categories: string[]): Project {
  const editorial = editorialFor(repo.name);
  const liveUrl = toLiveUrl(repo.homepage);

  return {
    id: repo.id,
    repoName: repo.name,
    // Lowercased repo name. Kept in step with `projectSlug` in
    // project-detail-service.ts by `github-service.test.ts`, which asserts the
    // two agree — the detail route resolves with one and the grid links with
    // the other, so a divergence would 404 every card.
    slug: repo.name.toLowerCase(),
    // Editorial title wins over the humanised repo name: `MODI-STORE`
    // humanises to "Modi Store", but a repo named `tp-lg-v2` cannot be
    // rescued by any casing rule and needs a human to name it.
    title: editorial.title ?? toDisplayTitle(repo.name),
    // Editorial summary wins over GitHub's description, which is written for
    // developers browsing a repo list, not for the audience of this page.
    //
    // `|| null` on the inner expression, not `??`: a whitespace-only GitHub
    // description trims to "", and "" is not nullish — so `??` would pass an
    // empty string through as a real description and suppress the fallback
    // copy, collapsing the card body to nothing.
    description: editorial.summary ?? (repo.description?.trim() || null),
    tags: toTags(repo, categories),
    language: repo.language,
    stars: safeCount(repo.stargazers_count),
    forks: safeCount(repo.forks_count),
    topics: normaliseTopics(repo.topics),
    license: repo.license?.spdx_id ?? repo.license?.name ?? null,
    // A constant, not `repo.private`: `isPublishableRepository` has already
    // rejected every private repository by the time this runs.
    visibility: "Public",
    updatedAt: repo.pushed_at ?? repo.updated_at,
    createdAt: repo.created_at,
    githubUrl: repo.html_url,
    liveUrl,
    openGraphImageUrl: toOpenGraphImageUrl(repo),
    categories,

    featured: editorial.featured ?? false,
    // Falls back to the keyword matcher's strongest signal, so an
    // uncurated repo still gets a discipline label rather than a blank slot.
    category: editorial.category ?? categories[0] ?? "Engineering",
    narrative: editorial.narrative ?? null,
    status: toStatus(liveUrl, repo.pushed_at ?? repo.updated_at),
    buildYear: toBuildYear(repo),
    // Derived from the case-study registry rather than duplicated in the
    // editorial file. A card's "Case study" action therefore appears exactly
    // when a study exists and disappears when one is removed — the two cannot
    // be edited out of step, and there is no way to link to a page that was
    // never written.
    caseStudySlug: findCaseStudyForRepo(repo.name)?.slug ?? null,
  };
}

/**
 * Ranking. Editorial choice first, then stars, then a live demo, then recency.
 *
 * `featured` leads because the asymmetric grid reads top-left first, and the
 * lead cell has to hold the project chosen to represent the practice — not
 * whichever repo happens to have collected a star. Stars come next as the
 * only third-party signal on the card. A live demo outranks recency because
 * a visitor who can click through to a working product is worth more than one
 * looking at a repo pushed yesterday. `pushed_at` breaks the remaining ties,
 * and `id` breaks *those* so the order is total and a rebuild never
 * reshuffles two otherwise-identical cards.
 */
function compareProjects(a: Project, b: Project): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  if (a.stars !== b.stars) return b.stars - a.stars;

  const aHasDemo = a.liveUrl !== null;
  const bHasDemo = b.liveUrl !== null;
  if (aHasDemo !== bHasDemo) return aHasDemo ? -1 : 1;

  const byRecency = Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  if (byRecency !== 0 && Number.isFinite(byRecency)) return byRecency;

  return a.id - b.id;
}

/**
 * Pure transform from raw repositories to ranked projects. Exported
 * separately from `getProjects` so it is testable without a network layer.
 */
export function selectProjects(repositories: readonly GitHubRepository[]): Project[] {
  return repositories
    .filter(isPublishableRepository)
    .map((repo) => ({ repo, categories: matchCategories(repo) }))
    .filter(({ categories }) => categories.length > 0)
    .map(({ repo, categories }) => toProject(repo, categories))
    .sort(compareProjects);
}

/**
 * The feature's public entry point: fetch, filter, rank.
 *
 * `not-configured` deliberately resolves to a successful *empty* result
 * rather than an error. An unconfigured environment (fresh clone, CI, a
 * preview deploy without secrets) is not a fault a visitor should see a red
 * error panel and a retry button for — retrying cannot fix a missing
 * environment variable. It renders the calm "being prepared" empty state,
 * and the reason is already logged loudly server-side by `github-api.ts`.
 */
export async function getProjects(): Promise<ProjectsResult> {
  const result = await fetchRepositories();

  if (result.status === "error") {
    return result.reason === "not-configured"
      ? { status: "ok", projects: [] }
      : result;
  }

  return { status: "ok", projects: selectProjects(result.repositories) };
}

/**
 * Public profile URL of the configured account, or `null` when unset.
 *
 * Exists so the section's "from our GitHub account" attribution link tracks
 * `MARKETING_SITE_GITHUB_USERNAME` instead of repeating it as a literal —
 * pointing visitors at a hardcoded account the feed is no longer reading from
 * is exactly the drift a single source of truth prevents.
 */
export function getAccountUrl(): string | null {
  const username = env.MARKETING_SITE_GITHUB_USERNAME;
  return username ? `https://github.com/${encodeURIComponent(username)}` : null;
}

/**
 * The homepage teaser shows a short row rather than the full grid — the
 * section is a pointer to `/work/projects`, not a replacement for it.
 */
export async function getFeaturedProjects(limit: number): Promise<ProjectsResult> {
  const result = await getProjects();
  if (result.status === "error") return result;
  return { status: "ok", projects: result.projects.slice(0, limit) };
}
