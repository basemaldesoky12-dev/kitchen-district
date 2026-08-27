# Kitchen District — Design System & Direction

The brand system is "Concrete & Emerald": warm off-white surfaces, near-ink
text, a single emerald accent, and the KD monogram. It evolved from the
brandbook (`Kitchen-District-Brand-System_v2.pdf`, monochrome ink/white) with
one owner decision layered on top: **never pure black-and-white** — the site
must read warm (Concrete) with emerald accents.

## Palette (single source: `@theme` in `src/app/globals.css`)

| Role | Hex | Token / usage |
|---|---|---|
| Background | `#f5f4f1` | `--color-background` — Concrete, site-wide; white cards float on it |
| Cards / lowest surface | `#ffffff` | `--color-surface-container-lowest`, `.bento-card` |
| Surface ramp | `#faf9f7 → #e2e0da` | container-low → highest (footer bg) |
| Text | `#191918` | `--color-on-surface` (near-ink, never #000) |
| Muted text | `#52514c` | `--color-on-surface-variant` |
| **Accent** | `#107a5a` | `--color-primary` — emerald: all CTAs, icons, eyebrows, focus rings, grid lines |
| Accent hover | `#148f69` | `--color-primary-container` |
| Secondary | `#3d6b5c` | sage — check bullets, link hovers |
| Tertiary | `#0b4a37` / `#cdeadd` | deep emerald / tint — "Live" badge, success states |
| Outlines | `#82807a` / `#d9d7d0` | borders usually at `/40` opacity |

Rules:
- Components consume **tokens only** (`bg-primary`, `text-on-surface-variant`…).
  Hardcoded colors exist in exactly four places: `.tile-surface` gradients
  (globals.css), `TileGrid.tsx` ACCENTS array, the hero legibility wash
  (`Hero.tsx`), and the decorative 32px map grids (Expansion / AboutContent).
  Recoloring = update tokens + those four spots, then grep-sweep old hexes.
- Every token NAME is stable — palette changes swap values in place so all
  generated Tailwind utilities keep working.

## Signature motifs (preserve these)

- **Tile grid**: faint emerald 56px grid on the body (`.tile-surface`) +
  animated hero canvas (`TileGrid.tsx`) where tiles glow (emerald/sage/silver)
  like kitchens coming online. The 56px must stay in sync between CSS and
  `TILE` constant.
- **Bento cards**: white, `rounded-xl`, `border-outline-variant/40`, soft
  ink shadow, hover lift (`.bento-card`).
- **Eyebrow pattern**: emerald dot + uppercase tracked label above titles.
- **1px-gap divider grids** for card matrices (WhyUs, About values): cells on
  a tinted container with `gap-px`.
- **Emerald accent segment** on rules (short green bar at one end of a thin
  ink line) — also used in print collateral.

## Typography

- Headings + body: **Plus Jakarta Sans** (`--font-display` = `--font-body`).
  No serif anywhere (Playfair was removed deliberately).
- Arabic/RTL: **Tajawal**, swapped via `[dir="rtl"]` CSS.
- Type scale tokens: `display-lg` 48 / `headline-lg` 32 / `headline-mobile` 28
  / `title-md` 20 / `body-lg` 18 / `body-md` 16 / `label-md` 14 / `caption` 12.

## Logo

- Mark: **bold "Monogram only" KD** from the brandbook — clean solid black,
  no grid texture behind it. Asset: `public/kd-monogram.png` (transparent).
- Lockup (navbar + footer): monogram · thin vertical divider · stacked
  KITCHEN / DISTRICT wordmark (real text, not image). No tagline in the
  lockup. Monogram is sized to match the wordmark height (h-6/h-8 — don't
  let the logo dwarf the text).
- App icon/favicon: dark rounded square with white monogram
  (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`).

## Copy voice (owner-enforced rules)

- **Practical and professional, zero hype.** Banned vibes: "state-of-the-art",
  "culinary ecosystem", "the future of food", "elevating hospitality".
  Say what the thing does: "Launch your food brand in a fully equipped
  commercial kitchen."
- CTAs are concrete: "Book a Kitchen" (primary, opens InquiryModal),
  "Request a Quote", "Contact us".
- **Arabic is meaning-first, never literal translation.** Reference tone:
  natural MSA. Specific rulings already made:
  - Brand in AR copy: «كيتشن ديستريكت»; product names stay Latin
    ("KD Ops", «نظام KD Ops») — no transliteration like «كيه دي أوبس».
  - "aggregators" → «تطبيقات التوصيل» (not «منصات التجميع»).
  - Positioning phrase: «المطابخ السحابية» (cloud kitchens) — NOT
    «العلامات الغذائية» (food brands); hero uses «أطلق مطبخك السحابي».
  - Pricing tiers keep their Latin names in AR too — Starter / Growth /
    Enterprise (owner call, Aug 2026; supersedes the earlier «البداية»), and
    their bullets say «عمليات KD — أساسي/احترافي/للمؤسسات» with Latin
    measurements («٢٥ – ٤٠ م²» → «25 – 40 م²»).
  - Everywhere else, AR figures use Arabic-Indic numerals: footer year
    («© ٢٠٢٦»), contact hours, facility tags, the investor stat band
    («+١ تريليون $», «+٪١٨», «−٪٤٠», «الخليج»), and dynamic counts via
    `formatNumber(value, locale)` in `src/lib/numerals.ts`.
  - "asset-light" → «قليل الاعتماد على الأصول» (not «خفيف الأصول»).
  - Investor CTA is «فريق علاقات المستثمرين»; the IR band heading is
    «تحدّث مع فريقنا.» so the phrase isn't repeated twice in one block.
- The reference site the owner likes (content + structure source for the
  Pricing/FAQ/Contact/About pages): https://cloud-kitchen-sparkle.lovable.app/

## Motion

- Section entrances: `Reveal` (fade + rise, staggered by grid column).
- Navbar: slide-in once; glass panel on scroll. Mobile menu: height auto
  animation, Escape closes, scroll locked while open.
- Everything gates on `useReducedMotion` / `prefers-reduced-motion` — the
  hero grid renders static lit tiles instead.

## Print / brand collateral (outside the repo)

Business cards, email signature, and bilingual letterhead (with C.R.
7040138559 — «مؤسسة القوت الأصيل التجارية» / Al-Qut Al-Aseel Trading Est.)
live on the owner's Desktop as generated PDFs/docx; the brandbook PDF is in
`~/Downloads/Kitchen-District-Brand-System_v2.pdf`. Emails on collateral use
`@kitchendistricts.com` addresses.
