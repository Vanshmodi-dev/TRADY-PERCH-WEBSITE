// Design System Bible Ch.42 (Keyboard Interaction Standards) / Product
// Implementation Constitution Ch.19 §2's "keyboard-only task completion"
// automated proxy — a real, permanent, re-runnable check for exactly what
// this project's own established jsdom-limitation discipline can't verify
// in Vitest: genuine tab order, genuine focus movement, genuine focus-trap
// behavior, all against a real Chromium page. (This does not replace Ch.19
// itself — a human judging whether a flow is *usable*, not just operable,
// is still required; see docs/product-implementation-constitution/
// Chapter-66-Engineering-Debt-Register.md's Milestone 7 entry.)
//
// Was, until Milestone 7's independent review, a one-off scratchpad script
// I ran by hand and never committed — real verification that happened, but
// with no regression protection and no way for a future engineer to know
// it was ever done. This is that script, made permanent.
//
// Usage: npm run test:keyboard --workspace=@trady-perch/marketing-site
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { ensureDevServer } from "./lib/server.mjs";

const PORT = 3101; // Distinct from a11y-audit.mjs's 3100 so both can run concurrently if needed.

// Callers navigate to BASE_URL immediately before calling this, so
// sessionStorage already has a real origin to write to — a prior version
// of this helper navigated to about:blank first, which throws a
// SecurityError on sessionStorage access there (no real origin) and would
// have reloaded about:blank instead of the intended page.
async function skipIntro(page) {
  await page.evaluate(() => sessionStorage.setItem("tp-intro-shown", "1"));
}

async function main() {
  const { baseUrl: BASE_URL, stop: stopServer } = await ensureDevServer(PORT);
  const browser = await chromium.launch();

  try {
    // 1. Skip link (WCAG 2.4.1): first Tab stop, moves real focus to <main>.
    {
      const page = await browser.newPage();
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await skipIntro(page);
      await page.reload({ waitUntil: "networkidle" });

      await page.keyboard.press("Tab");
      const firstFocused = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        href: document.activeElement?.getAttribute("href"),
      }));
      assert.equal(firstFocused.tag, "A", "Skip link should be the first focusable element");
      assert.equal(firstFocused.href, "#main-content", "First Tab stop should be the skip link");

      await page.keyboard.press("Enter");
      await page.waitForTimeout(100);
      const afterJump = await page.evaluate(() => document.activeElement?.id);
      assert.equal(afterJump, "main-content", "Skip link must move real keyboard focus, not just scroll");
      await page.close();
    }

    // 2. Header dropdown: keyboard-only open, Ch.42 Kb-4 Escape close + focus return to trigger.
    {
      const page = await browser.newPage();
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await skipIntro(page);
      await page.reload({ waitUntil: "networkidle" });

      const trigger = page.getByRole("button", { name: /Solutions/ });
      await trigger.focus();
      await page.keyboard.press("Enter");
      assert.equal(await trigger.getAttribute("aria-expanded"), "true", "Enter on the trigger should open the dropdown");

      await page.keyboard.press("Escape");
      assert.equal(await trigger.getAttribute("aria-expanded"), "false", "Escape should close the dropdown");
      const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
      assert.ok(focusedText?.includes("Solutions"), "Escape should return focus to the trigger (Ch.42 Kb-4)");
      await page.close();
    }

    // 3. Mobile drawer: Ch.42 Kb-3 focus trap — focus enters, Shift+Tab wraps, Escape closes + returns focus.
    {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await skipIntro(page);
      await page.reload({ waitUntil: "networkidle" });

      const menuTrigger = page.getByRole("button", { name: "Open menu" });
      await menuTrigger.focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(300);

      const focusInsideDrawer = await page.evaluate(() => {
        const dialogEl = document.querySelector('[role="dialog"]');
        return dialogEl ? dialogEl.contains(document.activeElement) : false;
      });
      assert.ok(focusInsideDrawer, "Focus should move inside the drawer on open (Ch.42 Kb-3)");

      await page.keyboard.press("Shift+Tab");
      const stillTrapped = await page.evaluate(() => {
        const dialogEl = document.querySelector('[role="dialog"]');
        return dialogEl ? dialogEl.contains(document.activeElement) : false;
      });
      assert.ok(stillTrapped, "Shift+Tab from the first element should wrap to the last, staying trapped (Ch.42 Kb-3)");

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      const focusedAfterClose = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
      assert.equal(focusedAfterClose, "Open menu", "Escape should close the drawer and return focus to its trigger");
      await context.close();
    }

    // 4. Contact page: tab order matches visual reading order (Ch.42 Kb-1).
    {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });

      const expectedOrder = ["name", "email", "company", "message"];
      const actualOrder = [];
      // Tab past the skip link, logo, and every nav item + CTA first.
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Tab");
      }
      for (let i = 0; i < expectedOrder.length; i++) {
        await page.keyboard.press("Tab");
        const name = await page.evaluate(() => document.activeElement?.getAttribute("name"));
        actualOrder.push(name);
      }
      assert.deepEqual(
        actualOrder,
        expectedOrder,
        `Contact form tab order should match visual order (Ch.42 Kb-1). Got: ${JSON.stringify(actualOrder)}`,
      );
      await page.close();
    }
  } finally {
    await browser.close();
    await stopServer();
  }

  console.log("All keyboard-navigation checks passed:");
  console.log("  - Skip link is the first Tab stop and moves real focus");
  console.log("  - Header dropdown opens via keyboard, Escape closes + returns focus");
  console.log("  - Mobile drawer traps focus (Shift+Tab wraps), Escape closes + returns focus");
  console.log("  - Contact form tab order matches visual reading order");
}

main().catch((error) => {
  console.error("Keyboard navigation check FAILED:");
  console.error(error);
  process.exitCode = 1;
});
