import React, { useEffect, useId, useRef, useState } from "react";
import { format } from "date-fns";
import type { Appointment, DemoVariant } from "../../types/portal";
import { cn } from "../../utils/cn";
import { ConfirmDialog } from "./ConfirmDialog";

type AppointmentsTableProps = {
  variant: DemoVariant;
  appointments: Appointment[];
  onCancel: (id: string) => void;
};

function formatDate(date: string) {
  return format(new Date(`${date}T00:00:00`), "EEE d MMM yyyy");
}

const cancelBtn = "min-h-[36px] rounded-md border border-portal-danger px-3 text-sm font-semibold text-portal-danger hover:bg-portal-subtle";

export function AppointmentsTable({ variant, appointments, onCancel }: AppointmentsTableProps) {
  const isFixed = variant === "fixed";
  const [pending, setPending] = useState<Appointment | null>(null);
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLParagraphElement>(null);
  const captionId = useId();

  useEffect(() => {
    if (message && isFixed) messageRef.current?.focus();
  }, [message, isFixed]);

  const confirmCancel = () => {
    if (!pending) return;
    onCancel(pending.id);
    setMessage(`${pending.service} on ${formatDate(pending.date)} was cancelled. This is a demo — nothing was changed.`);
    setPending(null);
  };

  return (
    <div>
      {isFixed ? <h3 className="text-xl font-semibold">My appointments</h3> : <div className="text-xl font-semibold">My appointments</div>}

      {message &&
      <p
        ref={messageRef}
        tabIndex={-1}
        {...isFixed ? { role: "status" } : {}}
        className="mt-3 rounded-md border border-portal-success bg-white px-4 py-3 text-[15px] text-portal-success">
        
          {message}
        </p>
      }

      {appointments.length === 0 ?
      <p className="mt-4 rounded-md border border-portal-line p-5 text-[15px] text-portal-muted">You have no appointments yet.</p> :
      isFixed ?
      <div role="region" aria-labelledby={captionId} tabIndex={0} className="mt-4 overflow-x-auto rounded-lg border border-portal-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
            <caption id={captionId} className="px-4 py-3 text-left text-sm text-portal-muted">
              Your appointments, soonest first
            </caption>
            <thead className="bg-portal-subtle text-sm">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Reference</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Service</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Date and time</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Location</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) =>
            <tr key={a.id} className="border-t border-portal-line">
                  <td className="px-4 py-3 font-mono text-sm">{a.id}</td>
                  <td className="px-4 py-3">{a.service}</td>
                  <td className="px-4 py-3">{formatDate(a.date)}, {a.time}</td>
                  <td className="px-4 py-3">{a.location}</td>
                  <td className="px-4 py-3">
                    {a.status === "Confirmed" ?
                <button type="button" onClick={() => setPending(a)} className={cancelBtn}>
                        Cancel<span className="sr-only"> {a.service} on {formatDate(a.date)}</span>
                      </button> :

                <span className="text-sm text-portal-muted">Cancelled</span>
                }
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div> :

      // Intentional defects ALD-009 (aria-hidden on focusable buttons) and ALD-010 (no table semantics).
      <div className="mt-4 overflow-x-auto rounded-lg border border-portal-line">
          <div className="min-w-[640px] text-[15px]">
            <div className="grid grid-cols-[110px_1.3fr_1.2fr_1.5fr_110px] gap-2 bg-portal-subtle px-4 py-2.5 text-sm font-semibold">
              <div>Reference</div>
              <div>Service</div>
              <div>Date and time</div>
              <div>Location</div>
              <div>Status</div>
            </div>
            {appointments.map((a) =>
          <div key={a.id} className="grid grid-cols-[110px_1.3fr_1.2fr_1.5fr_110px] items-center gap-2 border-t border-portal-line px-4 py-3">
                <div className="font-mono text-sm">{a.id}</div>
                <div>{a.service}</div>
                <div>{formatDate(a.date)}, {a.time}</div>
                <div>{a.location}</div>
                <div>
                  {a.status === "Confirmed" ?
              <button type="button" aria-hidden="true" onClick={() => setPending(a)} className={cn(cancelBtn)}>
                      Cancel
                    </button> :

              <span className="text-sm text-portal-muted">Cancelled</span>
              }
                </div>
              </div>
          )}
          </div>
        </div>
      }

      <ConfirmDialog
        variant={variant}
        open={pending !== null}
        title="Cancel this appointment?"
        confirmLabel="Cancel appointment"
        cancelLabel="Keep appointment"
        onConfirm={confirmCancel}
        onCancel={() => setPending(null)}>
        
        {pending ? `${pending.service} on ${formatDate(pending.date)} at ${pending.time}. You can rebook at any time.` : ""}
      </ConfirmDialog>
    </div>);

}