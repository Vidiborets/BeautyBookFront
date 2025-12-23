"use client";

import * as React from "react";
import { observer } from "mobx-react-lite";
import { clientsStore } from "@/src/features/clients/stores/clients.stores";
import type { Client } from "@/src/features/clients/types";
import { Button } from "@/src/components/Button";
import { ClientModal } from "../components/ClientsModal";

export default observer(function ClientsPage() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"create" | "edit">("create");
  const [editing, setEditing] = React.useState<Client | null>(null);

  React.useEffect(() => {
    clientsStore.load();
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={() => {
            setMode("create");
            setEditing(null);
            setOpen(true);
          }}
        >
          Добавить
        </Button>
      </div>

      {clientsStore.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Клиентов пока нет — добавь первого ✨
        </p>
      ) : (
        <div className="space-y-2">
          {clientsStore.items.map((c) => (
            <button
              key={c.id}
              type="button"
              className="w-full text-left flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2"
              onClick={() => {
                setMode("edit");
                setEditing(c);
                setOpen(true);
              }}
            >
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                {c.phone ? (
                  <div className="text-xs text-muted-foreground">{c.phone}</div>
                ) : null}
              </div>
              <div className="text-xs text-muted-foreground">Открыть</div>
            </button>
          ))}
        </div>
      )}

      <ClientModal
        open={open}
        onClose={close}
        mode={mode}
        client={editing}
        onCreate={async (values) => {
          await clientsStore.create(values);
        }}
        onUpdate={async (id, values) => {
          clientsStore.update(id, values);
        }}
        onDelete={async (id) => {
          await clientsStore.remove(id);
        }}
      />
    </div>
  );
});
