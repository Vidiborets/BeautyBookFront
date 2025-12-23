"use client";

import { AppointmentForm } from "@/src/features/appointments/components/AppointmentForm";
import { appointmentsStore } from "@/src/features/appointments/stores/appointments.store";
import { AppointmentFormValuesType } from "@/src/features/appointments/types";

export default function NewAppointmentPage() {
  const onSubmit = async (values: AppointmentFormValuesType) => {
    const appointmentAt = new Date(
      `${values.date}T${values.time}:00`,
    ).toISOString();

    await appointmentsStore.create({
      serviceName: values.serviceName,
      serviceId: values.serviceId,
      clientId: values.clientId,
      clientName: values.clientName,
      priceCents: Math.round(Number(values.price) * 100),
      appointmentAt,
      durationMin: Number(values.durationMin),
      description: values.description || undefined,
    });
  };
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Новая запись</h1>
      <AppointmentForm onSubmit={onSubmit} />
    </div>
  );
}
