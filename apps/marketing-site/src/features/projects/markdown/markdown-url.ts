/**
 * URL safety and rebasing for rendered README content.
 *
 * Two separate jobs, both at the render boundary rather than in the parser:
 * the parser's output is a faithful model of what the README says, and this
 * module decides what is safe and sensible to turn into an `href` or a `src`.
 * Keeping them apart means the parser stays testable as pure syntax and the
 * policy below is one small file to audit.
 */

/**
 * Schemes a README link may use.
 *
 * An allowlist rather than a `javascript:` blocklist. Blocklists lose to
 * `JaVaScRiPt:`, to `java\tscript:`, and to `data:text/html;base64,...`; an
 * allowlist of exactly three schemes cannot be talked around.
 */
const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/**
 * Hosts whose images may be rendered.
 *
 * This list and `images.remotePatterns` in `next.config.ts` must agree —
 * `markdown.test.ts` asserts that they do. Two reasons it exists at all:
 *
 *  1. Next.js refuses to optimise an image from an unconfigured host and
 *     throws at render time, so an un-allowlisted `<img>` in any README would
 *     break the whole page rather than that one image.
 *  2. Without a list, this site's image optimiser becomes an open proxy —
 *     anyone able to influence a rendered README could route arbitrary remote
 *     fetches, and their bandwidth cost, through this origin.
 *
 * Anything not listed renders as a link to the image instead of as the image.
 * Nothing is silently dropped.
 */
const RENDERABLE_IMAGE_HOSTS: readonly string[] = [
  "raw.githubusercontent.com",
  "user-images.githubusercontent.com",
  "avatars.githubusercontent.com",
  // GitHub's image proxy — every external image in a README rendered *on*
  // GitHub is served through this host.
  "camo.githubusercontent.com",
  "github.githubassets.com",
  "opengraph.githubassets.com",
  // Release assets and workflow status badges live under github.com itself.
  "github.com",
  // The de-facto standard badge service; present in a large share of READMEs.
  "img.shields.io",
];

export function isRenderableImageHost(hostname: string): boolean {
  return RENDERABLE_IMAGE_HOSTS.includes(hostname.toLowerCase());
}

/** The allowlist, for the test that keeps it in step with next.config.ts. */
export function renderableImageHosts(): readonly string[] {
  return RENDERABLE_IMAGE_HOSTS;
}

/**
 * Resolves a README URL to an absolute one, or `null` if it cannot be trusted.
 *
 * Relative references (`./docs/setup.md`, `assets/logo.png`) are resolved
 * against the repository's raw-content base so they point at the file the
 * README meant, rather than at a path on this site that does not exist.
 *
 * A bare `#anchor` returns `null`: the heading ids this renderer generates are
 * not GitHub's, so an in-page anchor would usually lead nowhere. Rendering the
 * label as plain text is more honest than a link that does nothing.
 */
export function resolveUrl(raw: string, baseUrl: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  if (trimmed.startsWith("#")) return null;

  let parsed: URL;
  try {
    // Two-argument URL handles both cases in one call: an absolute input
    // ignores the base, a relative one resolves against it.
    parsed = new URL(trimmed, baseUrl);
  } catch {
    return null;
  }

  if (!SAFE_PROTOCOLS.has(parsed.protocol)) return null;
  return parsed.toString();
}

/**
 * Rewrites a GitHub *page* URL for an image into its raw-content equivalent.
 *
 * `github.com/owner/repo/blob/main/logo.png` is an HTML page, not an image;
 * a README that links it as an `<img src>` renders a broken image on GitHub
 * too, but it is common enough — and mechanically fixable — to be worth
 * correcting rather than dropping.
 */
export function toRawContentUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return url;

    const match = /^\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+)$/.exec(parsed.pathname);
    if (!match) return url;

    return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${match[3]}`;
  } catch {
    return url;
  }
}

/**
 * An image URL ready to hand to `next/image`, or `null` when the host is not
 * on the allowlist.
 */
export function resolveImageUrl(raw: string, baseUrl: string): string | null {
  const resolved = resolveUrl(raw, baseUrl);
  if (!resolved) return null;

  const rewritten = toRawContentUrl(resolved);
  try {
    return isRenderableImageHost(new URL(rewritten).hostname) ? rewritten : null;
  } catch {
    return null;
  }
}

/**
 * A stable, URL-safe id for a heading, so the on-page table of contents can
 * link to it.
 *
 * Not GitHub's algorithm and not trying to be: these ids only ever have to be
 * consistent with the contents list this renderer generates on the same page.
 * The `-2` style suffix disambiguates repeated headings ("Install" under two
 * different sections), which is the one case where a naive slugger silently
 * produces two elements with the same id.
 */
export function headingId(text: string, seen: Map<string, number>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 64) || "section";

  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}
