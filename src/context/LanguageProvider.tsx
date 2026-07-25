"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  dictionary,
  localeDir,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import type { Localized } from "@/lib/content";

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** Current locale's dictionary. */
  t: Dictionary;
  /** Resolve a localized data string to the current locale. */
  pick: (value: Localized) => string;
  /** Prefix an internal href with the current locale ("/pricing" -> "/ar/pricing"). */
  localize: (href: string) => string;
  /** Navigate to the same path in the other locale. */
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const dir = localeDir[locale];
  const router = useRouter();
  const pathname = usePathname();

  // Keep the document root in sync so global CSS (RTL, font swap) applies
  // immediately on client-side locale navigation.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
  }, [locale, dir]);

  const localize = useCallback(
    (href: string) => {
      if (href === "/") return `/${locale}`;
      if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
      return `/${locale}${href}`;
    },
    [locale],
  );

  const toggleLocale = useCallback(() => {
    const other: Locale = locale === "en" ? "ar" : "en";
    const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
    router.push(`/${other}${rest}`);
  }, [locale, pathname, router]);

  const pick = useCallback((value: Localized) => value[locale], [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir,
      t: dictionary[locale],
      pick,
      localize,
      toggleLocale,
    }),
    [locale, dir, pick, localize, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
