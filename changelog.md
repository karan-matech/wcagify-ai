# Changelog

## Unreleased — Brand and theme recalibration (2026-09-19)

- Replace the marketing site's stock Tailwind indigo palette with a single brand color, `#101831`, calibrated from the platform frontend (`/home/karan/Documents/ma-tech/wcagify.ai/platform/frontend`, `.radix-themes` tokens). Override Tailwind's `indigo-*` scale directly in `app/globals.css` so existing utility classes repaint without per-file changes.
- Remove the Google-hosted Inter font; adopt the platform's system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`) via a `--font-sans` theme token.
- Match the platform's `.brand`/`.brand-mark`/`.brand-wordmark` lockup exactly (dark gradient circle mark, 650-weight letter-spaced wordmark) in the Navbar and Footer, replacing ad-hoc styling.
- Move brand assets to the platform's shared path convention, `public/assets/brand/` (logo, favicon set, apple/app icons, web manifest), sourced from the platform frontend's canonical brand folder. Remove the superseded root-level `logo.svg`/`icon.svg`.
- Update `app/layout.tsx` metadata (icons, manifest, OpenGraph/Twitter images, JSON-LD organization logo) and `themeColor` to the new asset paths and color.

## Unreleased — Repository hygiene (2026-09-19)

- Ignore local Claude Code / agent tooling artifacts (`.claude/`, `AGENTS.md`, `CLAUDE.md`) and common IDE/OS/cache clutter in `.gitignore`, matching the convention used in `/home/karan/Documents/ma-tech/wcagify.ai`.
- Add this changelog to track future changes in the same terse, dated format as the platform repo.
