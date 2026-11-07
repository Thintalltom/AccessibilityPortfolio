import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, PlayIcon, XIcon } from "lucide-react";
import { labModules } from "../../data/labModules";
import { allFindings } from "../../utils/allFindings";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { Callout } from "../../components/ui/Callout";
import { Button } from "../../components/ui/Button";
import { DemoFrame } from "../../components/lab/DemoFrame";
import { PortalShell } from "../../components/portal/PortalShell";
import { FindingExplorer } from "../../components/accessibility/FindingExplorer";

export function LabHome() {
  const [demoOpen, setDemoOpen] = useState(false);
  usePageMeta(
    "AccessLab Demo — Accessibility Lab",
    "A fictional university services portal with intentionally introduced accessibility defects, plus a searchable catalogue of every documented finding."
  );

  return (
    <>
      <PageHeader
        title="AccessLab Demo — University Services Portal"
        description="A fictional student booking portal built to be tested. Each module isolates one area of the journey, with the flawed and corrected builds one switch apart."
        crumbs={[{ label: "accessibility", to: "/accessibility" }, { label: "lab" }]} />
      

      <div className={cn(container, "py-12")}>
        <Callout tone="warning" title="This educational demo contains intentionally introduced accessibility defects.">
          Use the{" "}
          <Link to="/accessibility/remediation" className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover">
            corrected version
          </Link>{" "}
          for the accessible experience. All names, records and appointments are synthetic, and no real university is represented.
        </Callout>

        <section aria-labelledby="modules" className="mt-14">
          <h2 id="modules" className={sectionHeading}>
            Test modules
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {labModules.map((m) => {
              const count = allFindings.filter((f) => f.route === m.path).length;
              return (
                <li key={m.id}>
                  <Link
                    to={m.path}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover">
                    
                    <span className="font-mono text-[13px] text-accent-secondary">/lab/{m.id}</span>
                    <span className="mt-2 text-lg font-semibold text-fg">{m.heading}</span>
                    <span className="mt-2 text-[15px] leading-relaxed text-fg-secondary">{m.summary}</span>
                    <span className="mt-auto flex items-center justify-between pt-5 text-sm">
                      <span className="text-fg-muted">{count} documented findings</span>
                      <span className="flex items-center gap-1 font-medium text-accent">
                        Open module
                        <ArrowRightIcon aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                </li>);

            })}
          </ul>
        </section>

        <section aria-labelledby="full-demo" className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="full-demo" className={sectionHeading}>
                The complete flawed portal
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
                Every seeded defect in one place, for testing the whole journey end to end. It loads only when you ask for it.
              </p>
            </div>
            <Button variant={demoOpen ? "secondary" : "primary"} aria-expanded={demoOpen} aria-controls="flawed-portal" onClick={() => setDemoOpen((v) => !v)}>
              {demoOpen ? <XIcon aria-hidden="true" className="h-4 w-4" /> : <PlayIcon aria-hidden="true" className="h-4 w-4" />}
              {demoOpen ? "Close flawed demo" : "Open flawed demo"}
            </Button>
          </div>
          <div id="flawed-portal" hidden={!demoOpen} className="mt-6">
            {demoOpen &&
            <DemoFrame variant="flawed" title="portal">
                <PortalShell variant="flawed" />
              </DemoFrame>
            }
          </div>
        </section>

        <section aria-labelledby="catalogue" className="mt-20">
          <h2 id="catalogue" className={sectionHeading}>
            Findings catalogue
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
            A curated record of every defect in this controlled demo, not the output of an automated scanner. Filter by severity, component or
            status, or search by ID.
          </p>
          <div className="mt-8">
            <FindingExplorer findings={allFindings} />
          </div>
        </section>
      </div>
    </>);

}