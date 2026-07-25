"use client";

import { useState } from "react";
import { Button, TextField } from "@trady-perch/ui";
import { CheckIcon } from "@/shared/components/icons";
import {
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "./contact-validation";
import styles from "./contact-form.module.css";

const EMPTY_FORM: ContactFormData = { name: "", email: "", company: "", message: "", website: "" };

type SubmitStatus = "idle" | "submitting" | "success";

/**
 * Ch.21 Fm-2: validates a field on blur, never on every keystroke — typing
 * updates `data` alone; `errors` is only touched by handleBlur (one field)
 * or handleSubmit (all fields, so nothing invalid can slip through on a
 * field a visitor never blurred).
 */
export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function updateField<K extends keyof ContactFormData>(field: K, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof ContactFormErrors) {
    const fieldErrors = validateContactForm(data);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const fieldErrors = validateContactForm(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const body = new FormData();
      body.set("name", data.name);
      body.set("email", data.email);
      body.set("company", data.company);
      body.set("message", data.message);
      body.set("website", data.website);

      const response = await fetch("/api/contact", { method: "POST", body });
      const result = (await response.json()) as { ok: boolean; errors?: ContactFormErrors };

      if (!result.ok) {
        setErrors(result.errors ?? {});
        setFormError(
          result.errors?.message ??
            "Something went wrong sending this. Try again, or email us directly.",
        );
        setStatus("idle");
        return;
      }

      setStatus("success");
      setData(EMPTY_FORM);
      setErrors({});
    } catch {
      setFormError("Something went wrong sending this. Try again, or email us directly.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successHeading}>
          <CheckIcon className={styles.successIcon} aria-hidden="true" />
          Message sent.
        </p>
        <p className={styles.successBody}>
          We respond within one business day — usually faster. In the meantime, feel free to look
          around the rest of the site.
        </p>
        <Button emphasis="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextField
        id="contact-name"
        name="name"
        label="Name"
        value={data.name}
        onChange={(value) => updateField("name", value)}
        onBlur={() => handleBlur("name")}
        error={errors.name}
        required
        autoComplete="name"
      />
      <TextField
        id="contact-email"
        name="email"
        label="Email"
        type="email"
        value={data.email}
        onChange={(value) => updateField("email", value)}
        onBlur={() => handleBlur("email")}
        error={errors.email}
        placeholder="you@company.com"
        required
        autoComplete="email"
      />
      <TextField
        id="contact-company"
        name="company"
        label="Company"
        value={data.company}
        onChange={(value) => updateField("company", value)}
        helperText="Optional."
        autoComplete="organization"
      />
      <TextField
        id="contact-message"
        name="message"
        label="What are you looking to build?"
        value={data.message}
        onChange={(value) => updateField("message", value)}
        onBlur={() => handleBlur("message")}
        error={errors.message}
        required
        multiline
        rows={5}
      />
      {/* Honeypot — real visitors never see this field; a filled value
          means a bot filled every field it could find. Kept out of the
          tab order and hidden from assistive technology, not merely
          visually hidden, so it never reaches a real visitor at all. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {formError ? (
        <p className={styles.formError} role="alert">
          {formError}
        </p>
      ) : null}

      <Button
        type="submit"
        emphasis="secondary"
        status={status === "submitting" ? "loading" : "idle"}
      >
        Send message
      </Button>
    </form>
  );
}
