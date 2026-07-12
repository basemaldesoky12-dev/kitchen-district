"use client";

import Image from "next/image";
import { media, stats } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function Logistics() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-outline-variant/30 bg-surface-container-low px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <Reveal className="flex-1">
            <span className="mb-2 block text-label-md uppercase tracking-wider text-tertiary">
              {t.logistics.eyebrow}
            </span>
            <h2 className="mb-6 font-display text-headline-lg text-on-surface">
              {t.logistics.title}
            </h2>
            <p className="mb-8 text-body-lg text-on-surface-variant">
              {t.logistics.body}
            </p>
            <button className="group inline-flex items-center gap-1 border-b-2 border-primary pb-1 text-label-md text-on-surface transition-colors hover:text-primary">
              {t.logistics.cta}
              <Icon
                name="arrow_forward"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </button>
          </Reveal>

          <Reveal className="flex-1" delay={0.1} y={32}>
            <div className="group relative overflow-hidden rounded-xl border border-outline-variant/20 shadow-lg">
              <div className="relative h-[380px] w-full overflow-hidden md:h-[500px]">
                <Image
                  src={media.logistics}
                  alt="Delivery rider collecting a premium food order"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <div className="flex items-center justify-between rounded-lg bg-surface-container-lowest/90 p-4 backdrop-blur-sm">
                  <div>
                    <p className="text-label-md text-on-surface">
                      {t.logistics.statLabel}
                    </p>
                    <p className="text-title-md font-bold text-primary">
                      <CountUp value={stats.dispatchMinutes} decimals={1} />{" "}
                      {t.logistics.statUnit}
                    </p>
                  </div>
                  <Icon name="bolt" size={32} className="text-tertiary" filled />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
