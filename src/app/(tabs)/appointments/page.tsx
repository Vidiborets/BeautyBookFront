"use client";

import { AppointmentForm } from "@/src/features/appointments/components/AppointmentForm";

export default function NewAppointmentPage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Новая запись</h1>
      <AppointmentForm />
    </div>
  );
}
