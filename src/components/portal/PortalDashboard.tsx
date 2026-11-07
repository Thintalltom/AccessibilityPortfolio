import React, { useId } from "react";
import { CalendarPlusIcon, ListIcon } from "lucide-react";
import type { DemoVariant, PortalView } from "../../types/portal";
import { advisingHours, portalStudent } from "../../data/portal";

type PortalDashboardProps = {
  variant: DemoVariant;
  upcomingCount: number;
  onNavigate?: (view: PortalView) => void;
};

const actionBtn =
"inline-flex min-h-[40px] items-center gap-2 rounded-md border border-portal-muted bg-white px-4 text-sm font-semibold text-portal-ink hover:bg-portal-subtle";

function HoursChart({ labelled, titleId, descId }: {labelled: boolean;titleId: string;descId: string;}) {
  const max = 8;
  return (
    <svg
      viewBox="0 0 300 140"
      className="h-auto w-full max-w-md"
      {...labelled ? { role: "img", "aria-labelledby": `${titleId} ${descId}` } : {}}>
      
      {labelled &&
      <>
          <title id={titleId}>Advising desk opening hours this week</title>
          <desc id={descId}>
            {advisingHours.map((d) => `${d.day} ${d.hours} hours`).join(", ")}.
          </desc>
        </>
      }
      {advisingHours.map((d, i) => {
        const h = d.hours / max * 100;
        const x = 20 + i * 56;
        return (
          <g key={d.day}>
            <rect x={x} y={110 - h} width="36" height={h} rx="3" fill="#1F4E8C" />
            <text x={x + 18} y="130" textAnchor="middle" fontSize="12" fill="#4A5363">
              {d.day}
            </text>
          </g>);

      })}
    </svg>);

}

export function PortalDashboard({ variant, upcomingCount, onNavigate }: PortalDashboardProps) {
  const upcomingId = useId();
  const hoursId = useId();
  const actionsId = useId();
  const chartTitleId = useId();
  const chartDescId = useId();
  const firstName = portalStudent.name.split(" ")[0];
  const upcomingText = `You have ${upcomingCount} upcoming appointment${upcomingCount === 1 ? "" : "s"}. Reminders are sent 24 hours before each one.`;

  if (variant === "flawed") {
    // Intentional defects ALD-012 (headings), ALD-013 (contrast), ALD-014 (chart text alternative).
    return (
      <div className="space-y-8">
        <h5 className="text-2xl font-semibold">Welcome back, {firstName}</h5>
        <div>
          <div className="text-lg font-semibold">Upcoming appointments</div>
          <p className="mt-1 text-[15px] text-portal-faint">{upcomingText}</p>
        </div>
        <div>
          <div className="text-lg font-semibold">Advising desk hours</div>
          <div className="mt-3">
            <HoursChart labelled={false} titleId={chartTitleId} descId={chartDescId} />
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold">Quick actions</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={actionBtn} onClick={() => onNavigate?.("services")}>
              <ListIcon className="h-4 w-4" /> Browse services
            </button>
            <button type="button" className={actionBtn} onClick={() => onNavigate?.("book")}>
              <CalendarPlusIcon className="h-4 w-4" /> Book an appointment
            </button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold">Welcome back, {firstName}</h3>
      <section aria-labelledby={upcomingId}>
        <h4 id={upcomingId} className="text-lg font-semibold">
          Upcoming appointments
        </h4>
        <p className="mt-1 text-[15px] text-portal-muted">{upcomingText}</p>
      </section>
      <section aria-labelledby={hoursId}>
        <h4 id={hoursId} className="text-lg font-semibold">
          Advising desk hours
        </h4>
        <figure className="mt-3">
          <HoursChart labelled titleId={chartTitleId} descId={chartDescId} />
          <figcaption className="mt-2 text-sm text-portal-muted">
            Monday, Tuesday and Thursday: 8 hours. Wednesday: 5 hours. Friday: 4 hours.
          </figcaption>
        </figure>
      </section>
      <section aria-labelledby={actionsId}>
        <h4 id={actionsId} className="text-lg font-semibold">
          Quick actions
        </h4>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={actionBtn} onClick={() => onNavigate?.("services")}>
            <ListIcon aria-hidden="true" className="h-4 w-4" /> Browse services
          </button>
          <button type="button" className={actionBtn} onClick={() => onNavigate?.("book")}>
            <CalendarPlusIcon aria-hidden="true" className="h-4 w-4" /> Book an appointment
          </button>
        </div>
      </section>
    </div>);

}