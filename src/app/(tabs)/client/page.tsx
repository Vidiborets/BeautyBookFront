"use client";

import { PromiseAppointment, ClientInfo } from "@/src/types/index";
import { useAppointments } from "@/src/features/appointments/hooks/useAppointments";
import { appointmentsStore } from "@/src/features/appointments/stores/appointments.store";
import { useMemo } from "react";

function buildClients(appointments: PromiseAppointment[]): ClientInfo[] {
  const map = new Map<string, ClientInfo>();

  for (const ap of appointments) {
    const name = ap.clientName || "Без имени";

    if (!map.has(name)) {
      map.set(name, { name, visits: 0, totalSpent: 0 });
    }
    const c = map.get(name)!;
    c.visits += 1;
    c.totalSpent += ap.priceCents;
  }

  return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
}

export default function ClientsPage() {
  const { isLoading, isFetching } = useAppointments();
  const appointments = appointmentsStore.items;
  const clients = useMemo(() => buildClients(appointments), [appointments]);

  const initialLoading = (isLoading || isFetching) && appointments.length === 0;

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Клиенты</h1>

      {initialLoading && (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      )}

      {!initialLoading && clients.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Клиентов пока нет — добавь первую запись ✨
        </p>
      )}

      <div className="space-y-2">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2"
          >
            <div>
              <div className="text-sm font-semibold">{client.name}</div>
              <div className="text-xs text-muted-foreground">
                Визитов: {client.visits}
              </div>
            </div>
            <div className="text-sm font-bold">
              {(client.totalSpent / 100).toFixed(0)} ₴
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
