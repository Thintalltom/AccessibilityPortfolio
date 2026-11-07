import React from "react";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";
import { articles } from "../data/articles";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container, sectionHeading } from "../utils/layout";
import { HomeHero } from "../components/home/HomeHero";
import { Capabilities } from "../components/home/Capabilities";
import { LabPreview } from "../components/home/LabPreview";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Timeline } from "../components/experience/Timeline";
import { ContactLinks } from "../components/contact/ContactLinks";
import { TextLink } from "../components/ui/TextLink";
import { Badge } from "../components/ui/Badge";

export function Home() {
  usePageMeta(
    "Frontend Engineer & Accessibility QA Specialist",
    "Portfolio of a frontend engineer and accessibility QA specialist: React and TypeScript projects, an interactive accessibility lab, audits and measured performance work."
  );
  const published = articles.filter((a) => a.status === "published");
  const drafts = articles.filter((a) => a.status === "draft");

  return (
    <>
      <HomeHero />
      <Capabilities />

      <section aria-labelledby="projects-heading" className={cn(container, "pb-20 lg:pb-24")}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="projects-heading" className={sectionHeading}>
            Featured projects
          </h2>
          <TextLink to="/projects">All projects</TextLink>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) =>
          <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          )}
        </ul>
      </section>

      <LabPreview />

      <section aria-labelledby="skills-heading" className={cn(container, "grid gap-10 py-20 lg:grid-cols-[1fr_2fr] lg:py-24")}>
        <div>
          <h2 id="skills-heading" className={sectionHeading}>
            Selected technical skills
          </h2>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-fg-secondary">
            Grouped by how I use them. Every tool listed here is one I can demonstrate.
          </p>
        </div>
        <dl className="divide-y divide-line border-y border-line">
          {skillGroups.map((g) =>
          <div key={g.category} className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
              <dt className="font-mono text-[13px] leading-6 text-accent-secondary">{g.category}</dt>
              <dd className="text-[15px] leading-6 text-fg-secondary">{g.items.join(" · ")}</dd>
            </div>
          )}
        </dl>
      </section>

      <section aria-labelledby="experience-heading" className="border-t border-line">
        <div className={cn(container, "grid gap-12 py-20 lg:grid-cols-2 lg:py-24")}>
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="experience-heading" className={sectionHeading}>
                Experience
              </h2>
              <TextLink to="/experience">Full experience</TextLink>
            </div>
            <div className="mt-8">
              <Timeline entries={experience.slice(0, 3)} compact />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className={sectionHeading}>Writing</h2>
              <TextLink to="/writing">All writing</TextLink>
            </div>
            {published.length > 0 ?
            <ul className="mt-8 divide-y divide-line border-y border-line">
                {published.slice(0, 3).map((a) =>
              <li key={a.slug} className="py-4">
                    <p className="font-medium text-fg">{a.title}</p>
                    <p className="mt-1 text-[15px] text-fg-muted">{a.summary}</p>
                  </li>
              )}
              </ul> :

            <div className="mt-8">
                <p className="text-[15px] text-fg-secondary">Nothing published yet. In preparation:</p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {drafts.slice(0, 4).map((a) =>
                <li key={a.slug} className="flex items-start justify-between gap-4 py-3.5">
                      <span className="text-[15px] text-fg">{a.title}</span>
                      <Badge>Draft</Badge>
                    </li>
                )}
                </ul>
              </div>
            }
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="border-t border-line bg-bg-elevated">
        <div className={cn(container, "grid gap-10 py-20 lg:grid-cols-2 lg:py-24")}>
          <h2 id="contact-heading" className="text-page font-semibold text-fg">
            Have a project, accessibility challenge, or engineering opportunity?
          </h2>
          <ContactLinks />
        </div>
      </section>
    </>);

}