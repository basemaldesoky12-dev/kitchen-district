"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks } from "@/lib/content";
import { languageToggleLabel } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

export function Navbar() {
  const { t, locale, toggleLocale, localize } = useLanguage();
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and lock scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled || menuOpen
          ? "glass-panel border-outline-variant/30 shadow-sm"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5 sm:px-margin sm:py-6">
        <Link
          href={localize("/")}
          aria-label="Kitchen District"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/kd-monogram.png"
            alt=""
            width={63}
            height={44}
            priority
            className="h-6 w-auto sm:h-8"
          />
          {/* Brandbook "Horizontal light" lockup: divider + stacked wordmark */}
          <span
            aria-hidden
            className="h-6 w-px shrink-0 bg-on-surface/70 sm:h-8"
          />
          <span className="flex flex-col">
            <span className="whitespace-nowrap font-display text-[11px] font-extrabold uppercase leading-[1.1] tracking-tight text-on-surface sm:text-label-md">
              Kitchen
            </span>
            <span className="whitespace-nowrap font-display text-[11px] font-extrabold uppercase leading-[1.1] tracking-tight text-on-surface sm:text-label-md">
              District
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={localize(link.href)}
              className="text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              {t.nav[link.labelKey]}
            </Link>
          ))}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="language" size={18} />
            {languageToggleLabel[locale]}
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button onClick={openModal} className="group">
            {t.nav.launch}
            <Icon
              name="arrow_forward"
              size={18}
              className="hidden transition-transform duration-300 group-hover:translate-x-1 sm:inline-block rtl:group-hover:-translate-x-1 rtl:rotate-180"
            />
          </Button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded text-on-surface transition-colors hover:text-primary sm:h-11 sm:w-11 lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-outline-variant/30 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-margin py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={localize(link.href)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-2 py-3 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
                >
                  {t.nav[link.labelKey]}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLocale();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded px-2 py-3 text-start text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
              >
                <Icon name="language" size={18} />
                {languageToggleLabel[locale]}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
