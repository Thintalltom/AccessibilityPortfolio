import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import type { Project } from "../../types/content";
import { Badge } from "../ui/Badge";

type ProjectCardProps = {project: Project;headingLevel?: 2 | 3;};

export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-muted px-5 py-3">
        <span className="truncate font-mono text-[13px] text-accent-secondary">{project.caseStudyPath}</span>
        <span className="shrink-0 font-mono text-xs text-fg-muted">{project.categoryLabel}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Heading className="text-xl font-semibold text-fg">{project.title}</Heading>
          {project.verification === "pending" && <Badge tone="warning">Details pending verification</Badge>}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">{project.summary}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
          <span className="font-medium text-fg">My contribution: </span>
          {project.contribution}
        </p>
        <ul aria-label="Technologies" className="mb-6 mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) =>
          <li key={t}>
              <Badge>{t}</Badge>
            </li>
          )}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
          <Link
            to={project.caseStudyPath}
            className="group inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
            
            Read the {project.title} case study
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          {project.liveUrl &&
          <a href={project.liveUrl} className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg hover:underline underline-offset-4">
              Live demo <ExternalLinkIcon aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          }
          {project.sourceUrl &&
          <a href={project.sourceUrl} className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg hover:underline underline-offset-4">
              Source code <ExternalLinkIcon aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          }
        </div>
      </div>
    </article>);

}