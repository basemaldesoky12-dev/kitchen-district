"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/lib/content";
import { languageToggleLabel } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

export function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "glass-panel border-outline-variant/30 shadow-sm"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-margin py-6">
        <a
          href="#top"
          className="font-display text-title-md tracking-tight text-primary"
        >
          Kitchen District
        </a>

        <div className="hidden items-center gap-margin md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              {t.nav[link.labelKey]}
            </a>
          ))}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="language" size={18} />
            {languageToggleLabel[locale]}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden px-4 py-2 text-label-md text-primary transition-colors hover:text-secondary lg:flex"
          >
            {t.nav.login}
          </a>
          <Button onClick={openModal} className="group">
            {t.nav.launch}
            <Icon
              name="arrow_forward"
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
            />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
