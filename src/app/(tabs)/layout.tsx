"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/src/features/auth/components/AuthGuard";
import Headers from "@/src/components/Headers";
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

  return (
    <AuthGuard>
      <Headers />
      <div className="min-h-screen pb-20 relative">
        <main className="pr-4 pl-4">{children}</main>

        <nav className="fixed bottom-0 left-0 right-0 z-40">
          <div className="max-w-md mx-auto px-4 pb-safe">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-(--shadow-xl) border border-(--color-border-light) mb-2 flex items-center justify-around px-1.5 py-1.5">
              {tabs.map((tab) => {
                const active = pathname.startsWith(tab.href);
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={claassNames(
                      "flex flex-col items-center gap-1 px-5 py-2.5 rounded-2xl transition-all duration-200 min-w-[70px] bg-(--color-brand) shadow-(--shadow-sm) text-muted-foreground ",
                      {
                        "bg-primary text-primary-foreground": active,
                      },
                    )}
                  >
                    <div
                      className={claassNames(
                        "rounded-full flex items-center justify-center text-lg",
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
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </AuthGuard>
  );
}
