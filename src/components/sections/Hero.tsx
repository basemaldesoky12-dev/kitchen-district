"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { KitchenHeat } from "@/components/hero/KitchenHeat";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { t } = useLanguage();
  const { openModal } = useModal();
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <header
      id="top"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-margin py-16"
    >
      {/* Ambient "kitchen heat" animation — embers rising off a burner glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <KitchenHeat className="h-full w-full" />
      </div>

      {/* Legibility wash: clears the centre for text, lets embers glow at the
          edges and base of the hero. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 42%, rgba(255,248,246,0.85) 0%, rgba(255,248,246,0.55) 45%, rgba(255,248,246,0) 100%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-[1024px] flex-col items-center text-center"
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-1 rounded-full border border-outline-variant/30 bg-surface-container-high/80 px-4 py-2 text-label-md text-on-surface-variant shadow-sm backdrop-blur-sm"
        >
          <Icon name="verified" size={16} className="text-secondary" filled />
          {t.hero.badge}
        </motion.div>

        <motion.h1
          variants={item}
          className="mb-6 max-w-4xl font-display text-headline-mobile leading-tight tracking-tight text-on-surface md:text-display-lg"
        >
          {t.hero.titleLead}{" "}
          <span className="italic text-primary">{t.hero.titleAccent}</span>{" "}
          {t.hero.titleTail}
        </motion.h1>

        <motion.p
          variants={item}
          className="mb-10 max-w-2xl text-body-lg text-on-surface-variant"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="flex w-full flex-col items-center justify-center gap-6 sm:w-auto sm:flex-row"
        >
          <Button
            onClick={openModal}
            size="lg"
            fullWidth
            className="group sm:w-auto"
          >
            {t.hero.primaryCta}
            <Icon
              name="restaurant"
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            />
          </Button>
          <Button
            as="a"
            href="#facilities"
            variant="outline"
            size="lg"
            fullWidth
            className="sm:w-auto"
          >
            {t.hero.secondaryCta}
          </Button>
        </motion.div>
      </motion.div>
    </header>
  );
}
