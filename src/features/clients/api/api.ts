import type { Client, CreateClientPayload } from "../types";
import { api } from "@/src/lib/axios";

export async function fetchClients(): Promise<Client[]> {
  const response = await fetch("/api/clients");
  return response.json();
}

export async function createClient(
  payload: CreateClientPayload,
): Promise<Client> {
  const res = await api.post<Client>("/clients", payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateClient(
  id: number,
  payload: CreateClientPayload,
): Promise<Client> {
  const res = await api.patch<Client>(`/clients/${id}`, payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}`, {
    withCredentials: true,
  });
}
