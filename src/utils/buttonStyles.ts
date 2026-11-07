import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-fg-inverse hover:bg-accent-hover",
  secondary: "border border-line-strong bg-surface text-fg hover:border-line-input hover:bg-surface-hover",
  ghost: "text-accent hover:text-accent-hover hover:underline underline-offset-4"
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-[44px] px-5 text-[15px]",
  sm: "min-h-[36px] px-3.5 text-sm"
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md"): string {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-medium",
    "transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    variant === "ghost" ? "px-0" : sizes[size],
    variant === "ghost" && (size === "sm" ? "text-sm" : "text-[15px]")
  );
}