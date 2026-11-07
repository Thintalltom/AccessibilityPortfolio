import React, { useId } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "../../utils/cn";

export type ExperimentMode = "baseline" | "optimised";

const options: {value: ExperimentMode;label: string;}[] = [
{ value: "baseline", label: "Baseline" },
{ value: "optimised", label: "Optimised" }];


type ModeSwitchProps = {value: ExperimentMode;onChange: (mode: ExperimentMode) => void;disabled?: boolean;};

export function ModeSwitch({ value, onChange, disabled }: ModeSwitchProps) {
  const name = useId();
  return (
    <fieldset disabled={disabled}>
      <legend className="text-sm font-medium text-fg">Implementation</legend>
      <div className="mt-2 inline-flex gap-1 rounded-xl border border-line-strong bg-surface-muted p-1">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label key={o.value} className="cursor-pointer">
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span
                className={cn(
                  "flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors duration-150",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-secondary",
                  checked ? "bg-surface-hover text-fg ring-1 ring-line-input" : "text-fg-secondary hover:text-fg"
                )}>
                
                {checked && <CheckIcon aria-hidden="true" className="h-4 w-4 text-accent" />}
                {o.label}
              </span>
            </label>);

        })}
      </div>
    </fieldset>);

}