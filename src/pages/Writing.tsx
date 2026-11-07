import React from "react";
import { FileTextIcon } from "lucide-react";
import { articles } from "../data/articles";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container, sectionHeading } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Badge } from "../components/ui/Badge";

export function Writing() {
  usePageMeta("Writing", "Technical articles and engineering notes on accessibility testing, frontend engineering and performance.");
  const published = articles.filter((a) => a.status === "published");
  const drafts = articles.filter((a) => a.status === "draft");

  return (
    <>
      <PageHeader
        title="Writing"
        description="Notes on accessibility testing, frontend engineering and performance — written from the lab work on this site."
        crumbs={[{ label: "writing" }]} />
      
      <div className={cn(container, "py-12")}>
        <section aria-labelledby="published">
          <h2 id="published" className={sectionHeading}>Published</h2>
          {published.length === 0 ?
          <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-strong p-8">
              <FileTextIcon aria-hidden="true" className="h-7 w-7 text-fg-muted" />
              <p className="font-medium text-fg">No articles published yet.</p>
              <p className="max-w-lg text-[15px] text-fg-muted">
                The pieces below are in progress. They will appear here with a publication date and reading time once they are finished.
              </p>
            </div> :

          <ul className="mt-6 divide-y divide-line border-y border-line">
              {published.map((a) =>
            <li key={a.slug} className="py-5">
                  <h3 className="text-lg font-semibold text-fg">{a.title}</h3>
                  <p className="mt-1 text-[15px] text-fg-secondary">{a.summary}</p>
                  <p className="mt-2 font-mono text-xs text-fg-muted">{a.topic}{a.publishedOn && ` · ${a.publishedOn}`}</p>
                </li>
            )}
            </ul>
          }
        </section>

        <section aria-labelledby="drafts" className="mt-16">
          <h2 id="drafts" className={sectionHeading}>In preparation</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {drafts.map((a) =>
            <li key={a.slug} className="grid gap-2 py-5 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-fg">{a.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{a.summary}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge>{a.topic}</Badge>
                  <Badge tone="warning">Draft</Badge>
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>
    </>);

}