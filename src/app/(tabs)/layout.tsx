"use client";

import { usePathname, useRouter } from "next/navigation";
import { AuthGuard } from "@/src/features/auth/components/AuthGuard";
import Headers from "@/src/components/Headers/Headers";
import IconHome from "@/src/assets/icons/home.svg";
import IconPlus from "@/src/assets/icons/plus.svg";
import IconUsers from "@/src/assets/icons/users.svg";
import IconMonitor from "@/src/assets/icons/monitor.svg";
import claassNames from "classnames";
import classNames from "classnames";

const tabs = [
  { href: "/home", icon: <IconHome />, label: "Главная" },
  { href: "/appointments", icon: <IconPlus />, label: "Запись" },
  { href: "/client", icon: <IconUsers />, label: "Клиенты" },
  { href: "/stats", icon: <IconMonitor />, label: "Статистика" },
];

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AuthGuard>
      <div className="min-h-screen flex justify-center">
        <div className="relative w-full max-w-md pb-20">
          <Headers />

          <main className="px-4">{children}</main>

          <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-md">
            <div className="px-4 pb-safe">
              <div className="bg-white/90 cursor-pointer backdrop-blur-xl rounded-3xl shadow-(--shadow-xl) border border-(--color-border-light) mb-2 flex items-center justify-around px-1.5 py-1.5">
                {tabs.map((tab) => {
                  const active = pathname.startsWith(tab.href);
                  return (
                    <button
                      key={tab.href}
                      type="button"
                      onClick={() => router.push(tab.href)}
                      className={claassNames(
                        "flex flex-col items-center cursor-pointer gap-1 px-5 py-2.5 rounded-2xl transition-all duration-200 min-w-[70px] shadow-(--shadow-sm)",
                        {
                          "bg-primary text-primary-foreground": active,
                          "bg-transparent text-muted-foreground": !active,
                        },
                      )}
                    >
                      <div
                        className={claassNames(
                          "rounded-full flex items-center justify-center text-lg w-6 h-6",
                          { "text-muted-foreground": !active },
                        )}
                      >
                        {tab.icon}
                      </div>
                      <span
                        className={classNames(
                          "text-xs font-bold mt-1 text-muted-foreground",
                          {
                            "text-white": active,
                          },
                        )}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </AuthGuard>
  );
}
