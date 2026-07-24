# CHAPTER 9 — NAMING CONVENTIONS (CODE, FILES, BRANCHES, COMMITS)

**Trady Perch Product Implementation Constitution · Part II: Repository & Project Architecture**

**Inherited From:** Design System Bible Chapter 63 (Naming Conventions, in full — specifically N-1 "One Grammar, Many Renderings," N-2 "Casing Is Determined by Artifact Type, Not Preference," and N-3 "A Name Is Never Reused for a Different Meaning"); Brand Identity Manual Chapter 10 (Naming Philosophy, verbal-identity parallel). This chapter extends Design System Bible Chapter 63's naming discipline from design artifacts to every code-facing name.

---

## 1. INTRODUCTION

Design System Bible Chapter 63 fixed how a token, a component, and a design-system file are named. It did not fix how a variable, a branch, or a commit message is named, because those artifacts don't exist in that document's domain. This chapter closes that gap, applying the same three principles — N-1 through N-3 — to every name a contributor, human or AI, produces while writing code.

---

## 2. VARIABLES, FUNCTIONS, AND TYPES

**Variables and functions:** camelCase. `fetchClientInvoices`, `isSessionActive`. A function name states what it does, as a verb phrase where it performs an action (`fetchClientInvoices`) or as a predicate where it returns a boolean (`isSessionActive`) — never a noun alone, which per N-1 fails to state the artifact's role in the underlying grammar.

**Types and interfaces:** PascalCase, matching Design System Bible N-2's component convention directly, since a type and a component are both "a named, reusable thing" in the same sense that convention was chosen for. `ClientInvoice`, `SessionState`. No `I`-prefix or `T`-suffix decoration — the casing alone already signals "this is a type," per N-1's instruction that meaning be carried by casing rather than by redundant decoration.

**Constants:** SCREAMING_SNAKE_CASE, reserved specifically for values that are genuinely fixed and would never reasonably become a runtime variable — `MAX_RETRY_ATTEMPTS`, not a config value that happens to not change often today. A value that could plausibly become configurable later is named in camelCase and sourced from Chapter 10's configuration layer instead, per this chapter's own N-3-derived rule against a name implying more permanence than the value actually has.

**React-equivalent components** (any UI component regardless of the eventual framework Chapter 10 pins): PascalCase, directly inheriting Design System Bible N-2. `PricingTierCard`, `SkeletonLoader` — matching Design System Bible Chapter 63's own examples exactly, so a component named in the Bible and a component implemented in code are, per Chapter 3's translation ledger, unambiguously the same artifact under the same name.

---

## 3. FILES AND FOLDERS

**Source files:** kebab-case, matching Design System Bible N-2's non-Bible-chapter file convention. `fetch-client-invoices.ts`, `pricing-tier-card.tsx`. A component's file uses kebab-case even though the component itself, once imported, is referenced in PascalCase — the file name and the exported symbol name following their own artifact type's convention independently, per N-1.

**Test files:** the file under test's name with a `.test` or `.spec` suffix per Chapter 47's testing-tool convention, colocated per Chapter 8's feature-folder standard — never a parallel, differently-named file that requires a reader to guess the correspondence.

**Folders:** kebab-case throughout, matching Chapter 8's feature-folder examples exactly.

---

## 4. BRANCHES

`<type>/<short-kebab-case-description>` — `feature/client-invoice-export`, `fix/session-timeout-race`, `chore/upgrade-token-pipeline`. The `<type>` prefix is drawn from the same closed set Section 5's commit convention uses, so a branch's purpose is legible before its first commit is even read. A branch name never includes a ticket number alone with no description (`fix/PROJ-482`) — per Chapter 1's IP5, a branch name must be self-contained enough to convey intent to a reader with no access to whatever tracker `PROJ-482` refers to.

---

## 5. COMMITS

Commit messages follow a Conventional-Commits-equivalent structure: `<type>(<scope>): <imperative summary>`. `<type>` is one of a closed set — `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf` — matching the branch-type prefix from Section 4. `<scope>` names the app or package affected, per Chapter 7's tree — `feat(client-portal): add invoice CSV export`. The summary is imperative ("add," not "added" or "adds"), stating what the commit does, not narrating what was done, consistent with this Constitution's own front-matter voice.

A commit message body, where one exists, states *why* — the specific need or citation per Chapter 1's IP1 — never merely re-describing the diff, which per Chapter 1's own comment-writing standard (Chapter 61) is a defect regardless of which artifact it appears in.

---

## 6. ENVIRONMENT VARIABLES

`<APP_PREFIX>_<SCREAMING_SNAKE_NAME>` — `CLIENT_PORTAL_API_BASE_URL`, `MARKETING_SITE_ANALYTICS_ID`. The app prefix matches the app's Chapter 7 folder name, uppercased and underscored, so an environment variable's owning surface is legible from its name alone without needing to trace where it's consumed. A variable shared across every app carries no app prefix and is documented in `packages/config/` per Chapter 7 §4, rather than duplicated per app under different prefixes — duplication here would be exactly the "duplicate translation" failure Chapter 3 already forbids.

---

## 7. THE EXCEPTION CLAUSE

Per Design System Bible N-2's own exception clause, mirrored here exactly: where an external, non-negotiable standard outside this system's control requires a different naming format — a specific filename a deployment platform requires, a specific casing a third-party API contract dictates — the external requirement wins, and the exception is documented at the point of use, citing this section, rather than silently deviating and leaving a future reader to wonder whether the deviation was deliberate or an oversight.

---

## 8. NAME RETIREMENT

Per N-3, inherited directly and without modification: a retired name — a renamed function, a deleted component, a deprecated environment variable — is never reassigned to a new, unrelated artifact. A genuinely new version of something retired takes a new name (`fetchClientInvoicesV2`, or better, a name describing what actually changed) rather than reusing the old one, because old references — a comment, a log line, an ADR per Chapter 62 — do not expire alongside the rename, and a reused name breaks every one of them silently.

---

## 9. ENFORCEMENT & MEASUREMENT

Every rule in Sections 2 through 6 is, in principle, fully mechanical: an ESLint-equivalent rule set for variable, function, type, and constant casing; a filename linter for Section 3; a commit-hook validator for Section 4 and Section 5's structured format; a startup-time validator per Chapter 10 for Section 6's environment-variable prefix convention. Per Chapter 1's IP2, a rule in this chapter with no corresponding automated check by the time Chapter 56's CI pipeline exists is tracked as a Chapter 66 debt-register entry, not treated as sufecifently enforced by this chapter's prose alone.

---

## 10. BEHAVIORAL RULES

**Before naming anything new.** The artifact type is identified first — variable, type, file, branch, commit, environment variable — and Sections 2 through 6's corresponding convention applied directly, never invented ad hoc even for a name that feels obviously self-evident.

**Under time pressure.** A rushed, inconsistent name is not an acceptable shortcut — renaming later, once other code and documentation reference the original name, is measurably more expensive than naming correctly the first time, per this chapter's own N-3-derived retirement cost.

---

## 11. DO / DON'T

**Do** name a function as a verb phrase stating what it does, and a boolean-returning function as a predicate — `isSessionActive`, never `sessionActive` alone, which reads ambiguously as either a boolean or the session object itself.

**Do** prefix an environment variable with its owning app's name per Section 6, even when only one app currently consumes it — the prefix states ownership regardless of current consumer count.

**Don't** abbreviate a name to save keystrokes at the cost of legibility — `fetchClientInvoices`, never `fetchClInv`. Per Chapter 1's IP4, a name that requires the reader to already know the abbreviation's expansion has failed to be explicit.

**Don't** reuse a retired component or variable name for something unrelated, even long after the original was removed — per N-3, time does not resolve the ambiguity.

---

## 12. ANTI-PATTERNS

**Convention drift by convenience.** A contributor, under time pressure, names something close to but not quite matching this chapter's convention — camelCase where PascalCase was required, or vice versa — reasoning that a linter will catch it "eventually." This is dangerous because the drift compounds exactly the way Chapter 5's F1 (Implicit Convention) failure mode describes: the first instance looks like a minor inconsistency, and each subsequent near-miss makes the next one look more normal by precedent. It is detected by Section 9's automated checks, run in CI rather than left to periodic manual audit. It is fixed by correcting the name immediately, including every reference to it, rather than deferring the correction to "a cleanup pass" that Chapter 5 §2 already establishes rarely arrives.

---

## 13. QUALITY ASSURANCE CHECKLIST

- [ ] Does every variable, function, type, and constant follow Section 2's casing convention for its specific artifact type?
- [ ] Does every file and folder follow Section 3's kebab-case convention?
- [ ] Does the branch name follow Section 4's `<type>/<description>` format, self-contained without an external ticket reference alone?
- [ ] Does the commit message follow Section 5's structured format, with a body explaining *why* where the summary alone doesn't convey it?
- [ ] Does every environment variable carry the correct app prefix, or correctly carry none if genuinely shared per Chapter 7 §4?
- [ ] Has any retired name been checked against Section 8 before being reassigned to something new?

---

## 14. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP2, IP4, IP5). Chapter 3 (duplicate-translation logic, mirrored in Section 6's shared-variable rule). Chapter 5 (F1, the failure mode Section 12's anti-pattern instantiates). Chapter 7 (the app names Section 6 prefixes environment variables with). Chapter 8 (the file/folder examples Section 3 matches). Chapter 10 (Configuration & Environment Management, which owns Section 6's variables operationally). Chapter 56 (Continuous Integration Standard, where Section 9's checks are wired in). Chapter 61 (Code-Level Documentation Standard, governing commit-body content).

**Within the five documents above this Constitution:** Design System Bible Chapter 63 (in full); Brand Identity Manual Chapter 10.

---

## 15. FUTURE EXPANSION

**Documented limitations.** This chapter does not yet specify a convention for AI-agent-specific artifacts (a saved prompt template, a briefing file per Chapter 30) — deferred to Part VI, which will extend this chapter's N-1/N-2/N-3 grammar to that artifact type once Chapter 30 is written, rather than inventing an inconsistent convention here ahead of that need.

---

*End of Chapter 9. The next chapter, Configuration & Environment Management, specifies the operational lifecycle of the environment variables this chapter only names.*
