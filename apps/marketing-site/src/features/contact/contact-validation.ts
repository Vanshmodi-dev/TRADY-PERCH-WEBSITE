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
 * Shared by the client form (immediate inline validation, Ch.17.4) and the
 * `/api/contact` route handler (never trust client-side validation alone)
 * so the two can't silently drift apart.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Enter a message — a sentence or two on what you're looking to build.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Add a little more detail so we know where to start.";
  } else if (data.message.length > 5000) {
    errors.message = "Keep it under 5,000 characters — long-form detail can wait for the call.";
  }

  return errors;
}

export function isSpamSubmission(data: ContactFormData): boolean {
  return data.website.trim().length > 0;
}
