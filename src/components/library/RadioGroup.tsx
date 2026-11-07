import React, { useId } from "react";
import { FieldError } from "./FieldError";

type RadioGroupProps = {
  legend: string;
  name: string;
  options: {value: string;label: string;description?: string;}[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
};

export function RadioGroup({ legend, name, options, value, onChange, error, required = false }: RadioGroupProps) {
  const baseId = useId();
  const errorId = `${baseId}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-medium text-fg">
        {legend}
        <span className="font-normal text-fg-muted">{required ? " (required)" : " (optional)"}</span>
      </legend>
      {error && <FieldError id={errorId} message={error} />}
      <div className="mt-2 space-y-2">
        {options.map((o) => {
          const id = `${baseId}-${o.value}`;
          return (
            <div key={o.value} className="flex items-start gap-3">
              <input
                id={id}
                type="radio"
                name={name}
                value={o.value}
                checked={value === o.value}
                onChange={() => onChange(o.value)}
                aria-describedby={o.description ? `${id}-desc` : undefined}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#A78BFA]" />
              
              <div>
                <label htmlFor={id} className="text-[15px] text-fg">
                  {o.label}
                </label>
                {o.description &&
                <p id={`${id}-desc`} className="text-sm text-fg-muted">
                    {o.description}
                  </p>
                }
              </div>
            </div>);

        })}
      </div>
    </fieldset>);

}