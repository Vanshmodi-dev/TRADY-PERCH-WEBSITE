import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./accordion";
import type { AccordionItemData } from "./accordion.types";

const items: AccordionItemData[] = [
  { id: "timeline", question: "How long does a typical engagement take?", answer: "It depends on scope." },
  { id: "security", question: "How is our data secured?", answer: "Access is scoped and audited." },
  { id: "support", question: "What happens after launch?", answer: "Ongoing support is included." },
];

describe("Accordion", () => {
  it("renders every question as a heading, with all answers collapsed by default", () => {
    render(<Accordion items={items} aria-label="Frequently asked questions" />);
    for (const item of items) {
      expect(screen.getByRole("heading", { name: item.question, level: 3 })).toBeInTheDocument();
    }
    expect(screen.queryByText("It depends on scope.")).not.toBeInTheDocument();
  });

  it("Ch.37 Ac-3: clicking the full header row (not just an icon) opens the answer", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} aria-label="FAQ" />);
    const trigger = screen.getByRole("button", { name: items[0]!.question });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("It depends on scope.")).toBeInTheDocument();
  });

  it("Ch.37 Ac-1: opening a new item closes the previously open one", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} aria-label="FAQ" />);
    await user.click(screen.getByRole("button", { name: items[0]!.question }));
    expect(screen.getByText("It depends on scope.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: items[1]!.question }));
    expect(screen.queryByText("It depends on scope.")).not.toBeInTheDocument();
    expect(screen.getByText("Access is scoped and audited.")).toBeInTheDocument();
  });

  it("clicking an open item's header closes it", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} aria-label="FAQ" />);
    const trigger = screen.getByRole("button", { name: items[0]!.question });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("It depends on scope.")).not.toBeInTheDocument();
  });

  it("respects an explicit defaultOpenId", () => {
    render(<Accordion items={items} defaultOpenId="security" aria-label="FAQ" />);
    expect(screen.getByText("Access is scoped and audited.")).toBeInTheDocument();
  });

  it("Milestone 7 review: headingLevel=\"h2\" renders items as h2, for callers whose accordion sits directly under the page's own h1 with no intervening h2 (axe heading-order)", () => {
    render(<Accordion items={items} aria-label="FAQ" headingLevel="h2" />);
    for (const item of items) {
      expect(screen.getByRole("heading", { name: item.question, level: 2 })).toBeInTheDocument();
    }
  });
});
