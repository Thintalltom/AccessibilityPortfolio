import React from "react";
import type { ExperimentMode } from "./ModeSwitch";
import type { RenderCounter } from "./ListRow";

type RenderReadoutProps = {
  counters: Record<ExperimentMode, RenderCounter>;
  updates: Record<ExperimentMode, number>;
};

/** Rendered after the list so it reads counters once rows have rendered. */
export function RenderReadout({ counters, updates }: RenderReadoutProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line" role="region" aria-label="Experiment 2 measurements" tabIndex={0}>
      <table className="w-full min-w-[480px] border-collapse text-left">
        <caption className="sr-only">Row render counts in this browser session</caption>
        <thead className="bg-surface-muted">
          <tr>
            {["Mode", "Parent updates", "Row renders", "Row renders per update"].map((h) =>
            <th key={h} scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {(["baseline", "optimised"] as ExperimentMode[]).map((m) => {
            const rows = counters[m].current;
            const u = updates[m];
            return (
              <tr key={m} className="border-t border-line">
                <th scope="row" className="px-4 py-3 text-[15px] font-medium capitalize text-fg">{m}</th>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{u}</td>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{rows || "Not measured yet"}</td>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{u > 0 ? (Math.max(0, rows - 150) / u).toFixed(0) : "—"}</td>
              </tr>);

          })}
        </tbody>
      </table>
    </div>);

}