"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageProvider";
import { ModalProvider } from "@/context/ModalProvider";
import { InquiryModal } from "@/components/modal/InquiryModal";

/**
 * App-wide client providers. The inquiry modal lives here so any CTA in the
 * tree can open it through `useModal()`.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider initialLocale="ar">
      <ModalProvider>
        {children}
        <InquiryModal />
      </ModalProvider>
    </LanguageProvider>
  );
}
