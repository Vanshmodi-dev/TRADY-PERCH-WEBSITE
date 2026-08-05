import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GITHUB_REVALIDATE_SECONDS } from "@/features/projects/github-api";
import { caseStudySlugs } from "@/features/case-study/case-study-data";
import { CaseStudyLayout } from "@/features/case-study/case-study-layout";
import {
  buildBreadcrumbSchema,
  buildCaseStudyArticleSchema,
  caseStudyUrl,
} from "@/features/case-study/case-study-schema";
import { resolveCaseStudy } from "@/features/case-study/case-study-service";
import { JsonLd } from "@/shared/json-ld";

/**
 * Case study detail — `/work/<slug>`.
 *
 * ── Why a dynamic segment directly under /work ────────────────────────────
 *
 * The URLs are deliberately short: `/work/trady-perch-platform`, not
 * `/work/projects/trady-perch-platform`. A case study is a destination people
 * share, and a shallow path is the one they will actually paste.
 *
 * That puts a dynamic segment alongside the existing static `/work/projects`
 * and `/work/case-studies` routes. Next.js resolves a static segment ahead of
 * a dynamic one, so both keep working — but a study slugged `projects` would
 * build a page that is permanently unreachable, with no error anywhere.
 * `RESERVED_WORK_SEGMENTS` and its test exist to make that impossible.
 *
 * ── Rendering ─────────────────────────────────────────────────────────────
 *
 * Fully prerendered at build time, revalidated hourly so the live GitHub
 * metadata joined into the page stays current. `dynamicParams = false` means
 * an unknown slug is a genuine 404 rather than a request-time render.
 */

export const revalidate = 3600;

// Fails the build if these ever drift: the page cache and the GitHub fetch
// cache must expire together, or the page serves hour-old HTML built from
// data that already refreshed underneath it.
const _revalidateMatchesFetch: typeof revalidate = GITHUB_REVALIDATE_SECONDS;
void _revalidateMatchesFetch;

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return caseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveCaseStudy(slug);
  if (!resolved) return {};

  const { study } = resolved;
  const title = study.seo?.title ?? study.hero.title;
  const description = study.seo?.description ?? study.hero.standfirst;
  const url = caseStudyUrl(study.slug);
  const image = study.hero.image;

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
      // Only when the study has a real hero image. Falling through to the
      // layout's site-wide default is better than declaring an image that
      // does not exist, which platforms that validate the URL will reject.
      ...(image
        ? { images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image.src] } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = await resolveCaseStudy(slug);
  if (!resolved) notFound();

  return (
    <>
      <JsonLd data={buildCaseStudyArticleSchema(resolved.study, resolved.project)} />
      <JsonLd data={buildBreadcrumbSchema(resolved.study)} />
      <CaseStudyLayout {...resolved} />
    </>
  );
}
