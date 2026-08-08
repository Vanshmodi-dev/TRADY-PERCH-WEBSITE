import { describe, expect, it } from "vitest";
import { pageMetadata } from "./seo";
import { SITE_URL } from "./site-config";

/**
 * These assert the two halves of a bug that shipped and was invisible in
 * review, because every individual route file looked correct.
 *
 * Next.js replaces a parent segment's `openGraph`/`twitter` wholesale rather
 * than deep-merging it. A route declaring `openGraph: { title, description,
 * url }` therefore dropped the layout's `images`, and a route declaring
 * `openGraph` but no `twitter` kept the layout's `twitter` block entirely —
 * homepage title and homepage description included. Seventeen of twenty
 * indexable routes were affected: imageless cards on every OG consumer, and
 * cards titled "Trady Perch — Build. Automate. Grow." on X for pages as
 * specific as /pricing and /contact.
 *
 * The fix is that routes no longer author either block. What is worth testing
 * is that the helper they now use cannot emit half of one.
 */
describe("pageMetadata", () => {
  const page = pageMetadata({
    title: "Pricing",
    description: "Three engagement packages.",
    path: "/pricing",
  });

  it("always emits an og:image, even when the page has none of its own", () => {
    expect(page.openGraph?.images).toBeDefined();
    expect(page.openGraph?.images).not.toHaveLength(0);
  });

  it("always emits a twitter card carrying THIS page's title and description", () => {
    // The exact failure that shipped: twitter fell through to the layout's
    // block, so every page shared under the homepage's name.
    expect(page.twitter?.title).toBe("Pricing");
    expect(page.twitter?.description).toBe("Three engagement packages.");
  });

  it("keeps the two social blocks in agreement", () => {
    expect(page.twitter?.title).toBe(page.openGraph?.title);
    expect(page.twitter?.description).toBe(page.openGraph?.description);
  });

  it("sets a canonical URL built from the site origin", () => {
    expect(page.alternates?.canonical).toBe(`${SITE_URL}/pricing`);
  });

  it("uses the bare origin for the homepage, not a trailing slash", () => {
    expect(pageMetadata({ title: "T", description: "D", path: "/" }).alternates?.canonical).toBe(
      SITE_URL,
    );
  });

  it("prefers a page's own share image when it has one", () => {
    const withImage = pageMetadata({
      title: "Case study",
      description: "D",
      path: "/work/example",
      type: "article",
      image: { src: "/case-studies/example/hero.webp", width: 1200, height: 630, alt: "Example" },
    });
    const [image] = withImage.openGraph?.images as Array<{ url: string; alt: string }>;
    expect(image?.url).toBe(`${SITE_URL}/case-studies/example/hero.webp`);
    expect(image?.alt).toBe("Example");
  });

  it("leaves an already-absolute image URL alone", () => {
    const external = pageMetadata({
      title: "T",
      description: "D",
      path: "/x",
      image: { src: "https://cdn.example.com/a.png", width: 1, height: 1, alt: "a" },
    });
    const [image] = external.openGraph?.images as Array<{ url: string }>;
    expect(image?.url).toBe("https://cdn.example.com/a.png");
  });

  /**
   * A noindex page must not also advertise a canonical. The two are
   * contradictory signals — one says "do not index this", the other says
   * "this is the indexable address for this content".
   */
  it("emits robots instead of a canonical for a noindex route", () => {
    const deferred = pageMetadata({
      title: "About",
      description: "D",
      path: "/about",
      noIndex: true,
    });
    expect(deferred.robots).toEqual({ index: false, follow: true });
    expect(deferred.alternates?.canonical).toBeUndefined();
  });

  it("defaults to the website type and honours an article override", () => {
    // Next's `OpenGraph` is a discriminated union over `type`, so the field is
    // only reachable once narrowed — read it off a widened view rather than
    // asserting the whole object into one arm of the union.
    const ogType = (meta: ReturnType<typeof pageMetadata>) =>
      (meta.openGraph as { type?: string } | undefined)?.type;

    expect(ogType(page)).toBe("website");
    expect(
      ogType(pageMetadata({ title: "T", description: "D", path: "/x", type: "article" })),
    ).toBe("article");
  });
});
