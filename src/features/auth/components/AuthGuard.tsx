"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/auth.stores";

export const AuthGuard = observer(({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  useEffect(() => {
    if (!isAuthPage) {
      authStore.init();
    }
  }, [isAuthPage]);

  useEffect(() => {
    if (isAuthPage) return;
    if (!authStore.hydrated || authStore.loading) return;

    if (!authStore.isLogged) {
      router.replace("/login");
    }
  }, [
    isAuthPage,
    router,
    authStore.hydrated,
    authStore.loading,
    authStore.isLogged,
  ]);

  if (isAuthPage) return <>{children}</>;

  if (!authStore.hydrated || authStore.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Загрузка...
      </div>
    );
  }

  if (!authStore.isLogged) return null;

  return <>{children}</>;
});
