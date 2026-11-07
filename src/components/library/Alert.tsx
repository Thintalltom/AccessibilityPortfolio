import React from "react";
import type { ReactNode } from "react";
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type AlertTone = "info" | "success" | "warning" | "error";

type AlertProps = {
  tone: AlertTone;
  title: string;
  children?: ReactNode;
  /** "alert" interrupts (errors). "status" is polite. Omit for static messages present on load. */
  live?: "alert" | "status";
};

const config: Record<AlertTone, {Icon: typeof InfoIcon;border: string;text: string;prefix: string;}> = {
  info: { Icon: InfoIcon, border: "border-info", text: "text-info", prefix: "Information" },
  success: { Icon: CheckCircle2Icon, border: "border-success", text: "text-success", prefix: "Success" },
  warning: { Icon: AlertTriangleIcon, border: "border-warning", text: "text-warning", prefix: "Warning" },
  error: { Icon: AlertCircleIcon, border: "border-danger", text: "text-danger", prefix: "Error" }
};

export function Alert({ tone, title, children, live }: AlertProps) {
  const { Icon, border, text, prefix } = config[tone];
  return (
    <div role={live} className={cn("flex gap-3 rounded-xl border-l-4 bg-surface-muted p-4", border)}>
      <Icon aria-hidden="true" className={cn("mt-0.5 h-5 w-5 shrink-0", text)} />
      <div>
        <p className="font-semibold text-fg">
          <span className="sr-only">{prefix}: </span>
          {title}
        </p>
        {children && <div className="mt-1 text-[15px] text-fg-secondary">{children}</div>}
      </div>
    </div>);

}