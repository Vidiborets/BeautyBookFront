import { api } from "@/src/lib/axios";
import type { Appointment } from "../types";

export const fetchAAppoinments = async () => {
  const res = await api.get<Appointment[]>("/appointments");
  return res.data;
};
