import React, { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";
import type { Finding } from "../../types/finding";
import { cn } from "../../utils/cn";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

type FindingItemProps = {
  finding: Finding;
  headingLevel?: 3 | 4;
  defaultOpen?: boolean;
};

export function FindingItem({ finding, headingLevel = 3, defaultOpen = false }: FindingItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const isA11y = finding.category === "accessibility";

  return (
    <li className="border-b border-line last:border-b-0">
      <Heading className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start gap-4 px-4 py-4 text-left transition-colors duration-150 hover:bg-surface-hover sm:px-5">
          
          <span className="mt-0.5 w-[72px] shrink-0 font-mono text-[13px] text-accent-secondary">{finding.id}</span>
          <span className="min-w-0 flex-1 text-base font-medium leading-snug text-fg">{finding.title}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={cn("mt-0.5 h-5 w-5 shrink-0 text-fg-muted transition-transform duration-200 ease-out", open && "rotate-180")} />
          
        </button>
      </Heading>
      <div className="-mt-1 flex flex-wrap items-center gap-2 px-4 pb-4 sm:pl-[108px] sm:pr-5">
        <SeverityBadge severity={finding.severity} />
        <StatusBadge status={finding.status} />
        <span className="font-mono text-xs text-fg-muted">{finding.component}</span>
      </div>

      <div id={panelId} hidden={!open} className="border-t border-line bg-surface-muted px-4 py-5 sm:pl-[108px] sm:pr-5">
        <p className="text-[15px] leading-relaxed text-fg-secondary">{finding.summary}</p>
        <dl className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <dt className="font-mono text-xs text-fg-muted">Expected</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.expectedBehavior}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-fg-muted">Actual</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.actualBehavior}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-fg-muted">Steps to reproduce</dt>
            <dd className="mt-1">
              <ol className="list-decimal space-y-1 pl-5 text-[15px] leading-relaxed text-fg-secondary">
                {finding.reproductionSteps.map((step) =>
                <li key={step}>{step}</li>
                )}
              </ol>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-fg-muted">User impact</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.impact}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-fg-muted">Severity rationale</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.severityRationale}</dd>
          </div>
          {finding.wcagCriteria &&
          <div>
              <dt className="font-mono text-xs text-fg-muted">WCAG 2.2 criteria</dt>
              <dd className="mt-1">
                <ul className="space-y-1 text-[15px] text-fg-secondary">
                  {finding.wcagCriteria.map((c) =>
                <li key={c}>{c}</li>
                )}
                </ul>
              </dd>
            </div>
          }
          <div className="md:col-span-2">
            <dt className="font-mono text-xs text-fg-muted">Recommended fix</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{finding.remediation}</dd>
          </div>
        </dl>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <li>
            <Link to={finding.route} className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
              Reproduce {finding.id} in the demo
            </Link>
          </li>
          {isA11y &&
          <>
              <li>
                <Link
                to={`/accessibility/remediation#${finding.id}`}
                className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                
                  Remediation for {finding.id}
                </Link>
              </li>
              <li>
                <Link
                to={`/accessibility/audits/booking-app#${finding.id}`}
                className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                
                  Audit entry for {finding.id}
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
    </li>);

}