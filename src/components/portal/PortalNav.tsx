import React from "react";
import type { DemoVariant, PortalView } from "../../types/portal";
import { cn } from "../../utils/cn";

const items: {id: PortalView;label: string;}[] = [
{ id: "dashboard", label: "Dashboard" },
{ id: "services", label: "Services" },
{ id: "book", label: "Book" },
{ id: "appointments", label: "My appointments" }];


type PortalNavProps = {variant: DemoVariant;value: PortalView;onChange: (view: PortalView) => void;};

export function PortalNav({ variant, value, onChange }: PortalNavProps) {
  if (variant === "flawed") {
    // Intentional defect ALD-003: clickable divs, unreachable by keyboard.
    return (
      <div className="flex flex-wrap gap-1">
        {items.map((item) =>
        <div
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium",
            value === item.id ? "bg-portal-brand text-white" : "text-portal-muted hover:bg-portal-subtle"
          )}>
          
            {item.label}
          </div>
        )}
      </div>);

  }

  return (
    <nav aria-label="Portal sections">
      <ul className="flex flex-wrap gap-1">
        {items.map((item) => {
          const active = value === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onChange(item.id)}
                className={cn(
                  "min-h-[40px] whitespace-nowrap rounded-md px-3 text-sm font-medium",
                  active ?
                  "bg-portal-brand text-white underline decoration-2 underline-offset-[6px]" :
                  "text-portal-muted hover:bg-portal-subtle hover:text-portal-ink"
                )}>
                
                {item.label}
              </button>
            </li>);

        })}
      </ul>
    </nav>);

}