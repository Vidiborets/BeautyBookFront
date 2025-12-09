import { cookies } from "next/headers";
import { AppointmentPrice } from "@/src/types/index";

async function getAppointments(): Promise<AppointmentPrice[]> {
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

function computeStats(appointments: AppointmentPrice[]) {
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

export default async function StatsPage() {
  const appointments = await getAppointments();
  const stats = computeStats(appointments);

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

      {/* Тут позже можно прикрутить графики (Recharts) */}
    </div>
  );
}
