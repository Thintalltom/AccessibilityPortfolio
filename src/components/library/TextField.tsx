import React, { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { describedBy, fieldClasses } from "../../utils/fieldStyles";
import { FieldError } from "./FieldError";

type TextFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "required">;

export function TextField({ label, hint, error, required = false, id, className, ...rest }: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="block text-sm font-medium text-fg">
        {label}
        <span className="font-normal text-fg-muted">{required ? " (required)" : " (optional)"}</span>
      </label>
      {hint &&
      <p id={`${fieldId}-hint`} className="mt-0.5 text-sm text-fg-muted">
          {hint}
        </p>
      }
      <input
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint && `${fieldId}-hint`, error && `${fieldId}-error`)}
        className={fieldClasses(Boolean(error))}
        {...rest} />
      
      {error && <FieldError id={`${fieldId}-error`} message={error} />}
    </div>);

}