import type { Appointment } from "@/src/features/appointments/types/index";
import { format, isToday } from "date-fns";
import { ru } from "date-fns/locale";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function computeDayIncome(appointments: Appointment[]) {
  const totalCents = appointments.reduce((sum, ap) => sum + ap.priceCents, 0);

  const totalUAHNumber = totalCents / 100;

  const count = appointments.length;
  const avgCents = count > 0 ? totalCents / count : 0;
  const avgUAHNumber = avgCents / 100;

  return {
    totalCents,
    totalCahs: totalUAHNumber.toFixed(0),
    totalUAHNumber,

    avgCents,
    middleDayCash: avgUAHNumber.toFixed(0),
    avgUAHNumber,
    count,
  };
}

const selectedDateTitle = (date: Date) => {
  const today = isToday(date);
  if (today) {
    return "Сегодня";
  }
  return format(date, "EEEE", { locale: ru });
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const toHM = (totalMin: number) => {
  const safe = Number.isFinite(totalMin) ? Math.max(0, totalMin) : 0;
  return { h: Math.floor(safe / 60), m: safe % 60 };
};

export {
  formatTime,
  isSameDay,
  computeDayIncome,
  selectedDateTitle,
  clamp,
  toHM,
};
