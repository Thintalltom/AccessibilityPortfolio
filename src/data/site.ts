import type { NavItem } from "../types/content";

/**
 * Owner-specific details. Every `null` renders as a visible "Owner input" placeholder
 * or hides the related link. Replace with verified values before publishing.
 */
export const site = {
  siteName: "Frontend & Accessibility Portfolio",
  ownerName: 'Tomide Adeyanju' as string | null,
  role: "Frontend Engineer & Accessibility QA Specialist",
  email: 'adeyanjutomide@gmail.com' as string | null,
  linkedinUrl: "https://www.linkedin.com/in/tomide-adeyanju-a630551b9/" as string | null,
  githubUrl: "https://github.com/Thintalltom" as string | null,
  /** Path or URL to a real CV PDF, e.g. "/cv.pdf". Leave null until the file exists. */
  cvUrl: "/cv.pdf" as string | null,
  /** ISO date of the most recent genuine accessibility review of this portfolio. */
  lastAccessibilityReview: null as string | null
};

export const primaryNav: NavItem[] = [
{ label: "Home", to: "/" },
{ label: "Projects", to: "/projects" },
{ label: "Accessibility Lab", to: "/accessibility" },
{ label: "About", to: "/about" },
{ label: "Writing", to: "/writing" },
{ label: "Contact", to: "/contact" }];


export const footerNav: {heading: string;links: NavItem[];}[] = [
{
  heading: "Portfolio",
  links: [
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "About", to: "/about" },
  { label: "Writing", to: "/writing" },
  { label: "Contact", to: "/contact" }]

},
{
  heading: "Labs",
  links: [
  { label: "Accessibility overview", to: "/accessibility" },
  { label: "Flawed demo & findings", to: "/accessibility/lab" },
  { label: "Audit reports", to: "/accessibility/audits" },
  { label: "Remediation", to: "/accessibility/remediation" },
  { label: "Performance", to: "/performance" },
  { label: "Performance lab", to: "/performance/lab" }]

},
{
  heading: "Site",
  links: [
  { label: "Accessibility statement", to: "/accessibility-statement" },
  { label: "Privacy", to: "/privacy" }]

}];