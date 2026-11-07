import React from "react";
import type { Finding } from "../../types/finding";
import { SeverityBadge } from "../accessibility/SeverityBadge";
import { StatusBadge } from "../accessibility/StatusBadge";

function Row({ term, children }: {term: string;children: React.ReactNode;}) {
  return (
    <div className="grid gap-1 border-t border-line py-3 sm:grid-cols-[180px_1fr] sm:gap-6">
      <dt className="font-mono text-xs leading-6 text-fg-muted">{term}</dt>
      <dd className="text-[15px] leading-relaxed text-fg-secondary">{children}</dd>
    </div>);

}

export function AuditFinding({ finding }: {finding: Finding;}) {
  return (
    <article id={finding.id} aria-labelledby={`${finding.id}-title`} className="print-avoid-break rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <h3 id={`${finding.id}-title`} className="text-lg font-semibold leading-snug text-fg">
        <span className="mr-2 font-mono text-[15px] text-accent-secondary">{finding.id}</span>
        {finding.title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <SeverityBadge severity={finding.severity} />
        <StatusBadge status={finding.status} />
      </div>
      <dl className="mt-5">
        <Row term="Severity rationale">{finding.severityRationale}</Row>
        <Row term="Route / component">
          <span className="font-mono text-sm">{finding.route}</span> · <span className="font-mono text-sm">{finding.component}</span>
        </Row>
        <Row term="Steps to reproduce">
          <ol className="list-decimal space-y-1 pl-5">
            {finding.reproductionSteps.map((s) =>
            <li key={s}>{s}</li>
            )}
          </ol>
        </Row>
        <Row term="Expected">{finding.expectedBehavior}</Row>
        <Row term="Actual">{finding.actualBehavior}</Row>
        <Row term="Evidence">
          {finding.evidence && finding.evidence.length > 0 ?
          <ul className="space-y-1">
              {finding.evidence.map((e) =>
            <li key={e}>{e}</li>
            )}
            </ul> :

          "Reproducible via the steps above. No screenshots or recordings have been captured yet."
          }
        </Row>
        <Row term="User impact">{finding.impact}</Row>
        <Row term="WCAG criteria">{finding.wcagCriteria?.join("; ") ?? "None mapped"}</Row>
        <Row term="Recommended fix">{finding.remediation}</Row>
      </dl>
    </article>);

}