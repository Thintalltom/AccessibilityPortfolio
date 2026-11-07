import React from "react";
import type { ReactNode } from "react";

/** Visibly marks content the portfolio owner must supply. Uses text, not colour alone. */
export function Placeholder({ children }: {children: ReactNode;}) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5 rounded-md border border-dashed border-warning px-1.5 py-0.5 font-mono text-[0.85em] leading-snug text-warning">
      <span className="font-semibold">Owner input:</span>
      <span>{children}</span>
    </span>);

}