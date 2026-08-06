/**
 * GitHub's linguist colours.
 *
 * Previously a private constant inside `project-card.tsx`. It moved here when
 * the detail page's language chart needed the same mapping: two copies of a
 * colour table drift, and a language that is blue on the card and grey in the
 * chart on the same page reads as a bug.
 *
 * Pure data and pure functions — no `server-only`, no environment access — so
 * client components can import it without dragging the service layer along.
 */

/**
 * The subset of linguist's table this account actually publishes, plus the
 * common neighbours. Not the full ~600-entry file: that is ~40KB of mostly
 * dead weight, and `fallbackColor` below covers everything absent from here
 * with something stable and legible rather than with a broken swatch.
 */
const LANGUAGE_COLORS: Readonly<Record<string, string>> = {
  typescript: "#3178c6",
  javascript: "#f1e05a",
  python: "#3572a5",
  html: "#e34c26",
  css: "#563d7c",
  scss: "#c6538c",
  less: "#1d365d",
  go: "#00add8",
  rust: "#dea584",
  java: "#b07219",
  kotlin: "#a97bff",
  swift: "#f05138",
  "c#": "#178600",
  "c++": "#f34b7d",
  c: "#555555",
  php: "#4f5d95",
  ruby: "#701516",
  shell: "#89e051",
  powershell: "#012456",
  dockerfile: "#384d54",
  makefile: "#427819",
  svelte: "#ff3e00",
  vue: "#41b883",
  astro: "#ff5a03",
  mdx: "#fcb32c",
  markdown: "#083fa1",
  jupyter: "#da5b0b",
  "jupyter notebook": "#da5b0b",
  lua: "#000080",
  perl: "#0298c3",
  r: "#198ce7",
  dart: "#00b4ab",
  elixir: "#6e4a7e",
  haskell: "#5e5086",
  scala: "#c22d40",
  solidity: "#aa6746",
  sql: "#e38c00",
  plpgsql: "#336790",
  hcl: "#844fba",
  nix: "#7e7eff",
  vim: "#199f4b",
  "vim script": "#199f4b",
  handlebars: "#f7931e",
  ejs: "#a91e50",
  twig: "#c1d026",
  batchfile: "#c1f12e",
  yaml: "#cb171e",
  toml: "#9c4221",
};

/**
 * A stable colour for a language linguist's table above does not cover.
 *
 * Derived from the name rather than picked from a rotating palette, so the
 * same language is the same colour on every page and across every build —
 * an index-based fallback would recolour a chart whenever a sibling language
 * was added or removed.
 *
 * The hue is free but the saturation and lightness are fixed, which is what
 * keeps an unknown language visually consistent with the curated entries
 * instead of arriving as a neon outlier.
 */
export function fallbackColor(language: string): string {
  let hash = 0;
  for (let index = 0; index < language.length; index += 1) {
    // Classic string hash. The shift-and-subtract keeps it in 32-bit integer
    // range without needing a modulo on every character.
    hash = (hash << 5) - hash + language.charCodeAt(index);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 46% 58%)`;
}

/** The colour for a language, matched case-insensitively. Never `null`. */
export function languageColor(language: string): string {
  return LANGUAGE_COLORS[language.toLowerCase()] ?? fallbackColor(language);
}

/** True when linguist's own table covers this language. Used only by tests. */
export function hasCuratedColor(language: string): boolean {
  return language.toLowerCase() in LANGUAGE_COLORS;
}
