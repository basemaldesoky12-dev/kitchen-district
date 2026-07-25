"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { LanguageProvider } from "@/context/LanguageProvider";
import { ModalProvider } from "@/context/ModalProvider";
import { InquiryModal } from "@/components/modal/InquiryModal";

/**
 * App-wide client providers. The inquiry modal lives here so any CTA in the
 * tree can open it through `useModal()`.
 */
export function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <LanguageProvider locale={locale}>
      <ModalProvider>
        {children}
        <InquiryModal />
      </ModalProvider>
    </LanguageProvider>
  );
}
