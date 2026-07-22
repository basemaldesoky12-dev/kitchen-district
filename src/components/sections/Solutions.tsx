"use client";

import type { Solution } from "@/lib/content";
import { solutions } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

const accentText: Record<Solution["accent"], string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

/** Uniform card shell — same surface, border, radius, padding for every card. */
const CARD =
  "bento-card flex h-full flex-col rounded-xl border border-outline-variant/40 p-8";

/** Consistent icon chip used across all cards. */
function IconChip({ name, accent }: { name: string; accent: Solution["accent"] }) {
  return (
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container">
      <Icon name={name} className={accentText[accent]} />
    </div>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  const { pick } = useLanguage();
  const { openModal } = useModal();

  if (solution.variant === "hero") {
    return (
      <div className={CARD}>
        <IconChip name={solution.icon} accent={solution.accent} />
        <h3 className="mb-3 text-title-md font-semibold text-on-surface">
          {pick(solution.title)}
        </h3>
        <p className="mb-6 max-w-md text-body-md text-on-surface-variant">
          {pick(solution.body)}
        </p>
        <ul className="mt-auto grid gap-3 text-label-md text-on-surface-variant sm:grid-cols-2">
          {solution.bullets?.map((bullet) => (
            <li key={pick(bullet.text)} className="flex items-center gap-3">
              <Icon name="check_circle" size={18} className="text-secondary" />
              {pick(bullet.text)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (solution.variant === "cta") {
    return (
      <div className={clsx(CARD, "gap-8 md:flex-row md:items-center")}>
        <div className="flex flex-1 flex-col">
          <IconChip name={solution.icon} accent={solution.accent} />
          <h3 className="mb-3 text-title-md font-semibold text-on-surface">
            {pick(solution.title)}
          </h3>
          <p className="mb-6 text-body-md text-on-surface-variant">
            {pick(solution.body)}
          </p>
          {solution.linkLabel && (
            <Button onClick={openModal} variant="subtle" className="mt-auto self-start">
              {pick(solution.linkLabel)}
              <Icon name="arrow_forward" size={16} className="rtl:rotate-180" />
            </Button>
          )}
        </div>

        {/* Onboarding step timeline */}
        <ol className="flex-1 space-y-4 rounded-lg border border-outline-variant/50 bg-surface-container-low p-6">
          {solution.steps?.map((step, i) => (
            <li key={pick(step)} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-caption font-bold text-on-primary">
                {i + 1}
              </span>
              <span className="text-label-md text-on-surface">{pick(step)}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // standard
  return (
    <div className={CARD}>
      <IconChip name={solution.icon} accent={solution.accent} />
      <h3 className="mb-3 text-title-md font-semibold text-on-surface">
        {pick(solution.title)}
      </h3>
      <p className="mb-6 text-body-md text-on-surface-variant">
        {pick(solution.body)}
      </p>
      {solution.linkLabel && (
        <button
          onClick={openModal}
          className={clsx(
            "mt-auto flex items-center gap-1 text-label-md transition-opacity hover:opacity-80",
            accentText[solution.accent],
          )}
        >
          {pick(solution.linkLabel)}
          <Icon name="arrow_forward" size={16} className="rtl:rotate-180" />
        </button>
      )}
    </div>
  );
}

export function Solutions() {
  const { t } = useLanguage();

  return (
    <section id="solutions" className="scroll-mt-24 px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="mb-4 font-display text-headline-lg text-on-surface">
            {t.solutions.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            {t.solutions.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {solutions.map((solution, i) => (
            <Reveal
              key={solution.id}
              delay={i * 0.08}
              className={solution.span === "wide" ? "md:col-span-2" : undefined}
            >
              <SolutionCard solution={solution} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
