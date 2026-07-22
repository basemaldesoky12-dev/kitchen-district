"use client";

import { pricingTiers } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { clsx } from "@/lib/clsx";

export function PricingContent() {
  const { t, pick } = useLanguage();
  const { openModal } = useModal();

  return (
    <main className="px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <PageHeader
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          subtitle={t.pricing.subtitle}
        />

        <div className="grid gap-gutter md:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08}>
              <div
                className={clsx(
                  "bento-card relative flex h-full flex-col rounded-xl p-8",
                  tier.featured
                    ? "border-2 border-primary"
                    : "border border-outline-variant/40",
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 start-8 rounded-full bg-primary px-3 py-1 text-caption font-bold uppercase tracking-wider text-on-primary">
                    {t.pricing.featuredBadge}
                  </span>
                )}
                <h2 className="mb-2 text-title-md font-semibold text-on-surface">
                  {pick(tier.name)}
                </h2>
                <p className="mb-8 text-body-md text-on-surface-variant">
                  {pick(tier.description)}
                </p>
                <ul className="mb-8 space-y-3">
                  {tier.bullets.map((bullet) => (
                    <li
                      key={pick(bullet)}
                      className="flex items-center gap-3 text-label-md text-on-surface-variant"
                    >
                      <Icon name="check_circle" size={18} className="text-secondary" />
                      {pick(bullet)}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={openModal}
                  variant={tier.featured ? "primary" : "outline"}
                  fullWidth
                  className="mt-auto"
                >
                  {t.pricing.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-caption text-on-surface-variant">{t.pricing.note}</p>
        </Reveal>
      </div>
    </main>
  );
}
