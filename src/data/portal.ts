import type { Appointment, PortalService } from "../types/portal";

/** Entirely synthetic content for the fictional "Halden University" portal. */
export const portalInstitution = "Halden University";

export const portalStudent = { name: "Jordan Ellis", studentId: "HU-204118" };

export const portalServices: PortalService[] = [
{ id: "career", name: "Career advising", department: "Student Success Office", category: "Advising", format: "In person", durationMins: 30, description: "One-to-one guidance on CVs, applications and placement options." },
{ id: "academic", name: "Academic skills session", department: "Learning Centre", category: "Academic", format: "Online", durationMins: 45, description: "Support with essay planning, referencing and study techniques." },
{ id: "wellbeing", name: "Wellbeing check-in", department: "Student Wellbeing Team", category: "Wellbeing", format: "In person", durationMins: 30, description: "A confidential conversation with a wellbeing practitioner." },
{ id: "finance", name: "Funding advice", department: "Student Funding Desk", category: "Administration", format: "Online", durationMins: 20, description: "Questions about bursaries, payment plans and hardship support." },
{ id: "disability", name: "Disability support review", department: "Inclusion Services", category: "Wellbeing", format: "In person", durationMins: 45, description: "Review learning adjustments and exam arrangements." },
{ id: "it", name: "IT account help", department: "Digital Services", category: "Administration", format: "Online", durationMins: 15, description: "Password resets, device setup and software access." },
{ id: "maths", name: "Maths drop-in", department: "Learning Centre", category: "Academic", format: "In person", durationMins: 30, description: "Help with statistics and quantitative methods." },
{ id: "intl", name: "International student advice", department: "Global Office", category: "Advising", format: "Online", durationMins: 30, description: "Guidance on visas, enrolment documents and travel letters." }];


export const portalAppointments: Appointment[] = [
{ id: "APT-1042", service: "Career advising", date: "2026-11-03", time: "10:30", location: "Room B214, Harlow Building", status: "Confirmed" },
{ id: "APT-1057", service: "Academic skills session", date: "2026-11-06", time: "14:00", location: "Online (link sent by email)", status: "Confirmed" },
{ id: "APT-1063", service: "Funding advice", date: "2026-11-12", time: "09:15", location: "Online (link sent by email)", status: "Confirmed" }];


export const advisingHours = [
{ day: "Mon", hours: 8 },
{ day: "Tue", hours: 8 },
{ day: "Wed", hours: 5 },
{ day: "Thu", hours: 8 },
{ day: "Fri", hours: 4 }];


export const bookingTimeSlots = ["09:00", "09:30", "10:30", "11:00", "13:30", "14:00", "15:30"];