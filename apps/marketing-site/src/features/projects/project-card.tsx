import Image from "next/image";
import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import type { Project } from "./github-types";
import {
  STATUS_COPY,
  describeProject,
  formatAbsoluteDate,
  formatDemoHost,
  formatRelativeTime,
  formatStarCount,
} from "./project-format";
import { ArrowIcon, ExternalIcon, GitHubIcon, StarIcon } from "./project-icons";
import styles from "./project-card.module.css";

/**
 * One project, presented as engineering work rather than as a repository row.
 *
 * ── Composition ───────────────────────────────────────────────────────────
 *
 * Thumbnail dominates, then a meta line (category · year), then the title,
 * then the description, then the stack, then a footer of actions and facts.
 * That order is the reading order a visitor actually uses: they look at the
 * image, decide whether to read, then read.
 *
 * ── Zero client JavaScript ────────────────────────────────────────────────
 *
 * A Server Component. Lift, glow, light sweep, border illumination and the
 * thumbnail's slow zoom are CSS; the pointer tilt comes from custom
 * properties written by the grid's single delegated listener
 * (`project-pointer-field.tsx`). A nine-card grid therefore produces nine
 * cards and zero hydration roots.
 *
 * ── Why the card is not one big link ──────────────────────────────────────
 *
 * Ch.19 Cd-1 makes an Interactive card a single link over its whole surface.
 * This card has up to three independent destinations — repository, live
 * deployment, case study — and nesting those inside an outer anchor is
 * invalid HTML that gives keyboard and screen-reader users an ambiguous
 * target. So the surface is inert and each action is a real, separately
 * focusable control.
 */

/**
 * GitHub's linguist colours for the languages this account publishes, so the
 * language dot reads as familiar rather than invented. An unlisted language
 * falls back to the accent token — a missing entry is a cosmetic default,
 * never a broken render.
 */
const LANGUAGE_COLORS: Record<string, string> = {
  typescript: "#3178c6",
  javascript: "#f1e05a",
  python: "#3572a5",
  html: "#e34c26",
  css: "#563d7c",
  go: "#00add8",
  rust: "#dea584",
  java: "#b07219",
  "c#": "#178600",
  php: "#4f5d95",
  ruby: "#701516",
  shell: "#89e051",
  svelte: "#ff3e00",
  vue: "#41b883",
  astro: "#ff5a03",
};

interface ProjectCardProps {
  project: Project;
  /**
   * Renders `<h2>` titles when the enclosing section's own heading is an
   * `<h1>`, so the document outline never skips a level.
   *
   * The entrance stagger is not a prop: the grid item sets a `--card-index`
   * custom property that inherits down to this card's `animation-delay`,
   * keeping the ordering in the same place as the animation it offsets.
   */
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, headingLevel = "h3" }: ProjectCardProps) {
  const { featured } = project;
  const status = STATUS_COPY[project.status];
  const languageColor = project.language
    ? (LANGUAGE_COLORS[project.language.toLowerCase()] ?? "var(--semantic-color-accent-primary)")
    : null;

  // A featured card has the vertical room for the long-form paragraph; a
  // standard one does not, and would clamp it into a ragged three lines.
  const body =
    featured && project.narrative
      ? project.narrative
      : describeProject(project.description, project.categories);

  const HeadingTag = headingLevel;

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      // `<article>` maps to role="article", which screen readers expose as a
      // navigable region. Unnamed, a grid of these announces "article" over
      // and over with nothing to distinguish them; the project's own title is
      // the name a visitor would use.
      aria-label={project.title}
      // The hook the grid's delegated pointer listener uses. A data attribute
      // rather than a class because CSS Modules hashes class names per build
      // and the listener cannot know the hashed value at author time.
      data-project-card
    >
      {/* Border illumination and light sweep. A pseudo-element cannot be
          targeted by an inline custom property, so these are real elements —
          both inert and hidden from the accessibility tree. */}
      <span className={styles.borderGlow} aria-hidden="true" />
      <span className={styles.sweep} aria-hidden="true" />

      <div className={styles.thumbnail}>
        <Image
          src={project.openGraphImageUrl}
          /* Decorative relative to the card: GitHub's generated card repeats
             the repository name and description the heading and body below
             already state, so a descriptive alt would make a screen reader
             announce the same content three times. */
          alt=""
          width={1200}
          height={600}
          className={styles.thumbnailImage}
          /* Every card sits below the fold — the section is beneath a full
             page hero — so none of them should preload. */
          loading="lazy"
          /* Matches the asymmetric grid: a featured card spans two of three
             columns at desktop and the full width at tablet, a standard card
             one column and a half respectively. */
          sizes={
            featured
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
        />
        <span className={styles.thumbnailVeil} aria-hidden="true" />

        <div className={styles.thumbnailOverlay}>
          {featured ? <span className={styles.featuredMark}>Selected</span> : null}
          <span className={`${styles.status} ${styles[project.status]}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span aria-hidden="true">{status.label}</span>
            <span className={styles.srOnly}>{status.srLabel}</span>
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <span className={styles.year}>
            <span className={styles.srOnly}>Built in </span>
            {project.buildYear}
          </span>
        </p>

        <HeadingTag className={styles.title}>{project.title}</HeadingTag>
        <p className={styles.body}>{body}</p>

        {project.tags.length > 0 ? (
          /* A real list, not a row of spans: these are enumerable
             technologies, and "list, 4 items" conveys to a screen reader the
             grouping that the pill row conveys by layout. */
          <ul className={styles.stack} aria-label={`Technologies used in ${project.title}`}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.stackItem}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <footer className={styles.footer}>
        <div className={styles.facts}>
          {project.language ? (
            <span className={styles.fact}>
              <span
                className={styles.languageDot}
                style={{ backgroundColor: languageColor ?? undefined }}
                aria-hidden="true"
              />
              {project.language}
            </span>
          ) : null}

          {/* Rendered even at zero. A figure present on some cards and absent
              on others reads as missing data; a visible 0 reads as an honest,
              unremarkable fact. */}
          <span className={styles.fact}>
            <StarIcon className={styles.factIcon} />
            <span>{formatStarCount(project.stars)}</span>
            <span className={styles.srOnly}>
              {project.stars === 1 ? "star" : "stars"} on GitHub
            </span>
          </span>

          {/* dateTime carries the exact instant and title a readable absolute
              date; the visible text stays relative because "3 days ago" is
              what communicates momentum on a portfolio. */}
          <time
            className={styles.fact}
            dateTime={project.updatedAt}
            title={formatAbsoluteDate(project.updatedAt)}
          >
            <span className={styles.srOnly}>Last updated </span>
            {formatRelativeTime(project.updatedAt)}
          </time>
        </div>

        <div className={styles.actions}>
          {project.caseStudySlug ? (
            <Button
              href={`/work/projects/${project.caseStudySlug}`}
              linkComponent={NextLinkAdapter}
              emphasis="secondary"
              size="sm"
              trailingIcon={<ArrowIcon className={styles.actionIcon} />}
              aria-label={`Read the case study for ${project.title}`}
            >
              Case study
            </Button>
          ) : null}

          {project.liveUrl ? (
            <Button
              href={project.liveUrl}
              emphasis={project.caseStudySlug ? "ghost" : "secondary"}
              size="sm"
              target="_blank"
              trailingIcon={<ExternalIcon className={styles.actionIcon} />}
              aria-label={`Open the live deployment of ${project.title} at ${formatDemoHost(project.liveUrl)} (opens in a new tab)`}
            >
              {/* "Live demo", not "Live": the status marker on the thumbnail
                  already reads "Live", and two controls-worth of the same
                  word on one card is ambiguous both visually and in a screen
                  reader's element list. */}
              Live demo
            </Button>
          ) : null}

          <Button
            href={project.githubUrl}
            emphasis="ghost"
            size="sm"
            target="_blank"
            leadingIcon={<GitHubIcon className={styles.actionIcon} />}
            /* The real repository name, which the editorial title above may
               no longer show, and which disambiguates otherwise identical
               "Source" links across the grid. */
            aria-label={`View the ${project.repoName} source on GitHub (opens in a new tab)`}
          >
            Source
          </Button>
        </div>
      </footer>
    </article>
  );
}
