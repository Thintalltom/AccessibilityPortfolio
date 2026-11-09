import React from "react";
import { site } from "../../data/site";
import { cn } from "../../utils/cn";
import { container } from "../../utils/layout";
import { ButtonLink } from "../ui/ButtonLink";
import { TextLink } from "../ui/TextLink";
import { HeroFindingPanel } from "./HeroFindingPanel";
import logo from '../../Asset/Profile_Picture.png';

const motto = ["Build it.", "Test it.", "Find the problems.", "Fix them.", "Prove the improvements."];

export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
      <div className={cn(container, "grid items-center gap-14 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24")}>
        <div>
          <p className="text-[17px] text-fg-secondary">
            <span className="font-medium text-fg">{site.ownerName ?? "Yourgg Name"}</span>
            <span aria-hidden="true"> — </span>
            <span className="sr-only">, </span>
            <span className="text-accent">{site.role}</span>
          </p>
          <h1 id="hero-heading" className="mt-5 text-hero font-semibold text-fg">
            I build modern web applications and help make digital experiences more accessible.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-secondary">
            I work across React and TypeScript development, accessibility testing and quality engineering. I enjoy turning technical problems
            into usable, maintainable and more inclusive digital experiences.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/projects">Explore My Projects</ButtonLink>
            <ButtonLink to="/accessibility" variant="secondary">
              Explore Accessibility Lab
            </ButtonLink>
          </div>
          {/* <div className="mt-6">
            {site.cvUrl ?
            <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover">
                View my CV
              </a> :

            <TextLink to="/experience#cv">View my CV and experience</TextLink>
            }
          </div> */}
        </div>
        <div className="relative flex items-end justify-center pb-16 pl-4">
          {/* Circle background + photo */}
          <div className="relative h-[420px] w-[420px] shrink-0">
            <div className="absolute inset-0 rounded-full bg-surface-hover" />
            <img
              src={logo}
              alt="Portrait of Tomide"
              className="absolute inset-0 h-full w-full rounded-full object-cover object-top"
            />
          </div>
          {/* Floating finding panel */}
          {/* <div className="absolute -bottom-8 left-0 w-[88%] max-w-sm">
            <HeroFindingPanel />
          </div> */}
        </div>
      </div>
      <div className="border-t border-line">
        <ol aria-label="How I work" className={cn(container, "grid grid-cols-1 gap-y-3 py-6 sm:grid-cols-5 sm:gap-x-6")}>
          {motto.map((m, i) =>
          <li key={m} className="flex items-baseline gap-2 text-[15px] text-fg-secondary">
              <span aria-hidden="true" className="font-mono text-xs text-accent-secondary">
                {i + 1}
              </span>
              {m}
            </li>
          )}
        </ol>
      </div>
    </section>);

}