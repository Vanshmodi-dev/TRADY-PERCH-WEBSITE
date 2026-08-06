import type { MetadataRoute } from "next";

/**
 * The web app manifest.
 *
 * ── Why this exists, given the icons already worked ───────────────────────
 *
 * The `<link rel="icon">` tags Next generates from `app/favicon.ico` and
 * `app/icon.png` were already correct, and browsers render the tab icon from
 * them. This file is not fixing those.
 *
 * It exists because a manifest is a second, independent place Google looks for
 * a site's icon, and because the sizes here are chosen for that reader rather
 * than for a browser tab. Google's favicon guidance asks for a square whose
 * dimension is a multiple of 48px; `app/icon.png` is 512x512, which is not one
 * (512 / 48 = 10.67). The 192x192 below is (192 / 48 = 4), so there is now an
 * icon in exactly the shape the documentation asks for.
 *
 * ── What this cannot do ───────────────────────────────────────────────────
 *
 * It cannot make a favicon appear in search results on its own. Google indexes
 * favicons on its own schedule, separately from pages, and only for sites it
 * has already crawled. The markup being correct is a precondition, not a
 * trigger — the lever is requesting indexing in Search Console.
 *
 * ── Deliberately minimal ──────────────────────────────────────────────────
 *
 * `display: "browser"` and no `start_url` beyond the root: this is a marketing
 * site, not an installable app, and claiming otherwise would put an "Install"
 * prompt in front of visitors for an experience that has no offline mode and
 * no app shell to justify it.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trady Perch",
    short_name: "Trady Perch",
    description:
      "AI automation for established businesses — agents, workflow automation and custom integrations.",
    start_url: "/",
    display: "browser",
    // Matches core.color.black.950, the page background, so the address bar
    // and any splash surface stay in the palette rather than defaulting white.
    background_color: "#0B0B0D",
    theme_color: "#0B0B0D",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        // "any" rather than "maskable": the mark has its own margin and a
        // maskable declaration would let a platform crop into it.
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
