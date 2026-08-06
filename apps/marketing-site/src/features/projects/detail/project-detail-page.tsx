import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { findCaseStudyForRepo } from "@/features/case-study/case-study-data";
import type { ProjectDetail } from "../github-detail-types";
import { MarkdownView, extractOutline } from "../markdown/markdown-view";
import { ExternalIcon, GitHubIcon } from "../project-icons";
import { ProjectsAtmosphere } from "../projects-atmosphere";
import { DetailActivity } from "./detail-activity";
import { DetailCommits } from "./detail-commits";
import { DetailContributors } from "./detail-contributors";
import { DetailHero } from "./detail-hero";
import { DetailLanguages } from "./detail-languages";
import { DetailOutline } from "./detail-outline";
import { DetailReleases } from "./detail-releases";
import { DetailStats } from "./detail-stats";
import { DetailTopics } from "./detail-topics";
import styles from "./project-detail-page.module.css";

/**
 * One repository, presented as a case study.
 *
 * ── Composition ───────────────────────────────────────────────────────────
 *
 * Hero, then the statistics grid, then a two-column body: the README on the
 * left at a readable measure, a sticky rail of repository facts on the right.
 * The rail collapses under the README at tablet and below, where a second
 * column would leave neither one enough width.
 *
 * ── Every section is conditional ──────────────────────────────────────────
 *
 * A repository with no README, no releases and one contributor renders a
 * shorter page, not a page full of empty panels. `project-detail-service.ts`
 * guarantees each collection is at worst empty rather than absent, so the
 * checks here are all `length > 0` and there is no optional chaining to
 * forget.
 *
 * A Server Component throughout. Nothing on this page is interactive beyond
 * links and two scroll containers, so no part of it ships JavaScript.
 */

interface ProjectDetailPageProps {
  detail: ProjectDetail;
}

export function ProjectDetailPage({ detail }: ProjectDetailPageProps) {
  const { project, stats, readme, readmeBaseUrl } = detail;

  // A hand-written study for this repository, where one exists. The auto-
  // generated page is the default; a study is the deeper read, and linking to
  // it from here is what stops the two competing for the same URL.
  const caseStudy = findCaseStudyForRepo(project.repoName);

  // Derived from the same parse the body renders, so the rail can never list a
  // heading the page does not contain.
  const outline = readme ? extractOutline(readme) : [];

  return (
    <article className={styles.page}>
      <ProjectsAtmosphere />

      <DetailHero project={project} stats={stats} caseStudySlug={caseStudy?.slug ?? null} />

      <div className={styles.container}>
        <DetailStats stats={stats} />

        <div className={styles.body}>
          <div className={styles.main}>
            {readme ? (
              <section className={styles.readme} aria-labelledby="readme-heading">
                <header className={styles.sectionHeader}>
                  <h2 id="readme-heading" className={styles.sectionTitle}>
                    Documentation
                  </h2>
                  <p className={styles.sectionNote}>
                    Rendered from{" "}
                    <span className={styles.mono}>{project.repoName}</span>&rsquo;s README on
                    the <span className={styles.mono}>{stats.defaultBranch}</span> branch.
                  </p>
                </header>
                {/*
                  headingOffset 2: the README's own `#` becomes an <h3>, below
                  this section's <h2> and the page's <h1>. A README that opens
                  with `# Project Name` therefore does not emit a second <h1>,
                  which is a hard failure in the accessibility audit script.
                */}
                <MarkdownView source={readme} baseUrl={readmeBaseUrl} headingOffset={2} />
              </section>
            ) : (
              <section className={styles.noReadme} aria-labelledby="readme-heading">
                <h2 id="readme-heading" className={styles.sectionTitle}>
                  Documentation
                </h2>
                <p className={styles.sectionNote}>
                  This repository does not publish a README. The source is the documentation —
                  open it on GitHub to read the architecture directly.
                </p>
                <Button
                  href={project.githubUrl}
                  emphasis="secondary"
                  size="sm"
                  target="_blank"
                  leadingIcon={<GitHubIcon className={styles.buttonIcon} />}
                  aria-label={`Open the ${project.repoName} repository on GitHub (opens in a new tab)`}
                >
                  Read the source
                </Button>
              </section>
            )}

            {detail.commits.length > 0 ? (
              <DetailCommits commits={detail.commits} repoUrl={project.githubUrl} />
            ) : null}

            {detail.releases.length > 0 ? (
              <DetailReleases releases={detail.releases} repoUrl={project.githubUrl} />
            ) : null}
          </div>

          {/*
            The sticky rail. `<aside>` is correct here — this is genuinely
            tangential to the README, and giving it a landmark lets a screen
            reader user skip the whole rail or jump straight to it.
          */}
          <aside className={styles.rail} aria-label="Repository details">
            <div className={styles.railInner}>
              {outline.length > 1 ? <DetailOutline items={outline} /> : null}

              {detail.languages.length > 0 ? (
                <DetailLanguages languages={detail.languages} />
              ) : null}

              {detail.contributors.length > 0 ? (
                <DetailContributors contributors={detail.contributors} />
              ) : null}

              {detail.activity.length > 0 ? <DetailActivity weeks={detail.activity} /> : null}

              {detail.topics.length > 0 ? <DetailTopics topics={detail.topics} /> : null}
            </div>
          </aside>
        </div>

        {/* --- Closing actions ------------------------------------------- */}

        <footer className={styles.pageFooter}>
          <h2 className={styles.footerTitle}>
            Everything above came straight from the repository.
          </h2>
          <p className={styles.footerBody}>
            Nothing on this page is hand-maintained — it refreshes hourly from GitHub. Open the
            source and check it against what you have just read.
          </p>
          <div className={styles.footerActions}>
            <Button
              href={project.githubUrl}
              emphasis="primary"
              target="_blank"
              leadingIcon={<GitHubIcon className={styles.buttonIcon} />}
              aria-label={`Open the ${project.repoName} repository on GitHub (opens in a new tab)`}
            >
              Visit GitHub
            </Button>

            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                emphasis="secondary"
                target="_blank"
                trailingIcon={<ExternalIcon className={styles.buttonIcon} />}
                aria-label={`Open the live deployment of ${project.title} (opens in a new tab)`}
              >
                Live demo
              </Button>
            ) : null}

            <Button href="/work" linkComponent={NextLinkAdapter} emphasis="ghost">
              All projects
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}
