import { ProjectDetailSkeleton } from "@/features/projects/detail/detail-skeleton";

/**
 * The skeleton shown while a project case study is generated.
 *
 * With prerendering this is not the common path — the page is built ahead of
 * the request and served from the CDN. It exists for the cases where it
 * genuinely is: a repository created since the last build (`dynamicParams` is
 * true, so it renders on demand), and the first request after a revalidation.
 *
 * Those requests wait on eight GitHub round-trips. Without this file that wait
 * is a blank screen after the navigation has already committed; with it the
 * page's shape appears immediately and fills in.
 */
export default function Loading() {
  return <ProjectDetailSkeleton />;
}
