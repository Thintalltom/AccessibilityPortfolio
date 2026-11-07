import type { Project } from "../types/content";

export const projects: Project[] = [
{
  slug: "smartafcfta",
  title: "SmartAfCFTA",
  category: "frontend",
  categoryLabel: "Frontend engineering",
  summary: "A digital trade facilitation platform connecting businesses and simplifying intra-African trade — featuring a business directory, customs duty calculator, e-learning platform and Google authentication.",
  contribution: "Frontend development across multiple modules including business directory, customs duty calculator, e-learning interfaces, Google OAuth integration and Redux state management.",
  tech: ["React.js", "JavaScript", "Redux Toolkit", "REST APIs", "Google OAuth", "CSS"],
  caseStudyPath: "/projects/smartafcfta",
  verification: "verified",
  nda: true
},
// {
//   slug: "accessiD8",
//   title: "AccessiD8",
//   category: "frontend",
//   categoryLabel: "Frontend engineering",
//   summary: "A data-driven web application with dashboards, data presentation and organisational sign-in built under NDA.",
//   contribution: "Frontend development in React and TypeScript.",
//   tech: ["React", "TypeScript", "REST APIs", "Microsoft identity"],
//   caseStudyPath: "/projects/accessiD8",
//   verification: "pending",
//   nda: true
// },
// {
//   slug: "innexa",
//   title: "Innexa",
//   category: "frontend",
//   categoryLabel: "Frontend engineering",
//   summary: "A B2B admin dashboard with collapsible sidebar navigation, Azure AD authentication, route-aware header and lazy-loaded pages.",
//   contribution: "Full frontend implementation including auth flow, dashboard shell, Redux state management and RTK Query API integration.",
//   tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Redux Toolkit", "MSAL", "Azure AD", "Vitest"],
//   caseStudyPath: "/projects/innexa",
//   verification: "pending",
//   nda: true
// },
{
  slug: "azure-ai-verification",
  title: "Azure AI Identity Verification",
  category: "frontend",
  categoryLabel: "Frontend engineering",
  summary: "A secure, AI-powered identity management platform with liveness detection, government ID validation and Microsoft Identity Platform authentication — associated with a 20% improvement in authentication reliability and 40% in fraud detection.",
  contribution: "React frontend implementation including authentication integration, liveness detection UI, ID validation screens, juror management and AI-assisted challenge creation workflows.",
  tech: ["React.js", "TypeScript", "JavaScript", "Microsoft Identity Platform", "Azure AI Vision SDK"],
  caseStudyPath: "/projects/azure-ai-verification",
  verification: "verified",
  nda: true
},
{
  slug: "accessible-component-library",
  title: "Accessible React Component Library",
  category: "components",
  categoryLabel: "Component library",
  summary: "Twelve form, feedback and navigation components built semantic-HTML-first, each with a live demo, keyboard map and documented limitations.",
  contribution: "Design, implementation and documentation of every component in this portfolio.",
  tech: ["React", "TypeScript", "Tailwind CSS", "WAI-ARIA patterns"],
  caseStudyPath: "/projects/accessible-component-library",
  verification: "verified"
},
{
  slug: "accesslab",
  title: "AccessLab Demo & Audit",
  category: "accessibility",
  categoryLabel: "Accessibility QA",
  summary: "A fictional university booking portal with seeded defects, a findings catalogue, a structured audit report and a corrected build.",
  contribution: "Built both builds, documented 15 findings with severity rationale, and wrote the audit and remediation log.",
  tech: ["React", "TypeScript", "WCAG 2.2", "Native <dialog>"],
  caseStudyPath: "/accessibility",
  verification: "verified"
}];
