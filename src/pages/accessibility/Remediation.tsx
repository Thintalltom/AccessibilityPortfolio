import React from "react";
import { Link } from "react-router-dom";
import { accessibilityFindings } from "../../data/accessibilityFindings";
import { usePageMeta } from "../../hooks/usePageMeta";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { PageHeader } from "../../components/ui/PageHeader";
import { Callout } from "../../components/ui/Callout";
import { DemoFrame } from "../../components/lab/DemoFrame";
import { PortalShell } from "../../components/portal/PortalShell";
import { RemediationEntry } from "../../components/accessibility/RemediationEntry";

export function Remediation() {
  usePageMeta(
    "Remediation: before and after",
    "The corrected AccessLab portal, with each accessibility fix shown before and after alongside its retest plan and result."
  );

  return (
    <>
      <PageHeader
        title="Remediation: before and after"
        description="The corrected portal, followed by every fix — what was wrong, what changed in the code, and how the change is verified."
        crumbs={[{ label: "accessibility", to: "/accessibility" }, { label: "remediation" }]} />
      
      <div className={cn(container, "py-12")}>
        <Callout title="This is the corrected build.">
          It is the accessible version of the demo. To compare, open the matching module in the{" "}
          <Link to="/accessibility/lab" className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover">
            flawed lab
          </Link>
          , which is clearly labelled. Fixes are marked “not yet retested” until a retest is recorded.
        </Callout>

        <div className="mt-8">
          <DemoFrame variant="fixed" title="portal">
            <PortalShell variant="fixed" />
          </DemoFrame>
        </div>

        <section aria-labelledby="fixes" className="mt-20">
          <h2 id="fixes" className={sectionHeading}>
            Fix log
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
            {accessibilityFindings.length} findings. Each entry links back to the original defect and to its audit record.
          </p>
          <div className="mt-6">
            {accessibilityFindings.map((f) =>
            <RemediationEntry key={f.id} finding={f} />
            )}
          </div>
        </section>
      </div>
    </>);

}