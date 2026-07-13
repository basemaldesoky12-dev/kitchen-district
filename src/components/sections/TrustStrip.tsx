"use client";

import { concepts } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";

export function TrustStrip() {
  const { t, pick } = useLanguage();
  // Duplicate the set so the -50% marquee loop is seamless.
  const loop = [...concepts, ...concepts];

  return (
    <section className="overflow-hidden border-y border-outline-variant/30 py-10">
      <div className="mx-auto max-w-[1440px] px-margin">
        <p className="mb-6 text-center text-caption uppercase tracking-wider text-on-surface-variant">
          {t.trust.eyebrow}
        </p>
      </div>

      <div className="marquee-track marquee-mask relative flex w-full overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pe-12">
          {loop.map((concept, i) => (
            <div
              key={`${concept.icon}-${i}`}
              className="flex shrink-0 items-center gap-3 text-title-md text-on-surface-variant opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              <Icon name={concept.icon} size={28} className="text-primary" />
              <span className="font-display">{pick(concept.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
