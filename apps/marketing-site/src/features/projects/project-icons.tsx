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
