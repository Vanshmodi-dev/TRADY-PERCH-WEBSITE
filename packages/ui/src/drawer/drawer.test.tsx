import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./drawer";

function ControlledDrawerHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open drawer
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} aria-label="Navigation">
        <a href="/first">First link</a>
        <a href="/last">Last link</a>
      </Drawer>
    </>
  );
}

describe("Drawer", () => {
  it("Ch.24 Dw-1: renders anchored, never centered — exposes its anchor via a rendered class", () => {
    render(
      <Drawer open onClose={vi.fn()} anchor="right" aria-label="Navigation">
        Menu content
      </Drawer>,
    );
    const panel = document.body.querySelector('[role="dialog"]');
    expect(panel?.className).toContain("right");
  });

  it("renders header, body, and footer content", () => {
    render(
      <Drawer
        open
        onClose={vi.fn()}
        aria-label="Navigation"
        header={<span>Header content</span>}
        footer={<span>Footer content</span>}
      >
        Body content
      </Drawer>,
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("Ch.42 Kb-4: Escape closes the drawer", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} aria-label="Navigation">
        Menu content
      </Drawer>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Ch.24 Dw-2: a dimmed backdrop is rendered and closes the drawer on click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} backdrop="dimmed" aria-label="Navigation">
        Menu content
      </Drawer>,
    );
    const backdrop = document.body.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeTruthy();
    if (backdrop) await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Ch.24 Dw-2: backdrop='none' renders no backdrop element", () => {
    render(
      <Drawer open onClose={vi.fn()} backdrop="none" aria-label="Filters">
        Filter content
      </Drawer>,
    );
    expect(document.body.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it("Ch.42 Kb-3: focus moves to the first focusable descendant on open, and the trap holds on an immediate Shift+Tab", async () => {
    const user = userEvent.setup();
    render(<ControlledDrawerHarness />);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    const firstLink = screen.getByRole("link", { name: "First link" });
    const lastLink = screen.getByRole("link", { name: "Last link" });
    // Focus must start inside the trapped region, not on the panel
    // container itself (which is un-focusable via Tab, tabIndex=-1) — that
    // was the root cause of the trap being escapable.
    expect(firstLink).toHaveFocus();
    await user.tab({ shift: true });
    expect(lastLink).toHaveFocus();
    expect(screen.getByRole("button", { name: "Open drawer" })).not.toHaveFocus();
  });

  it("Ch.42 Kb-3: focus returns to the triggering element on close", async () => {
    const user = userEvent.setup();
    render(<ControlledDrawerHarness />);
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });

  it("is marked inert and hidden from the accessibility tree while closed", () => {
    render(
      <Drawer open={false} onClose={vi.fn()} aria-label="Navigation">
        Menu content
      </Drawer>,
    );
    const panel = document.body.querySelector("[aria-label='Navigation']");
    expect(panel).toHaveAttribute("aria-hidden", "true");
  });
  /**
   * REGRESSION GUARD — see the portal note in drawer.tsx.
   *
   * A `position: fixed` element is only positioned against the viewport while
   * no ancestor establishes a containing block for it. `transform`, `filter`,
   * `backdrop-filter`, `perspective`, `contain` and `will-change` all do.
   *
   * This shipped broken: the drawer is written inside the site header, the
   * header is glass (`backdrop-filter`), and so the panel's `height: 100%`
   * resolved against the header's 79px instead of the viewport's. On a phone
   * the menu opened as a 78px sliver with one nav item reachable.
   *
   * This test fails if the panel is ever rendered anywhere but as a direct
   * child of <body> — which is the only placement that cannot be captured.
   */
  it("renders as a direct child of <body>, never inside its call site", () => {
    render(
      <div style={{ backdropFilter: "blur(8px)" }}>
        <Drawer open onClose={vi.fn()} aria-label="Navigation">
          Menu content
        </Drawer>
      </div>,
    );

    const panel = document.body.querySelector("[aria-label='Navigation']");
    expect(panel).not.toBeNull();
    expect(panel?.parentElement).toBe(document.body);

    const backdrop = document.body.querySelector('[aria-hidden="true"]');
    expect(backdrop?.parentElement).toBe(document.body);
  });
});
