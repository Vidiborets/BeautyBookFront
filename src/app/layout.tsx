import type { Metadata } from "next";
import "./globals.css";
import "@/src/components/Home/styles/index.css";

import { AppProvider } from "./provider";

export const metadata: Metadata = {
  title: "BeautyBook",
  description: "Записи клиентов для салона",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-background text-foreground">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
