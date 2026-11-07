export type DemoVariant = "flawed" | "fixed";

export type PortalView = "dashboard" | "services" | "book" | "appointments";

export type ServiceCategory = "Advising" | "Wellbeing" | "Academic" | "Administration";

export type PortalService = {
  id: string;
  name: string;
  department: string;
  category: ServiceCategory;
  format: "In person" | "Online";
  durationMins: number;
  description: string;
};

export type Appointment = {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "Confirmed" | "Cancelled";
};

export type BookingValues = {
  fullName: string;
  studentId: string;
  email: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
};

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;