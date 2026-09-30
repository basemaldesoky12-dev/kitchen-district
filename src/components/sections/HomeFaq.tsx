"use client";

import { faqItems } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const homeItems = faqItems.filter((item) => item.home);

/** Short FAQ on the homepage — the questions people search before renting. */
export function HomeFaq() {
  const { t, pick, localize } = useLanguage();

  return (
    <section id="questions" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10 text-center">
          <span className="mb-3 flex items-center justify-center gap-2 text-label-md uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t.homeFaq.eyebrow}
          </span>
          <h2 className="mb-4 font-display text-headline-lg text-on-surface md:text-display-lg">
            {t.homeFaq.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            {t.homeFaq.subtitle}
          </p>
        </Reveal>

        <Reveal>
          <Accordion
            items={homeItems.map((item) => ({
              id: item.id,
              question: pick(item.question),
              answer: pick(item.answer),
            }))}
          />
        </Reveal>

        <Reveal className="mt-8 flex justify-center">
          <Button as="a" href={localize("/faq")} variant="outline">
            {t.homeFaq.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
