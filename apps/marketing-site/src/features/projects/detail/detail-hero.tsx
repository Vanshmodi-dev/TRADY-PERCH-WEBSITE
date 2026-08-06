import Link from "next/link";
import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import type { RepositoryStats } from "../github-detail-types";
import type { Project } from "../github-types";
import { languageColor } from "../language-colors";
import { STATUS_COPY, describeProject, formatMonthYear } from "../project-format";
import { ArrowIcon, ExternalIcon, GitHubIcon, RepoIcon } from "../project-icons";
import styles from "./detail-hero.module.css";

/**
 * The case study's opening.
 *
 * Breadcrumb, status, title, summary, and the actions — in that order, because
 * a visitor arriving from a search result needs to know where they are before
 * they need to know what to do.
 *
 * The repository name is set beneath the title in monospace rather than used
 * *as* the title: the editorial layer may have renamed the project, and the
 * literal identifier is what makes the page checkable against GitHub.
 */

interface DetailHeroProps {
  project: Project;
  stats: RepositoryStats;
  /** Slug of the hand-written study for this repo, when one exists. */
  caseStudySlug: string | null;
}

export function DetailHero({ project, stats, caseStudySlug }: DetailHeroProps) {
  const status = STATUS_COPY[project.status];

  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        {/*
          A real breadcrumb trail. The JSON-LD emitted by the route describes
          the same path, so the visible navigation and the structured data
          cannot disagree — which is exactly what a search engine penalises.
        */}
        {/*
          Two crumbs, not three. `/work` is the portfolio itself now, so a
          separate "Projects" crumb pointed at the same page under a different
          name — and after the move it pointed at a redirect. The JSON-LD
          breadcrumb in `projects-schema.ts` mirrors exactly this trail.
        */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/work" className={styles.breadcrumbLink}>
                Work
              </Link>
            </li>
            <li aria-hidden="true" className={styles.breadcrumbSeparator}>
              /
            </li>
            {/* `aria-current="page"` on the final crumb — the one thing that
                distinguishes a trail from a row of links. */}
            <li className={styles.breadcrumbCurrent} aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.metaRule} aria-hidden="true" />
          <span className={`${styles.status} ${styles[project.status]}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span aria-hidden="true">{status.label}</span>
            <span className={styles.srOnly}>{status.srLabel}</span>
          </span>
        </div>

        <h1 className={styles.title}>{project.title}</h1>

        <p className={styles.repoLine}>
          <RepoIcon className={styles.repoIcon} />
          <a
            className={styles.repoLink}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {stats.visibility === "Public" ? `${project.repoName}` : project.repoName}
          </a>
          <span className={styles.visibility}>{stats.visibility}</span>
        </p>

        <p className={styles.standfirst}>
          {project.narrative ?? describeProject(project.description, project.categories)}
        </p>

        {/* The three facts worth having above the fold, as a sentence rather
            than as tiles — the full statistics grid is immediately below. */}
        <p className={styles.facts}>
          {project.language ? (
            <span className={styles.fact}>
              <span
                className={styles.languageDot}
                style={{ backgroundColor: languageColor(project.language) }}
                aria-hidden="true"
              />
              {project.language}
            </span>
          ) : null}
          <span className={styles.fact}>
            <span className={styles.srOnly}>Created in </span>
            <time dateTime={stats.createdAt}>{formatMonthYear(stats.createdAt)}</time>
          </span>
          {stats.license ? (
            <span className={styles.fact}>
              {stats.license}
              <span className={styles.srOnly}> licence</span>
            </span>
          ) : null}
        </p>

        <div className={styles.actions}>
          <Button
            href={project.githubUrl}
            emphasis="primary"
            target="_blank"
            leadingIcon={<GitHubIcon className={styles.buttonIcon} />}
            aria-label={`Open the ${project.repoName} repository on GitHub (opens in a new tab)`}
          >
            Visit GitHub
          </Button>

          {/* Rendered only when the repository declares a homepage that
              survives URL validation — see `toLiveUrl`. */}
          {project.liveUrl ? (
            <Button
              href={project.liveUrl}
              emphasis="secondary"
              target="_blank"
              trailingIcon={<ExternalIcon className={styles.buttonIcon} />}
              aria-label={`Open the live deployment of ${project.title} (opens in a new tab)`}
            >
              Visit website
            </Button>
          ) : null}

          {caseStudySlug ? (
            <Button
              href={`/work/${caseStudySlug}`}
              linkComponent={NextLinkAdapter}
              emphasis="ghost"
              trailingIcon={<ArrowIcon className={styles.buttonIcon} />}
              aria-label={`Read the written case study for ${project.title}`}
            >
              Read the case study
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
