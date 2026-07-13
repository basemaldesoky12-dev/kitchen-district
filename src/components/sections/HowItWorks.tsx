"use client";

import { howItWorks } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function HowItWorks() {
  const { t, pick } = useLanguage();

  return (
    <section id="how" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-10 max-w-2xl">
          <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t.howItWorks.eyebrow}
          </span>
          <h2 className="mb-4 font-display text-headline-lg text-on-surface md:text-display-lg">
            {t.howItWorks.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            {t.howItWorks.subtitle}
          </p>
        </Reveal>

        {/* Bordered three-step grid over the tiled surface */}
        <div className="grid overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest/60 backdrop-blur-sm md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 0.1}
              className={
                i > 0
                  ? "border-t border-outline-variant/40 md:border-l md:border-t-0"
                  : ""
              }
            >
              <div className="flex h-full flex-col p-8 md:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-title-md text-outline">
                    {step.index}
                  </span>
                  <Icon name={step.icon} size={28} className="text-primary" />
                </div>
                <h3 className="mb-3 font-display text-headline-lg text-on-surface">
                  {pick(step.title)}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {pick(step.body)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
