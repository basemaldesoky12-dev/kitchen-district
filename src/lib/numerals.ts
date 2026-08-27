import type { Locale } from "./i18n";

const ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Render a figure in the numeral system the reader expects:
 * Arabic-Indic digits in Arabic, Western digits in English.
 * (Static copy carries its own digits via `Localized`; this is for dynamic values.)
 */
export function formatNumber(value: number | string, locale: Locale): string {
  const digits = String(value);
  return locale === "ar"
    ? digits.replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)])
    : digits;
}
