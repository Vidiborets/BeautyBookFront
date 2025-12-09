import { api } from "@lib/axios";
import { Appointment, AppoinmentPayload } from "../types/index";

export const createAppointment = async (
  payload: AppoinmentPayload,
): Promise<Appointment> => {
  const res = await api.post("/appointments", payload);
  return res.data;
};
