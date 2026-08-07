import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { coreTokens } from "@trady-perch/tokens";
import { SiteHeader } from "@/shared/components/site-header";
import { SiteFooter } from "@/shared/components/site-footer";
import { SiteCursor } from "@/shared/components/site-cursor";
import { SITE_URL } from "@/shared/site-config";
import styles from "./layout.module.css";
import "./globals.css";

// Interim primary webfont. Design System Bible Ch.4 specifies "General Sans"
// as the primary family with Inter as fallback; General Sans font files are
// not yet available in this repo (a design-asset delivery step, not a code
// decision). Inter loads for real today via next/font/google (self-hosted,
// zero layout shift) and --core-type-family-primary already lists it as the
// fallback, so swapping to next/font/local General Sans later requires no
// further code change beyond this import. See docs/_synthesis/01-design-tokens-synthesis.md.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "The AI automation partner that operates like a private bank, not like a marketplace freelancer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trady Perch — Build. Automate. Grow.",
    template: "%s — Trady Perch",
  },
  description: DEFAULT_DESCRIPTION,

  /**
   * ── FAVICONS: declared explicitly, not by file convention ────────────────
   *
   * These were previously `app/favicon.ico`, `app/icon.png` and
   * `app/apple-icon.png`, and Next's file convention emitted them correctly
   * for browsers — the tab icon has always worked. They are declared by hand
   * now for two reasons, both of which are about Google rather than browsers.
   *
   * 1. STABLE URLS. The file convention appends a content hash as a query
   *    string (`/favicon.ico?favicon.0rr671z3ftkm5.ico`). Google's favicon
   *    guidance asks for a favicon URL that does not change, because the
   *    favicon is crawled and cached on its own schedule, independently of
   *    the page. Files served from `public/` have no hash, so `/favicon.ico`
   *    and `/icon-192.png` are now permanent addresses.
   *
   * 2. A CONFORMANT SIZE IN THE MARKUP. Google requires a square icon whose
   *    dimension is a multiple of 48px. `app/icon.png` was 512x512, and
   *    512 / 48 = 10.67 — not a multiple, so the only PNG offered to Google
   *    was one it is documented not to accept. The 192x192 (192 / 48 = 4)
   *    existed already but was referenced only from the web app manifest,
   *    which is a secondary source. It is now a first-class `<link
   *    rel="icon">` on every page.
   *
   * The .ico is kept and listed first because browsers request `/favicon.ico`
   * unconditionally whether it is declared or not, and because its largest
   * entry is 48x48 — itself a conformant size, and a second independent
   * candidate for Google to choose from.
   *
   * The 512x512 is deliberately NOT linked here. It is not a multiple of 48,
   * so it can only ever be a distraction to the crawler; it stays in
   * manifest.ts, where large icons belong and where the size rule does not
   * apply.
   */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    // 180x180 is Apple's own specified size for a home-screen icon and is
    // intentionally not a multiple of 48. It is for iOS, not for Search —
    // the two icons above are what Google reads.
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  /**
   * Ch.40 §3 — site-wide social defaults. Next.js applies a parent segment's
   * `openGraph`/`twitter` to any route that doesn't declare its own, so the
   * 17 pages that already set theirs are unaffected; this exists for the ones
   * that didn't. Verified against the built HTML before adding: `/privacy`,
   * `/terms` and `/legal` — all three indexable and in the sitemap — emitted
   * zero `og:` and zero `twitter:` tags, so sharing any of them anywhere
   * produced a bare, untitled, imageless link for a brand whose whole
   * positioning (Brand Identity Manual) is premium perception.
   */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Trady Perch",
    title: "Trady Perch — Build. Automate. Grow.",
    description: DEFAULT_DESCRIPTION,
    // Placeholder share asset, not a designed 1200x630 OG card — 862x581 is
    // logo-mark.jpeg's real measured size. Producing a proper card is a brand
    // design task, tracked as a known follow-up rather than faked here.
    images: [{ url: `${SITE_URL}/logo-mark.jpeg`, width: 862, height: 581, alt: "Trady Perch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trady Perch — Build. Automate. Grow.",
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/logo-mark.jpeg`],
  },
};

/**
 * Ch.52 — the site is dark-native with no light theme, but mobile browser
 * chrome (Safari/Chrome address bar) defaulted to its own light UI against
 * the near-black page, producing a visible seam at the top of every page on
 * the exact platform Ch.49's mobile standards care most about.
 *
 * Sourced from the token package rather than a repeated hex literal — this is
 * exactly the "values consumed in logic, not styles" case Ch.13 built the
 * typed export for, and `semantic.color.background.primary` resolves to
 * `core.color.black.950`, the same value `<body>` paints.
 */
export const viewport: Viewport = {
  themeColor: coreTokens.color.black["950"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Reveal (Milestone 5, Ch.9.5) hides content until it's scrolled
            into view as a JS-driven progressive enhancement — this is the
            safety net for the true no-JS case, where that JS never runs to
            reveal it. Targets the plain data-reveal attribute rather than
            Reveal's own CSS Modules class, which is hashed per build and
            unknowable here. */}
        <noscript>
          <style>{"[data-reveal] { opacity: 1 !important; transform: none !important; }"}</style>
        </noscript>
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>
        <SiteHeader />
        {/* tabIndex={-1}: <main> isn't natively focusable, so the skip
            link's href="#main-content" jump would move the page's scroll
            position without actually moving keyboard focus there in most
            browsers — the same programmatic-focus technique Drawer already
            uses for its own panel (Ch.42 Kb-3), applied here so the jump is
            both visual and a real focus move. */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        {/* Last in the body, and self-disabling: it renders nothing at all
            without a fine pointer, and nothing under reduced motion. See
            site-cursor.tsx — it augments the system cursor rather than
            replacing it, so its absence removes nothing. */}
        <SiteCursor />
      </body>
    </html>
  );
}
