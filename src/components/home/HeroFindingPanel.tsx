import React from "react";
import { accessibilityFindings } from "../../data/accessibilityFindings";
import { StatusBadge } from "../accessibility/StatusBadge";
import { TextLink } from "../ui/TextLink";

const diff: {kind: "-" | "+";text: string;}[] = [
{ kind: "-", text: '<input placeholder="Full name" />' },
{ kind: "+", text: '<label htmlFor="fullName">' },
{ kind: "+", text: "  Full name <span>(required)</span>" },
{ kind: "+", text: "</label>" },
{ kind: "+", text: '<input id="fullName" required' },
{ kind: "+", text: '  aria-describedby="fullName-error" />' }];


export function HeroFindingPanel() {
  const finding = accessibilityFindings.find((f) => f.id === "ALD-001");
  if (!finding) return null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
        <span className="font-mono text-[13px] text-fg-muted">
          <span className="text-accent-secondary">{finding.id}</span> · BookingForm.tsx
        </span>
        <StatusBadge status={finding.status} />
      </div>
      <pre tabIndex={0} aria-label={`Code change for ${finding.id}`} className="overflow-x-auto bg-surface-muted px-5 py-4 font-mono text-[13px] leading-7">
        <code>
          {diff.map((line, i) =>
          <span key={i} className="block whitespace-pre">
              <span className="sr-only">{line.kind === "-" ? "Removed: " : "Added: "}</span>
              <span aria-hidden="true" className={line.kind === "-" ? "text-danger" : "text-success"}>
                {line.kind}{" "}
              </span>
              <span className={line.kind === "-" ? "text-fg-muted line-through decoration-danger" : "text-fg-secondary"}>{line.text}</span>
            </span>
          )}
        </code>
      </pre>
      <figcaption className="space-y-2 border-t border-line px-5 py-4">
        <p className="text-[15px] font-medium text-fg">{finding.title}</p>
        <p className="font-mono text-xs text-fg-muted">WCAG 1.3.1 · 3.3.2 · 4.1.2 — severity: high</p>
        <TextLink to={finding.route} className="text-sm">
          Reproduce it in the lab
        </TextLink>
      </figcaption>
    </figure>);

}