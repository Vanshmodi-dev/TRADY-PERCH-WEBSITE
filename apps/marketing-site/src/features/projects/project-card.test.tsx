import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";
import { ProjectsEmpty, ProjectsError, ProjectsSkeleton } from "./projects-states";
import { project } from "@/test/project-fixtures";

describe("ProjectCard", () => {
  it("renders the title as a heading", () => {
    render(<ProjectCard project={project()} />);
    expect(screen.getByRole("heading", { name: "AI Booking Agent" })).toBeInTheDocument();
  });

  it("renders the requested heading level so the document outline never skips one", () => {
    const { rerender } = render(<ProjectCard project={project()} headingLevel="h3" />);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    rerender(<ProjectCard project={project()} headingLevel="h2" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("uses an <article>, so each project is a real document region", () => {
    const { container } = render(<ProjectCard project={project()} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  describe("editorial metadata", () => {
    it("shows the discipline category and the build year", () => {
      render(<ProjectCard project={project({ category: "Commerce", buildYear: 2024 })} />);
      expect(screen.getByText("Commerce")).toBeInTheDocument();
      expect(screen.getByText("2024")).toBeInTheDocument();
    });

    it("labels the build year for screen readers, which get no visual context", () => {
      render(<ProjectCard project={project({ buildYear: 2024 })} />);
      expect(screen.getByText(/Built in/)).toBeInTheDocument();
    });
  });

  describe("status", () => {
    it.each([
      ["live", "Live"],
      ["active", "In development"],
      ["maintained", "Maintained"],
    ] as const)("renders %s as %s", (status, label) => {
      render(<ProjectCard project={project({ status })} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    /**
     * WCAG 1.4.1 — the coloured dot must never be the only carrier of the
     * status. A visible text label sits beside it, and a fuller phrase is
     * available to assistive technology because "Live" alone is ambiguous
     * out of visual context.
     */
    it("carries the status in text, not only in the dot colour", () => {
      render(<ProjectCard project={project({ status: "live" })} />);
      expect(screen.getByText("Status: live deployment available")).toBeInTheDocument();
    });
  });

  describe("featured variant", () => {
    it("marks a featured project", () => {
      render(<ProjectCard project={project({ featured: true })} />);
      expect(screen.getByText("Selected")).toBeInTheDocument();
    });

    it("does not mark a standard project", () => {
      render(<ProjectCard project={project({ featured: false })} />);
      expect(screen.queryByText("Selected")).not.toBeInTheDocument();
    });

    it("prefers the long-form narrative on a featured card", () => {
      render(
        <ProjectCard
          project={project({
            featured: true,
            narrative: "A longer account of how the system is built.",
            description: "Short summary.",
          })}
        />,
      );
      expect(screen.getByText("A longer account of how the system is built.")).toBeInTheDocument();
      expect(screen.queryByText("Short summary.")).not.toBeInTheDocument();
    });

    /**
     * A standard card has no room for the narrative; rendering it there would
     * clamp a paragraph into a ragged block and break the row's baseline.
     */
    it("keeps the short summary on a standard card even when a narrative exists", () => {
      render(
        <ProjectCard
          project={project({
            featured: false,
            narrative: "A longer account.",
            description: "Short summary.",
          })}
        />,
      );
      expect(screen.getByText("Short summary.")).toBeInTheDocument();
      expect(screen.queryByText("A longer account.")).not.toBeInTheDocument();
    });

    it("falls back to the summary when a featured card has no narrative", () => {
      render(<ProjectCard project={project({ featured: true, narrative: null, description: "Short summary." })} />);
      expect(screen.getByText("Short summary.")).toBeInTheDocument();
    });
  });

  describe("actions", () => {
    it("links to the source in a new tab, safely", () => {
      render(<ProjectCard project={project()} />);
      const link = screen.getByRole("link", { name: /View the ai-booking-agent source on GitHub/ });
      expect(link).toHaveAttribute("href", "https://github.com/acme/ai-booking-agent");
      expect(link).toHaveAttribute("target", "_blank");
      // Denies the opened page a window.opener handle back to this one.
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    });

    it("names the deployment host in the live action's accessible label", () => {
      render(<ProjectCard project={project()} />);
      // Several cards each labelled just "Live" would be indistinguishable in
      // a screen reader's link list.
      const link = screen.getByRole("link", {
        name: /live deployment of AI Booking Agent at demo\.example\.com/,
      });
      expect(link).toHaveAttribute("href", "https://demo.example.com/");
    });

    it("omits the live action when there is no deployment", () => {
      render(<ProjectCard project={project({ liveUrl: null, status: "active" })} />);
      expect(screen.queryByRole("link", { name: /live deployment/i })).not.toBeInTheDocument();
      // Source must still be there — a project with no demo is not a card
      // with no actions.
      expect(screen.getByRole("link", { name: /source on GitHub/ })).toBeInTheDocument();
    });

    /**
     * A case-study link is rendered only once real content exists behind it.
     * Linking to an empty page is worse than showing no link.
     */
    it("omits the case-study action when no case study exists", () => {
      render(<ProjectCard project={project({ caseStudySlug: null })} />);
      expect(screen.queryByRole("link", { name: /case study/i })).not.toBeInTheDocument();
    });

    it("links to the case study when one exists", () => {
      render(<ProjectCard project={project({ caseStudySlug: "booking-agent" })} />);
      expect(screen.getByRole("link", { name: /Read the case study for AI Booking Agent/ })).toHaveAttribute(
        "href",
        "/work/projects/booking-agent",
      );
    });
  });

  describe("facts", () => {
    it("shows the language", () => {
      render(<ProjectCard project={project()} />);
      expect(screen.getByText("Python")).toBeInTheDocument();
    });

    it("renders a zero star count rather than hiding it", () => {
      // A figure present on some cards and absent on others reads as missing
      // data; a visible 0 reads as an honest, unremarkable fact.
      render(<ProjectCard project={project({ stars: 0 })} />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("exposes the exact timestamp on a <time> element alongside the relative text", () => {
      render(<ProjectCard project={project()} />);
      const time = screen.getByText(/ago$/).closest("time");
      expect(time).toHaveAttribute("dateTime", "2026-07-28T00:00:00Z");
      expect(time).toHaveAttribute("title", "28 July 2026");
    });
  });

  describe("technology stack", () => {
    it("renders as a labelled list", () => {
      render(<ProjectCard project={project()} />);
      const list = screen.getByRole("list", { name: /Technologies used in AI Booking Agent/ });
      expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    });

    it("does not repeat the language, which the facts row already shows", () => {
      render(<ProjectCard project={project()} />);
      expect(screen.getAllByText("Python")).toHaveLength(1);
    });

    it("renders no list at all rather than an empty one", () => {
      render(<ProjectCard project={project({ tags: [] })} />);
      expect(screen.queryByRole("list", { name: /Technologies/ })).not.toBeInTheDocument();
    });
  });

  describe("thumbnail", () => {
    it("uses an empty alt, because the card's own text already says everything the OG card says", () => {
      const { container } = render(<ProjectCard project={project()} />);
      expect(container.querySelector("img")).toHaveAttribute("alt", "");
    });

    it("lazy-loads, since every card sits below the fold", () => {
      const { container } = render(<ProjectCard project={project()} />);
      expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
    });

    it("requests a wider image for a featured card, which spans two columns", () => {
      const { container: standard } = render(<ProjectCard project={project({ featured: false })} />);
      expect(standard.querySelector("img")?.getAttribute("sizes")).toContain("33vw");

      const { container: featured } = render(<ProjectCard project={project({ featured: true })} />);
      expect(featured.querySelector("img")?.getAttribute("sizes")).toContain("66vw");
    });
  });

  /**
   * The pointer field finds cards by this attribute. A class name cannot be
   * used because CSS Modules hashes it per build, so the listener would have
   * nothing stable to match — losing the hook silently disables the tilt.
   */
  it("exposes the data attribute the pointer field delegates on", () => {
    const { container } = render(<ProjectCard project={project()} />);
    expect(container.querySelector("[data-project-card]")).toBeInTheDocument();
  });
});

describe("ProjectGrid", () => {
  it("renders one grid item per project", () => {
    const { container } = render(
      <ProjectGrid projects={[project({ id: 1 }), project({ id: 2 }), project({ id: 3 })]} />,
    );
    // Direct children of the grid's own <ul>. Each card nests a
    // technology-stack list, so an unscoped `getAllByRole("listitem")` would
    // count those too and this assertion would silently track tag counts.
    const grid = container.querySelector("ul");
    expect(grid?.children).toHaveLength(3);
  });

  it("renders each project's heading", () => {
    render(
      <ProjectGrid
        projects={[project({ id: 1, title: "First" }), project({ id: 2, title: "Second" })]}
      />,
    );
    expect(screen.getByRole("heading", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Second" })).toBeInTheDocument();
  });

  it("survives an empty list without rendering a stray list item", () => {
    render(<ProjectGrid projects={[]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});

describe("ProjectsSkeleton", () => {
  it("announces loading once, not one placeholder card at a time", () => {
    render(<ProjectsSkeleton count={3} />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading projects from GitHub.");
  });

  it("hides the placeholder geometry from assistive technology", () => {
    const { container } = render(<ProjectsSkeleton count={3} />);
    expect(container.querySelector("ul")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the requested number of placeholders", () => {
    const { container } = render(<ProjectsSkeleton count={4} />);
    expect(container.querySelectorAll("li")).toHaveLength(4);
  });
});

describe("ProjectsEmpty", () => {
  it("shows the specified empty-state message", () => {
    render(<ProjectsEmpty />);
    expect(
      screen.getByRole("heading", { name: "Projects are currently being prepared." }),
    ).toBeInTheDocument();
  });

  it("offers somewhere useful to go instead of a dead end", () => {
    render(<ProjectsEmpty />);
    expect(screen.getByRole("link", { name: /case studies/i })).toHaveAttribute(
      "href",
      "/work/case-studies",
    );
    expect(screen.getByRole("link", { name: /strategy call/i })).toHaveAttribute("href", "/contact");
  });
});

describe("ProjectsError", () => {
  it("shows the caller's visitor-facing message", () => {
    render(<ProjectsError message="GitHub didn’t respond just now." action={<button>Try again</button>} />);
    expect(screen.getByRole("heading", { name: /couldn’t load the projects/i })).toBeInTheDocument();
    expect(screen.getByText("GitHub didn’t respond just now.")).toBeInTheDocument();
  });

  it("renders the injected retry action", () => {
    render(<ProjectsError message="…" action={<button>Try again</button>} />);
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  /**
   * This panel is in the initial server-rendered HTML rather than appearing in
   * response to a visitor action, and role="alert" on page load interrupts a
   * screen reader mid-sentence for something that is not urgent.
   */
  it("does not announce itself as an alert on page load", () => {
    render(<ProjectsError message="…" action={<button>Try again</button>} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
