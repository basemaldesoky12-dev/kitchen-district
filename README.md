# Kitchen District

Marketing site for **Kitchen District** — cloud kitchen infrastructure in
Jeddah, KSA. Fully equipped commercial kitchens plus the technology to launch,
operate, and scale delivery food brands.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and
[Motion](https://motion.dev). Bilingual with **Arabic as the default**
(`/ar`, RTL) and English at `/en`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 (redirects / → /ar)
npm run build    # production build (prerenders /en + /ar for every page)
npm run lint
```

Deploys: Vercel auto-deploys GitHub `main`; a CLI prebuilt deploy is the
fallback. Read the deploy rules in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
first — always fetch and rebase onto `origin/main` before a CLI deploy, and push
right after.

## Documentation

| Doc | What's in it |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, locale routing (`[locale]` + `proxy.ts`), i18n architecture (`i18n.ts` / `content.ts` / `LanguageProvider`), component map, build & deploy workflow, known pending items |
| [docs/DESIGN.md](docs/DESIGN.md) | "Concrete & Emerald" design system: palette tokens, typography, logo usage, signature motifs (tile grid, bento cards), motion rules, and the copy-voice rules for English **and Arabic** |
| [docs/SEO.md](docs/SEO.md) | SEO status, Arabic SERP analysis, action checklist, rank log, lessons learned |
| [docs/GBP.md](docs/GBP.md) | Google Business Profile setup pack (fields, category, Arabic description, verification) and status |
| [docs/ZOHO.md](docs/ZOHO.md) | Zoho CRM lead creation from the forms, credentials, failure handling, safe verification, outage record |
| [AGENTS.md](AGENTS.md) | ⚠️ Modified Next.js warning + the deploy rule — read before writing code or deploying |

**Read both docs before adding features or copy** — they encode owner
decisions (palette, tone, Arabic phrasing rules) that are not obvious from
the code alone.

## Quick facts

- Routes: `/{en|ar}/` + `/pricing`, `/faq`, `/contact`, `/about`, `/investors`.
- All copy lives in `src/lib/i18n.ts` (UI strings) and `src/lib/content.ts`
  (structured data), every string as `{ en, ar }`.
- Internal links must go through `useLanguage().localize(href)`.
- Forms POST to `/api/inquiry`: Brevo email (`BREVO_API_KEY`) decides the
  response; a Zoho CRM lead is created in the background (docs/ZOHO.md).
- Design tokens: Tailwind v4 `@theme` in `src/app/globals.css`; components
  use generated utilities only (`bg-primary`, `text-on-surface`, …).
