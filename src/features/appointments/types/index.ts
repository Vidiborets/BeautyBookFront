export interface AppoinmentPayload {
  clientName?: string;
  serviceName: string;
  priceCents: number;
  appointmentAt: string;
  durationMin: number;
  description?: string;
}

export type Appointment = {
  id: number;
  userId: number;
  serviceName: string;
  clientName: string | null;
  priceCents: number;
  appointmentAt: string;
  durationMin: number;
  description: string | null;
};
