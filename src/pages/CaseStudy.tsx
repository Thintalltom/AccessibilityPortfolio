import React from "react";
import { useParams } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { projects } from "../data/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Callout } from "../components/ui/Callout";
import { Placeholder } from "../components/ui/Placeholder";
import { Badge } from "../components/ui/Badge";
import { NotFound } from "./NotFound";

export function CaseStudy() {
  const { slug } = useParams();
  const study = caseStudies.find((c) => c.slug === slug);
  const project = projects.find((p) => p.slug === slug);
  usePageMeta(study ? `${study.title} case study` : "Page not found", study?.tagline ?? "The requested page could not be found.");

  if (!study) return <NotFound />;

  const toc = [...study.sections.map((s) => ({ id: s.id, title: s.title })), { id: "links", title: "Source and demo" }];

  return (
    <>
      <PageHeader
        title={study.title}
        description={study.tagline}
        crumbs={[{ label: "projects", to: "/projects" }, { label: study.slug }]}>
        
        <dl className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-x-12">
          <div>
            <dt className="font-mono text-xs text-fg-muted">Role</dt>
            <dd className="mt-1 text-fg">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-fg-muted">Stack</dt>
            <dd className="mt-1.5">
              <ul className="flex flex-wrap gap-2">
                {study.stack.map((s) =>
                <li key={s}><Badge>{s}</Badge></li>
                )}
              </ul>
            </dd>
          </div>
        </dl>
      </PageHeader>

      <div className={cn(container, "py-12")}>
        {/* <Callout tone="warning" title="Draft case study — details pending owner verification">
          Only work the owner confirms will be published. Confidential information, internal endpoints and proprietary code are excluded.
        </Callout> */}

        <details className="mt-8 rounded-xl border border-line bg-surface-muted lg:hidden">
          <summary className="cursor-pointer px-4 py-3 font-medium text-fg">On this page</summary>
          <ol className="space-y-2 px-4 pb-4">
            {toc.map((t) =>
            <li key={t.id}>
                <a href={`#${t.id}`} className="text-[15px] text-accent hover:text-accent-hover hover:underline underline-offset-4">{t.title}</a>
              </li>
            )}
          </ol>
        </details>

        <div className="mt-10 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ol className="sticky top-24 space-y-2.5 border-l border-line">
              {toc.map((t) =>
              <li key={t.id}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-muted hover:border-accent hover:text-fg">
                    {t.title}
                  </a>
                </li>
              )}
            </ol>
          </nav>

          <div className="max-w-reading">
            {study.sections.map((s) =>
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="border-b border-line py-8 first:pt-0">
                <h2 id={`${s.id}-h`} className="text-2xl font-semibold text-fg">{s.title}</h2>
                {s.paragraphs.map((p) =>
              <p key={p} className="mt-4 text-[17px] leading-relaxed text-fg-secondary">{p}</p>
              )}
                {s.list &&
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[17px] text-fg-secondary">
                    {s.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
              }
                {s.id === "role" && study.responsibilities &&
              <div className="mt-6 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Responsibilities by layer" tabIndex={0}>
                    <table className="w-full min-w-[560px] border-collapse text-left">
                      <thead className="bg-surface-muted">
                        <tr>
                          <th scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">Area</th>
                          <th scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">Frontend (my work)</th>
                          <th scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">Implemented elsewhere</th>
                        </tr>
                      </thead>
                      <tbody>
                        {study.responsibilities.map((r) =>
                    <tr key={r.area} className="border-t border-line align-top">
                            <th scope="row" className="px-4 py-3 text-[15px] font-medium text-fg">{r.area}</th>
                            <td className="px-4 py-3 text-[15px] text-fg-secondary">{r.frontend}</td>
                            <td className="px-4 py-3 text-[15px] text-fg-secondary">{r.elsewhere}</td>
                          </tr>
                    )}
                      </tbody>
                    </table>
                  </div>
              }
                {s.ownerInput &&
              <ul className="mt-4 space-y-2">
                    {s.ownerInput.map((o) =>
                <li key={o}><Placeholder>{o}</Placeholder></li>
                )}
                  </ul>
              }
              </section>
            )}
            <section id="links" aria-labelledby="links-h" className="py-8">
              <h2 id="links-h" className="text-2xl font-semibold text-fg">Source and demo</h2>
              {project?.nda ? (
                <div className="mt-4 rounded-xl border border-line bg-surface-muted px-5 py-4">
                  <p className="font-mono text-sm font-semibold text-fg">NDA</p>
                  <p className="mt-1 text-[15px] text-fg-muted">This project was built under a Non-Disclosure Agreement. The source code and live URL cannot be shared publicly.</p>
                </div>
              ) : project?.sourceUrl ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                  View source on GitHub →
                </a>
              ) : (
                <p className="mt-4 text-[17px] leading-relaxed text-fg-secondary">
                  No public repository or live demo is linked.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </>);

}