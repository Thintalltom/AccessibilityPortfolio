import React, { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type DisclosureProps = {summary: string;children: ReactNode;defaultOpen?: boolean;};

export function Disclosure({ summary, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[48px] w-full items-center justify-between gap-4 py-3 text-left font-medium text-fg">
        
        {summary}
        <ChevronDownIcon aria-hidden="true" className={cn("h-5 w-5 shrink-0 text-fg-muted transition-transform duration-200 ease-out", open && "rotate-180")} />
      </button>
      <div id={panelId} hidden={!open} className="pb-4 text-[15px] leading-relaxed text-fg-secondary">
        {children}
      </div>
    </div>);

}