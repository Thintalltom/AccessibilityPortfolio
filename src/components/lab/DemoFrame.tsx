import React from "react";
import type { ReactNode } from "react";
import { BugIcon, ShieldCheckIcon } from "lucide-react";
import type { DemoVariant } from "../../types/portal";
import { cn } from "../../utils/cn";
import { Badge } from "../ui/Badge";

type DemoFrameProps = {variant: DemoVariant;title: string;children: ReactNode;};

export function DemoFrame({ variant, title, children }: DemoFrameProps) {
  const flawed = variant === "flawed";
  return (
    <section
      aria-label={`${flawed ? "Flawed" : "Corrected"} demo: ${title}`}
      className="overflow-hidden rounded-2xl border border-line-strong bg-surface-muted">
      
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="font-mono text-[13px] text-fg-muted">accesslab-demo / {title}</span>
        {flawed ?
        <Badge tone="danger" icon={<BugIcon aria-hidden="true" className="h-3.5 w-3.5" />}>
            Flawed build · intentional defects
          </Badge> :

        <Badge tone="success" icon={<ShieldCheckIcon aria-hidden="true" className="h-3.5 w-3.5" />}>
            Corrected build
          </Badge>
        }
      </div>
      <div className={cn("relative bg-portal-bg text-portal-ink", flawed ? "portal-flawed" : "portal-fixed")}>{children}</div>
    </section>);

}