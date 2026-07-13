"use client";

import { investorStats } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function InvestorTeaser() {
  const { t, pick } = useLanguage();
  const { openModal } = useModal();

  return (
    <section id="investors" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="grid items-center gap-12 rounded-xl border border-outline-variant/40 bg-surface-container-lowest/70 p-8 backdrop-blur-sm md:p-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <div>
              <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t.investors.eyebrow}
              </span>
              <h2 className="mb-6 font-display text-headline-lg text-on-surface md:text-display-lg">
                {t.investors.title}
              </h2>
              <p className="mb-8 max-w-lg text-body-lg text-on-surface-variant">
                {t.investors.body}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button as="a" href="/investors" className="group">
                  {t.investors.ctaPrimary}
                  <Icon
                    name="arrow_outward"
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 rtl:rotate-90"
                  />
                </Button>
                <Button onClick={openModal} variant="outline">
                  {t.investors.ctaSecondary}
                </Button>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-outline-variant/40">
              {investorStats.map((stat, i) => (
                <div
                  key={stat.value}
                  className={`p-6 md:p-8 ${
                    i % 2 === 1 ? "border-l border-outline-variant/40" : ""
                  } ${i > 1 ? "border-t border-outline-variant/40" : ""}`}
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
