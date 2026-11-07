/** Joins class names, skipping falsy values. Intentionally not using tailwind-merge
 * because the custom token names (e.g. text-fg-muted, text-section) would be
 * misclassified and dropped. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}