"use client";

import { useMemo } from "react";
import { useAppointments } from "@/src/features/appointments/hooks/useAppointments";
import { appointmentsStore } from "@/src/features/appointments/stores/appointments.store";
import type { Appointment } from "@/src/features/appointments/types";

function computeStats(appointments: Appointment[]) {
  const total = appointments.length;
  const totalRevenue = appointments.reduce((sum, ap) => sum + ap.priceCents, 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const thisMonth = appointments.filter(
    (ap) => new Date(ap.appointmentAt) >= startOfMonth,
  );

  const monthRevenue = thisMonth.reduce((sum, ap) => sum + ap.priceCents, 0);

  return {
    totalAppointments: total,
    totalRevenueCents: totalRevenue,
    monthAppointments: thisMonth.length,
    monthRevenueCents: monthRevenue,
  };
}

const StatsPage = () => {
  const { isLoading, isFetching } = useAppointments();

  const appointments = appointmentsStore.items;

  const initialLoading = (isLoading || isFetching) && appointments.length === 0;

  const stats = useMemo(() => computeStats(appointments), [appointments]);

  if (initialLoading) {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold">Статистика</h1>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Статистика</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Всего записей</div>
          <div className="text-xl font-bold mt-1">
            {stats.totalAppointments}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Общая выручка</div>
          <div className="text-xl font-bold mt-1">
            {(stats.totalRevenueCents / 100).toFixed(0)} ₴
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">
            Записей в этом месяце
          </div>
          <div className="text-xl font-bold mt-1">
            {stats.monthAppointments}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Выручка за месяц</div>
          <div className="text-xl font-bold mt-1">
            {(stats.monthRevenueCents / 100).toFixed(0)} ₴
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
