"use client";

import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@trady-perch/ui";
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
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * WCAG 3.3.1 / Ch.42 Kb-1. A failed submit previously only re-rendered
   * inline errors: focus stayed on the submit button at the bottom of the
   * form, so a screen-reader user got no indication of *which* field failed
   * without manually tabbing back up through the whole form to hunt for it.
   * Moving focus to the first invalid control announces that control's
   * label, its `aria-invalid` state and its `aria-describedby` error text in
   * one step — and scrolls it into view for sighted keyboard users too.
   *
   * Field order is read from the DOM rather than from a hardcoded list so it
   * cannot drift out of sync with the rendered order if a field is added.
   */
  function focusFirstInvalidField(fieldErrors: ContactFormErrors) {
    const form = formRef.current;
    if (!form) return;
    for (const control of form.querySelectorAll<HTMLElement>("input[name], textarea[name]")) {
      const name = control.getAttribute("name");
      if (name && name in fieldErrors && fieldErrors[name as keyof ContactFormErrors]) {
        control.focus();
        return;
      }
    }
  }

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
      focusFirstInvalidField(fieldErrors);
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
        if (result.errors) focusFirstInvalidField(result.errors);
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
    return <ContactSuccess onDismiss={() => setStatus("idle")} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate ref={formRef}>
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
        onBlur={() => handleBlur("company")}
        error={errors.company}
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

/** How long the confirmation is held before it returns to the form. */
const SUCCESS_HOLD_MS = 7000;

/**
 * THE CONFIRMATION.
 *
 * The moment a visitor has just done the single thing this whole site exists
 * to ask them to do. It gets one sentence of acknowledgement, one of
 * expectation, and a mark that draws itself.
 *
 * ── The checkmark ─────────────────────────────────────────────────────────
 *
 * Drawn rather than revealed: the ring sweeps closed and the tick is written
 * into it, on a stroke-dashoffset animation. That is the one place in this
 * codebase where a property outside Ch.40 Ag-1's closed list animates, and it
 * is the effect's whole point — `stroke-dashoffset` is neither layout- nor
 * paint-expensive on a 24px two-path SVG, and there is no way to draw a line
 * with transform or opacity. The alternative, a mark that fades in whole, is
 * the thing every form does.
 *
 * ── Auto-dismiss ──────────────────────────────────────────────────────────
 *
 * Seven seconds, then back to a clean form — but the timer pauses whenever
 * the panel has the pointer over it or focus inside it. A confirmation that
 * vanishes while someone is still reading it is worse than one that never
 * leaves, and a keyboard user tabbing to the dismiss button must not have it
 * removed from under them mid-tab.
 *
 * Nothing is lost either way: the message conveys no information the visitor
 * has to retain, and the panel is announced through `role="status"` the
 * instant it mounts, so a screen reader has already read it aloud before any
 * of this timing applies.
 */
function ContactSuccess({ onDismiss }: { onDismiss: () => void }) {
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return;
    const timeoutId = window.setTimeout(onDismiss, SUCCESS_HOLD_MS);
    return () => window.clearTimeout(timeoutId);
  }, [held, onDismiss]);

  return (
    <div
      className={styles.success}
      role="status"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <span className={styles.successGlow} aria-hidden="true" />

      <svg
        className={styles.successMark}
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className={styles.successMarkRing}
          cx="22"
          cy="22"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          className={styles.successMarkTick}
          d="M13.5 22.5l5.5 5.5 11-11"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className={styles.successCopy}>
        <p className={styles.successHeading}>Your strategy request has been received.</p>
        <p className={styles.successBody}>We&rsquo;ll reach out shortly with the next steps.</p>
      </div>

      <Button emphasis="ghost" size="sm" onClick={onDismiss}>
        Send another message
      </Button>
    </div>
  );
}
