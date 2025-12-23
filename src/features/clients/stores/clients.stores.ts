"use client";

import { makeAutoObservable, runInAction } from "mobx";
import type { Client, CreateClientPayload } from "../types";
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from "../api/api";

class ClientsStore {
  items: Client[] = [];
  loading = false;
  hydrated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    if (this.hydrated) return;
    this.loading = true;
    try {
      const data = await fetchClients();
      runInAction(() => {
        this.items = data;
        this.hydrated = true;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async reload() {
    this.loading = true;
    try {
      const data = await fetchClients();
      runInAction(() => {
        this.items = data;
        this.hydrated = true;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async create(payload: CreateClientPayload) {
    const created = await createClient(payload);
    runInAction(() => {
      this.items = [created, ...this.items];
    });
    return created;
  }

  async update(id: number, updatedClient: CreateClientPayload) {
    const updated = await updateClient(id, updatedClient);
    runInAction(() => {
      this.items = this.items.map((client) =>
        client.id === id ? { ...client, ...updatedClient, ...updated } : client,
      );
    });
  }

  async remove(id: number) {
    const prev = this.items;

    try {
      await deleteClient(id);
    } catch {
      runInAction(() => {
        this.items = prev;
      });
      throw new Error("Не удалось удалить запись");
    } finally {
      runInAction(() => {
        this.items = this.items.filter((client) => client.id !== id);
      });
    }
  }
}

export const clientsStore = new ClientsStore();
