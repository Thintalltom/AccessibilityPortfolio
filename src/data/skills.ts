import type { SkillGroup } from "../types/content";

/** Keep only tools the owner has used and is prepared to demonstrate. */
export const skillGroups: SkillGroup[] = [
{ category: "Frontend", items: ["React", "TypeScript", "JavaScript", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
{
  category: "Accessibility",
  items: ["WCAG", "Semantic HTML", "Keyboard testing", "Screen-reader testing", "Accessible forms", "Focus management", "Accessibility reporting"]
},
{ category: "Testing", items: ["Vitest", "React Testing Library", "Playwright", "axe-core", "WAVE", "Browser developer tools"] },
{ category: "Cloud & development", items: ["Azure", "Git", "GitHub", "CI workflows", "API integration"] },
{ category: "Performance", items: ["Lighthouse", "Chrome DevTools", "Performance profiling", "Bundle analysis"] }];