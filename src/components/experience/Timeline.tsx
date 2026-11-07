import React from "react";
import type { ExperienceEntry } from "../../types/content";
import { Placeholder } from "../ui/Placeholder";
import { Badge } from "../ui/Badge";

type TimelineProps = {entries: ExperienceEntry[];compact?: boolean;headingLevel?: 3 | 4;};

const kindLabel: Record<ExperienceEntry["kind"], string> = {
  role: "Role",
  education: "Education",
  certification: "Certification"
};

export function Timeline({ entries, compact = false, headingLevel = 3 }: TimelineProps) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <ol className="border-l border-line">
      {entries.map((e) =>
      <li key={e.id} className="relative pb-9 pl-8 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
          <p className="font-mono text-xs text-fg-muted">
            {kindLabel[e.kind]} · {e.placeholder ? <Placeholder>{e.period}</Placeholder> : e.period}
          </p>
          <Heading className="mt-2 text-lg font-semibold text-fg">
            {e.placeholder ?
          <Placeholder>
                {e.title} — {e.organisation}
              </Placeholder> :

          <>
                {e.title} <span className="font-normal text-fg-secondary">· {e.organisation}</span>
              </>
          }
          </Heading>
          {!compact &&
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
              {e.placeholder ? <Placeholder>{e.summary}</Placeholder> : e.summary}
            </p>
        }
          {!compact && !e.placeholder && e.skills.length > 0 &&
        <ul aria-label="Skills applied" className="mt-3 flex flex-wrap gap-2">
              {e.skills.map((s) =>
          <li key={s}>
                  <Badge>{s}</Badge>
                </li>
          )}
            </ul>
        }
          {!compact && e.credentialUrl &&
        <a
              href={e.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-xs text-accent underline-offset-4 hover:text-accent-hover hover:underline">
              View credential →
            </a>
        }</li>
      )}
    </ol>);

}