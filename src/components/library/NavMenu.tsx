import React, { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type NavMenuProps = {label: string;navLabel: string;items: {label: string;to: string;}[];};

/** Disclosure navigation pattern: a button that reveals a list of links. Not an ARIA menu. */
export function NavMenu({ label, navLabel, items }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <nav aria-label={navLabel}>
      <div ref={containerRef} className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-line-strong bg-surface px-4 text-[15px] font-medium text-fg hover:bg-surface-hover">
          
          {label}
          <ChevronDownIcon aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-200 ease-out", open && "rotate-180")} />
        </button>
        <ul id={listId} hidden={!open} className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-line-strong bg-surface-hover p-1.5">
          {items.map((item) =>
          <li key={item.to}>
              <Link to={item.to} className="block rounded-lg px-3 py-2.5 text-[15px] text-fg-secondary hover:bg-surface hover:text-fg">
                {item.label}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>);

}