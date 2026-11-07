import React from "react";
import { lighthouseResults, lighthouseWorkflow, performanceLimitations } from "../../data/performance";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { Callout } from "../../components/ui/Callout";
import { Placeholder } from "../../components/ui/Placeholder";
import { EnvironmentPanel } from "../../components/performance/EnvironmentPanel";
import { CalculationExperiment } from "../../components/performance/CalculationExperiment";
import { RerenderExperiment } from "../../components/performance/RerenderExperiment";

export function PerformanceLab() {
  usePageMeta(
    "Performance lab",
    "Controlled frontend performance experiments, measured live in your browser, plus a documented Lighthouse workflow."
  );

  return (
    <>
      <PageHeader
        title="Performance lab"
        description="Two controlled experiments you can run and measure yourself, and a documented workflow for page-level measurement."
        crumbs={[{ label: "performance", to: "/performance" }, { label: "lab" }]} />
      
      <div className={cn(container, "py-12")}>
        <Callout title="Every number on this page is measured in your browser when you run it.">
          Nothing is pre-filled. Results vary by device; compare modes within one session. Experiments run entirely client-side on synthetic data
          and make no network requests.
        </Callout>

        <section aria-labelledby="env" className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="env" className={sectionHeading}>Test environment</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
              Reported by your browser. Record these alongside any results you share.
            </p>
          </div>
          <EnvironmentPanel />
        </section>

        <section aria-labelledby="exp1" className="mt-20">
          <p className="font-mono text-[13px] text-accent-secondary">PRF-001</p>
          <h2 id="exp1" className={cn(sectionHeading, "mt-1")}>Experiment 1: Expensive calculation on every render</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-secondary">
            Statistics over 40,000 synthetic appointment records are derived during render. The note field has nothing to do with the
            calculation, yet in the baseline every keystroke repeats it. Run 20 updates in each mode and compare “calculations run”.
          </p>
          <div className="mt-8"><CalculationExperiment /></div>
        </section>

        <section aria-labelledby="exp2" className="mt-20">
          <p className="font-mono text-[13px] text-accent-secondary">PRF-002</p>
          <h2 id="exp2" className={cn(sectionHeading, "mt-1")}>Experiment 2: Rows re-rendering with their parent</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-secondary">
            A parent counter updates; the 150 rows do not use it. Baseline rows re-render anyway. Optimised rows are memoised and skipped when
            their props are unchanged.
          </p>
          <div className="mt-8"><RerenderExperiment /></div>
        </section>

        <section aria-labelledby="exp3" className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="exp3" className={sectionHeading}>Experiment 3: Page-level measurement with Lighthouse</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
              Lighthouse cannot be run from inside a web page, so this is a manual, documented workflow. The results table stays empty until real
              runs are recorded.
            </p>
            <ol className="mt-6 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-fg-secondary">
              {lighthouseWorkflow.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line self-start" role="region" aria-label="Lighthouse results" tabIndex={0}>
            <table className="w-full min-w-[480px] border-collapse text-left">
              <caption className="px-4 py-3 text-left text-sm text-fg-muted">Lighthouse results (median of five runs)</caption>
              <thead className="bg-surface-muted">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">Metric</th>
                  <th scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">Baseline</th>
                  <th scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">Optimised</th>
                </tr>
              </thead>
              <tbody>
                {lighthouseResults.map((r) =>
                <tr key={r.metric} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 text-[15px] font-normal text-fg-secondary">{r.metric}</th>
                    <td className="px-4 py-3 text-sm">{r.baseline ?? <Placeholder>not yet measured</Placeholder>}</td>
                    <td className="px-4 py-3 text-sm">{r.optimised ?? <Placeholder>not yet measured</Placeholder>}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="limits" className="mt-20">
          <h2 id="limits" className={sectionHeading}>Known limitations</h2>
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-fg-secondary">
            {performanceLimitations.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </section>
      </div>
    </>);

}