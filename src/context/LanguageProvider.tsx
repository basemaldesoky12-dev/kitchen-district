"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const dir = localeDir[locale];

  // Keep the document root in sync so global CSS (RTL, font swap) applies.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
  }, [locale, dir]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const pick = useCallback((value: Localized) => value[locale], [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir,
      t: dictionary[locale],
      pick,
      toggleLocale,
      setLocale,
    }),
    [locale, dir, pick, toggleLocale],
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
