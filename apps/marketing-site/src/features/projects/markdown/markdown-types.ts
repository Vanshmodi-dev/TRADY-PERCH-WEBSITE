/**
 * The document model a README is parsed into.
 *
 * ── Why a model at all, rather than an HTML string ────────────────────────
 *
 * The obvious way to render a README is to ask GitHub for it as HTML
 * (`Accept: application/vnd.github.html+json`) and hand the string to
 * `dangerouslySetInnerHTML`. That makes GitHub's sanitiser the only thing
 * standing between arbitrary repository content and this site's DOM, and it
 * requires loosening the CSP in `next.config.ts` to let the resulting markup
 * load what it references.
 *
 * Parsing to this model instead means every rendered node is a React element
 * that this codebase constructed. There is no path by which a `<script>`, an
 * `onerror=`, or a `javascript:` href in a README becomes part of the page,
 * because nothing in the renderer can emit one — the type system does not
 * describe such a node. Link and image URLs are separately validated at the
 * render boundary (see `markdown-url.ts`).
 *
 * The cost is coverage: this is CommonMark plus GitHub tables, strikethrough
 * and task lists, not the whole GFM specification. Footnotes, definition
 * lists, inline HTML attributes and math are not represented. That is a
 * deliberate ceiling — the constructs above cover what READMEs actually
 * contain, and the ones left out degrade to plain text rather than breaking.
 */

/* ------------------------------------------------------------------ */
/* Inline                                                              */
/* ------------------------------------------------------------------ */

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "emphasis"; children: InlineNode[] }
  | { type: "delete"; children: InlineNode[] }
  | { type: "inlineCode"; value: string }
  | { type: "link"; href: string; title: string | null; children: InlineNode[] }
  | { type: "image"; src: string; alt: string; title: string | null }
  | { type: "break" };

/* ------------------------------------------------------------------ */
/* Block                                                               */
/* ------------------------------------------------------------------ */

export interface HeadingBlock {
  type: "heading";
  /** 1-6 as written. The renderer shifts this down so a README's `#` never
   *  competes with the page's own `<h1>`. */
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

export interface ParagraphBlock {
  type: "paragraph";
  children: InlineNode[];
}

export interface CodeBlock {
  type: "code";
  /** The fence's info string, lowercased — `ts`, `bash`. `null` when bare. */
  language: string | null;
  value: string;
}

export interface BlockquoteBlock {
  type: "blockquote";
  children: MarkdownBlock[];
}

export interface ListItem {
  children: MarkdownBlock[];
  /**
   * `null` for an ordinary item; `true`/`false` for a GFM task-list item,
   * which the renderer draws as a checkbox rather than a bullet.
   */
  checked: boolean | null;
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  /** The `start` attribute for an ordered list that does not begin at 1. */
  start: number;
  items: ListItem[];
}

export type TableAlignment = "left" | "center" | "right" | null;

export interface TableBlock {
  type: "table";
  align: TableAlignment[];
  header: InlineNode[][];
  rows: InlineNode[][][];
}

export interface ThematicBreakBlock {
  type: "thematicBreak";
}

export type MarkdownBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | BlockquoteBlock
  | ListBlock
  | TableBlock
  | ThematicBreakBlock;
