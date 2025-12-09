"use client";

import { appointmentsStore } from "../stores/appointments.store";
import type { Appointment } from "../types";
import { formatTime } from "@/src/features/appointments/utils/index";

export function AppointmentCard({ ap }: { ap: Appointment }) {
  return (
    <div
      onClick={() => appointmentsStore.openEdit(ap)}
      className="
        rounded-xl border border-border bg-card p-3
        flex justify-between items-center
        cursor-pointer
        hover:bg-secondary/40 transition-colors
      "
    >
      <div>
        <div className="text-sm font-semibold">
          {ap.serviceName}{" "}
          {ap.clientName && (
            <span className="text-muted-foreground">· {ap.clientName}</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {formatTime(ap.appointmentAt)} · {ap.durationMin} мин
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm font-bold">
          {(ap.priceCents / 100).toFixed(0)} ₴
        </div>

        {/* delete icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            appointmentsStore.remove(ap.id);
          }}
          className="
            inline-flex h-8 w-8 items-center justify-center
            rounded-full border border-border
            text-muted-foreground hover:text-red-600 hover:border-red-200
            transition-colors
          "
          aria-label="Удалить запись"
          title="Удалить"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
