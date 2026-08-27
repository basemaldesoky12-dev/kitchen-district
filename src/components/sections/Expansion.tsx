"use client";

import { locations } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { formatNumber } from "@/lib/numerals";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Expansion() {
  const { t, pick, locale, localize } = useLanguage();

  return (
    <section id="locations" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px] text-center">
        <Reveal>
          <h2 className="mb-4 font-display text-headline-lg text-on-surface">
            {t.expansion.title}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-body-lg text-on-surface-variant">
            {t.expansion.subtitle}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-1">
          {locations.map((location) => (
            <Reveal key={location.id}>
              <div className="bento-card relative overflow-hidden rounded-xl border-t-4 border-t-tertiary p-8 text-start md:p-10">
                {/* Decorative map grid */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#107a5a 1px, transparent 1px), linear-gradient(90deg, #107a5a 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-display text-headline-lg text-on-surface">
                        {pick(location.city)}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-container px-3 py-1 text-caption font-bold uppercase tracking-wider text-on-tertiary-container">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-on-tertiary-container opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-on-tertiary-container" />
                        </span>
                        {t.status.liveNow}
                      </span>
                    </div>
                    <p className="mb-4 text-body-md text-on-surface-variant">
                      {pick(location.district)}
                    </p>
                    <div className="flex items-center gap-1 text-label-md text-on-surface-variant">
                      <Icon name="storefront" size={18} />
                      {formatNumber(location.kitchens, locale)}{" "}
                      {t.common.kitchensSuffix}
                    </div>
                  </div>

                  <Button
                    as="a"
                    href={localize("/contact")}
                    className="group shrink-0"
                  >
                    {t.hero.primaryCta}
                    <Icon
                      name="arrow_forward"
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
