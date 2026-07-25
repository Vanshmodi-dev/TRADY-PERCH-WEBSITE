import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/shared/components/site-header";
import { SiteFooter } from "@/shared/components/site-footer";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trady Perch — Build. Automate. Grow.",
    template: "%s — Trady Perch",
  },
  description:
    "The AI automation partner that operates like a private bank, not like a marketplace freelancer.",
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
      </body>
    </html>
  );
}
