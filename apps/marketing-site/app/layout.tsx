import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/shared/components/site-header";
import { SiteFooter } from "@/shared/components/site-footer";
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
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
