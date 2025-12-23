export interface AppoinmentPayload {
  clientName?: string;
  serviceName: string;
  priceCents: number;
  appointmentAt: string;
  durationMin: number;
  clientId: number | null;
  serviceId: number | null;
  description?: string;
}

export type Appointment = {
  id: number;
  userId: number;
  serviceId: number | null;
  clientId: number | null;
  serviceName: string;
  clientName: string | null;
  priceCents: number;
  appointmentAt: string;
  durationMin: number;
  description: string | null;
};

export type AppointmentFormValuesType = {
  serviceName: string;
  serviceId: number | null;
  clientId: number | null;
  clientName: string;
  clientPhone: string;
  clientNote: string;
  price: string | number;
  date: string;
  time: string;
  durationMin: number;
  description?: string;
  durationHours: string;
  durationMinutes: string;
};
