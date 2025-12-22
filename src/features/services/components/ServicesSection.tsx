"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { servicesStore } from "../store/service.stores";
import type { Service } from "../types";
import { ServicesForm, ServicesFormValues } from "./ServicesForm";
import { Button } from "@/src/components/Button";

const ServicesSection = observer(() => {
  const { items, loading } = servicesStore;
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Service | null>(null);

  useEffect(() => {
    servicesStore.load();
  }, []);

  const handleCreate = async (values: ServicesFormValues) => {
    await servicesStore.create({
      name: values.name,
      price: Number(values.price) * 100,
      duration: values.duration,
      description: values.description || undefined,
    });
    setMode("list");
  };

  const handleUpdate = async (values: ServicesFormValues) => {
    if (!editing) return;
    await servicesStore.update(editing.id, {
      name: values.name,
      price: Number(values.price) * 100,
      duration: values.duration,
      description: values.description || undefined,
    });
    setMode("list");
    setEditing(null);
  };

  if (mode === "create") {
    return (
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Новая услуга</h2>
          <button
            type="button"
            onClick={() => setMode("list")}
            className="text-xs text-muted-foreground"
          >
            Отмена
          </button>
        </div>

        <ServicesForm onSubmit={handleCreate} submitLabel="Добавить услугу" />
      </div>
    );
  }

  if (mode === "edit" && editing) {
    return (
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Редактировать услугу</h2>
          <button
            type="button"
            onClick={() => {
              setMode("list");
              setEditing(null);
            }}
            className="text-xs text-muted-foreground"
          >
            Отмена
          </button>
        </div>

        <ServicesForm
          initial={{
            name: editing.name,
            price: String(editing.price / 100),
            duration: editing.duration,
            description: editing.description ?? "",
          }}
          onSubmit={handleUpdate}
          submitLabel="Сохранить изменения"
        />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between flex-col gap-2">
        <h2 className="text-lg font-semibold">Услуги</h2>
        <Button
          type="button"
          onClick={() => setMode("create")}
          disabled={loading}
        >
          Добавить услугу
        </Button>
      </div>

      {loading && items.length === 0 && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          У тебя ещё нет услуг — добавь первую ✨
        </p>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-2">
          {items.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2"
            >
              <div>
                <div className="text-sm font-semibold">{service.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(service.price / 100).toFixed(0)} ₴ · {service.duration} мин
                </div>
                {service.description && (
                  <div className="text-xs text-muted-foreground">
                    {service.description}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(service);
                    setMode("edit");
                  }}
                  className="text-xs px-2 py-1 rounded-lg border border-border hover:bg-muted"
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={() => servicesStore.remove(service.id)}
                  className="text-xs px-2 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ServicesSection;
