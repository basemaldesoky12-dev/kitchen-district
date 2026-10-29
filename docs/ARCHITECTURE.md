# Kitchen District — Architecture

Marketing site for Kitchen District, a cloud-kitchen infrastructure provider in
Jeddah, KSA. Bilingual (Arabic default / English), statically prerendered,
deployed on Vercel.

## Stack

- **Next.js 16.2 (App Router, Turbopack)** — ⚠️ modified build: read
  `node_modules/next/dist/docs/` before writing Next-specific code (see
  AGENTS.md). Notably: `proxy.ts` replaces `middleware.ts`.
- React 19, TypeScript, Tailwind CSS v4 (tokens via `@theme` in
  `src/app/globals.css`), Motion 12 for animation.
- No database, no test suite. One API route: `src/app/api/inquiry/route.ts` —
  both forms (InquiryModal + ContactContent) POST via `src/lib/inquiry.ts`
  and it emails the four kitchendistricts.com recipients through Brevo's
  transactional API (`BREVO_API_KEY` env var), while creating a Zoho CRM lead
  through `src/lib/zoho.ts`. See [ZOHO.md](ZOHO.md) for credentials and failure
  handling. Email alone determines the form response; CRM runs independently
  after the response through Next.js `after`. There is no automatic retry queue.
  Includes a honeypot `website` field for spam;
  forms have bilingual sending/error states.

## Routing & i18n

- All pages live under `src/app/[locale]/` — `en` and `ar` are prerendered via
  `generateStaticParams` (`dynamicParams = false`).
- `src/proxy.ts` redirects locale-less paths to the **Arabic default**:
  `/` → `/ar`, `/pricing` → `/ar/pricing`.
- Routes: `/[locale]` (home), `/pricing`, `/faq`, `/contact`, `/about`,
  `/investors`. Each route = thin server `page.tsx` (exports `metadata`) +
  one `"use client"` content component (e.g. `components/pricing/PricingContent.tsx`).
- **Translation architecture** (hand-rolled, no library):
  - `src/lib/i18n.ts` — UI-string dictionary, full `en` + `ar` objects. The
    `Dictionary` type is derived from it, so a missing key in either language
    breaks the build (intentional safety net).
  - `src/lib/content.ts` — structured data (nav links, benefits, solutions,
    pricing tiers, FAQ items, locations…). Every translatable string is
    `Localized = { en, ar }`. FAQ items flagged `home: true` also appear in
    the homepage FAQ (`sections/HomeFaq.tsx`); `socialLinks` feeds the footer
    and the JSON-LD `sameAs`.
  - `src/context/LanguageProvider.tsx` — reads locale from the URL. Exposes
    `t` (dictionary), `pick(localized)`, `localize(href)` (prefixes internal
    links: `/pricing` → `/ar/pricing`), `toggleLocale()` (navigates to the
    same path in the other locale).
  - **Rule: every internal `<Link>`/`href` must go through `localize()`.**
- RTL: driven by `dir` on `<html>` (set server-side in the layout). CSS swaps
  the font to Tajawal under `[dir="rtl"]`; components use logical utilities
  (`px-margin`, `text-start`, `pe-*`) and `rtl:` variants.

## Layout & components

- `src/app/[locale]/layout.tsx` — fonts (Plus Jakarta Sans + Tajawal via
  next/font), metadata, Material Symbols icon font `<link>`, `tile-surface`
  body class, `<Providers locale>`.
- Homepage section order (`[locale]/page.tsx`): Hero → HowItWorks → WhyUs →
  **Facilities before Solutions** (imagery first, deliberate) → Expansion →
  HomeFaq → InvestorTeaser → TrustStrip.
- Shared primitives in `src/components/ui/`: `Button` (variants
  primary/outline/ghost/subtle), `Icon` (Material Symbols — the ligature name
  goes in `data-icon` and is drawn by a CSS `::before`, so icon names never
  become indexable page text), `Reveal` (scroll-in animation, reduced-motion
  aware), `Accordion` (exclusive-open FAQ; closed answers stay mounted —
  collapsed + `inert` — so they are in the server HTML Google reads;
  `headingLevel` wraps each question in an h2/h3), `PageHeader` (subpage
  hero), `field.ts` (shared form field classes, also used by
  `modal/InquiryModal`).
- SEO plumbing: `src/lib/seo.ts` (`pageMetadata`, hreflang, `seoPages` with a
  real per-page `lastModified` — bump it when a page's content changes),
  `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `[locale]/layout.tsx` and
  `faq/page.tsx`. Strategy, rank log and Arabic SERP analysis: `docs/SEO.md`;
  Business Profile setup: `docs/GBP.md`.
- Global inquiry modal: `context/ModalProvider` + `modal/InquiryModal` —
  every "Book a Kitchen" / "Request a Quote" CTA opens it via `useModal()`,
  **except** the locations card (`sections/Expansion.tsx`), whose CTA links to
  `localize("/contact")` so the lead lands on the fuller sales form.
- Hero canvas animation: `components/hero/TileGrid.tsx` — 56px tiles (must
  match `.tile-surface` background-size), `ACCENTS` array holds glow colors,
  respects reduced motion / visibility / DPR.

## Build, verify, deploy

```bash
npm run build         # Turbopack; TS + all routes prerendered
npm run lint          # eslint (ignores .claude/ and .vercel/)
npm run dev           # local dev — NOTE: port 3000 is sometimes taken by
                      # another local app; use `npx next start -p 3100`
```

- **Production has two deploy paths — know both.**
  1. **Git (primary).** The Vercel project is connected to GitHub
     `basemaldesoky12-dev/kitchen-district`: every push/merge to `main`
     auto-deploys production (other branches get previews). Work also arrives
     this way from outside this machine — the Zoho CRM integration landed via
     PR #1/#2 from `zoho_integration` (2026-09-27/28). `vercel project inspect`
     does not show the git link; a deployment's origin is visible with
     `vercel api /v13/deployments/<id>` (`source: git` vs `cli`).
  2. **CLI prebuilt (fallback).** `vercel pull --yes --environment production`
     → `vercel build --prod` → `vercel deploy --prebuilt --prod --yes`. It ships
     the *local working tree*, whatever it contains.
- **Before any CLI deploy:** `git fetch origin`; `git log HEAD..origin/main` must
  be empty (otherwise `git rebase origin/main`, rebuild, re-verify); clean
  working tree. **Right after it:** push to GitHub. A CLI deploy that isn't on
  GitHub is reverted by the next merge; a stale local `main` reverts GitHub-only
  work. *Incident 2026-09-30:* a CLI deploy from a local `main` that had never
  fetched the Zoho PRs replaced the Zoho build in production — no CRM leads were
  created until the combined redeploy on 2026-10-02 (`59bcfc6`). See docs/ZOHO.md.
- **GitHub access from this Mac:** the keychain git credential and `gh`'s active
  account are `basemaldesoky-kd` (the KD Ops account), which has no access to
  this repo → `git push` returns 403. `git fetch` works (public repo). A new
  `basemaldesoky-kd` token won't help; fix by adding `basemaldesoky-kd` as a repo
  collaborator, or push with a `basemaldesoky12-dev` token (fine-grained,
  Contents read/write, this repo only, short expiry). `gh`'s stored
  `basemaldesoky12-dev` login is broken.
- Repo is public (Vercel Hobby blocks git deployments whose commit author isn't
  a project member on private repos). Work directly on `main`.
- Logs (Vercel CLI 51): `vercel logs --no-follow --no-branch --environment production --level error --since 1h`
  — a deployment-URL argument implies `--follow`, which rejects filters.
- Verification habits: full route sweep (`/en`, `/ar` × all pages), grep for
  stale palette hexes after color changes, RTL toggle check, reduced-motion.
  For SEO changes, fetch the page and check the text outside `<script>` tags —
  content that only renders after a click (or only in JSON-LD) is invisible to
  Google. Never POST a real inquiry (real emails + Zoho leads); `POST
  /api/inquiry` with body `[]` safely returns `400 Invalid inquiry`.
- UI screenshots: the Claude-in-Chrome extension's tab runs in the background
  (`document.visibilityState === "hidden"`), which freezes the scroll-reveal
  animations and returns blank screenshots. Use headless Chrome via
  `puppeteer-core` (installed outside the repo) for screenshots, console
  errors, and interaction checks.

## Known pending items

- Contact details are live in `content.ts` (`contactChannels`): WhatsApp
  `+966 56 170 0278` and `support.kd@kitchendistricts.com`. The landline row was
  dropped — WhatsApp is the only phone channel.
- Custom domain `kitchendistricts.com` now resolves to Vercel and serves the
  site; `www` and `kitchen-district.vercel.app` 308-redirect to the apex via
  `next.config.ts` so ranking signals stay on one host.
- Privacy/Terms footer links are `#` placeholders. Language choice isn't
  persisted beyond the URL.
- **Incident 2026-10-20 (unpushed work reverted):** the Arabic SEO commits were
  in production from a CLI deploy but existed only on this Mac. A teammate's
  merge on GitHub (`cdeb95e`, support email change) auto-deployed and removed
  them from production for 8 days. They were rebased onto it and pushed on
  2026-10-29 (`5dacc5b`). Anything in `git log origin/main..main` is one GitHub
  merge away from disappearing, so push it the same day.
- **Brevo sender domain not verified** (DNS checked 2026-10-03): with the Gmail
  sender fallback, abdullah@ and support@ hard-bounce on DMARC; only ali@ and
  basem.aldesoky@ receive inquiry emails. Fix: add at GoDaddy TXT `@`
  `brevo-code:0af78ea536b286c5898ea81e60a228c8`, CNAME `brevo1._domainkey` →
  `b1.kitchendistricts-com.dkim.brevo.com`, CNAME `brevo2._domainkey` →
  `b2.kitchendistricts-com.dkim.brevo.com`; then set `BREVO_SENDER_EMAIL` in
  Vercel and redeploy.
- No street address anywhere on the site (Google Business Profile not created
  yet) — once GBP exists, put the identical address on the contact page and in
  the `LocalBusiness` JSON-LD (see docs/GBP.md).
