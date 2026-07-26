export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot — real visitors never see or fill this field; a filled value
   * means a bot submitted the form. */
  website: string;
}

export type ContactFormErrors = Partial<Record<keyof Omit<ContactFormData, "website">, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Upper bounds on every free-text field, not only `message`. Before these,
 * `message` was the single field with a ceiling, so a submission carrying a
 * multi-megabyte `name` or `company` passed validation intact and was then
 * interpolated straight into an outbound email's subject and body. The
 * limits are generous enough that no real person hits them (the longest
 * verified human name on record is well under 100 characters) and exist to
 * bound the input, not to police it.
 */
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 §4.5.3.1.3 — the real maximum path length.
const MAX_COMPANY_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 5000;

/**
 * Shared by the client form (immediate inline validation, Ch.17.4) and the
 * `/api/contact` route handler (never trust client-side validation alone)
 * so the two can't silently drift apart.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Enter your name.";
  } else if (data.name.length > MAX_NAME_LENGTH) {
    errors.name = `Keep your name under ${MAX_NAME_LENGTH} characters.`;
  }

  if (!data.email.trim()) {
    errors.email = "Enter your email.";
  } else if (data.email.length > MAX_EMAIL_LENGTH) {
    errors.email = "That email address is too long to be valid.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (data.company.length > MAX_COMPANY_LENGTH) {
    errors.company = `Keep the company name under ${MAX_COMPANY_LENGTH} characters.`;
  }

  if (!data.message.trim()) {
    errors.message = "Enter a message — a sentence or two on what you're looking to build.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Add a little more detail so we know where to start.";
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Keep it under 5,000 characters — long-form detail can wait for the call.";
  }

  return errors;
}

export function isSpamSubmission(data: ContactFormData): boolean {
  return data.website.trim().length > 0;
}
