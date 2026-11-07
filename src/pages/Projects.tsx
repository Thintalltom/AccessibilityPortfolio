import React, { useState } from "react";
import type { ProjectCategory } from "../types/content";
import { projects } from "../data/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { ProjectCard } from "../components/projects/ProjectCard";

const filters: {value: ProjectCategory | "all";label: string;}[] = [
{ value: "all", label: "All" },
{ value: "frontend", label: "Frontend engineering" },
{ value: "accessibility", label: "Accessibility QA" },
{ value: "components", label: "Component library" }];


export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  usePageMeta("Projects", "Frontend engineering case studies, an accessible component library, and an accessibility audit lab.");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Case studies written to show the decisions, not just the screenshots. Projects marked “pending verification” are drafts awaiting confirmed details."
        crumbs={[{ label: "projects" }]} />
      
      <div className={cn(container, "py-12")}>
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) =>
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "min-h-[40px] whitespace-nowrap rounded-[10px] border px-4 text-sm font-medium transition-colors duration-150",
              filter === f.value ?
              "border-accent bg-accent-soft text-fg" :
              "border-line-strong text-fg-secondary hover:bg-surface-hover hover:text-fg"
            )}>
            
              {f.label}
            </button>
          )}
        </div>
        <p role="status" className="mt-4 text-[15px] text-fg-muted">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {visible.map((p) =>
          <li key={p.slug}>
              <ProjectCard project={p} headingLevel={2} />
            </li>
          )}
        </ul>
      </div>
    </>);

}