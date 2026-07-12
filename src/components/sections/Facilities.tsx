"use client";

import Image from "next/image";
import { facilityHighlights, media } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Facilities() {
  const { t, pick } = useLanguage();

  return (
    <section
      id="facilities"
      className="scroll-mt-24 bg-surface-container-lowest px-margin py-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <Reveal className="order-2 flex-1 md:order-1" y={32}>
            <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-outline-variant/20 shadow-lg md:h-[600px]">
              <Image
                src={media.facilities}
                alt="Culinary team collaborating in a modern professional kitchen"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="order-1 flex-1 md:order-2" delay={0.1}>
            <span className="mb-2 block text-label-md uppercase tracking-wider text-secondary">
              {t.facilities.eyebrow}
            </span>
            <h2 className="mb-6 font-display text-headline-lg text-on-surface">
              {t.facilities.title}
            </h2>
            <p className="mb-8 text-body-lg text-on-surface-variant">
              {t.facilities.body}
            </p>
            <ul className="space-y-6">
              {facilityHighlights.map((highlight) => (
                <li key={highlight.icon} className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-surface-container-high p-2">
                    <Icon name={highlight.icon} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-title-md font-semibold text-on-surface">
                      {pick(highlight.title)}
                    </h4>
                    <p className="text-body-md text-on-surface-variant">
                      {pick(highlight.body)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
