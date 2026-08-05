/**
 * Inline icons for the projects feature.
 *
 * Inline SVG rather than an icon font or sprite request: it costs no network
 * round trip, scales without artefacts, and inherits `currentColor` so an
 * icon can never drift from the token palette it sits in.
 *
 * Every icon is `aria-hidden` and `focusable="false"` — each one sits beside
 * a real text label or inside a control that already carries an `aria-label`,
 * so announcing it would only duplicate. `focusable="false"` is not
 * redundant: without it, legacy Trident/EdgeHTML put SVGs in the tab order.
 */

interface IconProps {
  className?: string;
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.25 2.5a.75.75 0 0 1 0 1.5H4a.5.5 0 0 0-.5.5v7.5a.5.5 0 0 0 .5.5h7.5a.5.5 0 0 0 .5-.5V9.75a.75.75 0 0 1 1.5 0V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2h2.25ZM13.5 2v3.75a.75.75 0 0 1-1.5 0V4.56L8.03 8.53a.75.75 0 0 1-1.06-1.06L10.94 3.5H9.75a.75.75 0 0 1 0-1.5H13a.5.5 0 0 1 .5.5Z"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8h10M9 4l4 4-4 4"
      />
    </svg>
  );
}

/** GitHub's repository glyph — the small book-with-bookmark mark. */
export function RepoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
      />
    </svg>
  );
}

export function ForkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M7 11.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM10.5 10.5 14 14"
      />
    </svg>
  );
}

export function ClearIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="m4 4 8 8M12 4l-8 8"
      />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 2c3.16 0 5.833 2.02 7.4 4.68a1.6 1.6 0 0 1 0 1.64C13.833 10.98 11.16 13 8 13S2.167 10.98.6 8.32a1.6 1.6 0 0 1 0-1.64C2.167 4.02 4.84 2 8 2Zm0 1.5c-2.5 0-4.76 1.6-6.15 4C3.24 9.9 5.5 11.5 8 11.5s4.76-1.6 6.15-4C12.76 5.1 10.5 3.5 8 3.5Zm0 1.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z"
      />
    </svg>
  );
}

export function IssueIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 3.75a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5Z"
      />
    </svg>
  );
}

export function PullRequestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm9.5-.5a.75.75 0 0 1 .75.75v6.878a2.251 2.251 0 1 1-1.5 0V6.06L9.03 7.28a.75.75 0 0 1-1.06-1.06l2.5-2.5A.75.75 0 0 1 11 3.5Zm-7.25.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 9.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm7.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      />
    </svg>
  );
}

export function CommitIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5ZM8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      />
    </svg>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M1 7.775V2.75A1.75 1.75 0 0 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.75 1.75 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8.75.75V2h1.836a.25.25 0 0 1 .177.073l1.25 1.25a.75.75 0 0 0 .53.22H15.25a.75.75 0 0 1 0 1.5h-.72l1.43 3.575A.75.75 0 0 1 16 9c0 1.243-1.007 2.25-2.25 2.25S11.5 10.243 11.5 9a.75.75 0 0 1 .04-.382L12.97 5.04a.75.75 0 0 0-.28-.07h-1.107a1.75 1.75 0 0 1-1.238-.513L9.25 3.53a.25.25 0 0 0-.177-.03H8.75v9h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5v-9h-.323a.25.25 0 0 0-.177.03l-1.095 .927A1.75 1.75 0 0 1 4.417 4.97H3.31a.75.75 0 0 0-.28.07l1.43 3.578A.75.75 0 0 1 4.5 9c0 1.243-1.007 2.25-2.25 2.25S0 10.243 0 9a.75.75 0 0 1 .04-.382L1.47 5.04H.75a.75.75 0 0 1 0-1.5h2.707a.75.75 0 0 0 .53-.22l1.25-1.25A.25.25 0 0 1 5.414 2H7.25V.75a.75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
}

export function ContributorsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M5.5 3.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM8 7.5c2.9 0 5.25 1.79 5.25 4v.75a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V11.5c0-2.21 2.35-4 5.25-4Z"
      />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h.75A2.25 2.25 0 0 1 15 4.25v9.5A2.25 2.25 0 0 1 12.75 16h-9.5A2.25 2.25 0 0 1 1 13.75v-9.5A2.25 2.25 0 0 1 3.25 2H4V.75A.75.75 0 0 1 4.75 0ZM2.5 6v7.75c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V6Z"
      />
    </svg>
  );
}
