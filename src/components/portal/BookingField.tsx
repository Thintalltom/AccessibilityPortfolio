import React from "react";
import type { ReactNode } from "react";
import { AlertCircleIcon } from "lucide-react";
import type { DemoVariant } from "../../types/portal";

type BookingFieldProps = {
  variant: DemoVariant;
  fieldId: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function BookingField({ variant, fieldId, label, required = false, hint, error, children }: BookingFieldProps) {
  if (variant === "flawed") {
    // Intentional defects ALD-001 / ALD-002: no label, no hint, no error text.
    return <div>{children}</div>;
  }

  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-semibold text-portal-ink">
        {label}
        <span className="font-normal text-portal-muted">{required ? " (required)" : " (optional)"}</span>
      </label>
      {hint &&
      <p id={`${fieldId}-hint`} className="mt-0.5 text-sm text-portal-muted">
          {hint}
        </p>
      }
      {children}
      {error &&
      <p id={`${fieldId}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-portal-danger">
          <AlertCircleIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      }
    </div>);

}