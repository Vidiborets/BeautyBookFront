"use client";

import { makeAutoObservable, runInAction } from "mobx";
import type {
  Saloon,
  CreateSaloonPayload,
  UpdateSaloonPayload,
} from "../types";
import {
  fetchSaloons,
  createSaloon,
  updateSaloon,
  deleteSaloon,
} from "../api/saloons-api";

class SaloonsStore {
  items: Saloon[] = [];
  loading = false;
  hydrated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    if (this.hydrated || this.loading) return;

    this.loading = true;
    try {
      const data = await fetchSaloons();
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

  async create(payload: CreateSaloonPayload) {
    this.loading = true;
    try {
      const created = await createSaloon(payload);
      runInAction(() => {
        this.items = [...this.items, created];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async update(id: number, payload: UpdateSaloonPayload) {
    this.loading = true;
    try {
      const updated = await updateSaloon(id, payload);
      runInAction(() => {
        this.items = this.items.map((s) => (s.id === id ? updated : s));
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async remove(id: number) {
    const prev = this.items;
    runInAction(() => {
      this.items = this.items.filter((s) => s.id !== id);
    });

    try {
      await deleteSaloon(id);
    } catch {
      // откат если не получилось удалить
      runInAction(() => {
        this.items = prev;
      });
      throw new Error("Не удалось удалить салон");
    }
  }
}

export const saloonsStore = new SaloonsStore();
