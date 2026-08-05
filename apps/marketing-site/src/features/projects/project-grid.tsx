import type { Project } from "./github-types";
import { ProjectCard } from "./project-card";
import { ProjectPointerField } from "./project-pointer-field";
import styles from "./project-grid.module.css";

/**
 * The asymmetric grid.
 *
 * ── The rhythm ────────────────────────────────────────────────────────────
 *
 * A three-column desktop track where a featured project claims two columns
 * and the rest claim one. That single rule is enough to break the uniform
 * matrix that makes most portfolios read as a data table: the eye lands on
 * the wide cell first, then sweeps the supporting cells, and the row lengths
 * stop being predictable.
 *
 * Balance without symmetry. A featured card is not centred and its
 * neighbours are not mirrored — the composition is held together by a shared
 * baseline grid and consistent gutters rather than by reflection.
 *
 * ── Why `grid-auto-flow: dense` ───────────────────────────────────────────
 *
 * A two-column card cannot start in the last column of a three-column track,
 * so the browser pushes it to the next row and leaves a hole. `dense`
 * backfills that hole with the next card that fits. Ordering is still
 * meaningful — the service ranks featured first — but the layout no longer
 * has gaps punched in it by an arithmetic accident.
 *
 * The accessibility cost of `dense` (visual order diverging from DOM order,
 * which breaks tab order) is bounded here: only featured cards span, there
 * are at most one or two, and they sort to the front, so reflow moves cards
 * by at most one position rather than scrambling the sequence.
 */

interface ProjectGridProps {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}

export function ProjectGrid({ projects, headingLevel = "h3" }: ProjectGridProps) {
  return (
    // The pointer field is a single client boundary wrapping the whole grid —
    // one delegated listener rather than one per card. Every card inside
    // stays a Server Component; see project-pointer-field.tsx.
    <ProjectPointerField className={styles.field}>
      {/* A real list: the grid is an enumerable collection, and the count a
          screen reader announces is information a sighted visitor gets for
          free from the layout. */}
      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={`${styles.item} ${project.featured ? styles.itemFeatured : ""}`}
            // Inherits down to the card's animation-delay. Set here rather
            // than on the card because position in the grid is the grid's
            // knowledge, not the card's.
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <ProjectCard project={project} headingLevel={headingLevel} />
          </li>
        ))}
      </ul>
    </ProjectPointerField>
  );
}
