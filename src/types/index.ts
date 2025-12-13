import { Appointment } from "../features/appointments/types";
import { ReactNode } from "react";

export type PromiseAppointment = {
  clientName: string | null;
  priceCents: number;
};

export type ClientInfo = {
  name: string;
  visits: number;
  totalSpent: number;
};

export type AppointmentPrice = {
  appointmentAt: string;
  priceCents: number;
};

export type DatePickerProps = {
  selected?: Date;
  onSelect: (date?: Date) => void;
  appointments: Appointment[];
};

export type AppointmentProps = {
  initialAppointments: Appointment[];
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export type TodayInfoProps = {
  date: Date;
  count: number;
  slotsCount?: number;
};

export type DashBoardProps = TodayInfoProps & {
  appoinmnets: Appointment[];
};
