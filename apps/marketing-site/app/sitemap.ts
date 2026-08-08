import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/features/case-studies/case-studies-data";
import { CASE_STUDIES as LONG_FORM_CASE_STUDIES } from "@/features/case-study/case-study-data";
import { caseStudyUrl } from "@/features/case-study/case-study-schema";
import { getProjects } from "@/features/projects/github-service";
import { SITE_URL } from "@/shared/site-config";

/**
 * Product Implementation Constitution Ch.40 §4/§6 — every real, indexable
 * route gets a sitemap entry; a sitemap listing a page that page's own
 * metadata marks `noindex` sends search engines a contradictory signal,
 * so this list and each route's own metadata must agree.
 *
 * Excluded on purpose, all via `robots: { index: false }` on the route's
 * own metadata (ADR-0007): `/about`, `/process`, `/careers`, `/resources`,
 * `/blog` (Ch.14.2 deferred pages — intentionally not built out yet) and
 * `/search` (not a real feature yet, also not linked from navigation).
 */
const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions/ai-agents", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/workflow-automation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/custom-integrations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/intelligent-systems", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries/real-estate", priority: 0.6, changeFrequency: "monthly" },
  { path: "/industries/medical", priority: 0.6, changeFrequency: "monthly" },
  { path: "/industries/legal", priority: 0.6, changeFrequency: "monthly" },
  { path: "/industries/manufacturing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "daily" },
  { path: "/work/case-studies", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Async because the project pages are generated from the live GitHub feed
 * rather than from a checked-in registry.
 *
 * `getProjects()` reads the same hour-cached fetch every other consumer does,
 * so this adds no upstream request — and it means a repository pushed today is
 * in the sitemap within the hour, without a deploy. A failing or unconfigured
 * feed yields no project entries rather than failing the sitemap: the rest of
 * the site is still perfectly indexable, and advertising URLs that would 404
 * is worse than briefly omitting them.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const caseStudyEntries = CASE_STUDIES.map((caseStudy) => ({
    url: `${SITE_URL}/work/case-studies/${caseStudy.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /**
   * The long-form studies at `/work/<slug>`.
   *
   * These were missing entirely, and the omission was invisible because three
   * separate docstrings asserted the opposite: `case-study-data.ts` lists "the
   * sitemap entry" among the things derived from its registry, `caseStudySlugs`
   * says it "drives generateStaticParams and the sitemap", and `caseStudyUrl`
   * calls itself "one definition, used by the page metadata, both schema blocks
   * and the sitemap". None of that was true — this file imported neither, and
   * `/work/trady-perch-platform`, `/work/lead-finder` and `/work/modi-store`
   * were absent from the generated XML while being fully prerendered,
   * indexable, canonicalised and carrying Article + BreadcrumbList JSON-LD.
   *
   * They are the deepest editorial content on the site, so they carry a higher
   * priority than the illustrative studies above. `caseStudyUrl` is used rather
   * than a fourth hand-built template literal, which is what makes the
   * docstrings' claim true from here on.
   */
  const longFormCaseStudyEntries = LONG_FORM_CASE_STUDIES.map((study) => ({
    url: caseStudyUrl(study.slug),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const result = await getProjects();
  const projectEntries =
    result.status === "ok"
      ? result.projects.map((project) => ({
          url: `${SITE_URL}/work/projects/${project.slug}`,
          // The repository's own last push, not the build time: this is the
          // date a crawler should use to decide whether to re-fetch, and it is
          // the only honest answer for a page generated from that repository.
          lastModified: new Date(project.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }))
      : [];

  return [...staticEntries, ...caseStudyEntries, ...longFormCaseStudyEntries, ...projectEntries];
}
