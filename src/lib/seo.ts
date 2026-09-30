import type { Metadata } from "next";
import { dictionary, type Locale } from "./i18n";

/** Canonical production origin — every absolute URL Google sees derives from this. */
export const SITE_URL = "https://kitchendistricts.com";

export type MetaPage = Exclude<keyof (typeof dictionary)["en"]["meta"], "siteName">;

/**
 * Route + sitemap hints per indexable page. Paths are locale-relative.
 * `lastModified` is the date the page's content last changed — bump it with
 * content edits. (A build-time date on every URL teaches Google to ignore it.)
 */
export const seoPages: Record<
  MetaPage,
  {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
    lastModified: string;
  }
> = {
  home: { path: "", priority: 1, changeFrequency: "weekly", lastModified: "2026-09-30" },
  pricing: { path: "/pricing", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-28" },
  about: { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-15" },
  faq: { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-09-30" },
  contact: { path: "/contact", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-28" },
  investors: { path: "/investors", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-08-28" },
};

/** hreflang set for one path; x-default points at the site default locale (ar). */
export function languageAlternates(path: string) {
  return {
    en: `${SITE_URL}/en${path}`,
    ar: `${SITE_URL}/ar${path}`,
    "x-default": `${SITE_URL}/ar${path}`,
  };
}

/**
 * Localized metadata for one page: title/description in the page's language,
 * self-referencing canonical, hreflang alternates, and localized Open Graph.
 * The og:image itself comes from the `[locale]/opengraph-image.tsx` convention.
 */
export function pageMetadata(locale: Locale, page: MetaPage): Metadata {
  const meta = dictionary[locale].meta[page];
  const { path } = seoPages[page];
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: dictionary[locale].meta.siteName,
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
