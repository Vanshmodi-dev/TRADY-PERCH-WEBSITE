import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Does the sitemap actually list every indexable route the app builds?
 *
 * It did not. `/work/trady-perch-platform`, `/work/lead-finder` and
 * `/work/modi-store` — the site's deepest editorial pages, all prerendered,
 * canonicalised, and carrying Article + BreadcrumbList JSON-LD — were absent
 * from the generated XML.
 *
 * What makes that worth a test rather than a one-line fix is how it hid.
 * Three separate docstrings asserted the coverage existed: the registry in
 * `case-study-data.ts` listed "the sitemap entry" among the things derived
 * from it, `caseStudySlugs()` said it "drives generateStaticParams and the
 * sitemap", and `caseStudyUrl()` called itself "one definition, used by the
 * page metadata, both schema blocks and the sitemap". `app/sitemap.ts`
 * imported none of them. Every reader of those files came away believing a
 * guarantee that nothing enforced.
 *
 * This reads the route tree from disk rather than from a hardcoded list, so a
 * new indexable route added tomorrow fails here until it is either listed in
 * the sitemap or explicitly marked noindex.
 */

// Vitest runs with the workspace root as cwd, and `import.meta.url` is not a
// file: URL under its transform — so the route tree is located from cwd.
const APP_DIR = join(process.cwd(), "app");
const SITEMAP_SOURCE = readFileSync(join(APP_DIR, "sitemap.ts"), "utf8");

/** Every `page.tsx` under app/, as a route path. */
function collectRoutes(dir: string, segments: string[] = []): Array<{ route: string; file: string }> {
  const found: Array<{ route: string; file: string }> = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Route groups `(x)` and private folders `_x` contribute no segment.
      const next = entry.startsWith("(") || entry.startsWith("_") ? segments : [...segments, entry];
      found.push(...collectRoutes(full, next));
    } else if (entry === "page.tsx") {
      found.push({ route: "/" + segments.join("/"), file: full });
    }
  }
  return found;
}

const routes = collectRoutes(APP_DIR).filter(({ route }) => !route.startsWith("/api"));

/** A route is opted out when its own metadata says so. */
function isNoIndex(file: string): boolean {
  const source = readFileSync(file, "utf8");
  return source.includes("noIndex: true") || /robots:\s*\{\s*index:\s*false/.test(source);
}

/** Dynamic segments cannot be matched literally — check the generator instead. */
function isDynamic(route: string): boolean {
  return route.includes("[");
}

describe("sitemap coverage", () => {
  it("finds the app's routes at all (guards against this test silently passing)", () => {
    expect(routes.length).toBeGreaterThan(15);
  });

  it("lists every indexable static route", () => {
    const missing = routes
      .filter(({ route, file }) => !isDynamic(route) && !isNoIndex(file))
      .filter(({ route }) => !SITEMAP_SOURCE.includes(`"${route}"`))
      .map(({ route }) => route);

    expect(missing, `indexable routes absent from app/sitemap.ts: ${missing.join(", ")}`).toEqual(
      [],
    );
  });

  /**
   * The three dynamic route families each generate real, indexable pages, so
   * each needs its own generator wired into the sitemap. Asserting on the
   * imports is what would have caught the original bug: `/work/[slug]` built
   * three pages from a registry the sitemap never imported.
   */
  it("derives every dynamic route family from its own registry", () => {
    // /work/[slug] — the long-form case studies.
    expect(SITEMAP_SOURCE).toMatch(/from "@\/features\/case-study\//);
    // /work/case-studies/[slug] — the illustrative studies.
    expect(SITEMAP_SOURCE).toMatch(/from "@\/features\/case-studies\//);
    // /work/projects/[repo] — the live GitHub feed.
    expect(SITEMAP_SOURCE).toMatch(/from "@\/features\/projects\//);
  });

  it("never lists a route that opted out of indexing", () => {
    const contradictory = routes
      .filter(({ file }) => isNoIndex(file))
      .filter(({ route }) => SITEMAP_SOURCE.includes(`"${route}"`))
      .map(({ route }) => route);

    expect(
      contradictory,
      `noindex routes listed in the sitemap: ${contradictory.join(", ")}`,
    ).toEqual([]);
  });
});
