import React from "react";
import { cn } from "../../utils/cn";

type CodeBlockProps = {
  code: string;
  label: string;
  tone?: "before" | "after";
  className?: string;
};

export function CodeBlock({ code, label, tone, className }: CodeBlockProps) {
  return (
    <figure className={cn("min-w-0 overflow-hidden rounded-xl border border-line bg-surface-muted print-avoid-break", className)}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 font-mono text-xs text-fg-muted">
        <span className="truncate">{label}</span>
        {tone &&
        <span className={tone === "before" ? "text-danger" : "text-success"}>
            {tone === "before" ? "− Before" : "+ After"}
          </span>
        }
      </figcaption>
      <pre
        tabIndex={0}
        aria-label={`${label}${tone ? ` (${tone})` : ""}, code`}
        className="overflow-x-auto p-4 font-mono text-[13.5px] leading-relaxed text-fg-secondary">
        
        <code>{code}</code>
      </pre>
    </figure>);

}