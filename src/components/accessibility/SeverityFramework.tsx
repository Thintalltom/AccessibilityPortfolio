import React from "react";
import type { Severity } from "../../types/finding";
import { SeverityBadge } from "./SeverityBadge";

const definitions: {severity: Severity;text: string;}[] = [
{ severity: "critical", text: "A core task is effectively blocked for a relevant user group, with no reasonable alternative within the tested scope." },
{ severity: "high", text: "A significant barrier affects an important task. Completion may be possible, but only with considerable effort or luck." },
{ severity: "medium", text: "A meaningful difficulty or barrier exists, but a reasonable workaround is available." },
{ severity: "low", text: "A minor usability or accessibility issue with limited impact on task completion." }];


export function SeverityFramework() {
  return (
    <div>
      <dl className="divide-y divide-line border-y border-line">
        {definitions.map((d) =>
        <div key={d.severity} className="grid gap-2 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
            <dt>
              <SeverityBadge severity={d.severity} />
            </dt>
            <dd className="text-[15px] leading-relaxed text-fg-secondary">{d.text}</dd>
          </div>
        )}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-fg-muted">
        These are portfolio-defined, impact-based categories — not official WCAG classifications. A WCAG failure can be low severity, and a
        severe usability barrier may not map to any single criterion. Each finding records its own rationale.
      </p>
    </div>);

}