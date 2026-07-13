"use client";

import Image from "next/image";
import { facilityCards } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Facilities() {
  const { t, pick } = useLanguage();

  return (
    <section id="facilities" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t.facilities.eyebrow}
            </span>
            <h2 className="font-display text-headline-lg text-on-surface md:text-display-lg">
              {t.facilities.title}
            </h2>
          </div>
          <p className="max-w-md text-body-lg text-on-surface-variant">
            {t.facilities.subtitle}
          </p>
        </Reveal>

        <div className="grid gap-gutter md:grid-cols-3">
          {facilityCards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-outline-variant/30 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={card.image}
                    alt={pick(card.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent" />
                </div>

                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-caption uppercase tracking-wider text-inverse-on-surface/80">
                      {pick(card.tag)}
                    </p>
                    <h3 className="font-display text-title-md text-inverse-on-surface">
                      {pick(card.title)}
                    </h3>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/90 text-on-surface transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon name="arrow_outward" size={18} className="rtl:rotate-90" />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
