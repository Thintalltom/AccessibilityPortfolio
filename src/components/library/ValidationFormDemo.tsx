import React, { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../ui/Button";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { RadioGroup } from "./RadioGroup";
import { CheckboxField } from "./CheckboxField";
import { Alert } from "./Alert";

type Values = {name: string;email: string;topic: string;reply: string;consent: boolean;};
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", email: "", topic: "", reply: "", consent: false };
const order: (keyof Values)[] = ["name", "email", "topic", "reply", "consent"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name";
  if (!v.email.trim()) e.email = "Enter your email address";else
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter an email address in the format name@example.com";
  if (!v.topic) e.topic = "Choose a topic";
  if (!v.reply) e.reply = "Choose how you would like a reply";
  if (!v.consent) e.consent = "Confirm you understand this demo sends nothing";
  return e;
}

export function ValidationFormDemo() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tick, setTick] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const base = useId();
  const ids: Record<keyof Values, string> = {
    name: `${base}-name`,
    email: `${base}-email`,
    topic: `${base}-topic`,
    reply: `${base}-reply-email`,
    consent: `${base}-consent`
  };

  useEffect(() => {
    if (tick) summaryRef.current?.focus();
  }, [tick]);

  const set = <K extends keyof Values,>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length) {
      setSuccess(false);
      setTick((t) => t + 1);
      return;
    }
    setSuccess(true);
  };

  const list = order.filter((k) => errors[k]);

  if (success) {
    return (
      <div className="space-y-4">
        <Alert tone="success" title="Details validated" live="status">
          Everything is valid. This demo has no backend, so nothing was sent.
        </Alert>
        <Button
          onClick={() => {
            setValues(initial);
            setErrors({});
            setSubmitted(false);
            setSuccess(false);
          }}>
          
          Start again
        </Button>
      </div>);

  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {submitted && list.length > 0 &&
      <div ref={summaryRef} tabIndex={-1} aria-labelledby={`${base}-summary`} className="rounded-xl border-2 border-danger bg-surface-muted p-4">
          <h3 id={`${base}-summary`} className="font-semibold text-fg">
            There {list.length === 1 ? "is 1 problem" : `are ${list.length} problems`}
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {list.map((k) =>
          <li key={k}>
                <a
              href={`#${ids[k]}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(ids[k])?.focus();
              }}
              className="text-[15px] text-danger underline underline-offset-2">
              
                  {errors[k]}
                </a>
              </li>
          )}
          </ul>
        </div>
      }
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id={ids.name} label="Name" required autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
        <TextField id={ids.email} label="Email" type="email" required autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </div>
      <SelectField
        id={ids.topic}
        label="Topic"
        required
        placeholder="Choose a topic"
        options={[
        { value: "project", label: "A project" },
        { value: "audit", label: "An accessibility audit" },
        { value: "role", label: "A role" }]
        }
        value={values.topic}
        onChange={(e) => set("topic", e.target.value)}
        error={errors.topic} />
      
      <RadioGroup
        legend="Preferred reply"
        name={`${base}-reply`}
        required
        options={[
        { value: "email", label: "Email" },
        { value: "call", label: "Video call", description: "I’ll suggest times by email first" }]
        }
        value={values.reply}
        onChange={(v) => set("reply", v)}
        error={errors.reply} />
      
      <CheckboxField
        id={ids.consent}
        label="I understand this demo sends nothing"
        checked={values.consent}
        onChange={(c) => set("consent", c)}
        error={errors.consent} />
      
      <Button type="submit" variant="primary">Validate details</Button>
    </form>);

}