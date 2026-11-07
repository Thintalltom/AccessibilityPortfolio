import React, { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "../../utils/cn";

type Tab = {id: string;label: string;content: ReactNode;};

type TabsProps = {label: string;tabs: Tab[];};

export function Tabs({ label, tabs }: TabsProps) {
  const [selected, setSelected] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    const target = next[event.key];
    setSelected(tabs[target].id);
    tabRefs.current[target]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((tab, i) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative -mb-px min-h-[44px] whitespace-nowrap border-b-2 px-3 text-sm font-medium transition-colors duration-150",
                isSelected ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg"
              )}>
              
              {tab.label}
            </button>);

        })}
      </div>
      {tabs.map((tab) =>
      <div
        key={tab.id}
        role="tabpanel"
        id={`${base}-panel-${tab.id}`}
        aria-labelledby={`${base}-tab-${tab.id}`}
        hidden={tab.id !== selected}
        tabIndex={0}
        className="pt-5">
        
          {tab.content}
        </div>
      )}
    </div>);

}