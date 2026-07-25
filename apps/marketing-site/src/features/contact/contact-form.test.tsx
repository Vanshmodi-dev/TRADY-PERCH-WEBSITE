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

    expect(await screen.findByText("Message sent.")).toBeInTheDocument();
    expect(
      screen.getByText(/We respond within one business day/),
    ).toBeInTheDocument();
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

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong sending this/)).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Name", { exact: false })).toHaveValue("Jamie Rivera");
  });

  it("keeps the honeypot field out of the accessible tab order", () => {
    render(<ContactForm />);
    const honeypot = document.getElementById("contact-website");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
