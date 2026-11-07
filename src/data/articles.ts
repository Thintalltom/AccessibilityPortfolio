import type { Article } from "../types/content";

/**
 * Only articles with status "published" and a real publishedOn date are presented as published.
 * Drafts are listed as work in progress, without dates.
 */
export const articles: Article[] = [
{ slug: "testing-react-forms", title: "How I Test React Forms for Accessibility", summary: "Names, instructions, errors and focus — a repeatable checklist with keyboard and screen reader steps.", topic: "Accessibility testing", status: "draft" },
{ slug: "automated-scans", title: "What Automated Accessibility Scans Can and Cannot Tell You", summary: "Where axe-core and WAVE are reliable, where they are silent, and how to plan manual testing around them.", topic: "Accessibility testing", status: "draft" },
{ slug: "audit-report-process", title: "My Process for Writing a WCAG-Oriented Audit Report", summary: "Scoping, evidence, impact-based severity and honest limitations.", topic: "Reporting", status: "draft" },
{ slug: "dialog-focus", title: "Fixing Keyboard Focus Management in a React Dialog", summary: "From a div overlay to a native <dialog>, with focus return handled explicitly.", topic: "Frontend engineering", status: "draft" },
{ slug: "measuring-performance", title: "Measuring Frontend Performance Before and After Optimisation", summary: "Comparable conditions, medians over runs, and separating lab data from field data.", topic: "Performance", status: "draft" }];