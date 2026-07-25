import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailPage } from "@/features/case-studies/case-study-detail-page";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/features/case-studies/case-studies-data";
import { SITE_URL } from "@/shared/site-config";
import { JsonLd } from "@/shared/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.portfolioSummary,
    alternates: { canonical: `${SITE_URL}/work/case-studies/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/work/case-studies/${slug}`,
      title: caseStudy.title,
      description: caseStudy.portfolioSummary,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  // Ch.40 §3: "a case-study page's template knows it produces an
  // Article-equivalent structured-data block" — defined once, here, for
  // every case study the template renders. `description` leads with
  // "Illustrative example:" to match the same disclosure the visible page
  // itself carries (Master Vision Ch.15 / Milestone 3) — these are
  // honestly-labeled illustrative engagements, not verified real client
  // outcomes, and the structured data a crawler/AI system reads must say
  // the same thing the human-visible page does, per Ch.41 §4's prohibition
  // on content that could mislead a summarizing system.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: `Illustrative example: ${caseStudy.portfolioSummary}`,
    about: caseStudy.industryLabel,
    url: `${SITE_URL}/work/case-studies/${slug}`,
    publisher: { "@type": "Organization", name: "Trady Perch", url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <CaseStudyDetailPage caseStudy={caseStudy} />
    </>
  );
}
