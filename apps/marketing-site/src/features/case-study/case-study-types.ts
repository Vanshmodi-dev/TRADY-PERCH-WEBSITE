import type { Project } from "../projects/github-types";

/**
 * The case-study content schema.
 *
 * ── One shape, unlimited stories ──────────────────────────────────────────
 *
 * Every section below is optional, and the page renders only the sections a
 * given study actually supplies. That is the central design decision, not a
 * convenience: the projects this system describes differ enormously in depth.
 * A monorepo with 413 files and an automated accessibility gate can carry
 * fourteen sections honestly; a single hand-written `index.html` cannot, and
 * padding it out with a fabricated "Research & Strategy" chapter would be the
 * one thing that destroys the credibility the whole page exists to build.
 *
 * So the schema makes depth a property of the content, never of the layout.
 * A four-section case study and a fourteen-section one use the same
 * components, the same spacing scale and the same rhythm; the short one
 * simply stops earlier.
 *
 * ── Adding a field later ──────────────────────────────────────────────────
 *
 * The snapshot is a list of `{label, value}` facts rather than a fixed set of
 * named properties, so "Client", "Users served", "Compliance" or anything
 * else is a data edit, not a schema migration and a layout redesign.
 */

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

/**
 * A responsive image in a case study.
 *
 * `width`/`height` are required, not optional: `next/image` needs the
 * intrinsic ratio to reserve space before the bytes arrive, and a gallery of
 * images without it is a page that reflows as it loads. Cumulative layout
 * shift is the single easiest premium signal to lose.
 */
export interface CaseStudyImage {
  src: string;
  /**
   * Describes the image's *content* for someone who cannot see it. Never the
   * filename, never "screenshot". Empty string only when the image is truly
   * decorative and the surrounding prose already says everything it says.
   */
  alt: string;
  width: number;
  height: number;
  /** Shown under the image in the gallery, and as the lightbox's label. */
  caption?: string;
  /** Groups gallery images into the viewport they were captured at. */
  device?: "desktop" | "tablet" | "mobile";
}

/** A labelled fact. The unit the Snapshot and Results sections are built from. */
export interface CaseStudyFact {
  label: string;
  value: string;
  /**
   * When present, the value counts up from zero as it scrolls into view.
   * Only set this for a genuine quantity — animating a version string or a
   * date is motion for its own sake.
   */
  countTo?: number;
  /** Rendered after the counted number, e.g. "%", "ms", "+". */
  suffix?: string;
  /** One line of context under the value. */
  note?: string;
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export interface CaseStudyHero {
  /** Discipline label above the title — "Design systems", "Applied AI". */
  category: string;
  /** The page's <h1>. The system or the outcome, not the repository name. */
  title: string;
  /** One or two sentences under the title. Also the meta description. */
  standfirst: string;
  /** The large cinematic image. Omit rather than substitute a placeholder. */
  image?: CaseStudyImage;
}

/**
 * The executive summary — the whole project understood in fifteen seconds.
 *
 * `facts` is an open list precisely so this never needs redesigning: status,
 * industry, duration, team size, platform, version, region, compliance, user
 * count and anything invented next all flow into the same grid.
 */
export interface CaseStudySnapshot {
  facts: readonly CaseStudyFact[];
}

/** A prose chapter: heading, optional lede, one or more paragraphs. */
export interface CaseStudyChapter {
  heading: string;
  lede?: string;
  body: readonly string[];
}

/** A card in the Challenge section. */
export interface CaseStudyChallenge {
  title: string;
  body: string;
}

/** A decision in Research & Strategy — the *why*, including what it cost. */
export interface CaseStudyDecision {
  /** The question that had to be answered. */
  question: string;
  /** What was chosen. */
  choice: string;
  /** Why — the reasoning a client is paying for. */
  rationale: string;
  /**
   * What the choice gave up. Optional, but a decision list with no tradeoffs
   * reads as marketing rather than engineering; a reader who has made these
   * choices themselves knows every one of them costs something.
   */
  tradeoff?: string;
}

export interface CaseStudyFeature {
  /** Key into the section's icon map — see `case-study-icons.tsx`. */
  icon: string;
  title: string;
  description: string;
  /** Concrete capabilities this unlocks. Rendered as a list. */
  benefits?: readonly string[];
  image?: CaseStudyImage;
}

/** One layer of the engineering breakdown — "Frontend", "Security". */
export interface CaseStudyEngineeringLayer {
  area: string;
  /** What was built or chosen at this layer. */
  summary: string;
  /** Specific, checkable detail. */
  detail?: readonly string[];
}

export interface CaseStudyPhase {
  /** "Discovery", "Design", "Engineering", "Hardening", "Launch". */
  name: string;
  /** Free text — "Weeks 1-2", "Milestone 4". Never a fabricated date. */
  period: string;
  summary: string;
  /** What actually shipped in this phase. */
  outputs?: readonly string[];
}

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Omit unless a real photograph exists. The layout adapts without one. */
  avatar?: CaseStudyImage;
}

/** Technology grouped by layer, for the stack section's premium badges. */
export interface CaseStudyStackGroup {
  /** "Frontend", "Backend", "Database", "Cloud", "AI", "DevOps". */
  group: string;
  items: readonly string[];
}

/* ------------------------------------------------------------------ */
/* The case study                                                      */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  /** URL segment at `/work/<slug>`. Lowercase, hyphenated, permanent. */
  slug: string;
  /**
   * The GitHub repository this documents, matching `Project.repoName`.
   *
   * The join is what keeps the page honest over time: language, stars, push
   * date and deployment URL are read from the same hourly-revalidated feed
   * the portfolio grid uses, rather than frozen into the prose on the day it
   * was written. `null` for a project with no public repository.
   */
  repoName: string | null;

  hero: CaseStudyHero;
  snapshot?: CaseStudySnapshot;
  overview?: CaseStudyChapter;
  challenges?: { lede?: string; items: readonly CaseStudyChallenge[] };
  research?: { lede?: string; decisions: readonly CaseStudyDecision[] };
  solution?: CaseStudyChapter & { images?: readonly CaseStudyImage[] };
  features?: { lede?: string; items: readonly CaseStudyFeature[] };
  engineering?: { lede?: string; layers: readonly CaseStudyEngineeringLayer[] };
  gallery?: { lede?: string; images: readonly CaseStudyImage[] };
  timeline?: { lede?: string; phases: readonly CaseStudyPhase[] };
  /**
   * Outcomes. Every entry must be evidenced.
   *
   * For a project with no client engagement behind it, that means verifiable
   * *technical* results — route counts, audit outcomes, test totals — not
   * invented business metrics. The distinction matters more here than
   * anywhere else on the site: this page invites the reader to click through
   * to the source, which makes an unsupportable number trivially falsifiable.
   */
  results?: { lede?: string; metrics: readonly CaseStudyFact[]; body?: readonly string[] };
  /** Rendered only when a real, attributed testimonial exists. */
  testimonials?: readonly CaseStudyTestimonial[];
  stack?: readonly CaseStudyStackGroup[];

  /** Closing conversion section. Falls back to a shared default. */
  cta?: { heading: string; body?: string };

  seo?: {
    /** Overrides the hero title in `<title>` and Open Graph. */
    title?: string;
    /** Overrides the standfirst as the meta description. */
    description?: string;
  };
}

/**
 * A case study joined to its live GitHub project.
 *
 * `project` is `null` when the repository has been renamed, made private or
 * deleted since the study was written, or when the feed is unreachable. Every
 * consumer must handle that: the prose is the page, and live metadata is an
 * enhancement on top of it — never a dependency of it.
 */
export interface ResolvedCaseStudy {
  study: CaseStudy;
  project: Project | null;
  /** Other studies to surface at the foot of the page. */
  related: readonly CaseStudy[];
}
