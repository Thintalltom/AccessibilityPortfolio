import type { LabModuleInfo } from "../types/content";

export const labModules: LabModuleInfo[] = [
{
  id: "forms",
  path: "/accessibility/lab/forms",
  title: "Forms",
  heading: "Form labels, instructions and errors",
  summary: "The booking form is where most users either succeed or give up. This module tests field names, required-state cues, error identification and the confirmation step.",
  howToTest: [
  "Tab through every field and note the name a screen reader announces, or check each field’s computed name in the DevTools Accessibility pane.",
  "Submit the empty form with Enter. Note where focus goes and what, if anything, is announced.",
  "Correct one error and submit again. Check the remaining errors are still identified.",
  "Complete a valid booking and confirm it in the dialog using only the keyboard."],

  components: ["BookingForm"]
},
{
  id: "navigation",
  path: "/accessibility/lab/navigation",
  title: "Navigation",
  heading: "Keyboard navigation and visible focus",
  summary: "The portal’s section navigation and service directory, tested with a keyboard alone. Can you reach every section, see where you are, and know when results change?",
  howToTest: [
  "Put the mouse aside. Press Tab from the demo’s top edge and try to reach ‘Services’.",
  "In the directory, Tab through search, the category filter and each card. Check you can always see which control has focus.",
  "Type a query and listen for a result-count announcement.",
  "Tick ‘simulate a failed request’ and check the error state is announced and recoverable."],

  components: ["PortalNav", "ServiceDirectory"]
},
{
  id: "dialogs",
  path: "/accessibility/lab/dialogs",
  title: "Dialogs",
  heading: "Dialog focus management",
  summary: "Cancelling an appointment opens a confirmation dialog. This module tests whether focus moves in, stays in, can escape with Escape, and returns to a sensible place.",
  howToTest: [
  "Tab to a ‘Cancel’ button and listen to what is announced.",
  "Open the dialog with Enter. Check where focus lands and whether Tab can reach content behind the dialog.",
  "Press Escape. Then reopen and close using each button, noting where focus returns.",
  "Use screen reader table navigation on the appointments list."],

  components: ["ConfirmDialog", "AppointmentsTable"]
},
{
  id: "semantics",
  path: "/accessibility/lab/semantics",
  title: "Semantics",
  heading: "Headings, link purpose and text alternatives",
  summary: "Structure that sighted users take for granted: the heading outline, readable contrast, meaningful link text and an equivalent for a chart.",
  howToTest: [
  "List the headings (NVDA+F7, VoiceOver rotor, or the HeadingsMap extension) and compare against the visual layout.",
  "Check the supporting dashboard text against white with a contrast checker.",
  "Navigate to the opening-hours chart with a screen reader.",
  "Open the links list and check whether each service action is distinguishable."],

  components: ["PortalDashboard", "ServiceDirectory"]
}];