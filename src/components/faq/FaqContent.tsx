"use client";

import { faqItems } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/ui/PageHeader";

export function FaqContent() {
  const { t, pick, localize } = useLanguage();

  return (
    <main className="px-margin py-16">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />

        <Reveal>
          <Accordion
            items={faqItems.map((item) => ({
              id: item.id,
              question: pick(item.question),
              answer: pick(item.answer),
            }))}
          />
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-body-lg text-on-surface">{t.faq.ctaTitle}</p>
          <Button as="a" href={localize("/contact")} variant="outline">
            {t.faq.cta}
          </Button>
        </Reveal>
      </div>
    </main>
  );
}
