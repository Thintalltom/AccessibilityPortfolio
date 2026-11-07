import { cn } from "./cn";

export function fieldClasses(hasError: boolean): string {
  return cn(
    "mt-1.5 block min-h-[44px] w-full rounded-lg bg-surface-muted px-3 text-[15px] text-fg placeholder:text-fg-muted",
    hasError ? "border-2 border-danger" : "border border-line-input"
  );
}

export function describedBy(...ids: Array<string | false | undefined>): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}