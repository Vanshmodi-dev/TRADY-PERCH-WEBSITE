/**
 * The editorial layer over the live GitHub feed.
 *
 * ── Why this file exists ──────────────────────────────────────────────────
 *
 * The GitHub REST API can tell you a repository's language, size, star count
 * and push date. It cannot tell you which project best represents a practice,
 * what discipline it belongs to, or what problem it solves. Those are
 * editorial judgements, and a portfolio that reads like premium engineering
 * work is made of exactly those judgements.
 *
 * So the feed stays live — repositories appear and disappear on their own,
 * dates and languages are always current — and this file supplies only the
 * human layer on top. A repo with no entry here still renders correctly, with
 * everything derived from GitHub; it simply won't be featured and won't have
 * a bespoke category or narrative.
 *
 * ── What belongs here ─────────────────────────────────────────────────────
 *
 * Claims you can stand behind. This is marketing copy on a page whose entire
 * premise is verifiable proof — a visitor can click through to the source. A
 * description that oversells what the code does is worse than no description,
 * because here it can be checked.
 *
 * ── What does NOT belong here ─────────────────────────────────────────────
 *
 * Metrics, client names, or outcome claims ("cut response time 40%"). Those
 * are case-study content and require a real engagement to evidence. The site
 * already keeps that discipline in `features/case-studies/`, where such cards
 * are explicitly labelled illustrative.
 *
 * Case-study links are also not here. A card's "Case study" action is derived
 * from the registry in `features/case-study/case-study-data.ts` — writing a
 * study is what makes the link appear, so the two can never disagree.
 */

export interface ProjectEditorial {
  /**
   * Promotes this project to the grid's large lead cell.
   *
   * Keep this to one or two. Featuring everything is featuring nothing — the
   * asymmetric layout only reads as a hierarchy while most cells are standard
   * size, and `project-grid.tsx` deliberately does not enforce a cap so that
   * this stays an editorial decision rather than a silently-truncated one.
   */
  featured?: boolean;
  /**
   * Discipline label shown above the title — "Commerce", "Applied AI".
   * Two or three words. This is the line that makes a repository read as a
   * body of work rather than a folder, so it is worth choosing carefully.
   */
  category?: string;
  /**
   * Replaces the humanised repository name as the card's title. Use when the
   * repo name is an internal identifier rather than a product name.
   */
  title?: string;
  /**
   * One or two sentences, shown on every card. Overrides the repository's own
   * GitHub description, which is usually written for developers rather than
   * for the people this page is addressed to.
   */
  summary?: string;
  /**
   * A longer paragraph, rendered only on a featured card, where there is room
   * for it. Say what the system does and how it is built.
   *
   * Keep it to two sentences. This is not a style preference: on the desktop
   * featured card the content column's height determines the thumbnail
   * frame's aspect, so a long narrative makes the image column taller and
   * narrower and crops more of the source image away. On mobile it is the
   * distance a visitor scrolls before reaching the second project.
   */
  narrative?: string;
}

/**
 * Keyed by repository name, lowercased. Lookup is case-insensitive because
 * GitHub preserves the casing an account used at creation time, and
 * `MODI-STORE` versus `modi-store` should not silently miss.
 *
 * ── The entries below are STARTING POINTS, written to be replaceable ──────
 *
 * They describe only what is observable from outside each repository: its
 * primary language, whether a deployment is reachable, and what its name
 * says it is. Nothing here asserts a result, a client, or a capability that
 * reading the source would contradict.
 *
 * Replace them with real copy. This file and each repo's GitHub description
 * are the only two places portfolio wording lives.
 */
export const PROJECT_EDITORIAL: Readonly<Record<string, ProjectEditorial>> = {
  "modi-store": {
    featured: true,
    category: "Commerce",
    title: "Modi Store",
    summary: "A deployed storefront built from the ground up — no theme, no page builder.",
    narrative:
      "A commerce front end written directly against the platform rather than assembled from a template. The deployment is public, so the whole surface can be inspected exactly as it shipped.",
  },
  "trady-perch-website": {
    category: "Design systems",
    title: "Trady Perch Platform",
    summary:
      "The site you are reading. A TypeScript monorepo with its own token pipeline, component library, and automated accessibility gate.",
    narrative:
      "Design tokens compile from JSON to CSS custom properties, a framework-agnostic component package consumes them, and this site composes that package. Accessibility, structured data and keyboard navigation are enforced by audit scripts on every build.",
  },
  "lead-generation-trady-perch": {
    category: "Automation",
    title: "Lead Generation Engine",
    summary: "A Python pipeline for sourcing and qualifying inbound prospects.",
  },
};

const EMPTY: ProjectEditorial = {};

/** The editorial entry for a repository, or an empty one if it has none. */
export function editorialFor(repoName: string): ProjectEditorial {
  return PROJECT_EDITORIAL[repoName.toLowerCase()] ?? EMPTY;
}
