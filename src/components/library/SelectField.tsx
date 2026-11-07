import React, { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { describedBy, fieldClasses } from "../../utils/fieldStyles";
import { FieldError } from "./FieldError";

type SelectFieldProps = {
  label: string;
  options: {value: string;label: string;}[];
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "required">;

export function SelectField({ label, options, placeholder, hint, error, required = false, id, className, ...rest }: SelectFieldProps) {
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
      <select
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint && `${fieldId}-hint`, error && `${fieldId}-error`)}
        className={fieldClasses(Boolean(error))}
        {...rest}>
        
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) =>
        <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )}
      </select>
      {error && <FieldError id={`${fieldId}-error`} message={error} />}
    </div>);

}