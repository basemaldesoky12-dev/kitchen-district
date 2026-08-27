"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function InvestorTeaser() {
  const { t, localize } = useLanguage();
  const { openModal } = useModal();

  return (
    <section id="investors" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest/70 p-8 backdrop-blur-sm md:p-12">
            {/* Copy — market stats live on the /investors page */}
            <div>
              <span className="mb-3 flex items-center gap-2 text-body-lg font-semibold uppercase tracking-wider text-primary">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                {t.investors.eyebrow}
              </span>
              <h2 className="mb-6 font-display text-headline-lg text-on-surface md:text-display-lg">
                {t.investors.title}
              </h2>
              <p className="mb-8 max-w-lg text-body-lg text-on-surface-variant">
                {t.investors.body}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button as="a" href={localize("/investors")} className="group">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
