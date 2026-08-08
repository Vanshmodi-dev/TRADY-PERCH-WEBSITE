import type { Metadata } from "next";
import { SITE_URL } from "./site-config";

/**
 * Page metadata, built so a route cannot ship a broken social card.
 *
 * ── The bug this exists to make impossible ────────────────────────────────
 *
 * Next.js does NOT deep-merge `openGraph` or `twitter` with the parent
 * segment's. A route that declares `openGraph: { title, description, url }`
 * *replaces* the root layout's `openGraph` wholesale — including its
 * `images`. A route that declares `openGraph` but no `twitter` keeps the
 * layout's `twitter` block *entirely*, title and description included.
 *
 * Both halves of that shipped. Verified against the built HTML across every
 * indexable route: 17 of 20 emitted no `og:image` at all, and every one of
 * them carried the homepage's `twitter:title` and `twitter:description`
 * rather than their own. Sharing `/pricing` — a conversion page — produced
 * an imageless card on LinkedIn/Slack/WhatsApp and a card titled
 * "Trady Perch — Build. Automate. Grow." on X, describing the homepage.
 *
 * The root layout's own comment was right that a parent's block applies to a
 * route that declares none; the failure is the partial case in between, which
 * looks correct in the source of every individual route file.
 *
 * So routes no longer hand-author these blocks. They state what is genuinely
 * page-specific — title, description, path, optional image and type — and
 * this function emits both complete blocks from it. There is no way to
 * supply half of one.
 */

/** The site-wide share asset, used whenever a page has no image of its own. */
const DEFAULT_SHARE_IMAGE = {
  url: `${SITE_URL}/logo-mark.jpeg`,
  width: 862,
  height: 581,
  alt: "Trady Perch",
} as const;

export interface ShareImage {
  /** Absolute URL, or a root-relative path resolved against SITE_URL. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface PageSeoInput {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/pricing". Use "/" for the homepage. */
  path: string;
  /** @default "website" */
  type?: "website" | "article";
  /** A page's own share asset. Falls back to the site-wide mark. */
  image?: ShareImage;
  /** Set for routes that must not be indexed (ADR-0007's deferred pages). */
  noIndex?: boolean;
}

function absolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/**
 * Builds a complete, self-consistent `Metadata` object: canonical URL, both
 * social blocks, and — for a noindex route — the robots directive instead of
 * a canonical, since advertising a canonical for a page you are asking not to
 * index sends two contradictory signals.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  const shareImage = image
    ? { url: absolute(image.src), width: image.width, height: image.height, alt: image.alt }
    : DEFAULT_SHARE_IMAGE;

  return {
    title,
    description,
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : { alternates: { canonical: url } }),
    openGraph: {
      type,
      url,
      siteName: "Trady Perch",
      title,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
