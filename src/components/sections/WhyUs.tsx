"use client";

import { benefits } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  const { t, pick } = useLanguage();

  return (
    <section id="why" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-10 max-w-2xl">
          <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t.whyUs.eyebrow}
          </span>
          <h2 className="mb-4 font-display text-headline-lg text-on-surface md:text-display-lg">
            {t.whyUs.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            {t.whyUs.subtitle}
          </p>
        </Reveal>

        {/* 1px gaps over a tinted container render clean dividers at every
            breakpoint without per-cell border math. */}
        <div className="grid gap-px overflow-hidden rounded-xl border border-outline-variant/40 bg-outline-variant/40 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal
              key={benefit.icon}
              delay={(i % 4) * 0.08}
              className="bg-surface-container-lowest"
            >
              <div className="flex h-full flex-col p-8 md:p-10">
                <Icon
                  name={benefit.icon}
                  size={28}
                  className="mb-8 text-primary"
                />
                <h3 className="mb-2 text-title-md font-semibold text-on-surface">
                  {pick(benefit.title)}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {pick(benefit.body)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
