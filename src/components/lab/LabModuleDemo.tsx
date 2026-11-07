import React, { useState } from "react";
import type { LabModuleId } from "../../types/content";
import type { Appointment, DemoVariant } from "../../types/portal";
import { portalAppointments } from "../../data/portal";
import { BookingForm } from "../portal/BookingForm";
import { PortalShell } from "../portal/PortalShell";
import { AppointmentsTable } from "../portal/AppointmentsTable";
import { PortalDashboard } from "../portal/PortalDashboard";
import { ServiceDirectory } from "../portal/ServiceDirectory";

type LabModuleDemoProps = {moduleId: LabModuleId;variant: DemoVariant;};

export function LabModuleDemo({ moduleId, variant }: LabModuleDemoProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(portalAppointments);

  switch (moduleId) {
    case "forms":
      return (
        <div className="p-5 md:p-8">
          <BookingForm variant={variant} />
        </div>);

    case "navigation":
      return <PortalShell variant={variant} />;
    case "dialogs":
      return (
        <div className="p-5 md:p-8">
          <AppointmentsTable
            variant={variant}
            appointments={appointments}
            onCancel={(id) => setAppointments((list) => list.map((a) => a.id === id ? { ...a, status: "Cancelled" } : a))} />
          
          <button
            type="button"
            onClick={() => setAppointments(portalAppointments)}
            className="mt-4 min-h-[36px] rounded-md border border-portal-muted px-3 text-sm font-semibold text-portal-ink hover:bg-portal-subtle">
            
            Reset demo appointments
          </button>
        </div>);

    case "semantics":
      return (
        <div className="space-y-10 p-5 md:p-8">
          <PortalDashboard variant={variant} upcomingCount={appointments.length} />
          <div className="border-t border-portal-line pt-8">
            <ServiceDirectory variant={variant} />
          </div>
        </div>);

    default:
      return null;
  }
}