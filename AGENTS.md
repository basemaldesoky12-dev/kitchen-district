<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project docs — read these first

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — stack, `[locale]` routing
  (`/ar` default via `proxy.ts`), i18n architecture, component map, deploy
  workflow, known pending items.
- **[docs/DESIGN.md](docs/DESIGN.md)** — "Concrete & Emerald" design system,
  tokens, logo rules, and the owner's copy-voice rules (practical/no-hype EN;
  meaning-first AR — never literal translation).

Hard rules distilled there: tokens-only colors (never pure black/white pages),
every string bilingual `{ en, ar }` in `i18n.ts`/`content.ts`, internal links
through `localize()`, preserve the tile-grid motifs, verify with
`npm run build` + `npm run lint` + a `/en` & `/ar` route sweep.
