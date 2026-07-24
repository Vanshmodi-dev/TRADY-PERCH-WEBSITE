# CHAPTER 10 — CONFIGURATION & ENVIRONMENT MANAGEMENT

**Trady Perch Product Implementation Constitution · Part II: Repository & Project Architecture**

**Inherited From:** Master Vision Document §22–23 (Accessibility & Performance Standards, treated here as configurable budgets an environment can tune); Design System Bible Chapter 52 (Dark Mode & Theming Architecture, a structural parallel as a configuration surface). Chapter 7 (Repository Structure Standard) is this chapter's premise, specifically `packages/config/`.

---

## 1. INTRODUCTION

Every app in this repository behaves slightly differently depending on where it's running — a local machine, staging, production — and depending on values that must never be committed to version control. This chapter specifies how that variation is declared, validated, and kept honest, so that "which environment is this running in" and "is a required value actually present" are never questions answered by guesswork or a silently wrong default.

---

## 2. THE THREE CONFIGURATION CATEGORIES

**Environment variables** — values that differ by deployment environment (an API base URL, a feature's on/off state) but are not secret. Declared per Chapter 9 §6's naming convention, validated per Section 4 below.

**Secrets** — values that must never appear in version control or client-side code (API keys, signing secrets). This chapter specifies where they are declared and validated; their storage and rotation mechanics are Chapter 43's Application Security Standard territory, cited here and not duplicated.

**Feature flags** — values that gate a feature's visibility independent of which environment is running, allowing Chapter 57's gradual-rollout mechanism to function. A feature flag is not an environment variable in disguise; it is declared through the flag system Chapter 57 specifies, not through Section 3's schema, because a flag's lifecycle (temporary, toggled without a redeploy) differs structurally from an environment variable's (fixed per deployment).

---

## 3. THE CONFIGURATION SCHEMA

Every app declares its required environment variables in a single, typed schema file inside its own `apps/<app-name>/` root — never scattered across multiple files, per Chapter 9's duplicate-translation prohibition. The schema states, for every variable: its name (per Chapter 9 §6), its type, whether it is required or optional, and — where optional — its explicit default. A variable with no stated default and no value present is not silently treated as `undefined` and allowed to propagate; per Section 4, it fails the build.

Shared variables — used by more than one app — are declared once in `packages/config/`'s own schema and referenced, never re-declared per app, mirroring Chapter 7 §4's package-tiering logic exactly: a shared configuration concern is foundational, not duplicated.

---

## 4. VALIDATION AT STARTUP, NOT AT USE

Every app validates its full configuration schema against the actual environment at startup, before any route is served or any request is handled — not lazily, the first time a specific variable happens to be read deep inside a request handler. A missing required variable, or one present but failing its declared type, fails the build immediately with an error naming the specific variable and the specific requirement it failed to meet.

This is the direct mechanical realization of this chapter's own success criterion, and a direct application of Chapter 1's IP6: a missing configuration value is never allowed to silently degrade into an undocumented default that happens to keep the app running in a broken state. Chapter 1's IP3 (Restraint) does not apply here — there is no "convenience" argument for skipping this validation, because the cost of a silent misconfiguration reaching production is categorically higher than the cost of a build failing loudly and immediately in development.

---

## 5. PER-ENVIRONMENT VALUES

Local, staging, and production each supply their own values against the same schema — the schema itself never varies by environment; only the values do. A variable required in production but genuinely optional in local development is declared required with an explicit, documented local-development default in the schema itself, never worked around by a developer manually creating an undocumented local override file that isn't itself checked into any tracked configuration.

Local secrets are supplied through a gitignored local file, never committed; staging and production secrets are supplied through whatever secret-management mechanism Chapter 43 specifies, never hardcoded, and never passed as a plain environment variable value inside a committed CI configuration file.

---

## 6. CONFIGURATION AS A BUDGET SURFACE

Certain configuration values are not arbitrary per-environment tuning — they are the literal, machine-readable expression of a budget fixed elsewhere in this Constitution. Chapter 36's performance-budget thresholds and any environment-specific accessibility-testing toggle are declared through this same schema mechanism, but their *values* are owned by Chapter 36 and Part IV respectively — this chapter owns only the mechanism by which they are declared and validated, not the numbers themselves, mirroring Design System Bible Chapter 52's own theming configuration as a comparable "config surface with an externally owned value."

---

## 7. ENFORCEMENT & MEASUREMENT

Section 4's startup validation is inherently mechanical by design — it is a build-time gate, not a documented convention hoping to be followed. Section 5's secret-handling rule (no plain-text secret in a committed file) is checked by a secret-scanning tool wired into Chapter 56's CI pipeline, flagging any pattern resembling a credential in a diff before it merges. Section 3's single-schema-per-app rule is checked by the same repository-structure linter Chapter 7 §8 already specifies, extended to flag a second configuration-schema file inside one app.

---

## 8. BEHAVIORAL RULES

**When adding a new configuration value.** It is added to the schema first, with its type and requirement status stated, before any code reads it — never introduced by a call to a raw environment-variable lookup scattered directly in application code.

**When a value is missing in a specific environment.** The build fails there, loudly, and the missing value is supplied through that environment's proper mechanism — never patched around by adding a fallback default that masks the environment being genuinely misconfigured.

**When a secret is discovered committed to version control.** It is treated as compromised immediately, rotated per Chapter 43's mechanism, and the commit history is not relied upon as sufficient remediation on its own — removing a file from a future commit does not remove it from history.

---

## 9. DO / DON'T

**Do** validate the entire configuration schema at startup, once, rather than checking individual variables lazily at each point of use.

**Do** declare a shared configuration value once in `packages/config/`, referenced by every app that needs it.

**Don't** add a silent fallback default for a value that is genuinely required in production — a loud failure in development is cheaper than a silent misconfiguration reaching a client.

**Don't** commit a `.env` file containing real secret values, even to a private repository — Chapter 43 treats any committed secret as compromised regardless of the repository's visibility.

---

## 10. ANTI-PATTERNS

**The silently-defaulted secret.** A required API key with a hardcoded fallback value — often a working key from a shared development account — that means the app keeps running even when the real, environment-specific key is missing. This is dangerous because it converts a configuration error into an invisible, working-but-wrong state instead of an immediate, diagnosable failure, and it is exactly the "non-negotiable floor traded for convenience" pattern Chapter 1's IP6 forbids applied to configuration specifically. It is detected by Section 4's mandatory startup validation refusing any default for a variable marked required. It is fixed by removing the fallback and supplying the correct value through the environment's proper secret mechanism.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Is every required configuration value declared in the app's single schema file, with an explicit type?
- [ ] Does the app fail to start, with a specific and actionable error, if a required value is missing or malformed?
- [ ] Is every shared configuration value declared once in `packages/config/`, not duplicated per app?
- [ ] Are all secret values excluded from version control, with no plain-text fallback default for a required secret?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP6). Chapter 7 §4 and §8 (package tiering and the structural linter this chapter's schema rules extend). Chapter 9 §6 (the naming convention every configuration value follows). Chapter 36 (Performance Budgets, an owner of Section 6's budget values). Chapter 43 (Application Security Standard, the owner of secret storage and rotation mechanics). Chapter 56 (Continuous Integration Standard, where Section 7's checks run). Chapter 57 (Deployment Workflow Standard, the owner of feature-flag mechanics).

**Within the five documents above this Constitution:** Master Vision §22–23; Design System Bible Chapter 52.

---

## 13. FUTURE EXPANSION

**Documented limitations.** This chapter's feature-flag boundary (Section 2) assumes Chapter 57's rollout mechanism exists; until it is written, a feature flag is declared through the same schema mechanism as any other environment variable, with a note in this chapter's own debt register entry that it should migrate once Chapter 57 is complete.

---

*End of Chapter 10, and of Part II. Part III, Component Architecture & Design System Implementation, is where the Design System Bible and Motion Bible stop being documents and become working code.*
