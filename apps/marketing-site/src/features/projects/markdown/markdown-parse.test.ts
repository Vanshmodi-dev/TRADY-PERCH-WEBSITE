import { describe, expect, it } from "vitest";
import { inlineToText, parseInline } from "./markdown-inline";
import { parseBlocks } from "./markdown-parse";
import type { CodeBlock, HeadingBlock, ListBlock, ParagraphBlock, TableBlock } from "./markdown-types";

/**
 * The markdown parser's contract.
 *
 * Weighted towards the cases that make a hand-rolled parser wrong rather than
 * towards proving it handles a heading: precedence between code spans and
 * emphasis, delimiters inside URLs, unclosed constructs, and the specific
 * shapes real READMEs are written in.
 */

function blocksOf(source: string) {
  return parseBlocks(source);
}

describe("headings", () => {
  it("parses ATX headings at every depth", () => {
    const blocks = blocksOf("# One\n\n### Three\n\n###### Six");
    expect(blocks.map((block) => (block as HeadingBlock).depth)).toEqual([1, 3, 6]);
  });

  it("strips a closing hash run", () => {
    const [heading] = blocksOf("## Install ##") as HeadingBlock[];
    expect(inlineToText(heading!.children)).toBe("Install");
  });

  it("requires a space after the hashes, so a tag is not a heading", () => {
    // `#deploy` is a hashtag, not an h1 — CommonMark agrees.
    const [block] = blocksOf("#deploy now");
    expect(block?.type).toBe("paragraph");
  });

  it("parses setext headings", () => {
    const blocks = blocksOf("Project Title\n=====\n\nSubtitle\n-----");
    expect(blocks.map((block) => block.type)).toEqual(["heading", "heading"]);
    expect((blocks[0] as HeadingBlock).depth).toBe(1);
    expect((blocks[1] as HeadingBlock).depth).toBe(2);
  });
});

describe("fenced code", () => {
  it("captures the language and leaves the body uninterpreted", () => {
    const [block] = blocksOf("```ts\nconst x = **not bold**;\n```") as CodeBlock[];
    expect(block!.language).toBe("ts");
    expect(block!.value).toBe("const x = **not bold**;");
  });

  it("supports tilde fences", () => {
    const [block] = blocksOf("~~~\nplain\n~~~") as CodeBlock[];
    expect(block!.language).toBeNull();
    expect(block!.value).toBe("plain");
  });

  /**
   * A README truncated mid-file is exactly how this arrives in practice. The
   * fence must run to the end rather than swallowing the parse.
   */
  it("treats an unterminated fence as running to end of input", () => {
    const blocks = blocksOf("```\nnever closed");
    expect(blocks).toHaveLength(1);
    expect((blocks[0] as CodeBlock).value).toBe("never closed");
  });

  it("does not parse markdown inside a fence", () => {
    const [block] = blocksOf("```\n# Not a heading\n- not a list\n```") as CodeBlock[];
    expect(block!.type).toBe("code");
    expect(block!.value).toBe("# Not a heading\n- not a list");
  });
});

describe("lists", () => {
  it("parses an unordered list", () => {
    const [list] = blocksOf("- one\n- two\n- three") as ListBlock[];
    expect(list!.ordered).toBe(false);
    expect(list!.items).toHaveLength(3);
  });

  it("parses an ordered list and preserves a non-1 start", () => {
    const [list] = blocksOf("3. three\n4. four") as ListBlock[];
    expect(list!.ordered).toBe(true);
    expect(list!.start).toBe(3);
    expect(list!.items).toHaveLength(2);
  });

  it("parses task list checkboxes", () => {
    const [list] = blocksOf("- [x] done\n- [ ] todo") as ListBlock[];
    expect(list!.items.map((item) => item.checked)).toEqual([true, false]);
  });

  it("nests an indented sublist inside its parent item", () => {
    const [list] = blocksOf("- parent\n  - child\n  - sibling\n- next") as ListBlock[];
    expect(list!.items).toHaveLength(2);
    const nested = list!.items[0]!.children.find((block) => block.type === "list");
    expect(nested).toBeDefined();
    expect((nested as ListBlock).items).toHaveLength(2);
  });

  /**
   * `---` matches the unordered-item pattern's marker character, so the
   * thematic-break rule has to be tried first. Getting this order wrong turns
   * every horizontal rule in every README into an empty bullet.
   */
  it("reads --- as a thematic break, not as a list item", () => {
    const blocks = blocksOf("text\n\n---\n\nmore");
    expect(blocks.map((block) => block.type)).toEqual([
      "paragraph",
      "thematicBreak",
      "paragraph",
    ]);
  });
});

describe("tables", () => {
  it("parses a GFM table with alignment", () => {
    const [table] = blocksOf(
      "| Name | Size | Note |\n| :--- | ---: | :--: |\n| a | 1 | x |\n| b | 2 | y |",
    ) as TableBlock[];

    expect(table!.type).toBe("table");
    expect(table!.align).toEqual(["left", "right", "center"]);
    expect(table!.header.map((cell) => inlineToText(cell))).toEqual(["Name", "Size", "Note"]);
    expect(table!.rows).toHaveLength(2);
  });

  it("pads a ragged row rather than dropping its cells", () => {
    const [table] = blocksOf("| A | B |\n| --- | --- |\n| only |") as TableBlock[];
    expect(table!.rows[0]).toHaveLength(2);
  });

  it("needs a delimiter row — a line with pipes alone is a paragraph", () => {
    const blocks = blocksOf("a | b | c");
    expect(blocks[0]?.type).toBe("paragraph");
  });
});

describe("blockquotes", () => {
  it("parses nested block content inside a quote", () => {
    const blocks = blocksOf("> ### Note\n> Body text");
    expect(blocks[0]?.type).toBe("blockquote");
    const inner = (blocks[0] as { children: Array<{ type: string }> }).children;
    expect(inner.map((block) => block.type)).toEqual(["heading", "paragraph"]);
  });
});

describe("HTML blocks", () => {
  /**
   * The centred-logo opening that a large share of READMEs use. Dropping the
   * block loses the project's own artwork; rendering the HTML is the thing
   * this whole module exists to avoid.
   */
  it("extracts images from an HTML block and discards the markup", () => {
    const blocks = blocksOf('<p align="center">\n  <img src="logo.png" alt="Logo">\n</p>');
    const paragraph = blocks[0] as ParagraphBlock;
    expect(paragraph.children[0]).toEqual({
      type: "image",
      src: "logo.png",
      alt: "Logo",
      title: null,
    });
  });

  it("keeps prose from an HTML block as text", () => {
    const blocks = blocksOf("<div>Hello <b>world</b></div>");
    expect(inlineToText((blocks[0] as ParagraphBlock).children)).toContain("Hello world");
  });

  /**
   * The security-relevant case. A script's *contents* must not survive as
   * paragraph text, and no node type exists that could render it as markup.
   */
  it("discards script and style contents entirely", () => {
    const blocks = blocksOf('<div><script>alert("xss")</script></div>');
    const text = blocks.map((block) => JSON.stringify(block)).join("");
    expect(text).not.toContain("alert");
  });

  it("never emits a node type that could carry raw markup", () => {
    const blocks = blocksOf('<img src=x onerror="alert(1)">');
    const serialised = JSON.stringify(blocks);
    expect(serialised).not.toContain("onerror");
    expect(serialised).not.toContain("alert");
  });
});

describe("inline", () => {
  it("parses strong, emphasis and strikethrough", () => {
    expect(parseInline("**a** _b_ ~~c~~").map((node) => node.type)).toEqual([
      "strong",
      "text",
      "emphasis",
      "text",
      "delete",
    ]);
  });

  /**
   * The single most common failure of the replace-based approach: emphasis
   * markers inside a code span must stay literal.
   */
  it("does not interpret emphasis inside a code span", () => {
    const nodes = parseInline("`**not bold**`");
    expect(nodes).toEqual([{ type: "inlineCode", value: "**not bold**" }]);
  });

  it("handles a code span containing backticks via a longer fence", () => {
    expect(parseInline("``a ` b``")).toEqual([{ type: "inlineCode", value: "a ` b" }]);
  });

  it("parses links, including a destination containing parentheses", () => {
    const [node] = parseInline("[wiki](https://en.wikipedia.org/wiki/Foo_(bar))");
    expect(node).toMatchObject({ type: "link", href: "https://en.wikipedia.org/wiki/Foo_(bar)" });
  });

  it("parses a link title", () => {
    const [node] = parseInline('[x](https://example.com "Title")');
    expect(node).toMatchObject({ href: "https://example.com", title: "Title" });
  });

  it("parses images before links, since the syntax differs by one character", () => {
    const [node] = parseInline("![alt](img.png)");
    expect(node).toMatchObject({ type: "image", src: "img.png", alt: "alt" });
  });

  it("autolinks a bare URL without swallowing trailing punctuation", () => {
    const nodes = parseInline("See https://example.com.");
    expect(nodes[1]).toMatchObject({ type: "link", href: "https://example.com" });
    expect(nodes[2]).toEqual({ type: "text", value: "." });
  });

  /**
   * An underscore inside a URL or an identifier must not become emphasis —
   * `some_var_name` is one word, not an italicised middle.
   */
  it("leaves an unclosed delimiter as literal text", () => {
    expect(parseInline("2 * 3 = 6")).toEqual([{ type: "text", value: "2 * 3 = 6" }]);
  });

  it("honours backslash escapes", () => {
    expect(parseInline("\\*literal\\*")).toEqual([{ type: "text", value: "*literal*" }]);
  });

  it("treats two trailing spaces as a hard break", () => {
    expect(parseInline("a  \nb").map((node) => node.type)).toEqual(["text", "break", "text"]);
  });

  it("collapses a soft break to a space rather than a newline", () => {
    expect(parseInline("a\nb")).toEqual([{ type: "text", value: "a b" }]);
  });

  /**
   * Adversarial input — a README is untrusted. This must terminate quickly
   * rather than backtracking, which is what the single-scan design buys.
   */
  it("terminates promptly on pathological delimiter runs", () => {
    const started = Date.now();
    parseInline("*".repeat(2000));
    parseBlocks(`${"> ".repeat(50)}deeply nested`);
    expect(Date.now() - started).toBeLessThan(2000);
  });
});

describe("document shape", () => {
  it("ignores blank lines between blocks", () => {
    expect(blocksOf("\n\n# A\n\n\nBody\n\n").map((block) => block.type)).toEqual([
      "heading",
      "paragraph",
    ]);
  });

  it("ends a paragraph when a block-level construct interrupts it", () => {
    expect(blocksOf("intro text\n## Heading").map((block) => block.type)).toEqual([
      "paragraph",
      "heading",
    ]);
  });

  it("returns an empty array for empty input rather than a stray paragraph", () => {
    expect(blocksOf("")).toEqual([]);
    expect(blocksOf("   \n\n  ")).toEqual([]);
  });
});
