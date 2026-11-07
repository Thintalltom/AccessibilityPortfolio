import React, { useId } from "react";
import { CheckIcon } from "lucide-react";
import type { DemoVariant } from "../../types/portal";
import { cn } from "../../utils/cn";

const options: {value: DemoVariant;label: string;}[] = [
{ value: "flawed", label: "Flawed build" },
{ value: "fixed", label: "Corrected build" }];


type VariantSwitchProps = {value: DemoVariant;onChange: (value: DemoVariant) => void;};

export function VariantSwitch({ value, onChange }: VariantSwitchProps) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-sm font-medium text-fg">Demo version</legend>
      <div className="mt-2 inline-flex flex-wrap gap-1 rounded-xl border border-line-strong bg-surface-muted p-1">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only" />
              
              <span
                className={cn(
                  "flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors duration-150",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-secondary",
                  checked ? "bg-surface-hover text-fg ring-1 ring-line-input" : "text-fg-secondary hover:text-fg"
                )}>
                
                {checked && <CheckIcon aria-hidden="true" className="h-4 w-4 text-accent" />}
                {option.label}
              </span>
            </label>);

        })}
      </div>
    </fieldset>);

}