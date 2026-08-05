import { parseInline } from "./markdown-inline";
import type {
  InlineNode,
  ListItem,
  MarkdownBlock,
  TableAlignment,
} from "./markdown-types";

/**
 * Block-level markdown: the line-oriented layer above `markdown-inline.ts`.
 *
 * A single pass over the lines with an explicit cursor. Each branch consumes
 * the lines it owns and leaves the cursor on the first line it does not, which
 * is what makes the whole thing linear and keeps every construct's
 * "where does this end?" rule in one place instead of spread across lookaheads.
 *
 * Constructs handled: ATX and setext headings, fenced code, blockquotes,
 * ordered/unordered/task lists (nested), GFM tables, thematic breaks,
 * paragraphs, and HTML blocks. HTML is the interesting case — see
 * `consumeHtmlBlock`.
 */

/** Bounds the work done on a pathological or enormous README. */
const MAX_LINES = 4000;

/** Nesting ceiling for blockquotes and lists, mirroring the inline limit. */
const MAX_DEPTH = 6;

const ATX_HEADING = /^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const FENCE = /^ {0,3}(`{3,}|~{3,})\s*(\S*)/;
const THEMATIC_BREAK = /^ {0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/;
const BLOCKQUOTE = /^ {0,3}>\s?(.*)$/;
const UNORDERED_ITEM = /^(\s*)([-*+])\s+(.*)$/;
const ORDERED_ITEM = /^(\s*)(\d{1,9})[.)]\s+(.*)$/;
const TASK_MARKER = /^\[([ xX])\]\s+(.*)$/;
const TABLE_DELIMITER = /^\s*\|?(?:\s*:?-{1,}:?\s*\|)+\s*:?-{1,}:?\s*\|?\s*$/;
const SETEXT_H1 = /^ {0,3}=+\s*$/;
const SETEXT_H2 = /^ {0,3}-{2,}\s*$/;
const HTML_BLOCK_START = /^ {0,3}<\/?[a-zA-Z][\w-]*/;

function isBlank(line: string | undefined): boolean {
  return line === undefined || line.trim().length === 0;
}

/** True when a line begins a block that must interrupt an open paragraph. */
function startsBlock(line: string | undefined): boolean {
  if (line === undefined) return true;
  return (
    ATX_HEADING.test(line) ||
    FENCE.test(line) ||
    THEMATIC_BREAK.test(line) ||
    BLOCKQUOTE.test(line) ||
    UNORDERED_ITEM.test(line) ||
    ORDERED_ITEM.test(line) ||
    HTML_BLOCK_START.test(line)
  );
}

/** Splits a table row on unescaped pipes, dropping the leading/trailing edge. */
function splitRow(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === "\\" && line[index + 1] === "|") {
      current += "|";
      index += 1;
      continue;
    }
    if (char === "|") {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);

  // A GFM row is conventionally written with outer pipes; those produce a
  // leading and trailing empty cell that is delimiter, not content.
  if (cells.length > 0 && cells[0]!.trim() === "") cells.shift();
  if (cells.length > 0 && cells[cells.length - 1]!.trim() === "") cells.pop();
  return cells.map((cell) => cell.trim());
}

function parseAlignment(line: string): TableAlignment[] {
  return splitRow(line).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return null;
  });
}

/**
 * HTML blocks, reduced to what can be rendered safely.
 *
 * READMEs open with `<p align="center"><img src="logo.png"></p>` and
 * `<div align="center">` constantly, and dropping those blocks silently loses
 * the project's own logo and badges. Rendering the HTML is not an option — see
 * `markdown-types.ts`.
 *
 * So the block is mined rather than rendered: `<img>` sources become image
 * nodes, `<a href>` wrappers become links around them, and any remaining text
 * between tags becomes a paragraph. Everything else — attributes, scripts,
 * styles, event handlers, the tags themselves — is discarded. The result is
 * that the visible content survives and none of the markup does.
 */
function consumeHtmlBlock(lines: readonly string[], start: number): { blocks: MarkdownBlock[]; next: number } {
  let cursor = start;
  const raw: string[] = [];
  while (cursor < lines.length && !isBlank(lines[cursor])) {
    raw.push(lines[cursor]!);
    cursor += 1;
  }

  const html = raw.join("\n");
  const blocks: MarkdownBlock[] = [];
  const inline: InlineNode[] = [];

  // `<script>` and `<style>` carry text content that is code, not prose —
  // removed wholesale before anything else is extracted.
  const cleaned = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "");

  const imagePattern = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = imagePattern.exec(cleaned)) !== null) {
    const src = match[1];
    if (!src) continue;
    const altMatch = /\balt\s*=\s*["']([^"']*)["']/i.exec(match[0]);
    inline.push({ type: "image", src, alt: altMatch?.[1] ?? "", title: null });
  }

  // Whatever prose sat between the tags. Entities are decoded for the handful
  // that actually appear in READMEs; the rest render as written, which is
  // correct — an undecoded entity is ugly, an over-eager decoder is a
  // re-introduction of the injection risk this whole module avoids.
  const text = cleaned
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  if (inline.length > 0) blocks.push({ type: "paragraph", children: inline });
  if (text.length > 0) blocks.push({ type: "paragraph", children: parseInline(text) });

  return { blocks, next: cursor };
}

/**
 * Collects the lines belonging to one list, then parses each item's content
 * recursively — an item can contain paragraphs, code, and nested lists.
 *
 * Item boundaries are decided by indentation: a line indented at least as far
 * as the first item's content column continues that item, anything less starts
 * a new one or ends the list.
 */
function consumeList(
  lines: readonly string[],
  start: number,
  depth: number,
): { block: MarkdownBlock; next: number } {
  const firstLine = lines[start]!;
  const orderedMatch = ORDERED_ITEM.exec(firstLine);
  const ordered = orderedMatch !== null;
  const baseIndent = (ordered ? orderedMatch[1] : UNORDERED_ITEM.exec(firstLine)?.[1])?.length ?? 0;

  const items: ListItem[] = [];
  let currentLines: string[] = [];
  let currentChecked: boolean | null = null;
  let cursor = start;

  const commit = () => {
    if (currentLines.length === 0) return;
    items.push({
      // Recursion is what gives nested lists and multi-paragraph items; the
      // depth guard stops a hand-crafted README from blowing the stack.
      children: depth >= MAX_DEPTH
        ? [{ type: "paragraph", children: parseInline(currentLines.join("\n")) }]
        : parseBlocks(currentLines, depth + 1),
      checked: currentChecked,
    });
    currentLines = [];
    currentChecked = null;
  };

  while (cursor < lines.length) {
    const line = lines[cursor]!;

    if (isBlank(line)) {
      // A blank line inside a list is only a terminator if the next
      // non-blank line is not indented under the list.
      const next = lines[cursor + 1];
      const continues =
        next !== undefined &&
        !isBlank(next) &&
        ((next.length - next.trimStart().length > baseIndent) ||
          UNORDERED_ITEM.test(next) ||
          ORDERED_ITEM.test(next));
      if (!continues) break;
      currentLines.push("");
      cursor += 1;
      continue;
    }

    const unordered = UNORDERED_ITEM.exec(line);
    const numbered = ORDERED_ITEM.exec(line);
    const marker = ordered ? numbered : unordered;
    const indent = line.length - line.trimStart().length;

    if (marker && indent <= baseIndent) {
      commit();
      let content = marker[3] ?? "";
      const task = TASK_MARKER.exec(content);
      if (task) {
        currentChecked = task[1]?.toLowerCase() === "x";
        content = task[2] ?? "";
      }
      currentLines.push(content);
      cursor += 1;
      continue;
    }

    // A different marker style at the same indent ends this list and starts
    // another — `- a` followed by `1. b` is two lists, not one.
    if ((unordered || numbered) && indent <= baseIndent) break;

    if (indent > baseIndent) {
      // Continuation. Re-indented relative to the item's content column so
      // the recursive parse sees a document starting at column zero.
      currentLines.push(line.slice(Math.min(indent, baseIndent + 2)));
      cursor += 1;
      continue;
    }

    // A lazy continuation line: unindented prose directly under an item.
    if (currentLines.length > 0 && !startsBlock(line)) {
      currentLines.push(line.trim());
      cursor += 1;
      continue;
    }

    break;
  }

  commit();

  const start_ = ordered ? Number(orderedMatch?.[2] ?? 1) : 1;
  return {
    block: {
      type: "list",
      ordered,
      start: Number.isFinite(start_) && start_ > 0 ? start_ : 1,
      items,
    },
    next: cursor,
  };
}

/**
 * Parses markdown source into blocks.
 *
 * `depth` is the nesting level, used to bound recursion through blockquotes
 * and list items. Callers pass nothing.
 */
export function parseBlocks(source: string | readonly string[], depth = 0): MarkdownBlock[] {
  const lines = (
    typeof source === "string"
      ? source.replace(/\r\n?/g, "\n").split("\n")
      : [...source]
  ).slice(0, MAX_LINES);

  const blocks: MarkdownBlock[] = [];
  let cursor = 0;

  while (cursor < lines.length) {
    const line = lines[cursor]!;

    if (isBlank(line)) {
      cursor += 1;
      continue;
    }

    /* --- Fenced code. First, so nothing inside is parsed as markdown. --- */
    const fence = FENCE.exec(line);
    if (fence) {
      const marker = fence[1]!;
      const language = fence[2]?.toLowerCase() || null;
      const body: string[] = [];
      cursor += 1;
      while (cursor < lines.length && !lines[cursor]!.trimStart().startsWith(marker)) {
        body.push(lines[cursor]!);
        cursor += 1;
      }
      // Skip the closing fence. An unterminated fence runs to end of file,
      // which is what CommonMark specifies and what a truncated README needs.
      if (cursor < lines.length) cursor += 1;
      blocks.push({ type: "code", language, value: body.join("\n") });
      continue;
    }

    /* --- Thematic break. Before lists: `---` matches the `-` item rule. -- */
    if (THEMATIC_BREAK.test(line)) {
      blocks.push({ type: "thematicBreak" });
      cursor += 1;
      continue;
    }

    /* --- ATX heading --------------------------------------------------- */
    const heading = ATX_HEADING.exec(line);
    if (heading) {
      blocks.push({
        type: "heading",
        depth: heading[1]!.length as 1 | 2 | 3 | 4 | 5 | 6,
        children: parseInline(heading[2] ?? ""),
      });
      cursor += 1;
      continue;
    }

    /* --- Blockquote ---------------------------------------------------- */
    if (BLOCKQUOTE.test(line)) {
      const inner: string[] = [];
      while (cursor < lines.length && BLOCKQUOTE.test(lines[cursor]!)) {
        inner.push(BLOCKQUOTE.exec(lines[cursor]!)?.[1] ?? "");
        cursor += 1;
      }
      blocks.push({
        type: "blockquote",
        children:
          depth >= MAX_DEPTH
            ? [{ type: "paragraph", children: parseInline(inner.join("\n")) }]
            : parseBlocks(inner, depth + 1),
      });
      continue;
    }

    /* --- Table. Requires a delimiter row directly under the header. ----- */
    if (line.includes("|") && TABLE_DELIMITER.test(lines[cursor + 1] ?? "")) {
      const header = splitRow(line).map((cell) => parseInline(cell));
      const align = parseAlignment(lines[cursor + 1]!);
      cursor += 2;

      const rows: InlineNode[][][] = [];
      while (cursor < lines.length && lines[cursor]!.includes("|") && !isBlank(lines[cursor])) {
        const cells = splitRow(lines[cursor]!).map((cell) => parseInline(cell));
        // Ragged rows are common in hand-written tables; pad rather than
        // drop, so a short row does not silently lose its last column.
        while (cells.length < header.length) cells.push([]);
        rows.push(cells.slice(0, header.length));
        cursor += 1;
      }
      blocks.push({ type: "table", align, header, rows });
      continue;
    }

    /* --- Lists --------------------------------------------------------- */
    if (UNORDERED_ITEM.test(line) || ORDERED_ITEM.test(line)) {
      const { block, next } = consumeList(lines, cursor, depth);
      blocks.push(block);
      cursor = next;
      continue;
    }

    /* --- HTML ---------------------------------------------------------- */
    if (HTML_BLOCK_START.test(line)) {
      const { blocks: extracted, next } = consumeHtmlBlock(lines, cursor);
      blocks.push(...extracted);
      cursor = next;
      continue;
    }

    /* --- Paragraph, with setext heading detection ---------------------- */
    const paragraph: string[] = [];
    while (cursor < lines.length && !isBlank(lines[cursor])) {
      const current = lines[cursor]!;

      // `Title` followed by `=====` is an h1; by `-----` an h2. Only valid
      // once at least one line of text has been collected.
      if (paragraph.length > 0 && SETEXT_H1.test(current)) {
        blocks.push({ type: "heading", depth: 1, children: parseInline(paragraph.join("\n")) });
        paragraph.length = 0;
        cursor += 1;
        break;
      }
      if (paragraph.length > 0 && SETEXT_H2.test(current)) {
        blocks.push({ type: "heading", depth: 2, children: parseInline(paragraph.join("\n")) });
        paragraph.length = 0;
        cursor += 1;
        break;
      }

      // Another block starting mid-paragraph ends it without consuming the
      // line — the outer loop handles it on the next iteration.
      if (paragraph.length > 0 && startsBlock(current)) break;

      paragraph.push(current);
      cursor += 1;
    }

    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", children: parseInline(paragraph.join("\n")) });
    }
  }

  return blocks;
}
