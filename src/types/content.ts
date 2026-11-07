import type { DemoComponent } from "./finding";

export type NavItem = {label: string;to: string;};

export type VerificationStatus = "verified" | "pending";

export type ProjectCategory = "frontend" | "accessibility" | "components";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  contribution: string;
  tech: string[];
  caseStudyPath: string;
  verification: VerificationStatus;
  liveUrl?: string;
  sourceUrl?: string;
  nda?: boolean;
};

export type CaseStudySection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  /** Details the owner must supply before publishing. Rendered as visible placeholders. */
  ownerInput?: string[];
};

export type ResponsibilityRow = {area: string;frontend: string;elsewhere: string;};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  stack: string[];
  sections: CaseStudySection[];
  responsibilities?: ResponsibilityRow[];
};

export type ExperienceEntry = {
  id: string;
  kind: "role" | "education" | "certification";
  title: string;
  organisation: string;
  period: string;
  summary: string;
  skills: string[];
  placeholder: boolean;
  credentialUrl?: string;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  status: "draft" | "published";
  publishedOn?: string;
};

export type SkillGroup = {category: string;items: string[];};

export type Capability = {
  id: string;
  title: string;
  description: string;
  focus: string[];
  link: {label: string;to: string;};
};

export type LabModuleId = "forms" | "navigation" | "dialogs" | "semantics";

export type LabModuleInfo = {
  id: LabModuleId;
  path: string;
  title: string;
  heading: string;
  summary: string;
  howToTest: string[];
  components: DemoComponent[];
};

export type LibraryDoc = {
  id: string;
  name: string;
  summary: string;
  source: string;
  keyboard: {keys: string;action: string;}[];
  naming: string;
  states: string;
  tests: string[];
  manualNotes: string;
  limitations: string[];
};