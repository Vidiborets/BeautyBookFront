"use client";

import { observer } from "mobx-react-lite";
import { Modal } from "@/src/components/Modal";
import { appointmentsStore } from "../stores/appointments.store";
import {
  AppointmentForm,
  AppointmentFormValues,
} from "../components/AppointmentForm";
import { Appointment } from "../types";

function toFormInitial(ap: Appointment) {
  const d = new Date(ap.appointmentAt);
  const date = d.toISOString().slice(0, 10);
  const time = d.toTimeString().slice(0, 5);

  return {
    serviceName: ap.serviceName ?? "",
    clientName: ap.clientName ?? "",
    price: String((ap.priceCents ?? 0) / 100),
    date,
    time,
    durationMin: ap.durationMin ?? 60,
    description: ap.description ?? "",
  };
}

export const AppointmentContainer = observer(() => {
  const store = appointmentsStore;
  const isEdit = store.sheetMode === "edit" && store.editing;

  const onSubmit = async (values: AppointmentFormValues) => {
    const appointmentAt = new Date(
      `${values.date}T${values.time}:00`,
    ).toISOString();

    if (isEdit && store.editing) {
      await store.update(store.editing.id, {
        serviceName: values.serviceName,
        clientName: values.clientName,
        priceCents: Number(values.price) * 100,
        appointmentAt,
        durationMin: values.durationMin,
        description: values.description || undefined,
      });
    } else {
      await store.create({
        serviceName: values.serviceName,
        clientName: values.clientName,
        priceCents: Number(values.price) * 100,
        appointmentAt,
        durationMin: values.durationMin,
        description: values.description || undefined,
      });
    }
  };

  return (
    <Modal
      open={store.sheetOpen}
      onClose={() => store.closeSheet()}
      title={isEdit ? "Редактировать запись" : "Новая запись"}
    >
      <AppointmentForm
        initialValues={
          isEdit && store.editing ? toFormInitial(store.editing) : undefined
        }
        submitLabel={isEdit ? "Обновить" : "Создать"}
        onSubmit={onSubmit}
      />
    </Modal>
  );
});
