"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "@/lib/clsx";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

/** Exclusive-open FAQ accordion. Keyboard accessible, reduced-motion aware. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        const headerId = `${baseId}-h-${item.id}`;
        const panelId = `${baseId}-p-${item.id}`;
        return (
          <div
            key={item.id}
            className={clsx(i > 0 && "border-t border-outline-variant/40")}
          >
            <button
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 p-6 text-start transition-colors hover:bg-surface-container-low"
            >
              <span className="text-title-md font-semibold text-on-surface">
                {item.question}
              </span>
              <Icon
                name="expand_more"
                className={clsx(
                  "shrink-0 text-on-surface-variant transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-body-md text-on-surface-variant">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
