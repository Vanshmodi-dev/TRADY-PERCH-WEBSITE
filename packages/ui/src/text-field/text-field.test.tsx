import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField } from "./text-field";

describe("TextField", () => {
  it("Ch.21 Fm-1: the label stays visible and is programmatically associated with the input", () => {
    render(<TextField id="name" name="name" label="Full Name" value="" onChange={() => {}} />);
    const input = screen.getByLabelText("Full Name");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange with the new value as the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<TextField id="name" name="name" label="Full Name" value="" onChange={handleChange} />);
    await user.type(screen.getByLabelText("Full Name"), "A");
    expect(handleChange).toHaveBeenCalledWith("A");
  });

  it("Ch.21 Fm-3: shows exactly one error, associated with the field via aria-describedby", () => {
    render(
      <TextField
        id="email"
        name="email"
        label="Email"
        value=""
        onChange={() => {}}
        error="Enter a valid email address."
      />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const errorMessages = screen.getAllByText("Enter a valid email address.");
    expect(errorMessages).toHaveLength(1);
    expect(input.getAttribute("aria-describedby")).toBe(errorMessages[0]!.id);
  });

  it("renders helper text only when there is no error", () => {
    const { rerender } = render(
      <TextField
        id="msg"
        name="msg"
        label="Message"
        value=""
        onChange={() => {}}
        helperText="A sentence or two is enough."
      />,
    );
    expect(screen.getByText("A sentence or two is enough.")).toBeInTheDocument();

    rerender(
      <TextField
        id="msg"
        name="msg"
        label="Message"
        value=""
        onChange={() => {}}
        helperText="A sentence or two is enough."
        error="Enter a message."
      />,
    );
    expect(screen.queryByText("A sentence or two is enough.")).not.toBeInTheDocument();
    expect(screen.getByText("Enter a message.")).toBeInTheDocument();
  });

  it("renders a textarea, sharing the same label association, when multiline is set", () => {
    render(
      <TextField id="msg" name="msg" label="Message" value="" onChange={() => {}} multiline rows={6} />,
    );
    const field = screen.getByLabelText("Message");
    expect(field.tagName).toBe("TEXTAREA");
    expect(field).toHaveAttribute("rows", "6");
  });

  it("calls onBlur when the field loses focus (Ch.21 Fm-2's validation trigger)", async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();
    render(<TextField id="name" name="name" label="Full Name" value="" onChange={() => {}} onBlur={handleBlur} />);
    const input = screen.getByLabelText("Full Name");
    await user.click(input);
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });
});
