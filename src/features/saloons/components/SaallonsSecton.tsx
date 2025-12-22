"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { saloonsStore } from "../stores/saloons.store";
import type { Saloon } from "../types";
import { SaloonForm } from "./SaloonsForm";
import type { SaloonFormValues } from "../types";
import { Button } from "@/src/components/Button";

const SaloonsSection = observer(() => {
  const { items, loading } = saloonsStore;
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Saloon | null>(null);

  useEffect(() => {
    saloonsStore.load();
  }, []);

  const handleCreate = async (values: SaloonFormValues) => {
    await saloonsStore.create(values);
    setMode("list");
  };

  const handleUpdate = async (values: SaloonFormValues) => {
    if (!editing) return;
    await saloonsStore.update(editing.id, values);
    setMode("list");
    setEditing(null);
  };

  if (mode === "create") {
    return (
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Новый салон</h2>
          <button
            type="button"
            onClick={() => setMode("list")}
            className="text-xs text-muted-foreground"
          >
            Отмена
          </button>
        </div>

        <SaloonForm onSubmit={handleCreate} submitLabel="Добавить салон" />
      </div>
    );
  }

  if (mode === "edit" && editing) {
    return (
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Редактировать салон</h2>
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

        <SaloonForm
          initial={editing}
          onSubmit={handleUpdate}
          submitLabel="Сохранить изменения"
        />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex  justify-between flex-col gap-2">
        <h2 className="text-lg font-semibold">Салоны</h2>
        <Button
          type="button"
          onClick={() => setMode("create")}
          disabled={loading}
        >
          Добавить салон
        </Button>
      </div>

      {loading && items.length === 0 && (
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          У тебя ещё нет салонов — добавь первый ✨
        </p>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-2">
          {items.map((saloon) => (
            <div
              key={saloon.id}
              className="flex flex-col rounded-xl border border-border bg-card px-3 py-2 gap-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{saloon.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {saloon.address}
                  </div>
                  {saloon.phone && (
                    <div className="text-xs text-muted-foreground">
                      📞 {saloon.phone}
                    </div>
                  )}
                  {saloon.employees && saloon.employees.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Сотрудников: {saloon.employees.length}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(saloon);
                      setMode("edit");
                    }}
                    className="text-xs px-2 py-1 rounded-lg border border-border hover:bg-muted"
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    onClick={() => saloonsStore.remove(saloon.id)}
                    className="text-xs px-2 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {saloon.employees && saloon.employees.length > 0 && (
                <div className="border-t border-border pt-2 mt-1 space-y-1">
                  {saloon.employees.slice(0, 3).map((emp) => (
                    <div key={emp.id} className="text-xs text-muted-foreground">
                      <span className="font-medium">{emp.name}</span>
                      {emp.role && <> · {emp.role}</>}
                      {emp.schedule && <> · {emp.schedule}</>}
                    </div>
                  ))}
                  {saloon.employees.length > 3 && (
                    <div className="text-[11px] text-muted-foreground">
                      + ещё {saloon.employees.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default SaloonsSection;
