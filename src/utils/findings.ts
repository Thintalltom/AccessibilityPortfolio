import type { DemoComponent, Finding, FindingCategory, FindingStatus, Severity } from "../types/finding";

export const severityOrder: Severity[] = ["critical", "high", "medium", "low"];
export const statusOrder: FindingStatus[] = ["open", "fixed", "retested", "not-reproduced"];

export const severityLabels: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low"
};

export const statusLabels: Record<FindingStatus, string> = {
  open: "Still reproducible",
  fixed: "Fixed, not yet retested",
  retested: "Fixed and retested",
  "not-reproduced": "Not reproduced during retest"
};

export const categoryLabels: Record<FindingCategory, string> = {
  accessibility: "Accessibility",
  performance: "Performance"
};

export type FindingFilters = {
  query: string;
  severity: Severity | "all";
  component: DemoComponent | "all";
  status: FindingStatus | "all";
  category: FindingCategory | "all";
};

export const defaultFindingFilters: FindingFilters = {
  query: "",
  severity: "all",
  component: "all",
  status: "all",
  category: "all"
};

export function filterFindings(findings: Finding[], filters: FindingFilters): Finding[] {
  const q = filters.query.trim().toLowerCase();
  return findings.filter((f) => {
    if (filters.severity !== "all" && f.severity !== filters.severity) return false;
    if (filters.component !== "all" && f.component !== filters.component) return false;
    if (filters.status !== "all" && f.status !== filters.status) return false;
    if (filters.category !== "all" && f.category !== filters.category) return false;
    if (q && !f.title.toLowerCase().includes(q) && !f.id.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function countBy<K extends string>(findings: Finding[], key: (f: Finding) => K): Record<K, number> {
  return findings.reduce((acc, f) => {
    const k = key(f);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {} as Record<K, number>);
}

export function uniqueComponents(findings: Finding[]): DemoComponent[] {
  return Array.from(new Set(findings.map((f) => f.component)));
}