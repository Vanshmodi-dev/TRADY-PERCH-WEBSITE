import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/site-config";

/**
 * Product Implementation Constitution Ch.40 §4/§6 — every indexable route
 * gets a sitemap entry. This is a routing-level concern this milestone
 * owns (it shipped every route listed here); page-level `lastModified`
 * precision arrives once real content (not a placeholder stub) exists.
 * `/search` is intentionally excluded — not yet linked from navigation,
 * and its own metadata sets `robots: { index: false }`.
 */
const ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
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
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/process", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
