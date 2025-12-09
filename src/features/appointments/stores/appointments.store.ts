"use client";

import { makeAutoObservable, runInAction } from "mobx";
import type { Appointment, AppoinmentPayload } from "../types";
import { createAppointment } from "../api/create-appointments";
import { updateAppointment } from "../api/update-appointments";
import { deleteAppointment } from "../api/delete-appointments";

class AppointmentsStore {
  items: Appointment[] = [];
  hydrated = false;

  sheetOpen = false;
  sheetMode: "create" | "edit" = "create";
  editing: Appointment | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(initial: Appointment[]) {
    if (this.hydrated) return;
    this.items = initial ?? [];
    this.hydrated = true;
  }

  openCreate() {
    this.sheetMode = "create";
    this.editing = null;
    this.sheetOpen = true;
  }

  openEdit(ap: Appointment) {
    this.sheetMode = "edit";
    this.editing = ap;
    this.sheetOpen = true;
  }

  closeSheet() {
    this.sheetOpen = false;
  }

  get list() {
    return this.items;
  }

  async create(payload: AppoinmentPayload) {
    const created = await createAppointment(payload);

    runInAction(() => {
      this.items = [created, ...this.items].sort(
        (a, b) => +new Date(a.appointmentAt) - +new Date(b.appointmentAt),
      );
    });

    this.closeSheet();
  }

  async update(id: number, payload: Partial<AppoinmentPayload>) {
    const updated = await updateAppointment(id, payload);

    runInAction(() => {
      this.items = this.items.map((x) => (x.id === id ? updated : x));
    });

    this.closeSheet();
  }

  async remove(id: number) {
    const prev = this.items;
    runInAction(() => {
      this.items = this.items.filter((x) => x.id !== id);
    });

    try {
      await deleteAppointment(id);
    } catch {
      runInAction(() => {
        this.items = prev;
      });
      throw new Error("Не удалось удалить запись");
    }
  }
}

export const appointmentsStore = new AppointmentsStore();
