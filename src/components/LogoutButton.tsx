"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "../features/auth/stores/auth.stores";

function LogoutButtonInner() {
  if (!authStore.isLogged) return null;

  return (
    <button
      type="button"
      onClick={() => authStore.logout()}
      className="rounded-full cursor-pointer border border-border bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm hover:bg-secondary hover:text-foreground transition-colors"
    >
      Выйти
    </button>
  );
}

export const LogoutButton = observer(LogoutButtonInner);
