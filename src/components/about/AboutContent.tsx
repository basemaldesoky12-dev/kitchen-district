"use client";

import { aboutValues } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";

export function AboutContent() {
  const { t, pick } = useLanguage();

  return (
    <main className="px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <PageHeader
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        {/* Mission & vision */}
        <div className="mb-16 grid gap-gutter md:grid-cols-2">
          {(
            [
              { label: t.about.missionTitle, body: t.about.mission },
              { label: t.about.visionTitle, body: t.about.vision },
            ] as const
          ).map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="bento-card flex h-full flex-col rounded-xl border border-outline-variant/40 p-8 md:p-10">
                <span className="mb-4 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {item.label}
                </span>
                <p className="text-title-md font-semibold text-on-surface">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <Reveal className="mb-8">
          <h2 className="font-display text-headline-lg text-on-surface">
            {t.about.valuesTitle}
          </h2>
        </Reveal>
        <div className="mb-16 grid gap-px overflow-hidden rounded-xl border border-outline-variant/40 bg-outline-variant/40 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value, i) => (
            <Reveal
              key={value.icon}
              delay={(i % 4) * 0.08}
              className="bg-surface-container-lowest"
            >
              <div className="flex h-full flex-col p-8 md:p-10">
                <Icon name={value.icon} size={28} className="mb-8 text-primary" />
                <h3 className="mb-2 text-title-md font-semibold text-on-surface">
                  {pick(value.title)}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {pick(value.body)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Future expansion */}
        <Reveal>
          <div className="bento-card relative overflow-hidden rounded-xl border border-outline-variant/40 p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {t.about.futureTitle}
                </span>
                <p className="max-w-xl text-title-md font-semibold text-on-surface">
                  {t.about.future}
                </p>
              </div>
              <Button as="a" href="/contact" className="group shrink-0">
                {t.contact.title}
                <Icon
                  name="arrow_forward"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
