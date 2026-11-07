export type FindingStatus = "open" | "fixed" | "retested" | "not-reproduced";

export type Severity = "critical" | "high" | "medium" | "low";

export type FindingCategory = "accessibility" | "performance";

export type DemoComponent =
"BookingForm" |
"PortalNav" |
"ServiceDirectory" |
"ConfirmDialog" |
"PortalDashboard" |
"AppointmentsTable" |
"PerformanceLab";

export type Finding = {
  id: string;
  title: string;
  category: FindingCategory;
  component: DemoComponent;
  /** Route where the original behaviour can be reproduced. */
  route: string;
  summary: string;
  expectedBehavior: string;
  actualBehavior: string;
  reproductionSteps: string[];
  impact: string;
  severity: Severity;
  /** Why this severity was assigned. Severity is impact-based, not a WCAG level. */
  severityRationale: string;
  wcagCriteria?: string[];
  /** What a reviewer can observe to confirm the issue. No screenshots are fabricated. */
  evidence?: string[];
  remediation: string;
  codeBefore?: string;
  codeAfter?: string;
  /** Source file containing the fix. */
  fixLocation?: string;
  status: FindingStatus;
  /** The exact steps to run when retesting the corrected build. */
  retestPlan: string[];
  /** Only filled in once a retest has genuinely been performed. */
  retestNotes?: string;
};