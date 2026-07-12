# Kitchen District

Landing page for **Kitchen District** — the operating system for delivery-first
food brands. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
and [Motion](https://motion.dev). Bilingual (English / العربية) with full RTL
support.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Architecture

The code is organized for scale — content, presentation, and state are kept
separate so the page can grow into a full marketing site.

```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, <html> shell, Providers
│   ├── page.tsx            # Section composition
│   └── globals.css         # "Spice & Stone" design tokens (Tailwind v4 @theme)
├── context/
│   ├── LanguageProvider.tsx # Locale state + RTL/dir sync + t()/pick() helpers
│   └── ModalProvider.tsx    # Global Partner-Inquiry modal state
├── lib/
│   ├── i18n.ts             # Type-safe en/ar dictionary (UI copy)
│   ├── content.ts          # Structured data: solutions, brands, locations…
│   └── clsx.ts             # Minimal className joiner
└── components/
    ├── Providers.tsx       # Wraps app in Language + Modal providers
    ├── ui/                 # Icon, Button, Reveal, CountUp primitives
    ├── layout/             # Navbar, Footer
    ├── sections/           # Hero, TrustStrip, Solutions, Facilities, …
    ├── hero/DispatchNetwork.tsx  # Signature canvas animation
    └── modal/InquiryModal.tsx
```

### Design system

All Material 3 "Spice & Stone" tokens (terracotta / saffron / olive on a warm
sand base) live in `globals.css` under Tailwind v4's `@theme`. They generate
utilities automatically — e.g. `bg-primary`, `text-on-surface`, `p-margin`,
`text-display-lg`, `font-display`. Change a token once, it updates everywhere.

Typography: **Playfair Display** (display), **Plus Jakarta Sans** (body),
**Tajawal** (Arabic, auto-swapped in RTL) — loaded via `next/font`.

### Internationalization

- UI copy → `lib/i18n.ts` (`useLanguage().t`)
- Data strings → `Localized` records in `lib/content.ts` (`useLanguage().pick(...)`)
- Toggling locale updates `<html dir/lang>`, which drives the RTL CSS and the
  Arabic font swap. Add a locale by extending `Locale` and the dictionaries.

### Signature animation — Dispatch Network

`components/hero/DispatchNetwork.tsx` renders an ambient canvas of kitchen hub
nodes continuously dispatching order pulses along delivery routes — a living
metaphor for the delivery-first OS. It is DPR-aware, pauses on tab blur,
respects `prefers-reduced-motion`, and cleans up its RAF loop on unmount.

Other motion: staggered hero load, scroll reveals (`Reveal`), an infinite brand
marquee, a `CountUp` dispatch-time stat, and an animated inquiry modal — all
degrade gracefully under reduced-motion.

## Notes

- **Locations:** Jeddah is currently the only operational district. Add more by
  appending to `locations` in `lib/content.ts`.
- Facility/logistics imagery is loaded from Unsplash (whitelisted in
  `next.config.ts`); swap for owned assets before production.
