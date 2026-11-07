import React from "react";
import { coreWebVitals } from "../../data/performance";
import { performanceFindings } from "../../data/performanceFindings";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { FindingItem } from "../../components/accessibility/FindingItem";

const approach = [
{ step: "Measure", text: "Establish a baseline under fixed, recorded conditions before touching code." },
{ step: "Profile", text: "Use the DevTools Performance panel and React Profiler to find where time actually goes." },
{ step: "Change one thing", text: "A single, reviewable change makes the cause of any difference clear." },
{ step: "Re-measure", text: "Same device, same throttling, same number of runs. Report medians, not best runs." }];


export function PerformanceOverview() {
  usePageMeta("Performance engineering", "How I measure and improve frontend performance, with Core Web Vitals definitions and controlled experiments.");

  return (
    <>
      <PageHeader
        title="Performance engineering"
        description="Measure first, change one thing, and measure again under the same conditions. Anything else is guessing."
        crumbs={[{ label: "performance" }]}>
        
        <ButtonLink to="/performance/lab">Open the performance lab</ButtonLink>
      </PageHeader>

      <div className={cn(container, "py-14")}>
        <section aria-labelledby="approach" className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 id="approach" className={sectionHeading}>Approach</h2>
          <ol className="border-l border-line">
            {approach.map((a, i) =>
            <li key={a.step} className="relative pb-7 pl-8 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
                <p className="font-mono text-[13px] text-accent-secondary">{i + 1}. {a.step}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{a.text}</p>
              </li>
            )}
          </ol>
        </section>

        <section aria-labelledby="cwv" className="mt-20">
          <h2 id="cwv" className={sectionHeading}>Core Web Vitals</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-secondary">
            Google’s thresholds, assessed at the 75th percentile of real page loads, split by mobile and desktop. Lab tools such as Lighthouse
            estimate LCP and CLS and use Total Blocking Time as a proxy for responsiveness; INP requires real interactions.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Core Web Vitals thresholds" tabIndex={0}>
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-surface-muted">
                <tr>
                  {["Metric", "What it measures", "Good", "Needs improvement", "Poor"].map((h) =>
                  <th key={h} scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">{h}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {coreWebVitals.map((v) =>
                <tr key={v.metric} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-3 text-[15px] font-medium text-fg">{v.metric}</th>
                    <td className="px-4 py-3 text-[15px] text-fg-secondary">{v.measures}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-success">{v.good}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-warning">{v.needsImprovement}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-danger">{v.poor}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="perf-findings" className="mt-20">
          <h2 id="perf-findings" className={sectionHeading}>Documented performance findings</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-secondary">
            From the controlled lab. No production measurements are published yet.
          </p>
          <ul className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
            {performanceFindings.map((f) => <FindingItem key={f.id} finding={f} />)}
          </ul>
        </section>
      </div>
    </>);

}