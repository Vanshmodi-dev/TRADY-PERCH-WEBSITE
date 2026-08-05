import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GITHUB_REVALIDATE_SECONDS } from "@/features/projects/github-api";
import { ProjectDetailPage } from "@/features/projects/detail/project-detail-page";
import {
  findProjectBySlug,
  getProjectDetail,
  projectSlugs,
} from "@/features/projects/project-detail-service";
import {
  buildProjectBreadcrumbSchema,
  buildProjectDetailSchema,
  projectUrl,
} from "@/features/projects/projects-schema";
import { JsonLd } from "@/shared/json-ld";

/**
 * A repository's case study — `/work/projects/<repo>`.
 *
 * ── Why this route exists at this path ────────────────────────────────────
 *
 * `/work/<slug>` is already taken by the hand-written case studies, and those
 * are a different kind of page: an engagement narrative with results, written
 * by a person. This one is generated from the repository itself and exists for
 * *every* published project, so it lives under the collection it belongs to.
 * Where both exist for the same repo they link to each other rather than
 * competing — see `DetailHero`'s "Read the case study" action.
 *
 * ── Rendering ─────────────────────────────────────────────────────────────
 *
 * Prerendered at build time from the live feed, revalidated hourly. That means
 * a repository pushed today has a full case study page within the hour, with
 * no code change and no deploy — which is the entire point of the section.
 *
 * `dynamicParams` is deliberately **true**, unlike the hand-written studies'
 * route. Those enumerate a fixed registry, so an unknown slug is genuinely a
 * 404. Here the slug list comes from a third-party API: a repository created
 * after the last build is a legitimate page that `generateStaticParams` could
 * not have known about, and refusing to render it would make the feature's
 * central promise ("push a repo and it appears") false until the next deploy.
 * `getProjectDetail` still returns `null` for anything not in the published
 * feed, so an unpublishable or nonexistent repo 404s properly.
 */

export const revalidate = 3600;

// Fails the build if these ever drift: the page cache and the GitHub fetch
// cache must expire together, or the page serves hour-old HTML built from
// data that already refreshed underneath it.
const _revalidateMatchesFetch: typeof revalidate = GITHUB_REVALIDATE_SECONDS;
void _revalidateMatchesFetch;

export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ repo: string }>> {
  // Resolves to an empty array when the feed is unconfigured or failing, which
  // is correct: nothing is prerendered, `dynamicParams` handles requests as
  // they arrive, and a build without GitHub credentials still succeeds.
  const slugs = await projectSlugs();
  return slugs.map((repo) => ({ repo }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string }>;
}): Promise<Metadata> {
  const { repo } = await params;
  // The lightweight lookup, not the full eight-request detail fetch: metadata
  // generation runs alongside the page render, and everything below comes from
  // the already-cached project list.
  const project = await findProjectBySlug(repo);
  if (!project) return {};

  const title = project.title;
  const description =
    project.description ??
    `${project.title} — a ${project.categories.join(", ").toLowerCase()} project by Trady Perch, with its source, documentation and commit history read live from GitHub.`;
  const url = projectUrl(project.slug);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Trady Perch",
      // GitHub's generated repository card, at its documented 1200x600. The
      // same image the grid uses as the card thumbnail, so a shared link and
      // the on-site card show the same artwork.
      images: [
        {
          url: project.openGraphImageUrl,
          width: 1200,
          height: 600,
          alt: `${project.title} on GitHub`,
        },
      ],
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.openGraphImageUrl],
    },
    keywords: [...project.topics, ...project.categories],
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  const detail = await getProjectDetail(repo);
  if (!detail) notFound();

  return (
    <>
      <JsonLd data={buildProjectDetailSchema(detail)} />
      <JsonLd data={buildProjectBreadcrumbSchema(detail.project)} />
      <ProjectDetailPage detail={detail} />
    </>
  );
}
