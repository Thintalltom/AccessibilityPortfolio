import type { BookingErrors, BookingValues } from "../types/portal";

export const emptyBooking: BookingValues = {
  fullName: "",
  studentId: "",
  email: "",
  serviceId: "",
  date: "",
  time: "",
  notes: ""
};

export const bookingFieldOrder: (keyof BookingValues)[] = ["fullName", "studentId", "email", "serviceId", "date", "time"];

export function validateBooking(values: BookingValues, today: Date = new Date()): BookingErrors {
  const errors: BookingErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your full name";
  if (!values.studentId.trim()) errors.studentId = "Enter your student ID";else
  if (!/^HU-\d{6}$/i.test(values.studentId.trim())) errors.studentId = "Student ID must look like HU-123456";
  if (!values.email.trim()) errors.email = "Enter your university email address";else
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter an email address in the format name@example.ac.uk";
  if (!values.serviceId) errors.serviceId = "Choose a service";
  if (!values.date) errors.date = "Choose a date";else
  {
    const chosen = new Date(`${values.date}T00:00:00`);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (chosen < startOfToday) errors.date = "Choose a date today or in the future";
  }
  if (!values.time) errors.time = "Choose a time";
  return errors;
}