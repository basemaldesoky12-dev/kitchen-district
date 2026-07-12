import { clsx } from "@/lib/clsx";

interface IconProps {
  /** Material Symbols ligature name, e.g. "restaurant". */
  name: string;
  /** Font size in pixels (Material Symbols scale by font-size). */
  size?: number;
  filled?: boolean;
  className?: string;
  "aria-hidden"?: boolean;
}

/**
 * Thin wrapper over the Material Symbols Outlined icon font.
 * Decorative by default (aria-hidden) so screen readers skip it.
 */
export function Icon({
  name,
  size = 24,
  filled = false,
  className,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className={clsx("material-symbols-outlined", className)}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
      }}
    >
      {name}
    </span>
  );
}
