import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardBody, CardFooter, CardTitle } from "./card";

describe("Card", () => {
  it("renders a static card as a non-interactive container", () => {
    render(
      <Card aria-label="Real Estate">
        <CardTitle>Real Estate</CardTitle>
        <CardBody>Lead intake and follow-up automation.</CardBody>
      </Card>,
    );
    const card = screen.getByLabelText("Real Estate");
    expect(card.tagName).toBe("DIV");
    expect(screen.getByRole("heading", { name: "Real Estate", level: 3 })).toBeInTheDocument();
  });

  it("Ch.19 Cd-1: an interactive card renders as one genuine link covering the whole surface", () => {
    render(
      <Card interactivity="interactive" href="/work/case-studies/example" aria-label="Read the case study">
        <CardTitle>Faster lead response</CardTitle>
        <CardBody>A lead-qualification agent cut response time significantly.</CardBody>
      </Card>,
    );
    const card = screen.getByRole("link", { name: "Read the case study" });
    expect(card).toHaveAttribute("href", "/work/case-studies/example");
  });

  it("renders Title at the requested heading level", () => {
    render(
      <Card aria-label="test">
        <CardTitle as="h2">Section-level title</CardTitle>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Section-level title", level: 2 })).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(
      <Card aria-label="test">
        <CardTitle>Title</CardTitle>
        <CardBody>Body</CardBody>
        <CardFooter>
          <span>Learn more</span>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });
});
