"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { setOnUnauthorized, api } from "@/src/lib/axios";
import { signInRequest } from "../api/sign-in";
import { signUpRequest } from "../api/sign-up";
import { AuthUser } from "../types";

class AuthStore {
  user: AuthUser | null = null;
  hydrated = false;
  loading = false;

  private started = false;

  constructor() {
    makeAutoObservable(this);

    setOnUnauthorized(() => {
      this.clearSession();
      // ❗ не редиректим тут, только чистим состояние
    });
  }

  private clearSession() {
    this.user = null;
  }

  async init() {
    if (this.started) return;
    this.started = true;
    await this.hydrate();
  }

  private async hydrate() {
    this.loading = true;

    try {
      const res = await api.get<AuthUser>("/users/me", {
        withCredentials: true,
      });

      runInAction(() => {
        this.user = res.data;
      });
    } catch {
      runInAction(() => {
        this.user = null;
      });
    } finally {
      runInAction(() => {
        this.hydrated = true;
        this.loading = false;
      });
    }
  }

  async login(email: string, password: string) {
    this.loading = true;
    try {
      const data = await signInRequest(email, password);

      runInAction(() => {
        this.user = data?.user ?? null;
      });

      // если вдруг бэк вернул только cookie без user
      if (!data?.user) {
        await this.init();
      }
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async register(payload: Parameters<typeof signUpRequest>[0]) {
    this.loading = true;
    try {
      const data = await signUpRequest(payload);

      runInAction(() => {
        this.user = data?.user ?? null;
      });

      if (!data?.user) {
        await this.init();
      }
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async logout() {
    this.loading = true;
    try {
      await api.post("/auth/logout", null, { withCredentials: true });
    } finally {
      runInAction(() => {
        this.clearSession();
        this.loading = false;
        this.hydrated = true;
      });
      window.location.href = "/login";
    }
  }

  get isLogged() {
    return !!this.user;
  }
}

export const authStore = new AuthStore();
