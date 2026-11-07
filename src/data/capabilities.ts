import type { Capability } from "../types/content";

export const capabilities: Capability[] = [
{
  id: "frontend",
  title: "Frontend Engineering",
  description: "Building modern interfaces with React, TypeScript and JavaScript: reusable components, API integration, state management, responsive layouts and frontend architecture that stays maintainable.",
  focus: ["React & TypeScript", "API integration", "Component architecture"],
  link: { label: "See frontend case studies", to: "/projects" }
},
{
  id: "a11y",
  title: "Accessibility QA",
  description: "Manual testing with a keyboard and screen readers, semantic HTML review, WCAG evaluation, clear defect documentation, and verifying that remediation actually works.",
  focus: ["WCAG 2.2 evaluation", "Screen-reader testing", "Remediation verification"],
  link: { label: "Explore the Accessibility Lab", to: "/accessibility" }
},
// {
//   id: "quality",
//   title: "Performance & Quality Engineering",
//   description: "Component and end-to-end testing, automated checks in CI, browser profiling, performance optimisation measured under comparable conditions, and regression testing.",
//   focus: ["Testing strategy", "Browser profiling", "Measured optimisation"],
//   link: { label: "Open the performance lab", to: "/performance/lab" }
// }
];