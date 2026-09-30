# Google Business Profile — setup pack (Jeddah · Al Safa)

Why this matters: the Arabic queries we want — «مطابخ سحابية في جدة» and «مطابخ سحابية» —
show a **map pack above all organic results**, and on 2026-09-30 it held only two listings
(see *Arabic SERP analysis* in [SEO.md](SEO.md)). English organic is already #1 for "cloud
kitchens in jeddah"; Arabic organic will take months of authority, but a verified profile
can reach the map pack in weeks. No Kitchen District listing exists on Google Maps yet
(searched in English and Arabic, 2026-09-30), so this is a new profile, not a claim.

Create at **business.google.com/create** (or Google Maps → *Add your business*). Use a
company Google account — ideally one on `@kitchendistricts.com` (accounts.google.com/signup
→ *Use your existing email*) — **not** a personal Gmail. Ownership of this profile is
ownership of the Maps listing; a personal account makes handover painful later.

## Before you start — things only you can supply

1. **Exact National Address (العنوان الوطني)** of the Al Safa hub: building no., street,
   district, city, postal code. The site only ever says "Al Safa District Hub, Jeddah",
   which is not enough for verification.
2. **Exterior signage** — the "Kitchen District" sign on the building. The profile name
   must match it and verification films it. If signage isn't installed yet, install it first.
3. **Which Google account** will own the profile.
4. **Is North Obhur live?** `content.ts` `locations[]` lists Al Safa only, but the contact
   form offers "North Obhur Branch" as a choice. One profile per *physical, staffed* location
   — do not create a North Obhur profile until it exists and is staffed.
5. The WhatsApp line **+966 56 170 0278** reachable (Google may call or text it), and the
   C.R. certificate (+ Balady license if available) on hand for documentary verification.

## Field-by-field values

Copy these verbatim so the profile matches the site exactly (NAP consistency is a local
ranking factor — see the NAP item in SEO.md P1).

| Field | Value |
|---|---|
| Business name | `Kitchen District` — if the sign also shows Arabic: `Kitchen District - كيتشن ديستريكت` |
| Category | `Shared-use commercial kitchen` (see *Categories*) |
| Phone | `+966 56 170 0278` |
| Website | `https://kitchendistricts.com/ar` (the Arabic canonical; skips the `/` redirect) |
| Address | `<<STREET>>, Al Safa District, Jeddah <<POSTAL>>, Saudi Arabia` — then drag the pin onto the entrance |
| Hours | Sunday–Thursday · 09:00–18:00 (Fri/Sat closed) |
| Location customers can visit? | Yes. Service area: leave empty — this is a storefront, not a service-area business |
| Appointment link | `https://kitchendistricts.com/ar/contact` |

**Name rule — do not break this.** The name field must be the real-world name on the
signage. Not "Kitchen District — Cloud Kitchens Jeddah", and never «مطابخ سحابية».
KitchenUp's profile is literally named «مطابخ سحابية» and currently leads the Jeddah map
pack — that is a guideline violation that gets profiles suspended, and a suspension costs
more than the keyword ever earns. Two unrelated burger restaurants in Jeddah are named
«ديستريكت», so use the full name. The legal entity (C.R. 7040138559 — «مؤسسة القوت الأصيل
التجارية») goes on verification documents, not in the name field.

Hours note: 09:00–18:00 matches `i18n.ts` (`contact.channels.hours`). If tenants have
24/7 facility access, keep these as the *office* hours and add the access window under
*More hours* — but then update the site to say the same thing. The two must never disagree.

## Categories

The **primary category** is the single biggest lever on map-pack ranking. Checked against
the published GBP category list (2026-09-30): there is **no** "Cloud kitchen", "Ghost
kitchen", "Commercial kitchen" or "Kitchen rental" category. The accurate one is:

- **Primary: `Shared-use commercial kitchen`.** Type it in English — categories are
  language-independent, and Google shows the Arabic label to Arabic users.

Add no secondary categories unless one is literally true. An inaccurate one (e.g.
*Restaurant*, which Kitchen Yard and Clan use) pulls the profile into food-ordering
searches and dilutes relevance for prospective tenants. Google matches «مطابخ سحابية»
searches to the profile through the description, services, reviews and the linked website
(`/ar`'s title is «مطابخ سحابية للإيجار في جدة…») — not through the name.

## Description

Max 750 characters, no links, no phone numbers (Google strips them). Written to the
copy-voice rules in `DESIGN.md` (*Copy voice*) — practical, zero hype.

**English** (703 chars):

> Kitchen District rents fully equipped commercial kitchens to delivery-first food brands in
> Jeddah. Each unit comes with extraction, cold and dry storage, utilities, and waste
> handling already in place, so a brand can start cooking without building a kitchen from
> scratch. Our Al Safa hub houses 12 kitchens, with rider access and support for integrating
> with the delivery apps. The KD Ops system handles orders, reporting, and facility
> operations in one place. Terms are flexible — monthly or longer — with pricing based on
> kitchen size and duration. Suitable for new brands testing a concept, restaurants adding
> delivery capacity, and regional brands entering Jeddah. Contact us for a tour and a quote.

**Arabic** (623 chars; meaning-first, per `DESIGN.md`):

> كيتشن ديستريكت توفّر مطابخ سحابية مجهّزة بالكامل للإيجار في جدة، لعلامات الطعام التي تعمل عبر
> تطبيقات التوصيل. كل مطبخ جاهز للتشغيل: شفط ومعالجة هواء، تخزين مبرّد وجاف، مرافق وخدمات،
> وإدارة للنفايات — دون الحاجة لبناء مطبخ من الصفر. مركزنا في حي الصفا يضم ١٢ مطبخاً، مع مدخل
> مخصّص لمندوبي التوصيل ودعم للربط مع تطبيقات التوصيل. ويتيح نظام KD Ops متابعة الطلبات
> والتقارير وتشغيل المنشأة من مكان واحد. المدة مرنة — شهرية أو أطول — والسعر يعتمد على المساحة
> والمدة. مناسب للعلامات الجديدة التي تختبر فكرتها، وللمطاعم القائمة التي تريد توسيع التوصيل،
> وللعلامات الداخلة إلى سوق جدة. تواصل معنا لزيارة المنشأة والحصول على عرض سعر.

GBP holds one description. Use the **Arabic** one — Jeddah searches in Arabic, and Google
offers English users a translation. (There is no separate "profile language" setting.)

## Services

Add as custom services, in Arabic (they are searchable and feed Google's AI answers):
تأجير مطابخ سحابية · مطبخ سحابي مجهّز للإيجار · تخزين مبرّد وتجميد · تخزين جاف ·
الربط مع تطبيقات التوصيل · نظام KD Ops لإدارة الطلبات

## Photos

Photo volume and recency correlate with map-pack performance, and these are what a prospective
tenant actually wants to see. Already in the repo and reusable: `public/facilities/`
`kitchen.jpg`, `storage-cold.jpg`, `storage-dry.jpg`. **Logo:** `src/app/icon.png`
(1024×1024 square — the transparent `public/kd-monogram.png` is 422×293 and gets cropped).

Still to shoot at the facility — aim for 10+ real photos, no stock:

- Exterior with signage (this doubles as verification evidence)
- Entrance / reception
- 3–4 individual kitchen units, lit, clean, equipment visible
- Extraction hood and utility connections
- Cold room and dry store
- Rider pickup / loading area
- Wash-up area, staff facilities
- One wide shot showing the scale of the hub

Set the logo and a cover photo explicitly rather than letting Google pick.

## Verification

Expect **video verification**: Google Maps app on your phone → your business → **Verify** →
**Record video**. A single unedited recording, no cuts, that proves three things in one
continuous take:

1. **Location** — street sign or building number, then pan to the building.
2. **Business** — exterior signage reading "Kitchen District", then walk inside through the
   entrance and show the kitchens and equipment.
3. **Management authority** — you unlocking a staff-only area, the office, or the commercial
   registration certificate on the wall.

Film in landscape, walk slowly, don't stop recording between the three parts. A cut is the
most common rejection reason. Have the C.R. document on hand in case Google asks for
documentary verification instead. Verification typically resolves in days, not hours, and
the profile does not appear in Maps until it clears — so start it now, not after the content
work.

## After it goes live

- [ ] Post the first **Update** in Arabic (a photo + «مطابخ سحابية جاهزة للإيجار في حي الصفا
      بجدة — احجز زيارة») and keep posting roughly monthly — dormant profiles decay.
- [ ] **Ask for reviews** → copy the review link → send it to the first tenants on WhatsApp
      (SEO.md P2) — review count and recency are direct map-pack ranking factors. Never
      incentivize or script them; both are violations. Reply to every review.
- [ ] Q&A no longer exists — Google removed Business Profile Q&A (December 2025) in favour of
      AI answers in Maps ("Ask Maps"), built from the description, services, reviews and
      website. The Arabic FAQ on the site's homepage (added 2026-09-30) covers what tenants
      ask: what a cloud kitchen is, cost, location, licensing, cloud vs central kitchen.
- [ ] Add the other managers: Business Profile settings → People and access.
- [ ] Send the **Maps link** and the exact address as entered — the site's contact page and
      `LocalBusiness` JSON-LD get the identical address (+ `hasMap`), so the site and the
      profile corroborate each other.
- [ ] Re-run the rank checks in SEO.md → *Rank log* two weeks after verification and log the row.

## Don't

- Don't use a virtual office, a co-working mailbox, or the owner's home address. Address
  fraud is the top suspension cause and reinstatement can take weeks.
- Don't create a second profile for the same address (duplicates suppress each other).
- Don't put keywords in the name (see *Name rule*).
- Don't put a tracking URL or the `kitchen-district.vercel.app` host in the website field —
  the apex is canonical (`next.config.ts` redirects everything else to it).
