import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { LabModuleId } from "../../types/content";
import type { DemoVariant } from "../../types/portal";
import { labModules } from "../../data/labModules";
import { allFindings } from "../../utils/allFindings";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { Callout } from "../../components/ui/Callout";
import { VariantSwitch } from "../../components/lab/VariantSwitch";
import { DemoFrame } from "../../components/lab/DemoFrame";
import { LabModuleDemo } from "../../components/lab/LabModuleDemo";
import { FindingItem } from "../../components/accessibility/FindingItem";

export function LabModule({ moduleId }: {moduleId: LabModuleId;}) {
  const index = labModules.findIndex((m) => m.id === moduleId);
  const mod = labModules[index];
  const prev = labModules[index - 1];
  const next = labModules[index + 1];
  const [variant, setVariant] = useState<DemoVariant>("flawed");
  const related = allFindings.filter((f) => f.route === mod.path);

  usePageMeta(`${mod.title} — Accessibility Lab`, mod.summary);

  return (
    <>
      <PageHeader
        title={mod.heading}
        description={mod.summary}
        crumbs={[
        { label: "accessibility", to: "/accessibility" },
        { label: "lab", to: "/accessibility/lab" },
        { label: mod.id }]
        } />
      

      <div className={cn(container, "py-12")}>
        {variant === "flawed" ?
        <Callout tone="warning" title="This educational demo contains intentionally introduced accessibility defects.">
            Use the corrected version for the accessible experience — switch to “Corrected build” below, or open the{" "}
            <Link to="/accessibility/remediation" className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover">
              remediation page
            </Link>
            .
          </Callout> :

        <Callout title="You are viewing the corrected build.">
            Each documented defect has been addressed in code. Retests have not yet been recorded — see each finding’s status.
          </Callout>
        }

        <div className="mt-8">
          <VariantSwitch value={variant} onChange={setVariant} />
        </div>

        <div className="mt-6">
          <DemoFrame variant={variant} title={mod.id}>
            <LabModuleDemo key={variant} moduleId={mod.id} variant={variant} />
          </DemoFrame>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <section aria-labelledby="how-to-test">
            <h2 id="how-to-test" className={sectionHeading}>
              How to test it
            </h2>
            <ol className="mt-6 space-y-4">
              {mod.howToTest.map((step, i) =>
              <li key={step} className="flex gap-4">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-sm text-accent-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-fg-secondary">{step}</span>
                </li>
              )}
            </ol>
          </section>

          <section aria-labelledby="module-findings">
            <h2 id="module-findings" className={sectionHeading}>
              Documented findings ({related.length})
            </h2>
            <ul className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
              {related.map((f) =>
              <FindingItem key={f.id} finding={f} />
              )}
            </ul>
          </section>
        </div>

        <nav aria-label="Lab modules" className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between">
          {prev ?
          <Link to={prev.path} className="group flex items-center gap-3 rounded-lg text-fg-secondary hover:text-fg">
              <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
              <span>
                <span className="block font-mono text-xs text-fg-muted">Previous module</span>
                {prev.title}
              </span>
            </Link> :

          <Link to="/accessibility/lab" className="group flex items-center gap-3 rounded-lg text-fg-secondary hover:text-fg">
              <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
              <span>
                <span className="block font-mono text-xs text-fg-muted">Back to</span>
                Lab overview
              </span>
            </Link>
          }
          {next ?
          <Link to={next.path} className="group flex items-center gap-3 rounded-lg text-right text-fg-secondary hover:text-fg sm:flex-row-reverse">
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
              <span>
                <span className="block font-mono text-xs text-fg-muted">Next module</span>
                {next.title}
              </span>
            </Link> :

          <Link to="/accessibility/audits/booking-app" className="group flex items-center gap-3 rounded-lg text-right text-fg-secondary hover:text-fg sm:flex-row-reverse">
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
              <span>
                <span className="block font-mono text-xs text-fg-muted">Next</span>
                Read the audit report
              </span>
            </Link>
          }
        </nav>
      </div>
    </>);

}