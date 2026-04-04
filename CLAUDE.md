# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev       # Start development server at localhost:3000
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

There are no tests configured in this project.

## Stack

- **Next.js 16.2.2** with App Router (see AGENTS.md — this version has breaking changes vs training data)
- **React 19.2.4**
- **TypeScript** (strict mode, `moduleResolution: "bundler"`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — configuration is different from v3
- **pnpm** as the package manager

## Architecture

This is a Next.js App Router project. All routes and layouts live under `app/`:

- [app/layout.tsx](app/layout.tsx) — root layout, sets up Geist fonts (Sans + Mono) as CSS variables, wraps all pages
- [app/page.tsx](app/page.tsx) — home route (`/`)
- [app/globals.css](app/globals.css) — global styles, Tailwind base

The `@/*` path alias maps to the repo root, so `@/app/...`, `@/components/...`, etc. are valid imports.

Static assets go in `public/`.

## Key Notes

- **Before writing any Next.js code**, read the relevant guide in `node_modules/next/dist/docs/` — this version differs from training data.
- ESLint uses the flat config format (`eslint.config.mjs`) with `eslint-config-next` core-web-vitals + TypeScript presets.
- Tailwind v4 uses `@import "tailwindcss"` in CSS rather than `@tailwind` directives, and config is CSS-first — not `tailwind.config.js`.
