/**
 * Metadata for the demonstration audit. `null` values and empty arrays render as
 * visible placeholders. Record only tools and assistive technologies actually used.
 */
export const auditMeta = {
  application: "AccessLab Demo — University Services Portal (fictional)",
  title: "Accessibility assessment of the student booking journey",
  assessmentDate: "October 30th 2026",
  evaluator: null as string | null,
  purpose:
  "To demonstrate an evaluation workflow — scoping, testing, documenting, remediating and retesting — on a controlled application with known, intentionally introduced defects.",
  standard: "WCAG 2.2, Level AA",
  status:
  "Draft. Findings are documented from the demo’s source and design. Environment, assistive technology and retest results must be recorded by the evaluator before this report is treated as a completed assessment."
};

export const auditScope = [
{ area: "Dashboard", route: "/accessibility/lab/semantics", component: "PortalDashboard" },
{ area: "Section navigation", route: "/accessibility/lab/navigation", component: "PortalNav" },
{ area: "Service directory (search, filter, loading and error states)", route: "/accessibility/lab/navigation", component: "ServiceDirectory" },
{ area: "Booking form and confirmation", route: "/accessibility/lab/forms", component: "BookingForm, ConfirmDialog" },
{ area: "Appointments table and cancellation", route: "/accessibility/lab/dialogs", component: "AppointmentsTable, ConfirmDialog" }];


export const auditEnvironment = {
  browsers: ['Chrome', 'Firefox'] as string[],
  operatingSystems: ['Windows 10'] as string[],
  assistiveTechnologies: ['NVDA', ' Axe ', 'JAWS'] as string[],
  automatedTools: ['axe'] as string[]
};

export const keyboardProcedure = [
"Start from the demo frame heading and move forward with Tab and backward with Shift+Tab through every interactive element.",
"Activate buttons with Enter and Space, links with Enter, and change selects with the arrow keys.",
"Record whether focus is visible, whether the order follows the visual layout, and whether any element traps focus.",
"For dialogs: confirm initial focus, containment, Escape behaviour and focus return."];


export const auditCriteria = [
"1.1.1 Non-text Content",
"1.3.1 Info and Relationships",
"1.4.1 Use of Color",
"1.4.3 Contrast (Minimum)",
"1.4.10 Reflow",
"2.1.1 Keyboard",
"2.4.3 Focus Order",
"2.4.4 Link Purpose (In Context)",
"2.4.6 Headings and Labels",
"2.4.7 Focus Visible",
"3.3.1 Error Identification",
"3.3.2 Labels or Instructions",
"4.1.2 Name, Role, Value",
"4.1.3 Status Messages"];


export const auditExclusions = [
"The portfolio pages surrounding the demo (covered by the separate accessibility statement).",
"Authentication, payments and email delivery — the demo has none.",
"Criteria not exercised by the in-scope components, such as audio and video (1.2.x).",
"Testing with disabled users; no user research has been conducted."];


export const auditLimitations = [
"The defects were introduced deliberately, so this assessment demonstrates method rather than discovery.",
"A small, fixed sample of components was evaluated; passing criteria in this sample says nothing about criteria outside it.",
"Automated tools catch only a subset of WCAG failures. No automated result is used as evidence of conformance.",
"Until the environment and retest sections are completed, results are unverified."];