import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/features/case-studies/case-studies-data";
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
  { path: "/work", priority: 0.8, changeFrequency: "weekly" },
  { path: "/work/case-studies", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...staticEntries, ...caseStudyEntries];
}
