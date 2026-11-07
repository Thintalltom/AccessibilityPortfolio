import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangleIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { container } from "../../utils/layout";
import { TextLink } from "../ui/TextLink";

const entries = [
{ to: "/accessibility/lab", title: "Explore the Lab", text: "Four test modules and a searchable catalogue of every finding." },
{ to: "/accessibility/audits/booking-app", title: "Read an Audit", text: "Scope, method, findings, remediation log and retest status." },
{ to: "/accessibility/remediation", title: "Compare Remediation", text: "Each fix before and after, with the test that verifies it." }];


export function LabPreview() {
  return (
    <section aria-labelledby="lab-heading" className="border-y border-line bg-bg-elevated">
      <div className={cn(container, "grid gap-14 py-20 lg:grid-cols-[1fr_1.05fr] lg:py-24")}>
        <div>
          <p className="font-mono text-[13px] text-accent-secondary">/accessibility</p>
          <h2 id="lab-heading" className="mt-3 text-page font-semibold text-fg">
            Accessibility is more than passing an automated scan.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-secondary">
            I build controlled test environments, investigate accessibility barriers, document findings, implement fixes, and verify the results.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {entries.map((e) =>
            <li key={e.to}>
                <Link to={e.to} className="group flex items-center justify-between gap-6 py-4 transition-colors duration-150 hover:bg-surface-muted">
                  <span>
                    <span className="block font-semibold text-fg">{e.title}</span>
                    <span className="mt-0.5 block text-[15px] text-fg-muted">{e.text}</span>
                  </span>
                  <ArrowRightIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="self-center rounded-2xl border border-line-strong bg-surface p-6 sm:p-7">
          <p className="font-mono text-[13px] text-fg-muted">Sample issue · ALD-001 · Forms</p>
          <h3 className="mt-2 text-lg font-semibold text-fg">A form field without an accessible name</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line p-4">
              <p className="text-sm font-medium text-danger">Flawed build</p>
              <div aria-hidden="true" className="mt-3 rounded-md bg-portal-bg p-3">
                <div className="rounded border border-portal-muted px-2.5 py-2 text-sm text-portal-muted">Full name</div>
              </div>
              <dl className="mt-3 text-sm">
                <dt className="font-mono text-xs text-fg-muted">Accessible name</dt>
                <dd className="mt-0.5 text-fg-secondary">Placeholder only — gone once you type</dd>
              </dl>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="text-sm font-medium text-success">Corrected build</p>
              <div aria-hidden="true" className="mt-3 rounded-md bg-portal-bg p-3">
                <div className="text-xs font-semibold text-portal-ink">
                  Full name <span className="font-normal text-portal-muted">(required)</span>
                </div>
                <div className="mt-1 h-[34px] rounded border border-portal-muted" />
              </div>
              <dl className="mt-3 text-sm">
                <dt className="font-mono text-xs text-fg-muted">Accessible name</dt>
                <dd className="mt-0.5 text-fg-secondary">“Full name”, plus required state</dd>
              </dl>
            </div>
          </div>
          <p className="mt-6 flex gap-2 text-sm leading-relaxed text-fg-muted">
            <AlertTriangleIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            The lab demo contains intentionally introduced defects for educational purposes. A corrected version sits alongside it.
          </p>
          <div className="mt-5">
            <TextLink to="/accessibility/lab/forms">Try it in the Forms module</TextLink>
          </div>
        </div>
      </div>
    </section>);

}