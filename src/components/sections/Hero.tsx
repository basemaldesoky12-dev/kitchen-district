"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { TileGrid } from "@/components/hero/TileGrid";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { t } = useLanguage();
  const { openModal } = useModal();
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
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
      {/* Animated cloud-kitchen tile grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <TileGrid className="h-full w-full" />
      </div>

      {/* Legibility wash so centered text stays crisp over the animation */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(245,244,241,0.88) 0%, rgba(245,244,241,0.55) 55%, rgba(245,244,241,0) 100%)",
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
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest/70 px-4 py-2 text-label-md text-on-surface-variant shadow-sm backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
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
          className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
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
