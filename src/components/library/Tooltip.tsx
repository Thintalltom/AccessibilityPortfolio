import React, { cloneElement, useEffect, useId, useState } from "react";
import type { ReactElement } from "react";
import { cn } from "../../utils/cn";

type TooltipProps = {content: string;children: ReactElement;};

/**
 * Supplementary description only — never the sole accessible name.
 * Shows on hover and focus, stays open while hovered, dismisses with Escape (WCAG 1.4.13).
 */
export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}>
      
      {cloneElement(children, { "aria-describedby": id })}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "absolute bottom-full left-1/2 z-10 -translate-x-1/2 pb-2 transition-opacity duration-150 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}>
        
        <span className="block w-max max-w-[240px] rounded-md border border-line-strong bg-surface-hover px-2.5 py-1.5 text-xs leading-snug text-fg">
          {content}
        </span>
      </span>
    </span>);

}