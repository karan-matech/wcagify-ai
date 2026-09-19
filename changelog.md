# Changelog

## Unreleased — Design cleanup, social proof, and motion pass (2026-09-19)

- Simplify the hero and section headers across the homepage — remove stacked badges, gradient banners, and redundant compliance pills in favor of a single eyebrow label + heading + subhead pattern (`HeroSection.tsx`, `Navbar.tsx`, `OverlayVsNative.tsx`, `FeatureTabs.tsx`, `ArchitectureTriPillar.tsx`, `BuildGatekeeperDemo.tsx`, `Footer.tsx`).
- Add a social-proof stats band (`app/components/StatsBand.tsx`) directly under the hero listing the standards WCAGify targets (WCAG 2.2 AA, ISO 14289 PDF/UA, EPUB 3, EN 301 549) — verifiable facts, not fabricated customer numbers or logos. Wired into `app/page.tsx`.
- Add `Sora` as a distinct display typeface for headings via `next/font/google` (`app/layout.tsx`, `app/globals.css`), paired with the existing system sans body font.
- Add a reusable scroll-triggered reveal wrapper (`app/components/Reveal.tsx`, respects `prefers-reduced-motion`) and apply it to section headers and major content blocks across the page for consistent motion; hero uses a staggered load-in instead since it's above the fold.
- Add `scripts/capture-changelog-screenshots.mjs` (Playwright) to capture before/after reference screenshots into `docs/changelog/<date>/`. See [`docs/changelog/2026-09-19/`](docs/changelog/2026-09-19/) for this pass.
- Known gap (flagged, not fixed): `DemoRequestForm.tsx`'s `handleSubmit` only updates local state — it doesn't send data anywhere (no API call, email, or CRM), so real submissions are currently lost.

## Unreleased — Brand and theme recalibration (2026-09-19)

- Replace the marketing site's stock Tailwind indigo palette with a single brand color, `#101831`, calibrated from the platform frontend (`/home/karan/Documents/ma-tech/wcagify.ai/platform/frontend`, `.radix-themes` tokens). Override Tailwind's `indigo-*` scale directly in `app/globals.css` so existing utility classes repaint without per-file changes.
- Remove the Google-hosted Inter font; adopt the platform's system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`) via a `--font-sans` theme token.
- Match the platform's `.brand`/`.brand-mark`/`.brand-wordmark` lockup exactly (dark gradient circle mark, 650-weight letter-spaced wordmark) in the Navbar and Footer, replacing ad-hoc styling.
- Move brand assets to the platform's shared path convention, `public/assets/brand/` (logo, favicon set, apple/app icons, web manifest), sourced from the platform frontend's canonical brand folder. Remove the superseded root-level `logo.svg`/`icon.svg`.
- Update `app/layout.tsx` metadata (icons, manifest, OpenGraph/Twitter images, JSON-LD organization logo) and `themeColor` to the new asset paths and color.

## Unreleased — Repository hygiene (2026-09-19)

- Ignore local Claude Code / agent tooling artifacts (`.claude/`, `AGENTS.md`, `CLAUDE.md`) and common IDE/OS/cache clutter in `.gitignore`, matching the convention used in `/home/karan/Documents/ma-tech/wcagify.ai`.
- Add this changelog to track future changes in the same terse, dated format as the platform repo.
