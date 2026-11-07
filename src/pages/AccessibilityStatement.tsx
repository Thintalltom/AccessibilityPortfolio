import React from "react";
import { contrastPairs } from "../data/tokens";
import { site } from "../data/site";
import { contrastRatio, formatRatio } from "../utils/contrast";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { readingContainer } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Placeholder } from "../components/ui/Placeholder";

const h2 = "mt-14 text-2xl font-semibold text-fg";
const p = "mt-4 text-[17px] leading-relaxed text-fg-secondary";

export function AccessibilityStatement() {
  usePageMeta("Accessibility statement", "Accessibility goals, target standard, evaluation methods and known limitations for this portfolio.");

  return (
    <>
      <PageHeader
        width="reading"
        title="Accessibility statement"
        description="What this site aims for, how it has been checked so far, and where it falls short."
        crumbs={[{ label: "accessibility-statement" }]} />
      
      <div className={cn(readingContainer, "pb-12")}>
        <h2 className={h2}>Goal and standard</h2>
        <p className={p}>
          This portfolio aims to meet WCAG 2.2 Level AA. That is a target, not a claim: conformance has not been formally evaluated and is not
          asserted here.
        </p>
        <p className={p}>
          The demo pages under <span className="font-mono text-[15px]">/accessibility/lab</span> deliberately contain accessibility defects for
          teaching purposes and are excluded from this target. Each is clearly labelled, and a corrected version is always available.
        </p>

        <h2 className={h2}>What has been done</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-fg-secondary">
          <li>Built with semantic landmarks, a skip link, a logical heading structure and native controls in preference to ARIA.</li>
          <li>Focus moves to the main content on navigation; every interactive element has a visible focus indicator.</li>
          <li>Status, severity and the active page are communicated with text or shape, not colour alone.</li>
          <li>Animations are limited and respect the reduced-motion preference.</li>
          <li>Colour contrast was calculated for the token pairs below.</li>
        </ul>

        <h2 className={h2}>Colour contrast review</h2>
        <p className={p}>
          Calculated from the design tokens using the WCAG relative luminance formula. One original token failed the 3:1 requirement for form
          control boundaries, so a separate input border token was introduced.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Contrast ratios" tabIndex={0}>
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead className="bg-surface-muted">
              <tr>
                {["Use", "Foreground / background", "Ratio", "Needs", "Result"].map((h) =>
                <th key={h} scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {contrastPairs.map((pair) => {
                const ratio = contrastRatio(pair.fg, pair.bg);
                const pass = ratio >= pair.required;
                return (
                  <tr key={pair.use} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 text-[15px] font-normal text-fg-secondary">{pair.use}</th>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2 font-mono text-xs text-fg-muted">
                        <span aria-hidden="true" className="h-4 w-4 rounded border border-line-strong" style={{ background: pair.fg }} />
                        {pair.fgToken} / {pair.bgToken}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-fg">{formatRatio(ratio)}</td>
                    <td className="px-4 py-3 font-mono text-sm text-fg-muted">{pair.required}:1</td>
                    <td className={cn("px-4 py-3 text-sm font-medium", pass ? "text-success" : "text-danger")}>{pass ? "Pass" : "Fail — not used for this purpose"}</td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>What has not been done yet</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-fg-secondary">
          <li>No recorded screen reader testing of the portfolio pages.</li>
          <li>No testing with disabled users.</li>
          <li>Automated axe-core checks and Playwright tests are written but have not been run in a CI environment yet.</li>
        </ul>

        <h2 className={h2}>Known limitations</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-fg-secondary">
          <li>Some wide tables scroll horizontally on small screens. Their scroll regions are labelled and keyboard focusable.</li>
          <li>The flawed lab builds are intentionally inaccessible.</li>
        </ul>

        <h2 className={h2}>Report a barrier</h2>
        <p className={p}>
          If something here doesn’t work for you, please get in touch:{" "}
          {site.email ?
          <a href={`mailto:${site.email}`} className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover">{site.email}</a> :

          <Placeholder>contact email</Placeholder>
          }
          . I aim to reply within five working days.
        </p>

        <h2 className={h2}>Last reviewed</h2>
        <p className={p}>
          {site.lastAccessibilityReview ?? <Placeholder>date of the most recent genuine review</Placeholder>}
        </p>
      </div>
    </>);

}