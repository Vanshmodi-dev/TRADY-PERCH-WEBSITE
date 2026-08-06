import Image from "next/image";
import type { ReactNode } from "react";
import { inlineToText } from "./markdown-inline";
import { parseBlocks } from "./markdown-parse";
import type { InlineNode, MarkdownBlock } from "./markdown-types";
import { headingId, resolveImageUrl, resolveUrl } from "./markdown-url";
import styles from "./markdown.module.css";

/**
 * Renders parsed markdown as React elements.
 *
 * A Server Component with no client JavaScript: a README is static content,
 * and the only interactive affordance on it — a code block's horizontal
 * scroll — is CSS.
 *
 * ── The rule this file exists to enforce ──────────────────────────────────
 *
 * Every element below is constructed here. Nothing from the README reaches the
 * DOM as markup: text arrives as a string child (React escapes it), URLs pass
 * through `resolveUrl`/`resolveImageUrl` first, and there is no
 * `dangerouslySetInnerHTML` anywhere in the module. A README containing
 * `<img src=x onerror=alert(1)>` renders as an image element this file built,
 * with an `src` this file validated and no other attributes at all.
 */

interface MarkdownViewProps {
  source: string;
  /** Absolute base for resolving the README's relative links and images. */
  baseUrl: string;
  /**
   * Heading level the README's `#` maps to.
   *
   * A README's own `#` is its document title; on this page the project name is
   * already the `<h1>`, so shifting by two keeps the outline legal — Ch.42's
   * heading-order rule is a real audit gate here, not a nicety.
   */
  headingOffset?: number;
}

/** Renders inline nodes. Keys are positional; the list never reorders. */
function renderInline(nodes: readonly InlineNode[], baseUrl: string): ReactNode[] {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text":
        return node.value;

      case "strong":
        return <strong key={index}>{renderInline(node.children, baseUrl)}</strong>;

      case "emphasis":
        return <em key={index}>{renderInline(node.children, baseUrl)}</em>;

      case "delete":
        return <del key={index}>{renderInline(node.children, baseUrl)}</del>;

      case "inlineCode":
        return (
          <code key={index} className={styles.inlineCode}>
            {node.value}
          </code>
        );

      case "break":
        return <br key={index} />;

      case "image": {
        const src = resolveImageUrl(node.src, baseUrl);
        // An image from a host that is not on the allowlist becomes a link to
        // itself rather than vanishing — the reader can still reach it, and
        // the page does not pretend the README said nothing there.
        if (!src) {
          const href = resolveUrl(node.src, baseUrl);
          if (!href) return node.alt || null;
          return (
            <a key={index} className={styles.link} href={href} target="_blank" rel="noopener noreferrer nofollow">
              {node.alt || "Image"}
            </a>
          );
        }
        return (
          <Image
            key={index}
            className={styles.image}
            src={src}
            // A README author's alt text where there is one. Empty alt is
            // correct rather than lazy for the decorative badges that make up
            // most README images — announcing "shields.io badge" six times
            // before the first sentence helps nobody.
            alt={node.alt}
            /* Intrinsic size is unknowable without fetching the file, so a
               generous nominal box is declared and the stylesheet constrains
               it with `max-width: 100%; height: auto`. The declared ratio only
               governs the space reserved before load. */
            width={1200}
            height={675}
            sizes="(min-width: 1024px) 720px, 100vw"
            loading="lazy"
            /* No `unoptimized` escape hatch, including for the SVG badges that
               open most READMEs. An unoptimized image is fetched by the browser
               straight from the third-party host, which this site's CSP
               (`img-src 'self' data:`) blocks outright — so it would render as
               a broken image, not as a shortcut. Everything goes through the
               optimizer at `/_next/image`, which is same-origin; SVG handling
               is covered by `dangerouslyAllowSVG` and its sandboxing CSP in
               next.config.ts. */
            title={node.title ?? undefined}
          />
        );
      }

      case "link": {
        const href = resolveUrl(node.href, baseUrl);
        if (!href) return <span key={index}>{renderInline(node.children, baseUrl)}</span>;
        return (
          <a
            key={index}
            className={styles.link}
            href={href}
            title={node.title ?? undefined}
            target="_blank"
            /* `nofollow` alongside the usual pair: these links are written by
               whoever wrote the README, and a marketing site should not pass
               ranking signal to arbitrary third-party URLs. */
            rel="noopener noreferrer nofollow"
          >
            {renderInline(node.children, baseUrl)}
          </a>
        );
      }

      default: {
        // Exhaustiveness guard: adding a node type without handling it here
        // becomes a compile error rather than a silently missing element.
        const exhaustive: never = node;
        return exhaustive;
      }
    }
  });
}

interface RenderContext {
  baseUrl: string;
  headingOffset: number;
  /** Tracks slug collisions so two "Usage" headings get distinct ids. */
  seenIds: Map<string, number>;
}

function renderBlocks(blocks: readonly MarkdownBlock[], context: RenderContext): ReactNode[] {
  return blocks.map((block, index) => renderBlock(block, index, context));
}

function renderBlock(block: MarkdownBlock, key: number, context: RenderContext): ReactNode {
  switch (block.type) {
    case "heading": {
      const level = Math.min(6, block.depth + context.headingOffset);
      const Tag = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";
      const text = inlineToText(block.children);
      return (
        <Tag key={key} id={headingId(text, context.seenIds)} className={styles.heading}>
          {renderInline(block.children, context.baseUrl)}
        </Tag>
      );
    }

    case "paragraph": {
      const children = renderInline(block.children, context.baseUrl);
      // A paragraph whose only content was an unrenderable image resolves to
      // nothing; emitting the empty <p> would leave a stray margin.
      if (children.every((child) => child === null || child === "")) return null;

      // A lone image is a figure, not a sentence — wrapping it in <p> would
      // inherit body-copy line-height and leading, which is what makes a
      // centred README logo sit oddly high in its own block.
      const isLoneImage = block.children.length === 1 && block.children[0]?.type === "image";
      return isLoneImage ? (
        <div key={key} className={styles.figure}>
          {children}
        </div>
      ) : (
        <p key={key} className={styles.paragraph}>
          {children}
        </p>
      );
    }

    case "code":
      return (
        <div key={key} className={styles.codeBlock}>
          {block.language ? (
            <span className={styles.codeLanguage} aria-hidden="true">
              {block.language}
            </span>
          ) : null}
          {/*
            `tabIndex={0}` per Ch.42: a code block wider than its column is
            only reachable by keyboard if the scroll container can hold focus.

            Deliberately NOT `role="region"` with a label. That was the first
            version and it failed the `landmark-unique` audit: a README with
            three bash blocks produced three landmarks all named "bash code
            sample". Beyond the audit, it is the worse experience — every code
            block in a long README lands in the screen reader's landmark menu,
            burying the handful of landmarks that actually aid navigation. A
            focusable `<pre>` needs no accessible name of its own; its text
            content is what gets announced.
          */}
          <pre className={styles.pre} tabIndex={0}>
            <code className={styles.code}>{block.value}</code>
          </pre>
        </div>
      );

    case "blockquote":
      return (
        <blockquote key={key} className={styles.blockquote}>
          {renderBlocks(block.children, context)}
        </blockquote>
      );

    case "list": {
      const isTaskList = block.items.some((item) => item.checked !== null);
      const className = `${styles.list} ${isTaskList ? styles.taskList : ""}`;

      const children = block.items.map((item, itemIndex) => (
        <li key={itemIndex} className={styles.listItem}>
          {item.checked !== null ? (
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={item.checked}
              /* A rendered README is a document, not a form. `readOnly` keeps
                 the control non-interactive without `disabled`, which would
                 remove it from the accessibility tree and grey out the state
                 the checkbox exists to communicate. */
              readOnly
              aria-label={item.checked ? "Completed" : "Not completed"}
            />
          ) : null}
          <div className={styles.listItemContent}>{renderBlocks(item.children, context)}</div>
        </li>
      ));

      return block.ordered ? (
        <ol key={key} className={className} start={block.start}>
          {children}
        </ol>
      ) : (
        <ul key={key} className={className}>
          {children}
        </ul>
      );
    }

    case "table":
      return (
        // The scroll container, not the table itself: a wide table must scroll
        // inside its own box rather than making the page scroll sideways.
        // No `role="region"` here either, for the same reason as the code
        // block above: two tables in one README would collide on the name.
        <div key={key} className={styles.tableScroll} tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.header.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    scope="col"
                    style={{ textAlign: block.align[cellIndex] ?? undefined }}
                  >
                    {renderInline(cell, context.baseUrl)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ textAlign: block.align[cellIndex] ?? undefined }}>
                      {renderInline(cell, context.baseUrl)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "thematicBreak":
      return <hr key={key} className={styles.rule} />;

    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

export function MarkdownView({ source, baseUrl, headingOffset = 2 }: MarkdownViewProps) {
  const blocks = parseBlocks(source);
  if (blocks.length === 0) return null;

  return (
    <div className={styles.markdown}>
      {renderBlocks(blocks, { baseUrl, headingOffset, seenIds: new Map() })}
    </div>
  );
}

/**
 * The README's headings, for the sticky contents rail.
 *
 * Derived from the same parse the body uses — a second, independent scan for
 * headings is how a table of contents ends up listing a heading that is not
 * on the page, or numbering them differently.
 */
export function extractOutline(
  source: string,
  maxDepth = 3,
): Array<{ id: string; text: string; depth: number }> {
  const seen = new Map<string, number>();
  const outline: Array<{ id: string; text: string; depth: number }> = [];

  for (const block of parseBlocks(source)) {
    if (block.type !== "heading") continue;
    const text = inlineToText(block.children).trim();
    // The id must be minted for *every* heading, including ones the outline
    // skips, or the collision counter drifts out of step with the body's and
    // the rail links to the wrong anchor.
    const id = headingId(text, seen);
    if (block.depth > maxDepth || text.length === 0) continue;
    outline.push({ id, text, depth: block.depth });
  }

  return outline;
}
