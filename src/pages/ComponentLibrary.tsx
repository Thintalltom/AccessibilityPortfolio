import React from "react";
import { libraryDocs } from "../data/libraryDocs";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Callout } from "../components/ui/Callout";
import { CodeBlock } from "../components/ui/CodeBlock";
import { Tabs } from "../components/library/Tabs";
import { LibraryDemo } from "../components/library/LibraryDemo";

export function ComponentLibrary() {
  usePageMeta(
    "Accessible React component library",
    "Twelve React and TypeScript components built semantic-HTML-first, each with a live demo, keyboard behaviour, naming strategy and known limitations."
  );

  return (
    <>
      <PageHeader
        title="Accessible React component library"
        description="Semantic HTML first, ARIA only where a pattern needs it. Each component documents how it is named, how it behaves from the keyboard, and where it falls short."
        crumbs={[{ label: "projects", to: "/projects" }, { label: "accessible-component-library" }]} />
      
      <div className={cn(container, "py-12")}>
        <Callout title="Testing status">
          Automated tests for several components live in <span className="font-mono text-sm">tests/</span> and have not been run in CI yet. Manual
          screen reader notes describe what to verify, not completed results. No component is claimed accessible because a scan passed.
        </Callout>

        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
          <nav aria-label="Components" className="hidden lg:block">
            <ul className="sticky top-24 space-y-2 border-l border-line">
              {libraryDocs.map((d) =>
              <li key={d.id}>
                  <a href={`#${d.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-muted hover:border-accent hover:text-fg">
                    {d.name}
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div className="space-y-20">
            {libraryDocs.map((d) =>
            <section key={d.id} id={d.id} aria-labelledby={`${d.id}-h`}>
                <h2 id={`${d.id}-h`} className="text-2xl font-semibold text-fg">{d.name}</h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">{d.summary}</p>

                <div className="mt-6 rounded-2xl border border-line bg-surface p-6 sm:p-8">
                  <p className="mb-4 font-mono text-xs text-fg-muted">Live demo</p>
                  <LibraryDemo id={d.id} />
                </div>

                <div className="mt-6">
                  <Tabs
                  label={`${d.name} documentation`}
                  tabs={[
                  { id: "code", label: "Source", content: <CodeBlock code={d.source} label={`${d.name} (excerpt)`} /> },
                  {
                    id: "keyboard",
                    label: "Keyboard",
                    content:
                    <table className="w-full border-collapse text-left">
                            <caption className="sr-only">{d.name} keyboard behaviour</caption>
                            <thead>
                              <tr>
                                <th scope="col" className="w-48 pb-2 font-mono text-xs font-medium text-fg-muted">Key</th>
                                <th scope="col" className="pb-2 font-mono text-xs font-medium text-fg-muted">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {d.keyboard.map((k) =>
                        <tr key={k.keys} className="border-t border-line">
                                  <td className="py-2.5 font-mono text-sm text-fg">{k.keys}</td>
                                  <td className="py-2.5 text-[15px] text-fg-secondary">{k.action}</td>
                                </tr>
                        )}
                            </tbody>
                          </table>

                  },
                  {
                    id: "a11y",
                    label: "Naming & states",
                    content:
                    <dl className="space-y-4 text-[15px] leading-relaxed">
                            <div><dt className="font-medium text-fg">Accessible name</dt><dd className="mt-1 text-fg-secondary">{d.naming}</dd></div>
                            <div><dt className="font-medium text-fg">Error and state behaviour</dt><dd className="mt-1 text-fg-secondary">{d.states}</dd></div>
                          </dl>

                  },
                  {
                    id: "testing",
                    label: "Testing",
                    content:
                    <div className="space-y-4 text-[15px] leading-relaxed">
                            <div>
                              <p className="font-medium text-fg">Behaviour to cover in automated tests</p>
                              <ul className="mt-2 list-disc space-y-1 pl-5 text-fg-secondary">{d.tests.map((t) => <li key={t}>{t}</li>)}</ul>
                            </div>
                            <div>
                              <p className="font-medium text-fg">Manual testing notes</p>
                              <p className="mt-1 text-fg-secondary">{d.manualNotes}</p>
                            </div>
                          </div>

                  },
                  {
                    id: "limits",
                    label: "Limitations",
                    content: <ul className="list-disc space-y-1 pl-5 text-[15px] text-fg-secondary">{d.limitations.map((l) => <li key={l}>{l}</li>)}</ul>
                  }]
                  } />
                
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>);

}