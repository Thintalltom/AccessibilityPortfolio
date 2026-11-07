import React, { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { format } from "date-fns";
import { CheckCircle2Icon } from "lucide-react";
import type { Appointment, BookingErrors, BookingValues, DemoVariant } from "../../types/portal";
import { bookingTimeSlots, portalServices } from "../../data/portal";
import { bookingFieldOrder, emptyBooking, validateBooking } from "../../utils/bookingValidation";
import { cn } from "../../utils/cn";
import { BookingField } from "./BookingField";
import { ConfirmDialog } from "./ConfirmDialog";

type BookingFormProps = {
  variant: DemoVariant;
  initialServiceId?: string;
  onBooked?: (appointment: Appointment) => void;
  onViewAppointments?: () => void;
};

const hints: Partial<Record<keyof BookingValues, string>> = {
  studentId: "Printed on your student card, for example HU-204118",
  email: "We send the confirmation here"
};

const fieldLabels: Record<keyof BookingValues, string> = {
  fullName: "Full name",
  studentId: "Student ID",
  email: "University email",
  serviceId: "Service",
  date: "Date",
  time: "Time",
  notes: "Anything we should know?"
};

export function BookingForm({ variant, initialServiceId = "", onBooked, onViewAppointments }: BookingFormProps) {
  const isFixed = variant === "fixed";
  const [values, setValues] = useState<BookingValues>({ ...emptyBooking, serviceId: initialServiceId });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [booked, setBooked] = useState<Appointment | null>(null);
  const [summaryFocusTick, setSummaryFocusTick] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const prefix = useId();
  const fid = (field: keyof BookingValues) => `${prefix}-${field}`;
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (summaryFocusTick && isFixed) summaryRef.current?.focus();
  }, [summaryFocusTick, isFixed]);

  useEffect(() => {
    if (booked && isFixed) successRef.current?.focus();
  }, [booked, isFixed]);

  const errorList = bookingFieldOrder.filter((f) => errors[f]).map((f) => [f, errors[f] as string] as const);
  const selectedService = portalServices.find((s) => s.id === values.serviceId);

  const handleChange = (field: keyof BookingValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (attempted) setErrors(validateBooking(next));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateBooking(values);
    setErrors(nextErrors);
    setAttempted(true);
    if (Object.keys(nextErrors).length > 0) {
      setSummaryFocusTick((t) => t + 1);
      return;
    }
    setConfirming(true);
  };

  const confirmBooking = () => {
    const service = portalServices.find((s) => s.id === values.serviceId);
    const appointment: Appointment = {
      id: `APT-${1100 + Math.floor(Math.random() * 800)}`,
      service: service?.name ?? "Service",
      date: values.date,
      time: values.time,
      location: service?.format === "Online" ? "Online (link sent by email)" : "Room A102, Harlow Building",
      status: "Confirmed"
    };
    setConfirming(false);
    setBooked(appointment);
    setValues({ ...emptyBooking });
    setErrors({});
    setAttempted(false);
    onBooked?.(appointment);
  };

  const controlProps = (field: keyof BookingValues) => {
    const error = attempted ? errors[field] : undefined;
    const base = "mt-1.5 block min-h-[42px] w-full rounded-md bg-white px-3 text-[15px] text-portal-ink placeholder:text-portal-muted";
    if (!isFixed) {
      return { className: cn(base, error ? "border-2 border-red-500" : "border border-portal-muted") };
    }
    const describedBy = [hints[field] && `${fid(field)}-hint`, error && `${fid(field)}-error`].filter(Boolean).join(" ");
    return {
      id: fid(field),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy || undefined,
      className: cn(base, error ? "border-2 border-portal-danger" : "border border-portal-muted")
    };
  };

  const fieldError = (field: keyof BookingValues) => attempted ? errors[field] : undefined;

  if (booked) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        {...isFixed ? { "aria-labelledby": `${prefix}-success` } : {}}
        className="rounded-lg border border-portal-success bg-white p-6">
        
        {isFixed ?
        <h3 id={`${prefix}-success`} className="flex items-center gap-2 text-xl font-semibold text-portal-success">
            <CheckCircle2Icon aria-hidden="true" className="h-6 w-6" /> Appointment booked
          </h3> :

        <div className="flex items-center gap-2 text-xl font-semibold text-portal-success">
            <CheckCircle2Icon className="h-6 w-6" /> Appointment booked
          </div>
        }
        <p className="mt-2 text-[15px] text-portal-muted">
          {booked.service} on {format(new Date(`${booked.date}T00:00:00`), "EEEE d MMMM yyyy")} at {booked.time}. Reference {booked.id}. This is a
          demo — no booking was made.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => setBooked(null)} className="min-h-[40px] rounded-md border border-portal-muted px-4 text-sm font-semibold hover:bg-portal-subtle">
            Book another appointment
          </button>
          {onViewAppointments &&
          <button type="button" onClick={onViewAppointments} className="min-h-[40px] rounded-md bg-portal-brand px-4 text-sm font-semibold text-white hover:bg-portal-brand-hover">
              View my appointments
            </button>
          }
        </div>
      </div>);

  }

  return (
    <div>
      {isFixed ? <h3 className="text-xl font-semibold">Book an appointment</h3> : <div className="text-xl font-semibold">Book an appointment</div>}
      {isFixed && <p className="mt-1 text-sm text-portal-muted">All fields are required unless marked optional.</p>}

      <form noValidate onSubmit={handleSubmit} className="mt-5">
        {isFixed && attempted && errorList.length > 0 &&
        <div ref={summaryRef} tabIndex={-1} aria-labelledby={`${prefix}-summary`} className="mb-6 rounded-lg border-2 border-portal-danger bg-white p-4">
            <h4 id={`${prefix}-summary`} className="font-semibold text-portal-danger">
              There {errorList.length === 1 ? "is 1 problem" : `are ${errorList.length} problems`} with your booking
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">
              {errorList.map(([field, message]) =>
            <li key={field}>
                  <a
                href={`#${fid(field)}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(fid(field))?.focus();
                }}
                className="font-medium text-portal-danger underline">
                
                    {message}
                  </a>
                </li>
            )}
            </ul>
          </div>
        }
        {!isFixed && attempted && errorList.length > 0 && <p className="mb-4 text-sm text-red-600">Please fix the errors.</p>}

        <div className="grid gap-4 md:grid-cols-2">
          <BookingField variant={variant} fieldId={fid("fullName")} label={fieldLabels.fullName} required error={fieldError("fullName")}>
            <input type="text" autoComplete="name" value={values.fullName} onChange={handleChange("fullName")} placeholder={isFixed ? undefined : "Full name"} required={isFixed} {...controlProps("fullName")} />
          </BookingField>
          <BookingField variant={variant} fieldId={fid("studentId")} label={fieldLabels.studentId} required hint={hints.studentId} error={fieldError("studentId")}>
            <input type="text" value={values.studentId} onChange={handleChange("studentId")} placeholder={isFixed ? undefined : "Student ID"} required={isFixed} {...controlProps("studentId")} />
          </BookingField>
          <BookingField variant={variant} fieldId={fid("email")} label={fieldLabels.email} required hint={hints.email} error={fieldError("email")}>
            <input type="email" autoComplete="email" value={values.email} onChange={handleChange("email")} placeholder={isFixed ? undefined : "Email"} required={isFixed} {...controlProps("email")} />
          </BookingField>
          <BookingField variant={variant} fieldId={fid("serviceId")} label={fieldLabels.serviceId} required error={fieldError("serviceId")}>
            <select value={values.serviceId} onChange={handleChange("serviceId")} required={isFixed} {...controlProps("serviceId")}>
              <option value="">{isFixed ? "Choose a service" : "—"}</option>
              {portalServices.map((s) =>
              <option key={s.id} value={s.id}>{s.name}</option>
              )}
            </select>
          </BookingField>
          <BookingField variant={variant} fieldId={fid("date")} label={fieldLabels.date} required error={fieldError("date")}>
            <input type="date" min={today} value={values.date} onChange={handleChange("date")} required={isFixed} {...controlProps("date")} />
          </BookingField>
          <BookingField variant={variant} fieldId={fid("time")} label={fieldLabels.time} required error={fieldError("time")}>
            <select value={values.time} onChange={handleChange("time")} required={isFixed} {...controlProps("time")}>
              <option value="">{isFixed ? "Choose a time" : "—"}</option>
              {bookingTimeSlots.map((t) =>
              <option key={t} value={t}>{t}</option>
              )}
            </select>
          </BookingField>
          <div className="md:col-span-2">
            <BookingField variant={variant} fieldId={fid("notes")} label={fieldLabels.notes}>
              <textarea rows={3} value={values.notes} onChange={handleChange("notes")} placeholder={isFixed ? undefined : "Notes"} {...controlProps("notes")} className={cn(controlProps("notes").className, "py-2")} />
            </BookingField>
          </div>
        </div>

        <button type="submit" className="mt-6 min-h-[44px] rounded-md bg-portal-brand px-5 text-[15px] font-semibold text-white hover:bg-portal-brand-hover">
          Continue to confirm
        </button>
      </form>

      <ConfirmDialog
        variant={variant}
        open={confirming}
        title="Confirm your booking"
        confirmLabel="Confirm booking"
        cancelLabel="Go back"
        onConfirm={confirmBooking}
        onCancel={() => setConfirming(false)}>
        
        {selectedService?.name} on {values.date ? format(new Date(`${values.date}T00:00:00`), "EEEE d MMMM yyyy") : ""} at {values.time}.
      </ConfirmDialog>
    </div>);

}