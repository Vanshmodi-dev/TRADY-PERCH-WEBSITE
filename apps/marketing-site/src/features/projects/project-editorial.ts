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
 * Client names, and any outcome claim you could not evidence if asked ("cut
 * response time 40%"). Those are case-study content and require a real
 * engagement behind them. The site already keeps that discipline in
 * `features/case-studies/`, where such cards are explicitly labelled
 * illustrative.
 *
 * The `impact` field below is the one narrow exception, and it is narrow on
 * purpose: it exists so that a genuine, evidenced outcome has somewhere to go
 * on the card, not so that every project acquires a number. Read its own note
 * before filling one in.
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
  /**
   * HERO IMAGE override.
   *
   * By default a card shows GitHub's generated repository card, which is
   * automatic, always current, and never has to be maintained — that is the
   * right default and it stays. But it is also a grey box with a repo name on
   * it, and for the one or two projects that lead the grid, a real screenshot
   * of the working product is worth considerably more.
   *
   * Set this to a path under `public/` (e.g.
   * "/case-studies/modi-store/storefront.webp") to use a designed asset
   * instead. Local paths are preferred over remote ones: they are optimised at
   * build time, they cannot 404 later, and they do not depend on a third
   * party's image service being reachable.
   *
   * Nothing else changes when this is set — the feed is still live, the repo
   * still appears and disappears on its own, and a project with no entry here
   * still gets a correct card automatically.
   */
  heroImage?: string;
  /**
   * BUSINESS IMPACT — one short line, rendered as a marked fact on the card.
   *
   * Four or five words, no sentence, no full stop: "Runs unattended",
   * "Serves live customer traffic", "Supports 500+ users", "Saved 15 hrs/week".
   *
   * ── The standard a line has to meet ─────────────────────────────────────
   *
   * A figure here must come from a real engagement you can evidence. This is
   * the one field on the card where that matters most, because it is the one
   * a visitor cannot check for themselves — they can click through to the
   * source and verify the stack, the activity and the deployment, but nothing
   * in a repository tells them how many hours somebody saved.
   *
   * That asymmetry cuts both ways. On a page whose whole premise is verifiable
   * proof, an unverifiable number sitting among verifiable ones is the single
   * fastest way to make the verifiable ones look invented too. Enterprise
   * buyers are the audience this site is written for and they are exactly the
   * audience that checks.
   *
   * So: a capability claim you can demonstrate always beats a metric you
   * cannot. Leave the field off rather than reach for a number — a card
   * without an impact line reads as a project that has not been measured yet,
   * which is unremarkable and true. Every entry below is currently a
   * capability claim for that reason; replace them with real outcome metrics
   * as engagements produce them.
   */
  impact?: string;
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
    // Verifiable by clicking the Live demo action on this card.
    impact: "Serving live traffic",
  },
  "trady-perch-website": {
    category: "Design systems",
    title: "Trady Perch Platform",
    summary:
      "The site you are reading. A TypeScript monorepo with its own token pipeline, component library, and automated accessibility gate.",
    narrative:
      "Design tokens compile from JSON to CSS custom properties, a framework-agnostic component package consumes them, and this site composes that package. Accessibility, structured data and keyboard navigation are enforced by audit scripts on every build.",
    // Verifiable by reading scripts/ and .github/ in the linked source.
    impact: "Accessibility enforced on every build",
  },
  "lead-generation-trady-perch": {
    category: "Automation",
    title: "Lead Generation Engine",
    summary: "A Python pipeline for sourcing and qualifying inbound prospects.",
    // Describes what the pipeline is, which the source shows. A figure for
    // hours saved belongs here once an engagement has produced one.
    impact: "Automated lead sourcing",
  },
};

const EMPTY: ProjectEditorial = {};

/** The editorial entry for a repository, or an empty one if it has none. */
export function editorialFor(repoName: string): ProjectEditorial {
  return PROJECT_EDITORIAL[repoName.toLowerCase()] ?? EMPTY;
}
