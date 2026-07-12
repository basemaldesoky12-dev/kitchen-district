/** Minimal className joiner — filters falsy values, no dependency needed. */
export function clsx(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
