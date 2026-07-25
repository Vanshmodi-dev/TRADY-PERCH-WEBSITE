// Product Implementation Constitution Ch.18 §2 Layer 2 (unit-layer half) /
// Ch.48 §2: every component's accessibility properties (accessible name,
// contrast, ARIA correctness per Ch.18 §4) checked here, alongside the
// existing per-component test floor. Full-page properties that only exist
// once multiple components are assembled — heading hierarchy, landmark
// structure, focus order across components — are explicitly Ch.48 §2's
// integration-layer concern instead, covered by
// apps/marketing-site/scripts/a11y-audit.mjs against every real route in a
// real browser, not duplicated here.
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Accordion,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardMedia,
  CardTitle,
  Drawer,
  Footer,
  Header,
  IconButton,
  Link,
  Logo,
  Reveal,
  Stat,
  TextField,
} from "../index";
import type { AccordionItemData, NavItem } from "../index";

/**
 * Rule exclusions, each tied to a specific, structural reason — never a
 * blanket suppression (Ch.18 §10's "disabled check" anti-pattern).
 *
 * `color-contrast`: requires real computed post-CSS colors. jsdom never
 * loads the actual .module.css stylesheet (CSS Modules resolve to
 * class-name proxies only, per this project's established jsdom
 * limitation — see e.g. stat.test.tsx, intro-sequence.test.tsx). Real
 * contrast is verified in a real browser by the integration-layer script
 * instead, where it's actually meaningful.
 *
 * `region` / `landmark-one-main` / `landmark-unique` / `page-has-heading-one`
 * / `bypass`: page-level structural rules that only make sense once a full
 * document is assembled (a lone <Header> rendered in isolation has no
 * <main> to pair with, by design — that's not a violation of the
 * component, it's this test harness rendering a fragment). Ch.48 §2 itself
 * draws this exact line: full-page landmark/heading-hierarchy properties
 * belong at the integration layer, checked there against real routes.
 */
const UNIT_LAYER_AXE_OPTIONS: NonNullable<Parameters<typeof axe>[1]> = {
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
    "landmark-unique": { enabled: false },
    "page-has-heading-one": { enabled: false },
    bypass: { enabled: false },
  },
};

async function expectNoViolations(container: Element) {
  const results = await axe(container, UNIT_LAYER_AXE_OPTIONS);
  expect(results).toHaveNoViolations();
}

const navItems: NavItem[] = [
  {
    label: "Solutions",
    dropdown: [
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
    ],
    viewAllHref: "/solutions",
    viewAllLabel: "View all solutions",
  },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const accordionItems: AccordionItemData[] = [
  { id: "q1", question: "How long does an engagement take?", answer: "It depends on scope." },
  { id: "q2", question: "Do you work with our existing stack?", answer: "Yes, in most cases." },
];

describe("Accessibility (unit layer)", () => {
  it("Link", async () => {
    const { container } = render(<Link href="/contact">Contact us</Link>);
    await expectNoViolations(container);
  });

  it("Button — every emphasis, disabled, loading, and href-as-link form", async () => {
    const { container } = render(
      <div>
        <Button emphasis="primary">Primary</Button>
        <Button emphasis="secondary">Secondary</Button>
        <Button emphasis="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button status="loading">Loading</Button>
        <Button destructive>Delete</Button>
        <Button href="/contact">Link button</Button>
      </div>,
    );
    await expectNoViolations(container);
  });

  it("IconButton", async () => {
    const { container } = render(
      <IconButton icon={<svg aria-hidden="true" />} aria-label="Open menu" aria-expanded={false} />,
    );
    await expectNoViolations(container);
  });

  it("Logo", async () => {
    const { container } = render(<Logo iconSrc="/icon.jpeg" />);
    await expectNoViolations(container);
  });

  it("Badge — every color", async () => {
    const { container } = render(
      <div>
        <Badge color="neutral">Neutral</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="accent">Accent</Badge>
      </div>,
    );
    await expectNoViolations(container);
  });

  it("Card — static and interactive", async () => {
    const { container } = render(
      <div>
        <Card aria-label="Static card">
          <CardTitle>Static</CardTitle>
          <CardBody>Body copy.</CardBody>
          <CardMedia src="/example.jpg" alt="An example illustration" />
          <CardFooter>Footer content</CardFooter>
        </Card>
        <Card interactivity="interactive" href="/work" aria-label="Read the case study">
          <CardTitle>Interactive</CardTitle>
          <CardBody>Body copy.</CardBody>
        </Card>
      </div>,
    );
    await expectNoViolations(container);
  });

  it("Accordion — closed and open item", async () => {
    const { container } = render(<Accordion items={accordionItems} defaultOpenId="q1" aria-label="FAQ" />);
    await expectNoViolations(container);
  });

  it("Accordion — toggled via keyboard stays accessible", async () => {
    const user = userEvent.setup();
    const { container } = render(<Accordion items={accordionItems} aria-label="FAQ" />);
    await user.tab();
    await user.keyboard("{Enter}");
    await expectNoViolations(container);
  });

  it("Stat", async () => {
    const { container } = render(<Stat value="40%" label="faster lead response" />);
    await expectNoViolations(container);
  });

  it("TextField — default, required, error, helper text, and multiline", async () => {
    const { container } = render(
      <div>
        <TextField id="name" name="name" label="Name" value="" onChange={() => {}} required />
        <TextField
          id="email"
          name="email"
          label="Email"
          value=""
          onChange={() => {}}
          error="Enter a valid email address."
        />
        <TextField
          id="company"
          name="company"
          label="Company"
          value=""
          onChange={() => {}}
          helperText="Optional."
        />
        <TextField
          id="message"
          name="message"
          label="What are you looking to build?"
          value=""
          onChange={() => {}}
          multiline
        />
      </div>,
    );
    await expectNoViolations(container);
  });

  it("Reveal", async () => {
    const { container } = render(
      <Reveal>
        <p>Revealed content</p>
      </Reveal>,
    );
    await expectNoViolations(container);
  });

  it("Drawer — open, with header/footer content", async () => {
    const { container } = render(
      <Drawer open onClose={() => {}} aria-label="Navigation menu" header={<span>Menu</span>} footer={<Button>Go</Button>}>
        <p>Drawer body content</p>
      </Drawer>,
    );
    await expectNoViolations(container);
  });

  it("Footer", async () => {
    const { container } = render(
      <Footer
        logoIconSrc="/icon.jpeg"
        columns={[
          { heading: "Company", links: [{ label: "About", href: "/about" }] },
          { heading: "Work", links: [{ label: "Case Studies", href: "/work/case-studies" }] },
        ]}
        legalLinks={[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ]}
        copyrightText="© 2026 Trady Perch. All rights reserved."
      />,
    );
    await expectNoViolations(container);
  });

  it("Header — default state", async () => {
    const { container } = render(
      <Header items={navItems} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />,
    );
    await expectNoViolations(container);
  });

  it("Header — open dropdown", async () => {
    const user = userEvent.setup();
    const { container, getByRole } = render(
      <Header items={navItems} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />,
    );
    await user.click(getByRole("button", { name: /Solutions/ }));
    await expectNoViolations(container);
  });

  it("Header — open mobile drawer", async () => {
    const user = userEvent.setup();
    const { container, getByRole } = render(
      <Header items={navItems} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />,
    );
    await user.click(getByRole("button", { name: "Open menu" }));
    await expectNoViolations(container);
  });
});
