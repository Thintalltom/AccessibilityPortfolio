import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { accessibilityFindings } from "../../data/accessibilityFindings";
import { countBy } from "../../utils/findings";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { SeverityFramework } from "../../components/accessibility/SeverityFramework";

const method = [
{ step: "Build", text: "Create a realistic, controlled application — here, a fictional student booking portal." },
{ step: "Test", text: "Evaluate with a keyboard, screen readers, browser tools and automated checks, each for what it is good at." },
{ step: "Find", text: "Document each barrier with reproduction steps, impact, a reasoned severity and relevant WCAG criteria." },
{ step: "Fix", text: "Change the code, preferring native HTML semantics over added ARIA." },
{ step: "Prove", text: "Retest the exact steps that reproduced the issue and record the result honestly — including when it still fails." }];


const entryPoints = [
{ to: "/accessibility/lab", title: "Explore the Lab", text: "Four test modules, the complete flawed portal, and a searchable catalogue of every finding." },
{ to: "/accessibility/audits/booking-app", title: "Read an Audit", text: "A structured, printable report: scope, method, detailed findings, remediation log and retest status." },
{ to: "/accessibility/remediation", title: "Compare Remediation", text: "The corrected portal, with each fix shown before and after alongside the test that verifies it." }];


const scanLimits = {
  can: ["Missing form labels and accessible names", "Many colour contrast failures", "Invalid or misused ARIA attributes", "Missing document language and page titles"],
  cannot: ["Whether a label or alt text is actually meaningful", "Whether focus order makes sense", "Whether a dialog manages focus correctly", "Whether a task can be completed with a screen reader"]
};

export function AccessibilityOverview() {
  usePageMeta(
    "Accessibility Lab",
    "A practical accessibility lab: a controlled demo application, documented findings, an audit report and verified remediation."
  );
  const byStatus = countBy(accessibilityFindings, (f) => f.status);

  return (
    <>
      <PageHeader
        title="Accessibility is more than passing an automated scan."
        description="I build controlled test environments, investigate accessibility barriers, document findings, implement fixes, and verify the results."
        crumbs={[{ label: "accessibility" }]} />
      

      <div className={cn(container, "py-14")}>
        <section aria-labelledby="start">
          <h2 id="start" className="sr-only">
            Where to start
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {entryPoints.map((e) =>
            <li key={e.to} className="bg-surface">
                <Link to={e.to} className="group flex h-full flex-col p-6 transition-colors duration-150 hover:bg-surface-hover">
                  <span className="text-lg font-semibold text-fg">{e.title}</span>
                  <span className="mt-2 text-[15px] leading-relaxed text-fg-secondary">{e.text}</span>
                  <ArrowRightIcon aria-hidden="true" className="mt-auto h-5 w-5 pt-1 text-accent transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </li>
            )}
          </ul>
          <p className="mt-5 text-[15px] text-fg-muted">
            Current dataset: {accessibilityFindings.length} seeded accessibility findings — {byStatus.fixed ?? 0} fixed in code,{" "}
            {byStatus.retested ?? 0} retested, {byStatus.open ?? 0} still open.
          </p>
        </section>

        <section aria-labelledby="method" className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 id="method" className={sectionHeading}>
              The method
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
              The order matters. A fix without a retest is a hypothesis; a finding without reproduction steps is an opinion.
            </p>
          </div>
          <ol className="border-l border-line">
            {method.map((m, i) =>
            <li key={m.step} className="relative pb-7 pl-8 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
                <p className="font-mono text-[13px] text-accent-secondary">
                  {i + 1}. {m.step}
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{m.text}</p>
              </li>
            )}
          </ol>
        </section>

        <section aria-labelledby="severity" className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 id="severity" className={sectionHeading}>
              Severity framework
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
              Severity describes the assessed impact on people completing tasks. It is assigned per finding, with a written rationale.
            </p>
          </div>
          <SeverityFramework />
        </section>

        <section aria-labelledby="scans" className="mt-20">
          <h2 id="scans" className={sectionHeading}>
            What automated scans can and cannot tell you
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-fg">Reliably detected by tools such as axe-core</h3>
              <ul className="mt-4 space-y-2.5">
                {scanLimits.can.map((item) =>
                <li key={item} className="border-l-2 border-success pl-4 text-[15px] text-fg-secondary">
                    {item}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-fg">Requires human judgement</h3>
              <ul className="mt-4 space-y-2.5">
                {scanLimits.cannot.map((item) =>
                <li key={item} className="border-l-2 border-warning pl-4 text-[15px] text-fg-secondary">
                    {item}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>);

}