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

## Arabic SERP analysis — 2026-09-30

Two months after launch, English works and Arabic doesn't:

- EN: `/en` is **#1** for "cloud kitchens in jeddah", #4 "cloud kitchen jeddah rent",
  #13 "cloud kitchens in ksa", #1 for the brand.
- AR: `/ar` is #1 for the brand «كيتشن ديستريكت» but absent from the top 30–40 for
  every non-brand Arabic query — including its own exact title phrase
  («مطابخ سحابية للإيجار في جدة») and `/ar/pricing`'s («أسعار المطابخ السحابية في جدة»).
- **Not a technical problem.** GSC URL Inspection on `/ar`: indexed, crawled
  2026-09-29, Google-selected canonical = `/ar` (not `/en`), fetch + indexing allowed.
  The Arabic text is clean Unicode (no presentation forms or hidden characters).
- Why the asymmetry: the English SERP has ~5 relevant pages, so an exact-match title
  wins even on a new domain. The Arabic SERP has dozens — operators plus Instagram,
  TikTok, X and Haraj posts on huge-authority domains — so a new domain with no
  links, no GBP and no reviews sits past page 3–4.

What Google shows for the Arabic queries (`gl=sa&hl=ar`):

| Query | SERP features | Organic leaders |
|---|---|---|
| مطابخ سحابية في جدة | **Map pack (2 listings)** · TikTok video carousel | Kitchen Yard (#1), Cul.in Instagram, atyabtabkha, Haraj, Clan, Virtual Kitchens, Virtual Restaurant, sabbar.com |
| مطابخ سحابية في السعودية | none | Clan (#1), sabbar.com listicle, Virtual Restaurant, Cul.in Instagram, Kitchen Yard, qoot-sa study |
| مطابخ سحابية | **Map pack** · AI Overview · People also ask | Clan (#1), an X post, Virtual Restaurant, Oracle, Kitchen Yard, Virtual Kitchens, iHORECA |

- The Jeddah map pack is thin: KitchenUp (profile literally named «مطابخ سحابية»,
  3.8★ / 24 reviews — a name-guideline violation, don't copy it) and
  ملالة للمطابح السحابية (a restaurant). Kitchen Yard and Clan are categorized as
  *Restaurant*. A verified, correctly categorized Kitchen District profile is the
  single biggest Arabic lever → [GBP.md](GBP.md).
- The AI Overview cites **Clan's published price** ("from 3,500 SAR"). People also
  ask: ماذا يعني المطبخ السحابي؟ · ما هي شروط المطابخ السحابية؟ · كم قيمة إيجار مطبخ سحابي؟
- Related searches (how Saudis phrase it): مطابخ سحابية للايجار · مطبخ سحابي جاهز ·
  مطبخ سحابي للإيجار جدة · مطابخ سحابية جدة · مطابخ سحابية الرياض.
- Competitors' on-page is **not** stronger than ours (Kitchen Yard ≈ 470 Arabic
  words vs our 406, same keyword counts). What they had that we lacked: an address,
  prices, descriptive Arabic headings, question-style content, and years of links
  and reviews.

## Action plan

Owner legend: **[code]** = shippable in this repo · **[you]** = needs the account owner
(Google accounts, GoDaddy DNS, Vercel dashboard).

### P0 — get indexed (week 1; prerequisite for any ranking)

- [x] **[you]** Verify `kitchendistricts.com` in **Google Search Console** (Domain
  property; TXT record at GoDaddy). *(2026-09-30 — owned by a personal Google
  account; add the company account as an owner under Settings → Users and
  permissions. Never delete the `google-site-verification` TXT record.)*
- [x] **[code]** Add `app/robots.ts` (allow all, point at sitemap). *(2026-07-31)*
- [x] **[code]** Add `app/sitemap.ts` covering every `{locale}×{page}` URL with
  hreflang entries. *(2026-07-31)*
- [x] **[you]** Submit the sitemap in GSC (`https://kitchendistricts.com/sitemap.xml`
  — a Domain property needs the full URL). *(2026-09-30)*
- [ ] **[you]** *URL Inspection → Request indexing* for `/ar/contact`, `/ar/faq`,
  `/en/faq`, `/en/about`, `/en/contact` (some were "URL is unknown to Google" on
  2026-09-30). The first attempt failed with a new-property "Something went wrong"
  error — retry. After the Arabic content deploy, also re-request `/ar` and `/ar/faq`.
- [x] **[code]** Set `metadataBase` + per-page `alternates.canonical` +
  `alternates.languages` (`en`, `ar`, `x-default`) via `src/lib/seo.ts`. *(2026-07-31)*
- [x] **[code]** Host consolidation: `next.config.ts` now 308-redirects
  `www.kitchendistricts.com` and `kitchen-district.vercel.app` to the apex.
  *(2026-07-31 — Vercel-dashboard primary-domain setting no longer required, but
  setting it too is harmless belt-and-braces.)*
- [x] **[code]** Make `/` → `/ar` redirect permanent (308) in `proxy.ts`. *(2026-07-31)*
- [ ] **[you]** Create/verify a **Google Business Profile** for the Jeddah facility —
  field-by-field values, description copy, category priority, photo list, and the
  video-verification script are in **[GBP.md](GBP.md)**.
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
- [x] **[code]** Arabic on-page targeting, from the Arabic SERP analysis above: AR home
  title «مطابخ سحابية للإيجار في جدة، السعودية»; H1 now includes «في جدة»;
  badge, subtitle and meta description carry facts (١٢ مطبخاً، حي الصفا، عقود مرنة،
  المرافق مشمولة); descriptive AR headings for facilities and locations. EN copy
  untouched — it already ranks #1. *(2026-09-30)*
- [x] **[code]** Homepage FAQ section + 5 new FAQ items written against Google's
  "People also ask" for «مطابخ سحابية» (what it is, rent cost, location, licensing,
  cloud vs central kitchen). **Bug fixed:** the accordion only mounted an answer
  when it was opened, so Google never saw any FAQ answer text (only the JSON-LD);
  answers now stay in the HTML, collapsed, and questions are headings. *(2026-09-30)*
- [x] **[code]** JSON-LD: `WebSite` entity (site name «كيتشن ديستريكت» / "Kitchen
  District"), `telephone`, Instagram `sameAs`, `City` areaServed; the footer links
  to Instagram. *(2026-09-30)*
- [x] **[code]** Icon-font ligature names («rocket_launch», «local_pizza»… 43 English
  words on `/ar`) no longer render as page text; sitemap `lastmod` is a real
  per-page date instead of the build time. *(2026-09-30)*
- [ ] **[you]** NAP consistency (name/address/phone identical on site + GBP) is a
  local-ranking factor. The phone is real now (+966 56 170 0278), but the site still
  has no street address — send the exact address as entered in GBP and it goes into
  the contact page and the `LocalBusiness` schema.

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
- [ ] **[code]** Arabic guide page targeting «مطابخ سحابية في السعودية» (no map pack;
  page 1 is guides, listicles and operators): cost, licensing, how to choose, and a
  cloud-vs-traditional-restaurant comparison table (the format Google's AI Overview
  uses). Needs owner facts first.
- [ ] **[you]** Fast Arabic SERP presence while the domain builds authority: a
  **Haraj** listing and a **msaha.sa** listing (both rank on page 1 for
  «مطابخ سحابية في جدة» / «مطبخ سحابي للإيجار جدة»); Instagram bio link →
  `https://kitchendistricts.com/ar`; ask **sabbar.com** to add Kitchen District to
  «أشهر المطابخ السحابية والشركات في السعودية» (#2 for the KSA query).
- [ ] **[you]** Publish a "starting from X SAR/month" price when ready — the AI
  Overview for «مطابخ سحابية» quotes Clan's "from 3,500 SAR", and
  «كم قيمة إيجار مطبخ سحابي؟» is a People-also-ask question.

## Rank log

Check protocol: incognito window, `google.com/search?q=<query>&gl=sa&pws=0` with
`&hl=en` for English queries and **`&hl=ar` for Arabic ones** (approximates a Saudi
searcher, no personalization); record the organic position of any
`kitchendistricts.com` URL. "—" = not found in the pages checked (noted in brackets).
Searching from outside KSA without `gl=sa` shows another country's results. GSC is
verified since 2026-09-30 — once it has data, prefer its *Performance → Average
position* (real KSA impressions) over manual checks.

English (`hl=en`):

| Date | Indexed (`site:`) | cloud kitchens in jeddah | cloud kitchen jeddah rent | cloud kitchens in ksa | kitchen district jeddah (brand) |
|------------|-----------------|-----|-----|-----|-----|
| 2026-07-31 | 0 (not indexed) | — | n/c | — | — |
| 2026-09-30 | ~7 of 12 | **1** | 4 | 13 | **1** |

Arabic (`hl=ar`):

| Date | مطابخ سحابية في جدة | مطابخ سحابية في السعودية | مطابخ سحابية | مطابخ سحابية للإيجار في جدة | كيتشن ديستريكت (brand) |
|------------|-----|-----|-----|-----|-----|
| 2026-07-31 | — | n/c | n/c | n/c | — |
| 2026-09-30 | — (top 40) | — (top 30) | — (top 30) | — (page 1) | **1** |

n/c = not checked. The 2026-09-30 Arabic row predates the Arabic content changes
logged in P1 (deployed after this check).

Milestones to expect: indexed within days of P0 · brand query #1 within ~1–2 weeks of
indexing · Jeddah queries climbing within 4–8 weeks of P1+P2 · page 1 for "cloud
kitchen jeddah" realistic in ~2–4 months with GBP + content + a few links · "cloud
kitchens ksa" is the long game (6–12 mo+, authority-dependent).
