import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { JsonLd } from "@/shared/json-ld";
import { getAccountUrl, getFeaturedProjects, getProjects } from "./github-service";
import { getPortfolioStats } from "./portfolio-stats-service";
import { PortfolioStatsBar } from "./portfolio-stats-bar";
import type { ProjectsFailureReason } from "./github-types";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";
import { ProjectsAtmosphere } from "./projects-atmosphere";
import { ProjectsExplorer } from "./projects-explorer";
import { ProjectsRetryButton } from "./projects-retry";
import { buildProjectsSchema } from "./projects-schema";
import { ProjectsEmpty, ProjectsError } from "./projects-states";
import styles from "./projects-section.module.css";

/**
 * The Proof of Capability section.
 *
 * An async Server Component: it awaits `getProjects()` during render, so the
 * HTML a visitor (and a crawler) receives already contains every card. No
 * client-side fetch, no loading flash in the common path, no GitHub
 * credential anywhere near the browser.
 *
 * The route that renders this sets `revalidate`, which keeps the whole page a
 * static, CDN-served document that refreshes hourly in the background —
 * preserving Ch.2 §4's static-first default rather than making the site
 * render per-request because one section reads a third-party API.
 */

/**
 * Visitor-facing copy per failure reason.
 *
 * Deliberately free of status codes and internal vocabulary. The precise
 * cause is logged server-side by `github-api.ts`; what belongs on the page is
 * what the visitor can do, which for all of these is "wait a moment and
 * retry, or go read the case studies".
 */
const ERROR_MESSAGE: Record<ProjectsFailureReason, string> = {
  "not-configured": "The project feed isn’t connected yet. Please check back shortly.",
  unauthorized: "Our connection to GitHub needs attention. We’re on it — please try again shortly.",
  "rate-limited": "GitHub is asking us to slow down for a moment. Try again in a minute.",
  "account-not-found": "We couldn’t find the project source. Please try again shortly.",
  unavailable: "GitHub didn’t respond just now. This is usually temporary — try again in a moment.",
};

/* ------------------------------------------------------------------ */
/* Full section — /work/projects                                       */
/* ------------------------------------------------------------------ */

export async function ProjectsSection() {
  // In parallel: the stats aggregate reads the same cached feed, so this costs
  // one extra GraphQL call for the contribution calendar and nothing else.
  const [result, stats] = await Promise.all([getProjects(), getPortfolioStats()]);
  const accountUrl = getAccountUrl();

  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <ProjectsAtmosphere />

      <div className={styles.container}>
        {/*
          Visually hidden, not a second visible heading.

          This section sits directly beneath the page hero, which already
          carries the eyebrow, the <h1> and the introduction. A visible
          heading here restated the same thing in different words — on mobile
          that was two full screens of near-identical preamble before the
          first card. The landmark still needs an accessible name, so the
          heading stays in the document and only its pixels go away.
        */}
        <h2 id="projects-heading" className={styles.srOnly}>
          Selected engineering work
        </h2>

        {result.status === "error" ? (
          <ProjectsError message={ERROR_MESSAGE[result.reason]} action={<ProjectsRetryButton />} />
        ) : result.projects.length === 0 ? (
          <ProjectsEmpty />
        ) : (
          <>
            {/* Emitted only alongside a populated grid: structured data
                describing an empty ItemList, or describing projects the page
                failed to render, contradicts the visible page. */}
            <JsonLd data={buildProjectsSchema(result.projects)} />

            <PortfolioStatsBar stats={stats} />

            {/*
              Every card is rendered here, on the server, and handed to the
              client explorer as a finished element. The explorer decides which
              ones to mount; it never builds one. That is what keeps the whole
              card — its copy, its SVGs, `next/image` — out of the browser
              bundle while still supporting live filtering.
            */}
            <ProjectsExplorer
              items={result.projects.map((project) => ({
                project,
                card: <ProjectCard project={project} headingLevel="h3" />,
              }))}
            />

            <p className={styles.footnote}>
              {result.projects.length}{" "}
              {result.projects.length === 1 ? "repository" : "repositories"}, read live from{" "}
              {accountUrl ? (
                <a
                  className={styles.footnoteLink}
                  href={accountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  our GitHub account
                </a>
              ) : (
                "our GitHub account"
              )}{" "}
              and refreshed hourly. Nothing on this page is hand-maintained.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Homepage teaser                                                     */
/* ------------------------------------------------------------------ */

/**
 * How many cards the homepage row shows.
 *
 * Three: one featured card spans two columns and one standard card fills the
 * third, so the teaser is a single complete desktop row that already
 * demonstrates the asymmetry rather than reading as a truncated grid.
 */
const TEASER_COUNT = 3;

/**
 * The homepage variant: one row, then a link onward.
 *
 * Renders nothing at all when the feed is empty or failing, rather than
 * putting an empty state or an error panel on the homepage. That is the
 * deliberate difference from `/work/projects`: a visitor who navigated to a
 * projects page is owed an explanation for a blank one, whereas a homepage
 * should never surrender a screenful of its narrative to explain a
 * third-party outage.
 */
export async function ProjectsTeaser() {
  const result = await getFeaturedProjects(TEASER_COUNT);

  if (result.status === "error" || result.projects.length === 0) return null;

  return (
    <section className={styles.sectionAlt} aria-labelledby="projects-teaser-heading">
      <ProjectsAtmosphere />

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Selected work</p>
          <h2 id="projects-teaser-heading" className={styles.heading}>
            Systems you can open and read.
          </h2>
          <p className={styles.lede}>
            Not screenshots of work we say we did. Live repositories, pulled from source — the
            architecture, the commits, the deployments.
          </p>
        </header>

        <ProjectGrid projects={result.projects} headingLevel="h3" />

        <div className={styles.footer}>
          <Button href="/work/projects" linkComponent={NextLinkAdapter} emphasis="secondary">
            See every project
          </Button>
        </div>
      </div>
    </section>
  );
}
