import { api } from "@/src/lib/axios";
import type { Service } from "../types/index";

export async function fetchServices(): Promise<Service[]> {
  const res = await api.get<Service[]>("/services", { withCredentials: true });
  return res.data;
}

export async function createService(
  payload: Omit<Service, "id" | "createdAt" | "updatedAt">,
): Promise<Service> {
  const res = await api.post<Service>("/services", payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateService(
  id: number,
  payload: Partial<Omit<Service, "id">>,
): Promise<Service> {
  const res = await api.patch<Service>(`/services/${id}`, payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function deleteService(id: number): Promise<void> {
  await api.delete(`/services/${id}`, { withCredentials: true });
}
