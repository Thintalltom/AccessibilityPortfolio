import React from "react";
import { Link } from "react-router-dom";
import type { Finding } from "../../types/finding";
import { CodeBlock } from "../ui/CodeBlock";
import { StatusBadge } from "./StatusBadge";

export function RemediationEntry({ finding }: {finding: Finding;}) {
  return (
    <article id={finding.id} aria-labelledby={`${finding.id}-rem`} className="border-t border-line py-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 id={`${finding.id}-rem`} className="text-xl font-semibold leading-snug text-fg">
          <span className="mr-2 font-mono text-base text-accent-secondary">{finding.id}</span>
          {finding.title}
        </h3>
        <StatusBadge status={finding.status} />
      </div>

      <dl className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <dt className="font-mono text-xs text-fg-muted">Original issue</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.summary}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-fg-muted">Original behaviour</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.actualBehavior}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-fg-muted">Relevant criteria</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.wcagCriteria?.join("; ") ?? "—"}</dd>
        </div>
      </dl>

      {(finding.codeBefore || finding.codeAfter) &&
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {finding.codeBefore && <CodeBlock code={finding.codeBefore} label={finding.fixLocation ?? finding.component} tone="before" />}
          {finding.codeAfter && <CodeBlock code={finding.codeAfter} label={finding.fixLocation ?? finding.component} tone="after" />}
        </div>
      }

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-mono text-xs text-fg-muted">Test to perform</h4>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-[15px] leading-relaxed text-fg-secondary">
            {finding.retestPlan.map((s) =>
            <li key={s}>{s}</li>
            )}
          </ol>
        </div>
        <div>
          <h4 className="font-mono text-xs text-fg-muted">Retest result</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-fg-secondary">
            {finding.retestNotes ?? (
            finding.status === "open" ?
            "Not fixed yet, so nothing to retest." :
            "Not yet retested. The result will be recorded here after the steps are performed.")}
          </p>
        </div>
      </div>

      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        <Link to={finding.route} className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
          Reproduce the original {finding.id}
        </Link>
        <Link to={`/accessibility/audits/booking-app#${finding.id}`} className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
          Audit entry for {finding.id}
        </Link>
      </p>
    </article>);

}