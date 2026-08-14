# SEO — baseline, action plan, and rank tracking

How to use this doc: work through the checklists top to bottom (P0 first), check items
off as they ship, and append a row to the **Rank log** every ~2 weeks. Baseline was
captured on **2026-07-31** so improvement is always measured against a known start.

## Baseline snapshot — 2026-07-31

**Google rank for target queries: none.** `site:kitchendistricts.com` returns zero
results — the domain (live since 2026-07-27) is **not in Google's index yet**. This is
expected for a 4-day-old domain with no sitemap and no Search Console; it is the first
thing to fix, not a quality verdict.

Technical state at baseline:

- ❌ No `robots.txt` (404) and no `sitemap.xml` (404).
- ❌ Not registered in Google Search Console (or Bing Webmaster Tools).
- ❌ No `metadataBase` / canonical URLs, no `hreflang` alternates for `/en` ↔ `/ar`.
- ❌ Same site served on **3 hosts** with no redirects between them:
  `kitchendistricts.com`, `www.kitchendistricts.com`, `kitchen-district.vercel.app`
  (duplicate content; splits ranking signals).
- ❌ Identical **English** title/description on every locale — Arabic pages carry
  English metadata; inner-page metadata is not localized either.
- ❌ No structured data (no `Organization` / `LocalBusiness` / `FAQPage` JSON-LD).
- ❌ No Open Graph / Twitter image (`og:image` missing, `twitter:card` = bare summary).
- ❌ No Google Business Profile → invisible in Maps / the local "map pack".
- ⚠️ `/` → `/ar` redirect is **307 (temporary)**; should be 308 (permanent).
- ⚠️ Homepage H1 says "commercial kitchen"; "cloud kitchen" only in badge/subtitle.
- ✅ Homepage title targets the right phrase: "Cloud Kitchen Infrastructure in Jeddah".
- ✅ Fully bilingual EN/AR content, server-rendered (Google sees full HTML).
- ✅ Real `<h1>` on every page; facility images have alt text.

Competitive landscape at baseline (query: *cloud kitchens in ksa / jeddah*):

- **KitchenPark** (`kitchenpark.com`, CloudKitchens®/Travis Kalanick's KSA brand) —
  user-reported #1 in KSA. Moat: huge domain authority + one indexed page per
  neighborhood (`/en/locations/riyadh/sweidi/`, `/olaya/`, `/khaleej/`, `/wadi/`,
  `/malga/`, `/jarir/`…). **Gap: their indexed KSA location pages are Riyadh-only —
  no Jeddah neighborhood pages found.**
- Other rankers: guide/blog content (analytix.sa, mkayn.com, aviaanaccounting.com,
  bontech.sa), news (Arab News, verdictfoodservice), operators Kitopi + Cul.in.
- Implication: "cloud kitchen **Jeddah**" + Arabic + long-tail rental/pricing queries
  are winnable; "cloud kitchens KSA" head term is a long (6–12 mo+) authority fight.

## Action plan

Owner legend: **[code]** = shippable in this repo · **[you]** = needs the account owner
(Google accounts, GoDaddy DNS, Vercel dashboard).

### P0 — get indexed (week 1; prerequisite for any ranking)

- [ ] **[you]** Verify `kitchendistricts.com` in **Google Search Console** (Domain
  property; TXT record at GoDaddy — same flow as the Brevo DNS records).
- [x] **[code]** Add `app/robots.ts` (allow all, point at sitemap). *(2026-07-31)*
- [x] **[code]** Add `app/sitemap.ts` covering every `{locale}×{page}` URL with
  hreflang entries. *(2026-07-31)*
- [ ] **[you]** Submit the sitemap in GSC + use *URL Inspection → Request indexing*
  on `/ar` and `/en`.
- [x] **[code]** Set `metadataBase` + per-page `alternates.canonical` +
  `alternates.languages` (`en`, `ar`, `x-default`) via `src/lib/seo.ts`. *(2026-07-31)*
- [x] **[code]** Host consolidation: `next.config.ts` now 308-redirects
  `www.kitchendistricts.com` and `kitchen-district.vercel.app` to the apex.
  *(2026-07-31 — Vercel-dashboard primary-domain setting no longer required, but
  setting it too is harmless belt-and-braces.)*
- [x] **[code]** Make `/` → `/ar` redirect permanent (308) in `proxy.ts`. *(2026-07-31)*
- [ ] **[you]** Create/verify a **Google Business Profile** for the Jeddah facility
  (category: "Commercial kitchen"/"Food production"; both languages; photos).
- [ ] **[you]** Add site to **Bing Webmaster Tools** (one-click import from GSC).

### P1 — rank-ready pages (weeks 1–2)

- [x] **[code]** Localize all metadata: `generateMetadata` per page via
  `dictionary.{en,ar}.meta` — AR home title targets "مطابخ سحابية للإيجار في جدة".
  *(2026-07-31)*
- [x] **[code]** JSON-LD: `Organization` + `LocalBusiness` site-wide (layout);
  `FAQPage` schema on `/faq`. Phone deliberately omitted until real numbers land.
  *(2026-07-31)*
- [x] **[code]** Add `opengraph-image` (1200×630, generated from brand tokens +
  monogram) + `twitter:card: summary_large_image`. *(2026-07-31)*
- [x] **[code]** Homepage EN H1 now ends "…fully equipped cloud kitchen." (AR H1
  already said "أطلق مطبخك السحابي"). *(2026-07-31)*
- [ ] **[you]** Replace placeholder contact details (`+966 xx`) — NAP consistency
  (name/address/phone identical on site + GBP) is a local-ranking factor.

### P2 — content & authority (weeks 2+, ongoing; this is what actually wins page 1)

- [ ] **[code]** Dedicated location page per Jeddah district/neighborhood as
  facilities come online (mirror KitchenPark's playbook before they do Jeddah).
- [ ] **[code]** Bilingual guide content targeting long-tail queries: "cloud kitchen
  license in Saudi Arabia", "cloud kitchen cost/for rent in Jeddah",
  "مطبخ سحابي للإيجار في جدة", "رخصة مطبخ سحابي" — 1–2 solid pieces/month.
- [ ] **[you]** Backlinks: KSA business directories, Vision-2030/F&B press
  (Destination KSA, Arab News corporate), delivery-platform partner pages
  (Jahez/HungerStation/Keeta), supplier/partner sites.
- [ ] **[you]** Collect Google reviews from first tenants (map-pack ranking factor).

## Rank log

Check protocol: incognito window, `google.com/search?q=<query>&gl=sa&hl=en&pws=0`
(approximates KSA, no personalization), record position of any `kitchendistricts.com`
URL in organic results; "—" = not in top 50. Once GSC has data, prefer its
*Performance → Average position* (real KSA impressions) over manual checks.

| Date | Indexed pages (`site:`) | cloud kitchens in ksa | cloud kitchens in jeddah | cloud kitchen jeddah (AR: مطابخ سحابية جدة) | kitchen district jeddah (brand) |
|------------|--------------------------|-----------------------|--------------------------|---------------------------------------------|---------------------------------|
| 2026-07-31 | 0 (not indexed) | — | — | — | — |

Milestones to expect: indexed within days of P0 · brand query #1 within ~1–2 weeks of
indexing · Jeddah queries climbing within 4–8 weeks of P1+P2 · page 1 for "cloud
kitchen jeddah" realistic in ~2–4 months with GBP + content + a few links · "cloud
kitchens ksa" is the long game (6–12 mo+, authority-dependent).
