"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";

interface CountUpProps {
  value: number;
  /** Decimal places to render. */
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * Animates a number from 0 → value the first time it scrolls into view.
 * Used for the "average dispatch time" stat.
 */
export function CountUp({
  value,
  decimals = 1,
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduceMotion || !inView) {
      if (inView) node.textContent = value.toFixed(decimals);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [inView, value, decimals, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
