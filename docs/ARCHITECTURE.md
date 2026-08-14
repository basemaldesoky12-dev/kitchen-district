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
  transactional API (`BREVO_API_KEY` env var). Includes a honeypot `website`
  field for spam; forms have bilingual sending/error states.

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
    `Localized = { en, ar }`.
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
  InvestorTeaser → TrustStrip.
- Shared primitives in `src/components/ui/`: `Button` (variants
  primary/outline/ghost/subtle), `Icon` (Material Symbols ligatures),
  `Reveal` (scroll-in animation, reduced-motion aware), `Accordion`
  (exclusive-open FAQ), `PageHeader` (subpage hero), `field.ts` (shared form
  field classes, also used by `modal/InquiryModal`).
- Global inquiry modal: `context/ModalProvider` + `modal/InquiryModal` —
  every "Book a Kitchen" / "Request a Quote" CTA opens it via `useModal()`.
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

- Deploy: prebuilt flow — `vercel build --prod` then
  `vercel deploy --prebuilt --prod`. Repo is public (Vercel Hobby requirement);
  GitHub `basemaldesoky12-dev/kitchen-district`, work directly on `main`.
- Verification habits: full route sweep (`/en`, `/ar` × all pages), grep for
  stale palette hexes after color changes, RTL toggle check, reduced-motion.

## Known pending items

- Contact details are live in `content.ts` (`contactChannels`): WhatsApp
  `+966 56 170 0278` and `support@kitchendistricts.com`. The landline row was
  dropped — WhatsApp is the only phone channel.
- Custom domain `kitchendistricts.com` DNS points to GoDaddy Website Builder,
  not Vercel — site is reachable at `kitchen-district.vercel.app` until fixed
  (apex A → 76.76.21.21, www CNAME → cname.vercel-dns.com).
- Privacy/Terms footer links are `#` placeholders. Language choice isn't
  persisted beyond the URL.
