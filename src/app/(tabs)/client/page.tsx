"use client";

import ClientsContainer from "@/src/features/clients/container/ClientsContainer";

export default function ClientsPage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Клиенты</h1>
      <ClientsContainer />
    </div>
  );
}
