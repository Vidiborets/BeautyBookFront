import { api } from "@/src/lib/axios";
import type { Appointment, AppoinmentPayload } from "../types";

export const updateAppointment = async (
  id: number,
  payload: Partial<AppoinmentPayload>,
): Promise<Appointment> => {
  const res = await api.patch(`/appointments/${id}`, payload);
  return res.data;
};
