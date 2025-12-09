"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/src/features/auth/components/AuthGuard";
import Headers from "@/src/components/Headers";

const tabs = [
  { href: "/home", icon: "🏠", label: "Главная" },
  { href: "/appointments", icon: "➕", label: "Запись" },
  { href: "/client", icon: "👥", label: "Клиенты" },
  { href: "/stats", icon: "📊", label: "Статистика" },
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
        <main className="p-4">{children}</main>

        <nav className="fixed bottom-0 left-0 w-full border-t bg-card/90 backdrop-blur-md">
          <div className="max-w-md mx-auto flex justify-between px-6 py-2">
            {tabs.map((tab) => {
              const active = pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </AuthGuard>
  );
}
