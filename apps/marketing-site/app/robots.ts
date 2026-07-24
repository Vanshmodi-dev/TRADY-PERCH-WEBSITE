import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/search"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
