import { cookies } from "next/headers";
import { PromiseAppointment, ClientInfo } from "@/src/types/index";

async function getAppointments(): Promise<PromiseAppointment[]> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

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

export default async function ClientsPage() {
  const appointments = await getAppointments();
  const clients = buildClients(appointments);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Клиенты</h1>

      {clients.length === 0 && (
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
