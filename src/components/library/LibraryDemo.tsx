import React, { useState } from "react";
import { LinkIcon } from "lucide-react";
import { labModules } from "../../data/labModules";
import { portalServices } from "../../data/portal";
import { Button } from "../ui/Button";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { CheckboxField } from "./CheckboxField";
import { RadioGroup } from "./RadioGroup";
import { ValidationFormDemo } from "./ValidationFormDemo";
import { Alert } from "./Alert";
import { Dialog } from "./Dialog";
import { Tabs } from "./Tabs";
import { NavMenu } from "./NavMenu";
import { Disclosure } from "./Disclosure";
import { Tooltip } from "./Tooltip";
import { DataTable } from "./DataTable";

export function LibraryDemo({ id }: {id: string;}) {
  const [text, setText] = useState("");
  const [select, setSelect] = useState("");
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState("standard");
  const [message, setMessage] = useState<{tone: "success" | "error";text: string;} | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  switch (id) {
    case "text-input":
      return <TextField label="Display name" hint="Shown on your public profile" value={text} onChange={(e) => setText(e.target.value)} />;
    case "select":
      return (
        <SelectField
          label="Time zone"
          placeholder="Choose a time zone"
          options={[
          { value: "utc", label: "UTC" },
          { value: "wat", label: "West Africa Time" },
          { value: "gmt", label: "Greenwich Mean Time" }]
          }
          value={select}
          onChange={(e) => setSelect(e.target.value)} />);


    case "checkbox":
      return <CheckboxField label="Email me when a finding changes status" description="At most one email per day" checked={checked} onChange={setChecked} />;
    case "radio-group":
      return (
        <RadioGroup
          legend="Report detail"
          name="report-detail"
          options={[
          { value: "summary", label: "Executive summary" },
          { value: "standard", label: "Standard", description: "Findings with reproduction steps" },
          { value: "full", label: "Full", description: "Includes code-level remediation" }]
          }
          value={radio}
          onChange={setRadio} />);


    case "validation":
      return <ValidationFormDemo />;
    case "alert":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setMessage({ tone: "success", text: `Draft saved at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` })}>
              Save draft
            </Button>
            <Button onClick={() => setMessage({ tone: "error", text: "Couldn’t save. Check your connection and try again." })}>Simulate a save error</Button>
          </div>
          {/* Live regions are rendered empty first so the update is announced reliably. */}
          <div role="status">{message?.tone === "success" && <Alert tone="success" title={message.text} />}</div>
          <div role="alert">{message?.tone === "error" && <Alert tone="error" title={message.text} />}</div>
        </div>);

    case "dialog":
      return (
        <>
          <Button onClick={() => setDialogOpen(true)}>Export report</Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Export report"
            description="Use your browser’s print dialog to save the audit as a PDF."
            footer={
            <>
                <Button data-autofocus onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setDialogOpen(false)}>Got it</Button>
              </>
            } />
          
        </>);

    case "tabs":
      return (
        <Tabs
          label="Finding ALD-003"
          tabs={[
          { id: "summary", label: "Summary", content: <p className="text-[15px] text-fg-secondary">Navigation items cannot be reached with a keyboard.</p> },
          { id: "steps", label: "Steps", content: <p className="text-[15px] text-fg-secondary">Press Tab from the top of the demo and try to reach “Book”.</p> },
          { id: "fix", label: "Fix", content: <p className="text-[15px] text-fg-secondary">Use real buttons inside a nav landmark, with aria-current.</p> }]
          } />);


    case "navigation-menu":
      return <NavMenu label="Lab modules" navLabel="Lab modules (demo)" items={labModules.map((m) => ({ label: m.heading, to: m.path }))} />;
    case "disclosure":
      return (
        <div className="border-t border-line">
          <Disclosure summary="What counts as a critical finding?">A core task is blocked for a relevant user group with no reasonable alternative.</Disclosure>
          <Disclosure summary="Are automated scans enough?">No. They catch a subset of issues and cannot judge meaning, order or task completion.</Disclosure>
        </div>);

    case "tooltip":
      return (
        <div className="flex items-center gap-4 pt-10">
          <Tooltip content="Copies this page’s address to your clipboard">
            <button
              type="button"
              aria-label="Copy link"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
              className="grid h-11 w-11 place-items-center rounded-[10px] border border-line-strong bg-surface text-fg hover:bg-surface-hover">
              
              <LinkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </Tooltip>
          <p role="status" className="text-sm text-fg-muted">{copied ? "Link copied" : ""}</p>
        </div>);

    case "data-table":
      return (
        <DataTable
          caption="Portal services"
          rowKey="name"
          columns={[
          { key: "name", label: "Service", sortable: true },
          { key: "department", label: "Department", sortable: true },
          { key: "duration", label: "Minutes", sortable: true }]
          }
          rows={portalServices.slice(0, 6).map((s) => ({ name: s.name, department: s.department, duration: s.durationMins }))} />);


    default:
      return null;
  }
}