"use client";

import type { Appointment } from "../types";
import { AppointmentCard } from "./AppointmentCard";

export function AppointmentList({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <div className="space-y-3">
      {appointments.map((ap) => (
        <AppointmentCard key={ap.id} ap={ap} />
      ))}
    </div>
  );
}
