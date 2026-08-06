import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES,
  RESERVED_WORK_SEGMENTS,
  caseStudySlugs,
  findCaseStudy,
  findCaseStudyForRepo,
  relatedCaseStudies,
} from "./case-study-data";
import { FEATURE_ICON_NAMES } from "./components/cs-icons";

describe("the registry", () => {
  it("holds at least one case study", () => {
    expect(CASE_STUDIES.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = caseStudySlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe slugs", () => {
    // Slugs are permanent public URLs. Anything needing escaping here would
    // produce a link that looks broken in the address bar.
    for (const slug of caseStudySlugs()) {
      expect(slug, `"${slug}" is not a clean URL segment`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  /**
   * The failure this prevents is silent and total. Studies live at
   * `/work/<slug>` beside static routes at `/work/projects` and
   * `/work/case-studies`. Next.js resolves a static segment first, so a study
   * slugged `projects` would build a page that can never be reached — no
   * error, no warning, just a URL that serves something else forever.
   */
  it("never uses a slug that a static /work route would shadow", () => {
    for (const slug of caseStudySlugs()) {
      expect(
        RESERVED_WORK_SEGMENTS,
        `"${slug}" collides with the static /work/${slug} route and would be unreachable`,
      ).not.toContain(slug);
    }
  });

  it("gives every study a hero with the fields the page and metadata require", () => {
    for (const study of CASE_STUDIES) {
      expect(study.hero.title, `${study.slug} has no title`).toBeTruthy();
      expect(study.hero.category, `${study.slug} has no category`).toBeTruthy();
      // The standfirst doubles as the meta description when no SEO override
      // exists, so an empty one ships a description-less page.
      expect(study.hero.standfirst, `${study.slug} has no standfirst`).toBeTruthy();
    }
  });

  it("resolves every feature icon key to a real icon", () => {
    // An unknown key degrades to the fallback glyph rather than throwing, so
    // a typo would otherwise ship silently and only be noticed by a client.
    for (const study of CASE_STUDIES) {
      for (const feature of study.features?.items ?? []) {
        expect(
          FEATURE_ICON_NAMES,
          `${study.slug}: feature "${feature.title}" uses unknown icon "${feature.icon}"`,
        ).toContain(feature.icon);
      }
    }
  });

  it("gives every image explicit dimensions", () => {
    // next/image needs the intrinsic ratio to reserve space before the bytes
    // arrive. Without it, the gallery reflows as it loads.
    const images = CASE_STUDIES.flatMap((study) => [
      ...(study.hero.image ? [study.hero.image] : []),
      ...(study.gallery?.images ?? []),
      ...(study.features?.items.flatMap((f) => (f.image ? [f.image] : [])) ?? []),
    ]);

    for (const image of images) {
      expect(image.width, `${image.src} has no width`).toBeGreaterThan(0);
      expect(image.height, `${image.src} has no height`).toBeGreaterThan(0);
      expect(typeof image.alt, `${image.src} has no alt`).toBe("string");
    }
  });
});

describe("lookup", () => {
  it("finds a study by slug", () => {
    expect(findCaseStudy("trady-perch-platform")?.hero.title).toBeTruthy();
  });

  it("returns undefined for an unknown slug rather than throwing", () => {
    expect(findCaseStudy("no-such-study")).toBeUndefined();
  });

  it("finds a study by repository name, case-insensitively", () => {
    // GitHub preserves creation-time casing, so MODI-STORE and modi-store
    // must resolve to the same study.
    expect(findCaseStudyForRepo("MODI-STORE")?.slug).toBe("modi-store");
    expect(findCaseStudyForRepo("modi-store")?.slug).toBe("modi-store");
  });

  it("returns undefined for a repository with no study", () => {
    expect(findCaseStudyForRepo("some-other-repo")).toBeUndefined();
  });
});

describe("related studies", () => {
  it("never includes the study being read", () => {
    for (const study of CASE_STUDIES) {
      const related = relatedCaseStudies(study.slug);
      expect(related.map((r) => r.slug)).not.toContain(study.slug);
    }
  });

  it("caps the count, so the section offers a next step rather than a menu", () => {
    expect(relatedCaseStudies("trady-perch-platform", 2).length).toBeLessThanOrEqual(2);
  });

  it("returns an empty list rather than throwing for an unknown slug", () => {
    expect(() => relatedCaseStudies("no-such-study")).not.toThrow();
  });
});

/**
 * Content integrity. These are the claims that would be most damaging to get
 * wrong on a page whose whole premise is that the reader can check.
 */
describe("content integrity", () => {
  it("publishes no testimonial, because none has been given", () => {
    // A fabricated endorsement on a page built to be verifiable would undo
    // the entire page. When a real one exists, delete this test.
    for (const study of CASE_STUDIES) {
      expect(study.testimonials ?? [], `${study.slug} has a testimonial`).toHaveLength(0);
    }
  });

  it("only claims results where the study documents how they are evidenced", () => {
    for (const study of CASE_STUDIES) {
      if (!study.results) continue;
      // The lede is where the evidence is stated. A metrics block with no
      // explanation of where the numbers came from is an assertion.
      expect(study.results.lede, `${study.slug} states results with no sourcing`).toBeTruthy();
    }
  });

  it("keeps every decision's rationale substantive", () => {
    // A one-line rationale is a label, not reasoning — and reasoning is the
    // thing this section exists to demonstrate.
    for (const study of CASE_STUDIES) {
      for (const decision of study.research?.decisions ?? []) {
        expect(
          decision.rationale.length,
          `${study.slug}: "${decision.question}" has a thin rationale`,
        ).toBeGreaterThan(80);
      }
    }
  });
});
