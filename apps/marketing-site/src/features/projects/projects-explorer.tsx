"use client";

import { useDeferredValue, useId, useMemo, useState, type ReactNode } from "react";
import type { Project } from "./github-types";
import { ClearIcon, SearchIcon } from "./project-icons";
import { ProjectPointerField } from "./project-pointer-field";
import {
  DEFAULT_FILTER_ID,
  applyFilters,
  availableFilters,
  countFor,
} from "./project-taxonomy";
import styles from "./projects-explorer.module.css";

/**
 * The interactive layer over the project grid: filter chips and live search.
 *
 * ── How this stays one small client island ────────────────────────────────
 *
 * The cards are **not** rendered here. Each one is rendered on the server and
 * handed in as an already-built React element alongside its plain data, so
 * this component's only job is to decide which elements to mount. That is what
 * keeps `ProjectCard`, its copy, its SVGs and `next/image` entirely out of the
 * client bundle — what ships is this file, the pointer field, and the pure
 * predicates in `project-taxonomy.ts`.
 *
 * The alternative (make the card a client component so it can be filtered)
 * would move the whole grid into the browser bundle to support a text input.
 *
 * ── Why the state is not in the URL ───────────────────────────────────────
 *
 * A shareable `?filter=ai` is genuinely nice, and it was tried. Reading it
 * requires `useSearchParams`, which opts the route out of static generation
 * unless every consumer sits behind its own Suspense boundary — and this page
 * is prerendered at build time by design (Ch.2 §4, and the ISR contract in the
 * route). Trading a statically served document for a shareable filter state on
 * a nine-card grid is the wrong side of that bargain. Local state it is.
 */

export interface ExplorerItem {
  project: Project;
  /** The server-rendered `<ProjectCard>` for this project. */
  card: ReactNode;
}

interface ProjectsExplorerProps {
  items: readonly ExplorerItem[];
}

export function ProjectsExplorer({ items }: ProjectsExplorerProps) {
  const [filterId, setFilterId] = useState(DEFAULT_FILTER_ID);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const resultsId = useId();

  /**
   * `useDeferredValue` rather than a debounce timer.
   *
   * The input stays perfectly responsive because React keeps the typed value
   * for the field itself and re-runs the filter at a lower priority — no
   * timeout to tune, no trailing-edge delay after the last keystroke, and no
   * stale render if the list is cheap enough to keep up (which, at this size,
   * it always is).
   */
  const deferredQuery = useDeferredValue(query);
  const isPending = deferredQuery !== query;

  const projects = useMemo(() => items.map((item) => item.project), [items]);
  const filters = useMemo(() => availableFilters(projects), [projects]);

  const visible = useMemo(() => {
    const matched = new Set(
      applyFilters(projects, filterId, deferredQuery).map((project) => project.id),
    );
    return items.filter((item) => matched.has(item.project.id));
  }, [items, projects, filterId, deferredQuery]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        {/*
          A real <search> landmark, not a div. Screen-reader users navigating
          by landmark get "search" in the list, which is how they find a filter
          UI without reading the page top to bottom.
        */}
        <search className={styles.search}>
          <label className={styles.searchLabel} htmlFor={searchId}>
            Search projects
          </label>
          <div className={styles.searchField} data-filled={hasQuery ? "true" : undefined}>
            <SearchIcon className={styles.searchIcon} />
            <input
              id={searchId}
              className={styles.searchInput}
              /*
                `type="search"` gives the field its correct role and mobile
                keyboard. The browser's own clear affordance is suppressed in
                CSS in favour of the button below, which is keyboard-reachable
                and labelled — the native one is neither in every engine.
              */
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, language or topic"
              autoComplete="off"
              spellCheck={false}
              /* Points at the live region below, so the result count is
                 announced as the visitor types rather than silently changing. */
              aria-describedby={resultsId}
            />
            {hasQuery ? (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <ClearIcon className={styles.clearIcon} />
              </button>
            ) : null}
            <span className={styles.searchUnderline} aria-hidden="true" />
          </div>
        </search>

        {/*
          A tablist would be the wrong role: these chips do not switch between
          panels, they narrow one list. A group of toggle buttons, each
          carrying its own pressed state, is what actually describes them.
        */}
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {filters.map((filter) => {
            const count = countFor(filter, projects);
            const isActive = filter.id === filterId;
            return (
              <button
                key={filter.id}
                type="button"
                className={styles.chip}
                data-active={isActive ? "true" : undefined}
                aria-pressed={isActive}
                /* The visible label is one or two words; the accessible name
                   carries the description and the count, which is the context
                   a sighted visitor gets from the chip's own number. */
                aria-label={`${filter.label} — ${filter.description} (${count})`}
                onClick={() => setFilterId(filter.id)}
              >
                <span className={styles.chipLabel}>{filter.label}</span>
                <span className={styles.chipCount} aria-hidden="true">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/*
        The result count as a polite live region. Without it, a screen-reader
        user typing into the field gets no feedback at all that the grid
        beneath them changed — the single most common failure of a live filter.
      */}
      <p id={resultsId} className={styles.results} role="status" aria-live="polite">
        {visible.length === projects.length
          ? `Showing all ${projects.length} ${projects.length === 1 ? "project" : "projects"}`
          : `Showing ${visible.length} of ${projects.length} projects`}
      </p>

      {visible.length === 0 ? (
        <EmptyResults
          query={query}
          onReset={() => {
            setQuery("");
            setFilterId(DEFAULT_FILTER_ID);
          }}
        />
      ) : (
        <ProjectPointerField className={styles.field}>
          <ul
            /*
              Keyed by filter so switching one replays the entrance stagger,
              while typing does not — a grid that re-animates on every
              keystroke is nauseating, and a filter change genuinely is a new
              set of content arriving.
            */
            key={filterId}
            className={styles.grid}
            data-pending={isPending ? "true" : undefined}
          >
            {visible.map((item, index) => (
              <li
                key={item.project.id}
                className={`${styles.item} ${item.project.featured ? styles.itemFeatured : ""}`}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                {item.card}
              </li>
            ))}
          </ul>
        </ProjectPointerField>
      )}
    </div>
  );
}

/**
 * Zero results from a filter or query — distinct from the section's empty
 * state, which means "the feed returned nothing". This one is recoverable, so
 * it offers the recovery rather than an explanation.
 */
function EmptyResults({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className={styles.empty}>
      <svg
        className={styles.emptyIllustration}
        viewBox="0 0 120 96"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="52" cy="42" r="24" stroke="currentColor" strokeOpacity="0.34" strokeWidth="2" />
        <path
          d="M70 60 88 78"
          stroke="currentColor"
          strokeOpacity="0.34"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M44 42h16"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p className={styles.emptyTitle}>
        {query.trim().length > 0 ? (
          <>
            No projects match <span className={styles.emptyQuery}>{query.trim()}</span>
          </>
        ) : (
          "No projects in this category yet"
        )}
      </p>
      <button type="button" className={styles.emptyReset} onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}
