
import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { readingContainer } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { TextLink } from "../components/ui/TextLink";

const h2 = "mt-14 text-2xl font-semibold text-fg";
const p = "mt-4 text-[17px] leading-relaxed text-fg-secondary";

const debugging = [
  "Reproduce the issue consistently and document the steps.",
  "Isolate the problem to understand where and why it occurs.",
  "Form a hypothesis and test it before introducing changes.",
  "Fix the underlying cause, then verify the solution through testing."
];

export function About() {
  usePageMeta(
    "About",
    "I'm Tomide Adeyanju, a Frontend Engineer and Accessibility Specialist focused on building usable, inclusive, and reliable web experiences."
  );

  return (
    <>
      <PageHeader
        width="reading"
        title="About"
        description="I build for the web, and I believe a great interface should work for everyone."
        crumbs={[{ label: "about" }]}
      />

      <div className={cn(readingContainer, "pb-12")}>
        <p className={p}>
          I'm Tomide Adeyanju, a Frontend Engineer and Accessibility QA
          Specialist with over two years of professional experience building
          modern web applications. I work primarily with React, TypeScript,
          JavaScript, and modern frontend technologies, turning complex
          requirements into responsive, intuitive, and maintainable user
          interfaces.
        </p>

        <p className={p}>
          My experience includes developing enterprise applications,
          interactive dashboards, API integrations, and contributing to
          technology platforms with real-world users and business needs.
          I enjoy understanding how products work beyond the visual layer,
          from component architecture and application behaviour to the
          details that make an interface reliable.
        </p>

        <h2 className={h2}>How I approach frontend engineering</h2>

        <p className={p}>
          I see frontend engineering as more than making interfaces look
          good. It is about building experiences that are predictable,
          performant, responsive, and easy to maintain. I care about
          thoughtful component architecture, reusable patterns, clean
          code, meaningful types, and interactions that behave as users
          expect.
        </p>

        <p className={p}>
          I also believe in using the web platform properly. Semantic HTML,
          native browser behaviour, and well-structured interfaces provide
          a stronger foundation than relying on unnecessary complexity.
          The best implementation is often the one that solves the problem
          clearly without making the experience harder to maintain.
        </p>

        <h2 className={h2}>Accessibility is part of the engineering</h2>

        <p className={p}>
          My interest in accessibility has grown into an important part
          of my professional direction. I work with accessibility testing
          practices, evaluating interfaces against WCAG guidelines and
          identifying barriers that can affect people using keyboards,
          screen readers, and other assistive technologies.
        </p>

        <p className={p}>
          My experience includes manual keyboard testing, screen reader
          testing, accessibility audits, identifying semantic and ARIA
          issues, reviewing focus management, checking colour contrast,
          and documenting findings with clear reproduction steps and
          remediation recommendations.
        </p>

        <p className={p}>
          I don't see accessibility as a final checklist before release.
          It should influence how interfaces are designed, structured,
          developed, and tested from the beginning. A button that cannot
          be operated with a keyboard or a form that cannot be understood
          by a screen reader is not just an accessibility issue; it is
          an engineering problem worth solving.
        </p>

        <div className="mt-5">
          <TextLink to="/accessibility">Explore my Accessibility Lab</TextLink>
        </div>

        <h2 className={h2}>Building and testing together</h2>

        <p className={p}>
          Working across frontend development and accessibility QA has
          shaped how I approach software. Building helps me understand
          the decisions behind an interface, while testing helps me
          recognise where those decisions may create barriers or
          unexpected behaviour.
        </p>

        <p className={p}>
          I enjoy bringing both perspectives together: implementing
          accessible components, evaluating real user interactions,
          documenting issues, and validating fixes. My goal is to build
          digital products that are not only functional but genuinely
          usable by a wider range of people.
        </p>

        <h2 className={h2}>How I debug</h2>

        <ol className="mt-5 space-y-3">
          {debugging.map((d, i) => (
            <li
              key={d}
              className="flex gap-4 text-[17px] leading-relaxed text-fg-secondary"
            >
              <span
                aria-hidden="true"
                className="mt-1 font-mono text-sm text-accent-secondary"
              >
                {i + 1}.
              </span>
              {d}
            </li>
          ))}
        </ol>

        <h2 className={h2}>Currently growing</h2>

        <p className={p}>
          I'm continuously deepening my knowledge of frontend architecture,
          web performance, accessibility standards, and assistive
          technologies. I'm particularly interested in advancing my
          understanding of WCAG 2.2, accessibility evaluation, and
          building inclusive component systems that make accessibility
          easier to implement and maintain.
        </p>

        <p className={p}>
          I'm always interested in working with people and teams who care
          about building thoughtful, accessible, and high-quality web
          experiences.
        </p>
      </div>
    </>
  );
}
