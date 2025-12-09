import { api } from "../../../lib/axios";

export const deleteAppointment = async (id: number) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};
