import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL, languageAlternates, seoPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(seoPages).flatMap(({ path, priority, changeFrequency, lastModified }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
