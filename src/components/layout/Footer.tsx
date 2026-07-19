"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t.footer.privacy, href: "#" },
    { label: t.footer.terms, href: "#" },
    { label: t.footer.investors, href: "/investors" },
    { label: t.footer.contact, href: "#" },
  ];

  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-highest text-on-surface">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-gutter px-margin py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Image
            src="/logo.png"
            alt="Kitchen District"
            width={83}
            height={80}
            className="mb-4 h-20 w-auto"
          />
          <p className="text-caption text-on-surface-variant">
            {t.footer.tagline}
          </p>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-3 md:flex-row md:gap-16">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-label-md text-on-surface-variant underline decoration-secondary underline-offset-4 transition-colors hover:text-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] border-t border-outline-variant/20 px-margin pb-8 pt-4 text-center md:text-start">
        <p className="text-caption text-on-surface-variant">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
