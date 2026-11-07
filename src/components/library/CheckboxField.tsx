import React, { useId } from "react";
import { describedBy } from "../../utils/fieldStyles";
import { FieldError } from "./FieldError";

type CheckboxFieldProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string;
};

export function CheckboxField({ label, description, checked, onChange, error, id }: CheckboxFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={fieldId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(description && `${fieldId}-desc`, error && `${fieldId}-error`)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#A78BFA]" />
        
        <div>
          <label htmlFor={fieldId} className="text-[15px] font-medium text-fg">
            {label}
          </label>
          {description &&
          <p id={`${fieldId}-desc`} className="mt-0.5 text-sm text-fg-muted">
              {description}
            </p>
          }
        </div>
      </div>
      {error && <FieldError id={`${fieldId}-error`} message={error} />}
    </div>);

}