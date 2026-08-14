import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { dictionary, locales, localeDir, type Locale } from "@/lib/i18n";
import { locations } from "@/lib/content";
import { SITE_URL, pageMetadata } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Home metadata doubles as the segment-wide default; pages override per-route. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  return pageMetadata(locale as Locale, "home");
}

/** Organization + Jeddah facility entities for Google's knowledge graph. */
function organizationSchema(locale: Locale) {
  const meta = dictionary[locale].meta;
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const jeddah = locations[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: meta.siteName,
        alternateName: dictionary[otherLocale].meta.siteName,
        url: SITE_URL,
        logo: `${SITE_URL}/kd-monogram.png`,
        email: "support@kitchendistricts.com",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#jeddah`,
        name: meta.siteName,
        description: meta.home.description,
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/facilities/kitchen.jpg`,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: jeddah.district[locale],
          addressLocality: jeddah.city[locale],
          addressCountry: "SA",
        },
        areaServed: jeddah.city[locale],
        openingHours: "Su-Th 09:00-18:00",
      },
    ],
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const lang = locale as Locale;

  return (
    <html
      lang={lang}
      dir={localeDir[lang]}
      className={`${jakarta.variable} ${tajawal.variable}`}
    >
      <head>
        {/* Material Symbols icon font. `display=block` keeps ligatures from
            flashing their text fallback before the font loads. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="tile-surface">
        <JsonLd data={organizationSchema(lang)} />
        <Providers locale={lang}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
