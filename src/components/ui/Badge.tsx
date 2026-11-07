import React from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BadgeTone = "neutral" | "accent" | "cyan" | "success" | "warning" | "danger" | "info";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line text-fg-secondary",
  accent: "border-accent-soft bg-accent-soft text-accent-hover",
  cyan: "border-line text-accent-secondary",
  success: "border-line text-success",
  warning: "border-line text-warning",
  danger: "border-line text-danger",
  info: "border-line text-info"
};

type BadgeProps = {tone?: BadgeTone;icon?: ReactNode;children: ReactNode;className?: string;};

export function Badge({ tone = "neutral", icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-xs leading-5",
        tones[tone],
        className
      )}>
      
      {icon}
      {children}
    </span>);

}