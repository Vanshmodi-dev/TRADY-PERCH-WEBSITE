import "server-only";

import { env } from "@/shared/env";
import {
  fetchCommitActivity,
  fetchCommits,
  fetchContributors,
  fetchLanguages,
  fetchOpenPullRequestCount,
  fetchReadme,
  fetchReleases,
  fetchRepositoryDetail,
} from "./github-api";
import type {
  ActivityWeek,
  GitHubCommit,
  GitHubContributor,
  GitHubRelease,
  GitHubRepositoryDetail,
  LanguageSlice,
  ProjectCommit,
  ProjectContributor,
  ProjectDetail,
  ProjectRelease,
  RepositoryStats,
} from "./github-detail-types";
import { getProjects } from "./github-service";
import { languageColor } from "./language-colors";
import type { Project } from "./github-types";

/**
 * Assembles one case study page from the eight GitHub endpoints behind it.
 *
 * ── The composition rule ──────────────────────────────────────────────────
 *
 * Exactly one request is allowed to fail the page: the repository itself. If
 * `GET /repos/{owner}/{repo}` 404s, there is no project and the route renders
 * a 404. Every other request — README, languages, contributors, commits,
 * releases, pull requests, activity — degrades to an empty value and removes
 * its own section.
 *
 * That asymmetry is deliberate. A repository with no releases is not a broken
 * page, and neither is one whose `stats/commit_activity` endpoint is still
 * computing (GitHub answers 202 for minutes on a cold repo). Failing the whole
 * page because a supplementary strip is unavailable would turn a routine,
 * self-healing condition into an outage.
 *
 * ── Concurrency ───────────────────────────────────────────────────────────
 *
 * Every request fires in parallel. Serially this page would be eight
 * round-trips deep — comfortably over a second against GitHub — and none of
 * them depends on another's result. Under ISR this cost is paid once an hour
 * by a background revalidation, never by a visitor.
 */

/** Timeline length. Ten commits is a page of history, not a git log. */
const COMMIT_LIMIT = 10;

/** Releases shown before the "view all on GitHub" link takes over. */
const RELEASE_LIMIT = 5;

/**
 * Languages below this share are folded into "Other".
 *
 * Two percent, because linguist counts bytes and a repository invariably has
 * a handful of near-zero entries — a Dockerfile, a shell script, a stray
 * `.bat`. Rendering each as its own legend row buries the three languages the
 * project is actually written in under six that it is not.
 */
const LANGUAGE_MIN_SHARE = 2;

/** Release notes are truncated to this many characters in the summary line. */
const RELEASE_SUMMARY_LENGTH = 180;

/* ------------------------------------------------------------------ */
/* Mappers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Byte counts to rendered slices.
 *
 * Percentages are computed against the *total* before any folding, so the
 * "Other" slice is the true remainder rather than a rounding artefact, and the
 * bar always fills exactly.
 */
export function toLanguageSlices(languages: Record<string, number>): LanguageSlice[] {
  const entries = Object.entries(languages).filter(([, bytes]) => bytes > 0);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return [];

  const scaled = entries
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / total) * 1000) / 10,
      color: languageColor(name),
    }))
    .sort((a, b) => b.bytes - a.bytes);

  const major = scaled.filter((slice) => slice.percentage >= LANGUAGE_MIN_SHARE);
  const minor = scaled.filter((slice) => slice.percentage < LANGUAGE_MIN_SHARE);

  // A repository written entirely in sub-2% fragments does not exist in
  // practice, but if every slice were folded the chart would be a single grey
  // bar labelled "Other" — so when nothing clears the threshold, show the
  // real languages instead.
  if (major.length === 0) return scaled;
  if (minor.length === 0) return major;

  const otherBytes = minor.reduce((sum, slice) => sum + slice.bytes, 0);
  return [
    ...major,
    {
      name: "Other",
      bytes: otherBytes,
      percentage: Math.round((otherBytes / total) * 1000) / 10,
      // A neutral token rather than a hashed hue: "Other" is not a language,
      // and giving it a language-like colour implies it is one.
      color: "var(--semantic-color-text-tertiary)",
    },
  ];
}

/** Drops bots, which are noise on a portfolio's contributor row. */
function isHumanContributor(contributor: GitHubContributor): boolean {
  return contributor.type !== "Bot" && !contributor.login.endsWith("[bot]");
}

export function toContributors(contributors: readonly GitHubContributor[]): ProjectContributor[] {
  return contributors.filter(isHumanContributor).map((contributor) => ({
    login: contributor.login,
    avatarUrl: contributor.avatar_url,
    profileUrl: contributor.html_url,
    contributions: contributor.contributions,
  }));
}

export function toCommits(commits: readonly GitHubCommit[], repoUrl: string): ProjectCommit[] {
  return commits.map((commit) => {
    // First line only. A conventional-commit body or a merge commit's
    // co-author trailer would otherwise dump five lines into a timeline row.
    const subject = commit.commit.message.split("\n")[0]?.trim() ?? "";

    return {
      shortSha: commit.sha.slice(0, 7),
      subject: subject.length > 0 ? subject : "(no commit message)",
      // GitHub omits `html_url` on some responses; the canonical commit URL is
      // derivable from the repo URL and the sha, so no row is ever unlinked.
      url: commit.html_url || `${repoUrl}/commit/${commit.sha}`,
      // The GitHub account where one is linked, else the name baked into the
      // commit object — an email not attached to any account still has that.
      authorName: commit.author?.login ?? commit.commit.author?.name ?? "Unknown",
      authorUrl: commit.author?.html_url ?? null,
      authoredAt: commit.commit.author?.date ?? null,
    };
  });
}

/** Collapses release notes to a single plain-text line for the list row. */
function toReleaseSummary(body: string | null): string | null {
  if (!body) return null;
  const flattened = body
    // Markdown emphasis, headings and list bullets read as litter once the
    // text is no longer being rendered as markdown.
    .replace(/[#*_`>]/g, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (flattened.length === 0) return null;
  return flattened.length > RELEASE_SUMMARY_LENGTH
    ? `${flattened.slice(0, RELEASE_SUMMARY_LENGTH).trimEnd()}…`
    : flattened;
}

export function toReleases(releases: readonly GitHubRelease[]): ProjectRelease[] {
  return releases
    // A draft is unpublished by definition — showing one leaks work in
    // progress onto a public page.
    .filter((release) => !release.draft)
    .map((release) => ({
      id: release.id,
      tag: release.tag_name,
      title: release.name?.trim() || release.tag_name,
      url: release.html_url,
      publishedAt: release.published_at ?? release.created_at ?? null,
      prerelease: release.prerelease,
      summary: toReleaseSummary(release.body),
    }));
}

/**
 * GitHub's weekly buckets, trimmed to the trailing quarter.
 *
 * The endpoint returns 52 weeks. At the width this strip occupies, 52 bars are
 * 3px each and convey nothing; 13 weeks at a legible width reads as recent
 * momentum, which is what the section is for.
 */
export function toActivity(
  weeks: ReadonlyArray<{ week: number; total: number }>,
  limit = 13,
): ActivityWeek[] {
  return weeks.slice(-limit).map((week) => ({
    // GitHub reports the week as a Unix timestamp in seconds.
    weekStart: new Date(week.week * 1000).toISOString(),
    commits: week.total,
  }));
}

/**
 * The statistics grid.
 *
 * `open_issues_count` is GitHub's long-standing trap: it counts pull requests
 * as issues, so a repository with 3 issues and 4 open PRs reports 7. The PR
 * count is fetched separately purely to subtract it here and recover the
 * number a visitor would see on the Issues tab. Clamped at zero because the
 * two figures come from separate requests and can be a moment apart.
 */
export function toRepositoryStats(
  detail: GitHubRepositoryDetail,
  openPullRequests: number,
  contributors: number,
  commits: number | null,
): RepositoryStats {
  return {
    stars: detail.stargazers_count,
    forks: detail.forks_count,
    watchers: detail.subscribers_count ?? detail.watchers_count,
    openIssues: Math.max(0, detail.open_issues_count - openPullRequests),
    openPullRequests,
    contributors,
    commits,
    createdAt: detail.created_at,
    pushedAt: detail.pushed_at,
    license: detail.license?.spdx_id ?? detail.license?.name ?? null,
    defaultBranch: detail.default_branch,
    // Not read from `detail.private`: a private repository never survives
    // `isPublishableRepository`, so anything reaching this page is public by
    // construction. Stating it as a constant makes that guarantee explicit
    // rather than implying the page could ever render a private repo.
    visibility: "Public",
  };
}

/* ------------------------------------------------------------------ */
/* Slugs                                                               */
/* ------------------------------------------------------------------ */

/**
 * A repository's URL segment.
 *
 * Just the lowercased name. GitHub already restricts repository names to
 * characters that are safe in a path (letters, digits, `-`, `_`, `.`), so no
 * further slugification is needed — and inventing one would break the
 * round-trip, since two repos differing only in punctuation would collide.
 * Lowercasing is safe because GitHub itself treats repository names
 * case-insensitively and forbids two repos that differ only in case.
 */
export function projectSlug(repoName: string): string {
  return repoName.toLowerCase();
}

/* ------------------------------------------------------------------ */
/* Entry points                                                        */
/* ------------------------------------------------------------------ */

/**
 * The project matching a URL slug, or `null`.
 *
 * Resolved against the *published* feed rather than by hitting GitHub
 * directly, which is what stops the detail route becoming a hole in the
 * publishing rules: a repository that is archived, forked, private or
 * uncategorised is absent from `getProjects()`, so `/work/projects/<that-repo>`
 * 404s exactly as the grid implies it should. Querying the repo endpoint
 * directly would happily render a page for a repo the index deliberately hides.
 */
export async function findProjectBySlug(slug: string): Promise<Project | null> {
  const result = await getProjects();
  if (result.status === "error") return null;

  const target = slug.toLowerCase();
  return result.projects.find((project) => projectSlug(project.repoName) === target) ?? null;
}

/** Every slug the detail route should prerender. */
export async function projectSlugs(): Promise<string[]> {
  const result = await getProjects();
  if (result.status === "error") return [];
  return result.projects.map((project) => projectSlug(project.repoName));
}

/**
 * The complete case study payload for one slug, or `null` when no published
 * project matches.
 */
export async function getProjectDetail(slug: string): Promise<ProjectDetail | null> {
  const project = await findProjectBySlug(slug);
  if (!project) return null;

  const repo = project.repoName;

  // All eight in flight at once — see the module docblock. `Promise.all` is
  // safe rather than `allSettled` because none of these fetchers reject:
  // every one resolves to a typed result, which is the whole point of the
  // discipline in github-api.ts.
  const [detail, readme, languages, contributors, commits, releases, pullRequests, activity] =
    await Promise.all([
      fetchRepositoryDetail(repo),
      fetchReadme(repo),
      fetchLanguages(repo),
      fetchContributors(repo),
      fetchCommits(repo, COMMIT_LIMIT),
      fetchReleases(repo, RELEASE_LIMIT),
      fetchOpenPullRequestCount(repo),
      fetchCommitActivity(repo),
    ]);

  // The one hard dependency. Everything below tolerates its own absence.
  if (detail.status === "error" || detail.data === null) return null;

  const contributorList = contributors.status === "ok" ? toContributors(contributors.data) : [];
  const commitData = commits.status === "ok" ? commits.data : { commits: [], total: null };
  const openPullRequests = pullRequests.status === "ok" ? (pullRequests.data ?? 0) : 0;

  return {
    project,
    stats: toRepositoryStats(
      detail.data,
      openPullRequests,
      contributorList.length,
      commitData.total,
    ),
    readme: readme.status === "ok" ? readme.data : null,
    readmeBaseUrl: rawContentBaseUrl(detail.data),
    languages: languages.status === "ok" ? toLanguageSlices(languages.data) : [],
    contributors: contributorList,
    commits: toCommits(commitData.commits, detail.data.html_url),
    releases: releases.status === "ok" ? toReleases(releases.data) : [],
    activity: activity.status === "ok" ? toActivity(activity.data) : [],
    // The repo's own topics, straight from GitHub and unmodified — the topic
    // chips on the detail page are meant to be the author's own labels, not
    // this codebase's inferred categories.
    topics: Array.isArray(detail.data.topics) ? detail.data.topics : [],
  };
}

/**
 * Base URL for resolving relative README references.
 *
 * A README written for GitHub links `./docs/x.md` and embeds `./assets/y.png`
 * relative to the repository root. Rendered on another origin those resolve
 * against *this* site and 404. Every relative reference is therefore rebased
 * onto raw.githubusercontent.com at the repo's default branch.
 */
function rawContentBaseUrl(detail: GitHubRepositoryDetail): string {
  const owner = env.MARKETING_SITE_GITHUB_USERNAME ?? detail.owner.login;
  return (
    `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/` +
    `${encodeURIComponent(detail.name)}/${encodeURIComponent(detail.default_branch)}/`
  );
}
