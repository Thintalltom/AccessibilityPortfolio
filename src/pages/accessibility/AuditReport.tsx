import React from "react";
import { PrinterIcon } from "lucide-react";
import { accessibilityFindings } from "../../data/accessibilityFindings";
import {
  auditCriteria,
  auditEnvironment,
  auditExclusions,
  auditLimitations,
  auditMeta,
  auditScope,
  keyboardProcedure } from
"../../data/audit";
import { site } from "../../data/site";
import { countBy, severityLabels, severityOrder, statusLabels } from "../../utils/findings";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { reportContainer } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { Placeholder } from "../../components/ui/Placeholder";
import { Callout } from "../../components/ui/Callout";
import { Button } from "../../components/ui/Button";
import { SeverityFramework } from "../../components/accessibility/SeverityFramework";
import { AuditFinding } from "../../components/audit/AuditFinding";

const toc = [
{ id: "overview", label: "A. Report overview" },
{ id: "methodology", label: "B. Scope and methodology" },
{ id: "summary", label: "C. Executive summary" },
{ id: "findings", label: "D. Detailed findings" },
{ id: "remediation-log", label: "E. Remediation log" },
{ id: "retest", label: "F. Retest results" },
{ id: "conclusion", label: "G. Limitations and conclusion" }];


const h2 = "text-section font-semibold text-fg";
const th = "px-4 py-2.5 text-left font-mono text-xs font-medium text-fg-muted";
const td = "px-4 py-3 align-top text-[15px] text-fg-secondary";

function ListOrPlaceholder({ items, placeholder }: {items: string[];placeholder: string;}) {
  if (items.length === 0) return <Placeholder>{placeholder}</Placeholder>;
  return <span>{items.join(", ")}</span>;
}

export function AuditReport() {
  usePageMeta(
    "Audit: AccessLab booking journey",
    "Demonstration accessibility audit of a fictional university booking portal against WCAG 2.2 AA, with findings, remediation log and retest status."
  );
  const bySeverity = countBy(accessibilityFindings, (f) => f.severity);
  const critical = accessibilityFindings.filter((f) => f.severity === "critical");

  return (
    <div className="print-report">
      <PageHeader
        width="report"
        title={auditMeta.title}
        description={`${auditMeta.application} — demonstration assessment.`}
        crumbs={[{ label: "accessibility", to: "/accessibility" }, { label: "audits", to: "/accessibility/audits" }, { label: "booking-app" }]}>
        
        <Button variant="secondary" onClick={() => window.print()} className="print:hidden">
          <PrinterIcon aria-hidden="true" className="h-4 w-4" />
          Print or save as PDF
        </Button>
      </PageHeader>

      <div className={cn(reportContainer, "py-12")}>
        <Callout tone="warning" title="Demonstration assessment of a fictional application">
          {auditMeta.status}
        </Callout>

        <nav aria-labelledby="toc-heading" className="mt-10 rounded-2xl border border-line bg-surface-muted p-6 print:hidden">
          <h2 id="toc-heading" className="font-mono text-[13px] text-fg-muted">
            Contents
          </h2>
          <ol className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {toc.map((t) =>
            <li key={t.id}>
                <a href={`#${t.id}`} className="text-[15px] text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                  {t.label}
                </a>
              </li>
            )}
          </ol>
        </nav>

        <section id="overview" aria-labelledby="overview-h" className="mt-16">
          <h2 id="overview-h" className={h2}>A. Report overview</h2>
          <dl className="mt-6 grid gap-x-10 border-t border-line sm:grid-cols-2">
            {[
            ["Application", auditMeta.application],
            ["Report title", auditMeta.title],
            ["Assessment date", auditMeta.assessmentDate ?? <Placeholder>date of testing</Placeholder>],
            ["Evaluator", auditMeta.evaluator ?? site.ownerName ?? <Placeholder>evaluator name</Placeholder>],
            ["Target standard", auditMeta.standard],
            ["Scope", `${auditScope.length} areas of the booking journey (see B)`]].
            map(([term, value]) =>
            <div key={term as string} className="border-b border-line py-3">
                <dt className="font-mono text-xs text-fg-muted">{term}</dt>
                <dd className="mt-1 text-[15px] text-fg">{value}</dd>
              </div>
            )}
          </dl>
          <p className="mt-6 text-[15px] leading-relaxed text-fg-secondary">
            <span className="font-medium text-fg">Purpose.</span> {auditMeta.purpose}
          </p>
        </section>

        <section id="methodology" aria-labelledby="methodology-h" className="mt-16">
          <h2 id="methodology-h" className={h2}>B. Scope and methodology</h2>
          <h3 className="mt-8 font-semibold text-fg">Pages and components evaluated</h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Scope table" tabIndex={0}>
            <table className="w-full min-w-[560px] border-collapse">
              <thead className="bg-surface-muted">
                <tr>
                  <th scope="col" className={th}>Area</th>
                  <th scope="col" className={th}>Route</th>
                  <th scope="col" className={th}>Component</th>
                </tr>
              </thead>
              <tbody>
                {auditScope.map((s) =>
                <tr key={s.area} className="border-t border-line">
                    <td className={td}>{s.area}</td>
                    <td className={cn(td, "font-mono text-sm")}>{s.route}</td>
                    <td className={cn(td, "font-mono text-sm")}>{s.component}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 font-semibold text-fg">Test environment</h3>
          <dl className="mt-3 space-y-3 text-[15px] text-fg-secondary">
            <div><dt className="inline font-medium text-fg">Browsers: </dt><dd className="inline"><ListOrPlaceholder items={auditEnvironment.browsers} placeholder="browsers and versions used" /></dd></div>
            <div><dt className="inline font-medium text-fg">Operating systems: </dt><dd className="inline"><ListOrPlaceholder items={auditEnvironment.operatingSystems} placeholder="OS and versions" /></dd></div>
            <div><dt className="inline font-medium text-fg">Assistive technologies: </dt><dd className="inline"><ListOrPlaceholder items={auditEnvironment.assistiveTechnologies} placeholder="screen readers actually tested, e.g. NVDA 2026.x + Firefox" /></dd></div>
            <div><dt className="inline font-medium text-fg">Automated tools: </dt><dd className="inline"><ListOrPlaceholder items={auditEnvironment.automatedTools} placeholder="tools actually run, with versions" /></dd></div>
          </dl>

          <h3 className="mt-10 font-semibold text-fg">Keyboard testing procedure</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-fg-secondary">
            {keyboardProcedure.map((p) => <li key={p}>{p}</li>)}
          </ol>

          <h3 className="mt-10 font-semibold text-fg">WCAG 2.2 success criteria in focus</h3>
          <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-[15px] text-fg-secondary sm:grid-cols-2">
            {auditCriteria.map((c) => <li key={c}>{c}</li>)}
          </ul>

          <h3 className="mt-10 font-semibold text-fg">Excluded</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-fg-secondary">
            {auditExclusions.map((e) => <li key={e}>{e}</li>)}
          </ul>

          <h3 className="mt-10 font-semibold text-fg">Severity framework</h3>
          <div className="mt-4"><SeverityFramework /></div>
        </section>

        <section id="summary" aria-labelledby="summary-h" className="mt-16">
          <h2 id="summary-h" className={h2}>C. Executive summary</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-fg-secondary">
            The flawed build contains {accessibilityFindings.length} documented barriers in the booking journey.{" "}
            {critical.length > 0 &&
            <>
                The most serious ({critical.map((c) => c.id).join(", ")}) prevents keyboard users from leaving the dashboard, so they cannot
                book at all.{" "}
              </>
            }
            The high-severity findings cluster around forms and dialogs: unlabelled fields, errors conveyed only by colour, and a confirmation
            dialog that neither receives nor contains focus. Most remaining issues reduce efficiency for screen reader users rather than blocking
            them.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {severityOrder.map((s) =>
            <div key={s} className="bg-surface p-4">
                <dt className="font-mono text-xs text-fg-muted">{severityLabels[s]}</dt>
                <dd className="mt-1 text-2xl font-semibold text-fg">{bySeverity[s] ?? 0}</dd>
              </div>
            )}
          </dl>
        </section>

        <section id="findings" aria-labelledby="findings-h" className="mt-16">
          <h2 id="findings-h" className={h2}>D. Detailed findings</h2>
          <div className="mt-8 space-y-6">
            {accessibilityFindings.map((f) => <AuditFinding key={f.id} finding={f} />)}
          </div>
        </section>

        <section id="remediation-log" aria-labelledby="remediation-h" className="mt-16">
          <h2 id="remediation-h" className={h2}>E. Remediation log</h2>
          <p className="mt-4 text-[15px] text-fg-secondary">Changes made in the corrected build. Commit links will be added once the repository is public.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Remediation log" tabIndex={0}>
            <table className="w-full min-w-[640px] border-collapse">
              <thead className="bg-surface-muted">
                <tr>
                  <th scope="col" className={th}>ID</th>
                  <th scope="col" className={th}>Change and reason</th>
                  <th scope="col" className={th}>File</th>
                </tr>
              </thead>
              <tbody>
                {accessibilityFindings.map((f) =>
                <tr key={f.id} className="border-t border-line">
                    <td className={cn(td, "font-mono text-sm")}>{f.id}</td>
                    <td className={td}>{f.status === "open" ? `Not yet changed. ${f.remediation}` : f.remediation}</td>
                    <td className={cn(td, "font-mono text-sm")}>{f.fixLocation ?? "—"}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section id="retest" aria-labelledby="retest-h" className="mt-16">
          <h2 id="retest-h" className={h2}>F. Retest results</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
            No retests have been recorded. Each fix is marked “{statusLabels.fixed}” until the retest plan is carried out and its outcome written
            here.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Retest results" tabIndex={0}>
            <table className="w-full min-w-[640px] border-collapse">
              <thead className="bg-surface-muted">
                <tr>
                  <th scope="col" className={th}>ID</th>
                  <th scope="col" className={th}>Status</th>
                  <th scope="col" className={th}>Retest to perform / result</th>
                </tr>
              </thead>
              <tbody>
                {accessibilityFindings.map((f) =>
                <tr key={f.id} className="border-t border-line">
                    <td className={cn(td, "font-mono text-sm")}>{f.id}</td>
                    <td className={cn(td, "whitespace-nowrap")}>{statusLabels[f.status]}</td>
                    <td className={td}>{f.retestNotes ?? f.retestPlan.join(" ")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section id="conclusion" aria-labelledby="conclusion-h" className="mt-16">
          <h2 id="conclusion-h" className={h2}>G. Limitations and conclusion</h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-fg-secondary">
            {auditLimitations.map((l) => <li key={l}>{l}</li>)}
          </ul>
          <p className="mt-6 text-[17px] leading-relaxed text-fg-secondary">
            This report does not claim WCAG 2.2 AA conformance for either build. The corrected build addresses {accessibilityFindings.filter((f) => f.status !== "open").length} of{" "}
            {accessibilityFindings.length} findings in code. Whether those fixes hold is a question for the retest, not for this document.
          </p>
        </section>
      </div>
    </div>);

}