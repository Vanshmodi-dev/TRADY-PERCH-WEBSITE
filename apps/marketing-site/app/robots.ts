import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/site-config";

/**
 * No `disallow` entries — every deferred page (including `/search`) relies
 * on its own `robots: { index: false }` metadata instead (Milestone 4
 * review). Disallowing a page in robots.txt AND noindexing it is a known
 * anti-pattern: disallow prevents the crawler from ever fetching the page,
 * so it never sees the noindex tag, and a URL discovered any other way
 * (an external link) can end up indexed with no snippet instead of
 * cleanly dropped.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
