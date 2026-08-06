import type { InlineNode } from "./markdown-types";

/**
 * Inline markdown — emphasis, code, links, images — as a single left-to-right
 * scan.
 *
 * ── Why a scanner rather than regular expressions ─────────────────────────
 *
 * The regex approach to inline markdown is a sequence of `replace` calls, and
 * it is wrong in a way that only shows up on real input: `` `**not bold**` ``
 * inside a code span gets emphasised, a URL containing an underscore gets
 * italicised mid-path, and nested delimiters produce interleaved output. A
 * single scan with an explicit cursor handles precedence correctly because
 * code spans and links consume their own contents before emphasis is ever
 * considered.
 *
 * It is also the only version that terminates predictably. Nested-quantifier
 * patterns over adversarial input — and a README is untrusted input — are the
 * classic catastrophic-backtracking shape. Nothing here can loop more than
 * once per character.
 */

/** Emphasis delimiters, longest first so `**` is tried before `*`. */
const DELIMITERS = [
  { marker: "***", type: "strong-em" },
  { marker: "___", type: "strong-em" },
  { marker: "**", type: "strong" },
  { marker: "__", type: "strong" },
  { marker: "~~", type: "delete" },
  { marker: "*", type: "emphasis" },
  { marker: "_", type: "emphasis" },
] as const;

/**
 * Bare URLs GitHub auto-links. Bounded and anchored — no nested quantifier, so
 * it cannot backtrack pathologically.
 */
const AUTOLINK = /^https?:\/\/[^\s<>()[\]]+/;

/** Appends text to the run in progress, so adjacent characters share a node. */
function pushText(nodes: InlineNode[], value: string): void {
  if (value.length === 0) return;
  const last = nodes[nodes.length - 1];
  if (last?.type === "text") {
    last.value += value;
    return;
  }
  nodes.push({ type: "text", value });
}

/**
 * The index just past a closing run of `marker`, or `-1`.
 *
 * Escaped delimiters are skipped, and a run longer than the marker is only
 * accepted when it starts at the marker boundary — which is what stops `**a*`
 * from being read as a closed bold span.
 */
function findClosing(source: string, marker: string, from: number): number {
  for (let index = from; index <= source.length - marker.length; index += 1) {
    if (source[index] === "\\") {
      index += 1;
      continue;
    }
    if (source.startsWith(marker, index)) return index;
  }
  return -1;
}

/**
 * The index of the matching `close`, honouring nesting.
 *
 * Required for link labels and destinations: `[see [this]](url)` and
 * `(https://x.com/a_(b))` both occur, and a naive `indexOf` closes on the
 * first candidate and truncates the link.
 */
function findBalanced(source: string, open: string, close: string, from: number): number {
  let depth = 1;
  for (let index = from; index < source.length; index += 1) {
    const char = source[index];
    if (char === "\\") {
      index += 1;
      continue;
    }
    if (char === open) depth += 1;
    else if (char === close) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

/**
 * Splits a link destination into its URL and optional title:
 * `(https://x.com "Title")` -> `["https://x.com", "Title"]`.
 */
function splitDestination(raw: string): { href: string; title: string | null } {
  const trimmed = raw.trim();
  const match = /^(\S+)\s+["'(](.*)["')]$/.exec(trimmed);
  if (match?.[1]) return { href: match[1], title: match[2] ?? null };
  return { href: trimmed, title: null };
}

/**
 * Parses inline content into nodes.
 *
 * `depth` bounds recursion. Emphasis and links nest legitimately, but a
 * pathological README (`*`.repeat(5000)) would otherwise recurse once per
 * delimiter; past four levels the distinction is invisible anyway, and the
 * remaining text is emitted verbatim rather than dropped.
 */
export function parseInline(source: string, depth = 0): InlineNode[] {
  const nodes: InlineNode[] = [];
  if (depth > 4) {
    pushText(nodes, source);
    return nodes;
  }

  let cursor = 0;
  let pending = "";

  const flush = () => {
    pushText(nodes, pending);
    pending = "";
  };

  while (cursor < source.length) {
    const char = source[cursor]!;

    /* --- Escapes. A backslash makes the next character literal. --------- */
    if (char === "\\" && cursor + 1 < source.length) {
      pending += source[cursor + 1];
      cursor += 2;
      continue;
    }

    /* --- Code spans. Consume first, so nothing inside is interpreted. --- */
    if (char === "`") {
      // A run of N backticks is closed by the next run of exactly N, which is
      // how ``a ` b`` embeds a literal backtick.
      let fenceLength = 0;
      while (source[cursor + fenceLength] === "`") fenceLength += 1;
      const fence = "`".repeat(fenceLength);
      const close = source.indexOf(fence, cursor + fenceLength);

      if (close !== -1) {
        flush();
        const raw = source.slice(cursor + fenceLength, close);
        // CommonMark strips one leading and trailing space, which is what
        // allows `` ` `` to be written as a code span at all.
        nodes.push({ type: "inlineCode", value: raw.replace(/^ (.*) $/s, "$1") });
        cursor = close + fenceLength;
        continue;
      }
      // Unclosed — a literal backtick, not the start of a span.
      pending += fence;
      cursor += fenceLength;
      continue;
    }

    /* --- Images. Checked before links: the syntax is a link with a `!`. -- */
    if (char === "!" && source[cursor + 1] === "[") {
      const labelEnd = findBalanced(source, "[", "]", cursor + 2);
      if (labelEnd !== -1 && source[labelEnd + 1] === "(") {
        const destEnd = findBalanced(source, "(", ")", labelEnd + 2);
        if (destEnd !== -1) {
          flush();
          const { href, title } = splitDestination(source.slice(labelEnd + 2, destEnd));
          nodes.push({
            type: "image",
            src: href,
            // Alt text is plain by definition — an `alt` attribute cannot
            // carry markup, so nested syntax is flattened rather than parsed.
            alt: source.slice(cursor + 2, labelEnd),
            title,
          });
          cursor = destEnd + 1;
          continue;
        }
      }
    }

    /* --- Links --------------------------------------------------------- */
    if (char === "[") {
      const labelEnd = findBalanced(source, "[", "]", cursor + 1);
      if (labelEnd !== -1 && source[labelEnd + 1] === "(") {
        const destEnd = findBalanced(source, "(", ")", labelEnd + 2);
        if (destEnd !== -1) {
          flush();
          const { href, title } = splitDestination(source.slice(labelEnd + 2, destEnd));
          nodes.push({
            type: "link",
            href,
            title,
            children: parseInline(source.slice(cursor + 1, labelEnd), depth + 1),
          });
          cursor = destEnd + 1;
          continue;
        }
      }
    }

    /* --- Bare URLs ----------------------------------------------------- */
    if (char === "h" && (cursor === 0 || /[\s(]/.test(source[cursor - 1] ?? " "))) {
      const match = AUTOLINK.exec(source.slice(cursor));
      if (match) {
        flush();
        // Trailing punctuation belongs to the sentence, not the URL —
        // "see https://x.com." should not link the full stop.
        const url = match[0].replace(/[.,;:!?]+$/, "");
        nodes.push({
          type: "link",
          href: url,
          title: null,
          children: [{ type: "text", value: url }],
        });
        cursor += url.length;
        continue;
      }
    }

    /* --- Emphasis ------------------------------------------------------ */
    const delimiter = DELIMITERS.find((candidate) => source.startsWith(candidate.marker, cursor));
    if (delimiter) {
      const contentStart = cursor + delimiter.marker.length;
      const close = findClosing(source, delimiter.marker, contentStart);
      // An empty span (`****`) is literal text, not nested emphasis.
      if (close !== -1 && close > contentStart) {
        flush();
        const children = parseInline(source.slice(contentStart, close), depth + 1);
        if (delimiter.type === "strong-em") {
          nodes.push({ type: "strong", children: [{ type: "emphasis", children }] });
        } else {
          nodes.push({ type: delimiter.type, children });
        }
        cursor = close + delimiter.marker.length;
        continue;
      }
    }

    /* --- Hard line break: two trailing spaces, or a backslash. ---------- */
    if (char === "\n") {
      if (pending.endsWith("  ")) {
        pending = pending.trimEnd();
        flush();
        nodes.push({ type: "break" });
      } else {
        // A soft break. Rendered as a space: HTML collapses the newline
        // anyway, and emitting it verbatim leaves ragged whitespace in the
        // middle of a wrapped paragraph.
        pending += " ";
      }
      cursor += 1;
      continue;
    }

    pending += char;
    cursor += 1;
  }

  flush();
  return nodes;
}

/** Flattens inline nodes to their text content — for headings' anchor ids and
 *  for the document outline. */
export function inlineToText(nodes: readonly InlineNode[]): string {
  let text = "";
  for (const node of nodes) {
    switch (node.type) {
      case "text":
      case "inlineCode":
        text += node.value;
        break;
      case "image":
        text += node.alt;
        break;
      case "break":
        text += " ";
        break;
      default:
        text += inlineToText(node.children);
    }
  }
  return text;
}
