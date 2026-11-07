import React from "react";
import { Link } from "react-router-dom";
import { accessibilityFindings } from "../../data/accessibilityFindings";
import { auditMeta } from "../../data/audit";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { Badge } from "../../components/ui/Badge";

export function AuditsIndex() {
  usePageMeta("Audit reports", "Accessibility audit case studies with scope, methodology, findings, remediation and retest results.");

  return (
    <>
      <PageHeader
        title="Audit reports"
        description="Structured assessments with explicit scope, method and limitations. Currently one demonstration report on a fictional application."
        crumbs={[{ label: "accessibility", to: "/accessibility" }, { label: "audits" }]} />
      
      <div className={cn(container, "py-12")}>
        <ul className="divide-y divide-line border-y border-line">
          <li className="grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="warning">Draft · demonstration</Badge>
                <Badge>{auditMeta.standard}</Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-fg">
                <Link to="/accessibility/audits/booking-app" className="rounded hover:text-accent-hover hover:underline underline-offset-4">
                  {auditMeta.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
                {auditMeta.application}. {accessibilityFindings.length} documented findings across five components, with a remediation log and
                retest plan for each.
              </p>
            </div>
            <Link
              to="/accessibility/audits/booking-app"
              className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
              
              Read the booking app report
            </Link>
          </li>
        </ul>
        <p className="mt-6 max-w-2xl text-[15px] text-fg-muted">
          Audits of real products will be added only with the owner’s permission and with confidential details removed.
        </p>
      </div>
    </>);

}