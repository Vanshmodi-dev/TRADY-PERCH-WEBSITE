import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InteractiveAiDemo } from "./interactive-ai-demo";

describe("InteractiveAiDemo", () => {
  it("renders the initial AI message and three starting choices", () => {
    render(<InteractiveAiDemo />);
    expect(
      screen.getByText(/I'm the assistant that qualifies leads for this brokerage/),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I'm looking to sell" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I'm looking to buy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Just researching" })).toBeInTheDocument();
  });

  it("Ch.13 item 10: the demo is honestly labeled as simulated, never implying a live backend", () => {
    render(<InteractiveAiDemo />);
    expect(screen.getByText("Simulated demo")).toBeInTheDocument();
  });

  it("branches to the sell-specific follow-up when 'I'm looking to sell' is chosen", async () => {
    const user = userEvent.setup();
    render(<InteractiveAiDemo />);
    await user.click(screen.getByRole("button", { name: "I'm looking to sell" }));

    expect(screen.getByText("I'm looking to sell")).toBeInTheDocument(); // echoed as a user bubble
    expect(screen.getByText("Great — when are you hoping to have it listed?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Within 30 days" })).toBeInTheDocument();
  });

  it("branches to the buy-specific follow-up when 'I'm looking to buy' is chosen", async () => {
    const user = userEvent.setup();
    render(<InteractiveAiDemo />);
    await user.click(screen.getByRole("button", { name: "I'm looking to buy" }));
    expect(
      screen.getByText("Got it — do you have a target area and budget in mind yet?"),
    ).toBeInTheDocument();
  });

  it("reaches the closing message and hides the choice buttons after the second answer", async () => {
    const user = userEvent.setup();
    render(<InteractiveAiDemo />);
    await user.click(screen.getByRole("button", { name: "I'm looking to sell" }));
    await user.click(screen.getByRole("button", { name: "Within 30 days" }));

    expect(screen.getByText(/I'm connecting you with an agent/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Within 30 days" })).not.toBeInTheDocument();
    expect(
      screen.getByText(/This is what happens automatically, day or night/),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Restart demo" })).toBeInTheDocument();
  });

  it("restart returns to the initial question with fresh choices, discarding the prior transcript", async () => {
    const user = userEvent.setup();
    render(<InteractiveAiDemo />);
    await user.click(screen.getByRole("button", { name: "I'm looking to sell" }));
    await user.click(screen.getByRole("button", { name: "Within 30 days" }));
    await user.click(screen.getByRole("button", { name: "Restart demo" }));

    expect(screen.getByRole("button", { name: "I'm looking to sell" })).toBeInTheDocument();
    expect(screen.queryByText("Within 30 days")).not.toBeInTheDocument();
    expect(screen.queryByText(/I'm connecting you with an agent/)).not.toBeInTheDocument();
  });

  // Ch.42 Kb-3 / WCAG 2.4.3. Each choice unmounts the button that was just
  // activated; before this was handled, focus fell back to <body> on every
  // step, stranding keyboard and screen-reader users at the top of the
  // document mid-conversation.
  it("keeps keyboard focus on the next control after a choice, never dropping it to the body", async () => {
    const user = userEvent.setup();
    render(<InteractiveAiDemo />);

    await user.click(screen.getByRole("button", { name: "I'm looking to sell" }));
    expect(document.activeElement).not.toBe(document.body);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Within 30 days" }));

    await user.click(screen.getByRole("button", { name: "Within 30 days" }));
    expect(document.activeElement).not.toBe(document.body);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Restart demo" }));

    await user.click(screen.getByRole("button", { name: "Restart demo" }));
    expect(document.activeElement).not.toBe(document.body);
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "I'm looking to sell" }),
    );
  });

  it("the transcript is announced to assistive technology as a live, polite log", () => {
    const { container } = render(<InteractiveAiDemo />);
    const log = container.querySelector('[role="log"]');
    expect(log).toHaveAttribute("aria-live", "polite");
    expect(log).toHaveAttribute("aria-label", "Demo conversation");
  });
});
