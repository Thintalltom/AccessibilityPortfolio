import type { LibraryDoc } from "../types/content";

export const libraryDocs: LibraryDoc[] = [
{
  id: "text-input", name: "Text input", summary: "A labelled input with optional hint and error message.",
  source: `<label htmlFor={id}>{label}</label>\n<input id={id} aria-invalid={!!error}\n  aria-describedby={describedBy(hintId, errorId)} />`,
  keyboard: [{ keys: "Tab", action: "Moves focus to the input" }],
  naming: "Visible <label> associated with htmlFor. Hint and error are descriptions, not part of the name.",
  states: "aria-invalid and a text error with an icon; border width also changes so colour is not the only cue.",
  tests: ["Is reachable by its label text", "Exposes the hint as its description", "Sets aria-invalid and describes the error when present"],
  manualNotes: "Check announcement order (name, role, description) in NVDA + Firefox and VoiceOver + Safari.",
  limitations: ["No character counter variant yet."]
},
{
  id: "select", name: "Select field", summary: "A native <select> with a label, optional placeholder option and error.",
  source: `<select id={id} aria-describedby={…}>\n  {placeholder && <option value="">{placeholder}</option>}\n</select>`,
  keyboard: [{ keys: "Arrow keys", action: "Change option" }, { keys: "Alt + ↓", action: "Open the list (Windows)" }],
  naming: "Visible label. The native element keeps platform behaviour on mobile.",
  states: "Same error treatment as the text input.",
  tests: ["Is reachable by label", "Changing value calls onChange"],
  manualNotes: "Native select styling differs by OS; verify focus ring visibility on each.",
  limitations: ["No searchable variant. Long lists should use a different pattern."]
},
{
  id: "checkbox", name: "Checkbox", summary: "A native checkbox with a clickable label and optional description.",
  source: `<input type="checkbox" id={id} aria-describedby={descId} />\n<label htmlFor={id}>{label}</label>`,
  keyboard: [{ keys: "Space", action: "Toggle" }],
  naming: "Label via htmlFor; description via aria-describedby.",
  states: "Checked state is native; errors follow the shared pattern.",
  tests: ["Toggles with Space", "Label click toggles the box"],
  manualNotes: "Confirm the 20px target plus label meets 2.5.8 Target Size (Minimum).",
  limitations: ["Uses accent-color, so styling is browser-dependent."]
},
{
  id: "radio-group", name: "Radio group", summary: "Native radios grouped in a fieldset with a legend.",
  source: `<fieldset aria-describedby={errorId}>\n  <legend>{legend}</legend>\n  <input type="radio" name={name} />…\n</fieldset>`,
  keyboard: [{ keys: "Tab", action: "Into the group (to the checked option)" }, { keys: "Arrow keys", action: "Move and select" }],
  naming: "Legend names the group; each label names an option.",
  states: "Group-level error, described on the fieldset.",
  tests: ["Arrow keys move selection", "Legend is the group name"],
  manualNotes: "aria-describedby on fieldset is announced inconsistently; the error is also placed after the legend so it is read in order.",
  limitations: ["Horizontal layout not provided."]
},
{
  id: "validation", name: "Form validation", summary: "Validate on submit, focus an error summary with links to each field, then validate live.",
  source: `if (errors.length) summaryRef.current?.focus();\n<a href={"#" + fieldId} onClick={focusField}>{message}</a>`,
  keyboard: [{ keys: "Enter", action: "Submit" }, { keys: "Enter on summary link", action: "Focus the field" }],
  naming: "Summary is labelled by its heading, so focusing it announces the problem count.",
  states: "Errors appear only after the first submit, then update as the user types. Success uses a polite status.",
  tests: ["Submitting empty focuses the summary", "Summary link focuses its field", "Valid submit shows status message"],
  manualNotes: "Verify the summary heading is read on focus in all tested screen readers.",
  limitations: ["Client-side only; there is no server validation to mirror."]
},
{
  id: "alert", name: "Alert and status message", summary: "Polite status for confirmations, assertive alert for errors.",
  source: `<div role="status">{saved && <Alert … />}</div>\n<div role="alert">{error && <Alert … />}</div>`,
  keyboard: [{ keys: "—", action: "Not focusable; announced automatically" }],
  naming: "Text content. A visually hidden prefix (“Error:”, “Success:”) makes the type explicit.",
  states: "Live regions are mounted empty before content is injected, which announces more reliably.",
  tests: ["Success message appears in a status region", "Error appears in an alert region"],
  manualNotes: "Check that repeated identical messages are re-announced; some screen readers ignore duplicates.",
  limitations: ["No auto-dismiss — intentional, so messages do not vanish before being read."]
},
{
  id: "dialog", name: "Dialog", summary: "Native <dialog> opened with showModal(), with explicit focus return.",
  source: `useEffect(() => {\n  if (open) { returnTo = document.activeElement; ref.current.showModal(); }\n  else { ref.current.close(); returnTo?.focus(); }\n}, [open]);`,
  keyboard: [{ keys: "Escape", action: "Close" }, { keys: "Tab", action: "Cycles within the dialog" }],
  naming: "aria-labelledby the title; aria-describedby the description. Close button has aria-label.",
  states: "Initial focus goes to the least destructive action via data-autofocus.",
  tests: ["Opens with the title as name", "Escape closes it", "Focus returns to the trigger"],
  manualNotes: "jsdom lacks showModal; the hook falls back to the open attribute so tests run, but focus containment must be checked in a real browser.",
  limitations: ["Clicking the backdrop does not close it (by design)."]
},
{
  id: "tabs", name: "Tabs", summary: "WAI-ARIA tabs with automatic activation and roving tabindex.",
  source: `<button role="tab" aria-selected={sel} aria-controls={panelId}\n  tabIndex={sel ? 0 : -1} onKeyDown={onKeyDown} />`,
  keyboard: [{ keys: "← →", action: "Previous / next tab (wraps)" }, { keys: "Home / End", action: "First / last tab" }, { keys: "Tab", action: "Into the panel" }],
  naming: "Tablist has aria-label; panels are labelled by their tab.",
  states: "Selected tab has an underline and aria-selected.",
  tests: ["Arrow keys move selection and focus", "Only the selected panel is visible"],
  manualNotes: "Automatic activation is fine here because panels render instantly.",
  limitations: ["No vertical orientation."]
},
{
  id: "navigation-menu", name: "Navigation menu", summary: "Disclosure navigation: a button revealing a list of links. Deliberately not role=\"menu\".",
  source: `<button aria-expanded={open} aria-controls={listId}>…</button>\n<ul id={listId} hidden={!open}>…links…</ul>`,
  keyboard: [{ keys: "Enter / Space", action: "Toggle" }, { keys: "Tab", action: "Through links" }, { keys: "Escape", action: "Close and return focus" }],
  naming: "Wrapped in a labelled nav landmark.",
  states: "aria-expanded plus a rotating chevron.",
  tests: ["Toggles aria-expanded", "Escape closes and refocuses the button"],
  manualNotes: "Check that closing on outside click does not fire while tabbing.",
  limitations: ["Does not close when focus leaves via Tab."]
},
{
  id: "disclosure", name: "Expandable disclosure", summary: "A button controlling a region’s visibility.",
  source: `<button aria-expanded={open} aria-controls={panelId}>{summary}</button>\n<div id={panelId} hidden={!open}>…</div>`,
  keyboard: [{ keys: "Enter / Space", action: "Toggle" }],
  naming: "Button text.",
  states: "aria-expanded; hidden content is removed from the accessibility tree.",
  tests: ["Toggles aria-expanded and visibility"],
  manualNotes: "When nested inside a heading, check the heading is still announced.",
  limitations: ["No animated height (intentional for reduced complexity)."]
},
{
  id: "tooltip", name: "Tooltip", summary: "Supplementary text on hover and focus. Use sparingly — never the only name.",
  source: `{cloneElement(children, { "aria-describedby": id })}\n<span role="tooltip" id={id}>…</span>`,
  keyboard: [{ keys: "Focus", action: "Show" }, { keys: "Escape", action: "Dismiss" }],
  naming: "The trigger keeps its own aria-label; the tooltip is a description.",
  states: "Hoverable and persistent while hovered (WCAG 1.4.13).",
  tests: ["Shows on focus", "Escape hides it"],
  manualNotes: "Not reachable on touch devices — do not put essential information in it.",
  limitations: ["Fixed position above the trigger; no collision handling."]
},
{
  id: "data-table", name: "Data table", summary: "Semantic table with sortable columns and a scrollable, focusable region.",
  source: `<th scope="col" aria-sort={dir}>\n  <button onClick={() => toggle(key)}>{label}</button>\n</th>`,
  keyboard: [{ keys: "Tab", action: "Sort buttons, then the scroll region" }, { keys: "Enter", action: "Toggle sort direction" }],
  naming: "Caption names the region and the table; sort state is appended to the caption.",
  states: "aria-sort on the active header plus an arrow icon.",
  tests: ["Clicking a header sorts and sets aria-sort"],
  manualNotes: "Verify aria-sort is announced when moving between headers.",
  limitations: ["No pagination or row selection."]
}];