import React from "react";
import type { ReactNode } from "react";
import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type CalloutProps = {
  tone?: "info" | "warning";
  title: string;
  children?: ReactNode;
  className?: string;
};

export function Callout({ tone = "info", title, children, className }: CalloutProps) {
  const Icon = tone === "warning" ? AlertTriangleIcon : InfoIcon;
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border bg-surface-muted p-4 sm:p-5",
        tone === "warning" ? "border-warning" : "border-line-strong",
        className
      )}>
      
      <Icon aria-hidden="true" className={cn("mt-0.5 h-5 w-5 shrink-0", tone === "warning" ? "text-warning" : "text-info")} />
      <div className="min-w-0">
        <p className="font-semibold text-fg">{title}</p>
        {children && <div className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{children}</div>}
      </div>
    </div>);

}