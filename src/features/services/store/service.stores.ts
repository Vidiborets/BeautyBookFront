"use client";

import { makeAutoObservable, runInAction } from "mobx";
import type { Service } from "../types";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../api/api";

export type ServicePayload = {
  name: string;
  price: number;
  duration: number;
  description?: string;
};

class ServicesStore {
  items: Service[] = [];
  loading = false;
  hydrated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    if (this.hydrated) return;
    this.loading = true;
    try {
      const data = await fetchServices();
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
      const data = await fetchServices();
      runInAction(() => {
        this.items = data;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async create(payload: ServicePayload) {
    const created = await createService(payload);
    runInAction(() => {
      this.items = [created, ...this.items];
    });
  }

  async update(id: number, payload: Partial<ServicePayload>) {
    const updated = await updateService(id, payload);
    runInAction(() => {
      this.items = this.items.map((s) => (s.id === id ? updated : s));
    });
  }

  async remove(id: number) {
    const prev = this.items;
    runInAction(() => {
      this.items = this.items.filter((s) => s.id !== id);
    });

    try {
      await deleteService(id);
    } catch {
      runInAction(() => {
        this.items = prev;
      });
      throw new Error("Не удалось удалить услугу");
    }
  }

  setItems(items: Service[]) {
    runInAction(() => {
      this.items = items;
      this.hydrated = true;
    });
  }
}

export const servicesStore = new ServicesStore();
