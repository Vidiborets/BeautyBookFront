import { api } from "@/src/lib/axios";
import type {
  Saloon,
  CreateSaloonPayload,
  UpdateSaloonPayload,
} from "../types";

export async function fetchSaloons(): Promise<Saloon[]> {
  const res = await api.get<Saloon[]>("/saloons", {
    withCredentials: true,
  });
  return res.data;
}

export async function createSaloon(
  payload: CreateSaloonPayload,
): Promise<Saloon> {
  const res = await api.post<Saloon>("/saloons", payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateSaloon(
  id: number,
  payload: UpdateSaloonPayload,
): Promise<Saloon> {
  const res = await api.patch<Saloon>(`/saloons/${id}`, payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function deleteSaloon(id: number): Promise<void> {
  await api.delete(`/saloons/${id}`, {
    withCredentials: true,
  });
}
