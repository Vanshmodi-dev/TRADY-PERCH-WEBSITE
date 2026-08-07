import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./contact-form";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("renders Name, Email, Company, and Message fields with persistent labels (Ch.21 Fm-1)", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name", { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText("Email", { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByLabelText("What are you looking to build?", { exact: false })).toBeInTheDocument();
  });

  it("Ch.18 Bt-1: the submit button is never Primary emphasis — the nav's fixed CTA is the page's one Primary button", () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button", { name: "Send message" });
    expect(submitButton.className).not.toMatch(/\bprimary\b/i);
  });

  it("shows no errors before any interaction", () => {
    render(<ContactForm />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("Ch.21 Fm-2: validates a field on blur, not while the user is still typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const email = screen.getByLabelText("Email", { exact: false });
    await user.type(email, "not-an-email");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
  });

  it("blocks submission and surfaces every field error when the form is empty", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a message — a sentence or two on what you're looking to build."),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("submits and shows a calm success state on a valid submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ ok: true }) }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name", { exact: false }), "Jamie Rivera");
    await user.type(screen.getByLabelText("Email", { exact: false }), "jamie@example.com");
    await user.type(
      screen.getByLabelText("What are you looking to build?", { exact: false }),
      "An agent that qualifies inbound leads.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText("Your strategy request has been received."),
    ).toBeInTheDocument();
    // The copy uses a typographic apostrophe (&rsquo;), not an ASCII one.
    expect(screen.getByText(/reach out shortly with the next steps/)).toBeInTheDocument();
    // Announced, not merely rendered — a visitor using a screen reader has to
    // learn the submit succeeded without seeing the panel replace the form.
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("returns to a clean form once the confirmation has been held", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ ok: true }) }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name", { exact: false }), "Jamie Rivera");
    await user.type(screen.getByLabelText("Email", { exact: false }), "jamie@example.com");
    await user.type(
      screen.getByLabelText("What are you looking to build?", { exact: false }),
      "An agent that qualifies inbound leads.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));
    await screen.findByRole("status");

    // The explicit control, rather than the timer: the auto-dismiss is a
    // convenience and this is the path that must always work.
    await user.click(screen.getByRole("button", { name: "Send another message" }));

    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
    // Cleared, not repopulated — a returning form holding the last message
    // invites an accidental duplicate submit.
    expect(screen.getByLabelText("Name", { exact: false })).toHaveValue("");
  });

  it("shows a form-level error and preserves the entered data when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name", { exact: false }), "Jamie Rivera");
    await user.type(screen.getByLabelText("Email", { exact: false }), "jamie@example.com");
    await user.type(
      screen.getByLabelText("What are you looking to build?", { exact: false }),
      "An agent that qualifies inbound leads.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    // A request that never reached the server gets the same escape hatch as a
    // server-side delivery failure: the visitor has still written a message,
    // and it must not be a dead end.
    await waitFor(() => {
      expect(screen.getByText(/could not send this automatically/i)).toBeInTheDocument();
    });
    expect(
      screen.getByRole("link", { name: "Open this in your email app" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name", { exact: false })).toHaveValue("Jamie Rivera");
  });

  // WCAG 3.3.1 — before this, a failed submit left focus on the submit
  // button, so a screen-reader user was told nothing about which field was
  // at fault and had to tab back through the form to find out.
  it("moves focus to the first invalid field when submission is blocked", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), "Ada Lovelace");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    // Name is valid, so Email is the first field actually in error.
    expect(document.activeElement).toBe(screen.getByLabelText(/Email/));
    expect(document.activeElement).not.toBe(document.body);
  });

  it("keeps the honeypot field out of the accessible tab order", () => {
    render(<ContactForm />);
    const honeypot = document.getElementById("contact-website");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest('[aria-hidden="true"]')).toBeInTheDocument();
  });
  /**
   * REGRESSION GUARD — production outage.
   *
   * The live endpoint returned 502 for every submission (an invalid Resend key
   * plus a newline in the sender address). The visitor saw "Something went
   * wrong sending this — email us directly instead", which named no address,
   * and the message field was marked invalid even though nothing was wrong
   * with it. The message was lost.
   */
  it("offers a prefilled mailto when the server cannot deliver", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            ok: false,
            errors: { message: "We could not send this automatically. Please email hello@tradyperch.com — your message is below, ready to copy." },
            fallbackEmail: "hello@tradyperch.com",
          }),
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name", { exact: false }), "Jamie Rivera");
    await user.type(screen.getByLabelText("Email", { exact: false }), "jamie@example.com");
    await user.type(
      screen.getByLabelText("What are you looking to build?", { exact: false }),
      "An agent that qualifies inbound leads.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const escapeHatch = await screen.findByRole("link", { name: "Open this in your email app" });
    const href = escapeHatch.getAttribute("href") ?? "";
    expect(href.startsWith("mailto:hello@tradyperch.com")).toBe(true);
    // The message the visitor already wrote is carried across, so recovering
    // from our outage costs one click rather than retyping it.
    expect(decodeURIComponent(href)).toContain("An agent that qualifies inbound leads.");
    expect(decodeURIComponent(href)).toContain("Jamie Rivera");

    // A delivery failure is not a validation failure: the message they wrote
    // is still there, and is not flagged as the problem.
    expect(
      screen.getByLabelText("What are you looking to build?", { exact: false }),
    ).toHaveValue("An agent that qualifies inbound leads.");
  });
});
