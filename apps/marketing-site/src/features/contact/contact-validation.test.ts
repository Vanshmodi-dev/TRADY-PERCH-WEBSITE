import { describe, expect, it } from "vitest";
import { isSpamSubmission, validateContactForm, type ContactFormData } from "./contact-validation";

function form(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines",
    message: "We would like to automate our intake process end to end.",
    website: "",
    ...overrides,
  };
}

describe("validateContactForm", () => {
  it("accepts a well-formed submission", () => {
    expect(validateContactForm(form())).toEqual({});
  });

  it("requires name, email, and message", () => {
    const errors = validateContactForm(form({ name: " ", email: "", message: "" }));
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("rejects a malformed email address", () => {
    expect(validateContactForm(form({ email: "not-an-email" })).email).toBeDefined();
  });

  it("rejects a message that is too short to act on", () => {
    expect(validateContactForm(form({ message: "hi" })).message).toBeDefined();
  });

  // These bounds exist because every field except `message` was previously
  // unbounded: an arbitrarily large name or company passed validation and was
  // then interpolated straight into an outbound email's subject and body.
  describe("upper bounds on every free-text field", () => {
    it("rejects an over-long name", () => {
      expect(validateContactForm(form({ name: "a".repeat(121) })).name).toBeDefined();
      expect(validateContactForm(form({ name: "a".repeat(120) })).name).toBeUndefined();
    });

    it("rejects an email longer than the RFC 5321 maximum", () => {
      const tooLong = `${"a".repeat(250)}@example.com`;
      expect(validateContactForm(form({ email: tooLong })).email).toBeDefined();
    });

    it("rejects an over-long company, which is otherwise an optional field", () => {
      expect(validateContactForm(form({ company: "a".repeat(161) })).company).toBeDefined();
      expect(validateContactForm(form({ company: "a".repeat(160) })).company).toBeUndefined();
      expect(validateContactForm(form({ company: "" })).company).toBeUndefined();
    });

    it("rejects an over-long message", () => {
      expect(validateContactForm(form({ message: "a".repeat(5001) })).message).toBeDefined();
    });
  });
});

describe("isSpamSubmission", () => {
  it("treats a filled honeypot as spam and an empty one as legitimate", () => {
    expect(isSpamSubmission(form({ website: "http://spam.example" }))).toBe(true);
    expect(isSpamSubmission(form({ website: "   " }))).toBe(false);
    expect(isSpamSubmission(form())).toBe(false);
  });
});
