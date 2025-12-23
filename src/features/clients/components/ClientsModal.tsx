"use client";

import type { Client, ClientFormValues } from "../types";
import { Modal } from "@/src/components/Modal";
import { ClientForm } from "./ClientsForm";
import { Button } from "@/src/components/Button";

export function ClientModal({
  open,
  onClose,
  mode,
  client,
  onCreate,
  onUpdate,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;

  mode: "create" | "edit";
  client?: Client | null;

  onCreate: (values: ClientFormValues) => void | Promise<void>;
  onUpdate: (id: number, values: ClientFormValues) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
}) {
  const title =
    mode === "create" ? "Добавить клиента" : "Редактировать клиента";

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <ClientForm
        initialValues={
          mode === "edit" && client
            ? {
                name: client.name ?? "",
                phone: client.phone ?? "",
                note: client.note ?? "",
              }
            : undefined
        }
        submitLabel={mode === "create" ? "Добавить" : "Сохранить"}
        onSubmit={async (values) => {
          if (mode === "create") {
            await onCreate(values);
            onClose();
            return;
          }
          if (client) {
            await onUpdate(client.id, values);
            onClose();
          }
        }}
      />

      {mode === "edit" && client ? (
        <div className="mt-3">
          <Button
            type="button"
            className="w-full"
            onClick={async () => {
              await onDelete(client.id);
              onClose();
            }}
          >
            Удалить
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}
