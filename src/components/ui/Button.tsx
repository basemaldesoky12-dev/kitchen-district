"use client";

import type { ComponentProps, ReactNode } from "react";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "outline" | "ghost" | "subtle";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-3 rounded font-medium text-label-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-sm hover:bg-primary-container hover:shadow-md",
  outline:
    "border border-outline text-on-surface hover:bg-surface-container-low",
  ghost: "text-primary hover:text-primary-container",
  subtle:
    "bg-surface border border-outline text-on-surface hover:bg-surface-container-low",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { as?: "button" };
type ButtonAsLink = CommonProps &
  Omit<ComponentProps<"a">, keyof CommonProps> & { as: "a" };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    children,
    as: _as,
    ...rest
  } = props;
  void _as;

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if (props.as === "a") {
    return (
      <a className={classes} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
