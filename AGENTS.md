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
- **[docs/SEO.md](docs/SEO.md)** — current SEO status (read its *Status* section
  first), Arabic SERP analysis, action checklist, rank log, lessons learned.
- **[docs/GBP.md](docs/GBP.md)** — Google Business Profile setup pack and status.
- **[docs/ZOHO.md](docs/ZOHO.md)** — Zoho CRM lead creation from the inquiry
  forms, credentials, failure handling, and the 2026-09-30 outage record.

Hard rules distilled there: tokens-only colors (never pure black/white pages),
every string bilingual `{ en, ar }` in `i18n.ts`/`content.ts`, internal links
through `localize()`, preserve the tile-grid motifs, verify with
`npm run build` + `npm run lint` + a `/en` & `/ar` route sweep.

**Deploy rule — learned the hard way (2026-09-30).** Vercel auto-deploys GitHub
`main`, and work also lands on GitHub from outside this machine (PRs from other
tools). Before any deploy from this machine: `git fetch origin` and rebase onto
`origin/main` (`git log HEAD..origin/main` must be empty). Right after: push.
Skip either step and production loses work — a stale local `main` once removed
the Zoho CRM integration from production for two days. Pushing from this Mac
currently fails (wrong GitHub account in the keychain) — see
docs/ARCHITECTURE.md → *Build, verify, deploy* before trying.

Never verify the forms with a real submission: it sends real emails and creates
real Zoho leads (see docs/ZOHO.md for the safe probe).
