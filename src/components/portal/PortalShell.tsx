import React, { useState } from "react";
import type { Appointment, DemoVariant, PortalView } from "../../types/portal";
import { portalAppointments, portalInstitution } from "../../data/portal";
import { PortalNav } from "./PortalNav";
import { PortalDashboard } from "./PortalDashboard";
import { ServiceDirectory } from "./ServiceDirectory";
import { BookingForm } from "./BookingForm";
import { AppointmentsTable } from "./AppointmentsTable";

export function PortalShell({ variant }: {variant: DemoVariant;}) {
  const [view, setView] = useState<PortalView>("dashboard");
  const [serviceId, setServiceId] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>(portalAppointments);
  const upcoming = appointments.filter((a) => a.status === "Confirmed").length;

  return (
    <div className="min-h-[540px]">
      <div className="flex flex-col gap-3 border-b border-portal-line px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-semibold">
          <span className="text-portal-brand">{portalInstitution}</span> Student Services{" "}
          <span className="text-sm font-normal text-portal-muted">(fictional)</span>
        </p>
        <PortalNav variant={variant} value={view} onChange={setView} />
      </div>
      <div className="p-5 md:p-8">
        {view === "dashboard" && <PortalDashboard variant={variant} upcomingCount={upcoming} onNavigate={setView} />}
        {view === "services" &&
        <ServiceDirectory
          variant={variant}
          onBook={(id) => {
            setServiceId(id);
            setView("book");
          }} />

        }
        {view === "book" &&
        <BookingForm
          key={serviceId}
          variant={variant}
          initialServiceId={serviceId}
          onBooked={(a) => setAppointments((list) => [...list, a])}
          onViewAppointments={() => setView("appointments")} />

        }
        {view === "appointments" &&
        <AppointmentsTable
          variant={variant}
          appointments={appointments}
          onCancel={(id) => setAppointments((list) => list.map((a) => a.id === id ? { ...a, status: "Cancelled" } : a))} />

        }
      </div>
    </div>);

}