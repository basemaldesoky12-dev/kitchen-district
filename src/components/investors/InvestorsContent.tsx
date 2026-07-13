"use client";

import Image from "next/image";
import Link from "next/link";
import { investorStats, investorThesis, media } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function InvestorsContent() {
  const { t, pick } = useLanguage();
  const { openModal } = useModal();

  return (
    <main>
      {/* Hero */}
      <section className="px-margin pb-12 pt-12 md:pt-16">
        <div className="mx-auto max-w-[1440px]">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="arrow_back" size={18} className="rtl:rotate-180" />
            {t.investors.backHome}
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t.investors.eyebrow}
              </span>
              <h1 className="mb-6 max-w-xl font-display text-headline-mobile leading-tight text-on-surface md:text-display-lg">
                {t.investors.title}
              </h1>
              <p className="mb-8 max-w-lg text-body-lg text-on-surface-variant">
                {t.investors.body}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button onClick={openModal}>{t.investors.ctaSecondary}</Button>
                <Button as="a" href="#thesis" variant="outline">
                  {t.investors.thesisEyebrow}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-xl border border-outline-variant/30 shadow-lg">
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src={media.investors}
                    alt="Kitchen District facility floor"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stat band */}
          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest/70 backdrop-blur-sm md:grid-cols-4">
              {investorStats.map((stat, i) => (
                <div
                  key={stat.value}
                  className={`p-6 md:p-8 ${
                    i > 0 ? "border-t border-outline-variant/40 md:border-l md:border-t-0" : ""
                  }`}
                >
                  <p className="font-display text-headline-lg text-on-surface">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-caption uppercase tracking-wider text-on-surface-variant">
                    {pick(stat.label)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Thesis */}
      <section id="thesis" className="scroll-mt-24 px-margin py-16">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-10 max-w-2xl">
            <span className="mb-3 block text-label-md uppercase tracking-wider text-primary">
              {t.investors.thesisEyebrow}
            </span>
            <h2 className="font-display text-headline-lg text-on-surface md:text-display-lg">
              {t.investors.thesisTitle}
            </h2>
          </Reveal>

          <div className="grid gap-gutter md:grid-cols-3">
            {investorThesis.map((point, i) => (
              <Reveal key={point.icon} delay={i * 0.1}>
                <div className="bento-card flex h-full flex-col rounded-xl border border-outline-variant/40 p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container">
                    <Icon name={point.icon} className="text-primary" />
                  </div>
                  <h3 className="mb-3 text-title-md font-semibold text-on-surface">
                    {pick(point.title)}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    {pick(point.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-margin pb-24 pt-4">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-xl border border-outline-variant/40 bg-inverse-surface p-8 text-inverse-on-surface md:flex-row md:items-center md:justify-between md:p-12">
              <div className="max-w-xl">
                <h2 className="mb-3 font-display text-headline-lg text-inverse-on-surface">
                  {t.investors.contactTitle}
                </h2>
                <p className="text-body-lg text-inverse-on-surface/80">
                  {t.investors.contactBody}
                </p>
              </div>
              <Button onClick={openModal} className="shrink-0">
                {t.investors.ctaSecondary}
                <Icon name="arrow_forward" size={18} className="rtl:rotate-180" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
