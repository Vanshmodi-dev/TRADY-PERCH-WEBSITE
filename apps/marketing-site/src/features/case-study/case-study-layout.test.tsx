import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { CaseStudyLayout } from "./case-study-layout";
import { CaseStudySnapshotSection } from "./sections/cs-snapshot";
import { buildBreadcrumbSchema, buildCaseStudyArticleSchema } from "./case-study-schema";
import type { CaseStudy } from "./case-study-types";
import { project } from "@/test/project-fixtures";

function study(overrides: Partial<CaseStudy> = {}): CaseStudy {
  return {
    slug: "example-study",
    repoName: "example-repo",
    hero: {
      category: "Applied AI",
      title: "Example System",
      standfirst: "A short summary of the example system.",
    },
    ...overrides,
  };
}

describe("CaseStudyLayout", () => {
  it("renders the hero title as the page's single h1", () => {
    render(<CaseStudyLayout study={study()} project={null} related={[]} />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Example System");
  });

  /**
   * The central architectural property: a study with only a hero renders a
   * complete, coherent page rather than a stack of empty section frames.
   */
  it("renders nothing for sections the study does not supply", () => {
    render(<CaseStudyLayout study={study()} project={null} related={[]} />);

    for (const absent of [
      /What made this hard/i,
      /The decisions behind it/i,
      /What it does/i,
      /How it is built/i,
      /Every surface/i,
      /How it was built/i,
      /What it delivered/i,
      /What the client said/i,
      /The stack, by layer/i,
      /Other things we have built/i,
    ]) {
      expect(screen.queryByRole("heading", { name: absent })).not.toBeInTheDocument();
    }
  });

  it("renders a section once the study supplies its data", () => {
    render(
      <CaseStudyLayout
        study={study({
          challenges: { items: [{ title: "A hard problem", body: "Why it was hard." }] },
        })}
        project={null}
        related={[]}
      />,
    );
    expect(screen.getByRole("heading", { name: /What made this hard/i })).toBeInTheDocument();
    expect(screen.getByText("A hard problem")).toBeInTheDocument();
  });

  it("always renders the closing CTA, which is the page's conversion point", () => {
    render(<CaseStudyLayout study={study()} project={null} related={[]} />);
    expect(screen.getByRole("link", { name: /Start a conversation/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("uses the study's own CTA copy when supplied", () => {
    render(
      <CaseStudyLayout
        study={study({ cta: { heading: "Custom closing line." } })}
        project={null}
        related={[]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Custom closing line." })).toBeInTheDocument();
  });

  describe("breadcrumbs", () => {
    it("renders a labelled navigation trail ending in the current page", () => {
      render(<CaseStudyLayout study={study()} project={null} related={[]} />);
      const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
      expect(within(nav).getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
      expect(within(nav).getByRole("link", { name: "Projects" })).toHaveAttribute(
        "href",
        "/work/projects",
      );
      // The terminal crumb is not a link — a link to the page you are on is a
      // dead control.
      expect(within(nav).queryByRole("link", { name: "Example System" })).not.toBeInTheDocument();
    });
  });

  describe("live GitHub metadata", () => {
    it("renders source and deployment actions when the project resolves", () => {
      render(
        <CaseStudyLayout
          study={study()}
          project={project({ repoName: "example-repo" })}
          related={[]}
        />,
      );
      expect(screen.getByRole("link", { name: /View the example-repo repository on GitHub/ })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Open the live deployment/ })).toBeInTheDocument();
    });

    /**
     * Both actions belong to the Snapshot alone. Rendering them in the hero
     * as well put two links to the same destination in one viewport, which
     * reads as duplication visually and is indistinguishable in a screen
     * reader's link list.
     */
    it("renders each action exactly once across the page", () => {
      render(
        <CaseStudyLayout
          study={study()}
          project={project({ repoName: "example-repo" })}
          related={[]}
        />,
      );
      expect(screen.getAllByRole("link", { name: /Open the live deployment/ })).toHaveLength(1);
      expect(screen.getAllByRole("link", { name: /repository on GitHub/ })).toHaveLength(1);
    });

    /**
     * A renamed, deleted or private repository — or simply a GitHub outage —
     * must cost the metadata, never the page.
     */
    it("still renders the full page when the project cannot be resolved", () => {
      render(<CaseStudyLayout study={study()} project={null} related={[]} />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Example System");
      expect(screen.queryByRole("link", { name: /repository on GitHub/ })).not.toBeInTheDocument();
    });
  });

  describe("related work", () => {
    it("links each related study to its own page", () => {
      render(
        <CaseStudyLayout
          study={study()}
          project={null}
          related={[study({ slug: "other-study", hero: { ...study().hero, title: "Other System" } })]}
        />,
      );
      expect(screen.getByRole("link", { name: /Other System/ })).toHaveAttribute(
        "href",
        "/work/other-study",
      );
    });
  });
});

describe("CaseStudySnapshotSection", () => {
  it("renders authored facts as a definition list", () => {
    render(
      <CaseStudySnapshotSection
        snapshot={{ facts: [{ label: "Team", value: "Solo build" }] }}
        project={null}
      />,
    );
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Solo build")).toBeInTheDocument();
  });

  it("appends live facts derived from the project feed", () => {
    render(<CaseStudySnapshotSection snapshot={{ facts: [] }} project={project()} />);
    // Status and language come from the feed, not from the case-study data,
    // so they cannot go stale in the prose.
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Primary language")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  /**
   * The extensibility requirement, asserted directly: an unforeseen field
   * must flow into the same layout with no code change.
   */
  it("renders an arbitrary new fact without any layout change", () => {
    render(
      <CaseStudySnapshotSection
        snapshot={{
          facts: [
            { label: "Compliance", value: "SOC 2" },
            { label: "Users served", value: "12,000" },
            { label: "Deployment region", value: "eu-west-2" },
          ],
        }}
        project={null}
      />,
    );
    expect(screen.getByText("Compliance")).toBeInTheDocument();
    expect(screen.getByText("Users served")).toBeInTheDocument();
    expect(screen.getByText("Deployment region")).toBeInTheDocument();
  });

  it("renders the real number in the HTML even for a counted fact", () => {
    // The count-up is decoration on a fact that is already present. A crawler
    // or a no-JS visitor must read the value, never a zero.
    render(
      <CaseStudySnapshotSection
        snapshot={{ facts: [{ label: "Routes", value: "36", countTo: 36 }] }}
        project={null}
      />,
    );
    expect(screen.getByText("36")).toBeInTheDocument();
  });

  it("renders nothing when there are neither facts nor actions", () => {
    const { container } = render(<CaseStudySnapshotSection project={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("structured data", () => {
  it("emits an Article with the fields the schema audit requires", () => {
    const schema = buildCaseStudyArticleSchema(study(), null);
    expect(schema["@type"]).toBe("Article");
    expect(schema).toHaveProperty("headline");
    expect(schema).toHaveProperty("description");
    expect(schema).toHaveProperty("url");
  });

  it("omits dateModified rather than emitting a null when the feed is down", () => {
    expect(buildCaseStudyArticleSchema(study(), null)).not.toHaveProperty("dateModified");
    expect(buildCaseStudyArticleSchema(study(), project())).toHaveProperty("dateModified");
  });

  it("emits no pricing signal of any kind", () => {
    const serialised = JSON.stringify(buildCaseStudyArticleSchema(study(), project()));
    for (const forbidden of ["offers", "price", "priceRange", "priceCurrency"]) {
      expect(serialised).not.toContain(`"${forbidden}"`);
    }
  });

  /**
   * Breadcrumb markup with no visible counterpart is exactly the mismatch
   * Google's guidelines penalise, so the JSON-LD and the rendered `<nav>`
   * must describe the same trail.
   */
  it("emits a breadcrumb trail matching the rendered navigation", () => {
    const schema = buildBreadcrumbSchema(study()) as {
      itemListElement: Array<{ position: number; name: string }>;
    };
    expect(schema.itemListElement.map((entry) => entry.name)).toEqual([
      "Work",
      "Projects",
      "Example System",
    ]);
    // 1-based: Google's validator rejects position 0.
    expect(schema.itemListElement.map((entry) => entry.position)).toEqual([1, 2, 3]);
  });
});
