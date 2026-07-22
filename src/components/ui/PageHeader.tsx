"use client";

import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared subpage hero: eyebrow dot, display title, muted subtitle.
 * Sits directly on the tile-surface body background like homepage sections.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      {eyebrow && (
        <span className="mb-3 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}
      <h1 className="mb-4 font-display text-headline-lg text-on-surface md:text-display-lg">
        {title}
      </h1>
      {subtitle && (
        <p className="text-body-lg text-on-surface-variant">{subtitle}</p>
      )}
    </Reveal>
  );
}
