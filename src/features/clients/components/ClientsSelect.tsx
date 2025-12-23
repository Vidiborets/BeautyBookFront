"use client";

import * as React from "react";
import { observer } from "mobx-react-lite";
import { ChevronsUpDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { clientsStore } from "../stores/clients.stores";
import type { Client } from "../types";

type Props = {
  valueClientId?: number | null;
  onPickClient: (client: Client) => void;
  onChangeClientName?: (name: string) => void;
  placeholder?: string;
};

const DEFAULT_LIMIT = 10;

export const ClientCombobox = observer(function ClientCombobox({
  valueClientId,
  onPickClient,
  onChangeClientName,
  placeholder = "Выберите клиента",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [mode, setMode] = React.useState<"select" | "create">("select");

  const [draftName, setDraftName] = React.useState("");
  const [draftPhone, setDraftPhone] = React.useState("");
  const [draftNote, setDraftNote] = React.useState("");

  React.useEffect(() => {
    clientsStore.load();
  }, []);

  const selected = valueClientId
    ? clientsStore.items.find((c) => c.id === valueClientId)
    : undefined;

  const sorted = React.useMemo(() => {
    return [...clientsStore.items].sort((a, b) =>
      a.name.localeCompare(b.name, "ru", { sensitivity: "base" }),
    );
  }, [clientsStore.items]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted.slice(0, DEFAULT_LIMIT);
    return sorted.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, sorted]);

  const hasQuery = query.trim().length > 0;
  const noResults = filtered.length === 0;

  const startCreate = () => {
    setMode("create");
    setDraftName(query.trim());
    setDraftPhone("");
    setDraftNote("");
  };

  const cancelCreate = () => {
    setMode("select");
  };

  const saveCreate = async () => {
    const name = draftName.trim();
    if (!name) return;

    const created = await clientsStore.create({
      name,
      phone: draftPhone.trim() || undefined,
      note: draftNote.trim() || undefined,
    });

    onPickClient(created);
    onChangeClientName?.(created.name);

    setMode("select");
    setOpen(false);
    setQuery("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(v: boolean) => {
        setOpen(v);
        if (!v) {
          setMode("select");
          setQuery("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">{selected?.name ?? placeholder}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        style={{
          width: "var(--radix-popper-anchor-width)",
          minWidth: "var(--radix-popper-anchor-width)",
        }}
        className={cn("p-0")}
        align="start"
      >
        {mode === "select" ? (
          <Command>
            <CommandInput
              placeholder="Поиск клиента..."
              value={query}
              onValueChange={setQuery}
            />

            <CommandEmpty>
              {hasQuery ? (
                <div className="p-2 text-sm text-muted-foreground">
                  Клиент не найден
                </div>
              ) : null}
            </CommandEmpty>

            <CommandGroup>
              {filtered.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={() => {
                    onPickClient(c);
                    onChangeClientName?.(c.name);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      c.id === valueClientId ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="truncate">{c.name}</span>
                    {c.phone ? (
                      <span className="text-xs text-muted-foreground truncate">
                        {c.phone}
                      </span>
                    ) : null}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            <div className="border-t p-2">
              <Button type="button" className="w-full" onClick={startCreate}>
                Добавить {query.trim() ? `«${query.trim()}»` : "клиента"}
              </Button>

              {/* если хочешь — можно подсветить, что результатов 0 */}
              {hasQuery && noResults ? (
                <div className="mt-2 text-xs text-muted-foreground">
                  Ничего не найдено по запросу
                </div>
              ) : null}
            </div>
          </Command>
        ) : (
          <div className="p-3 space-y-2">
            <div className="text-sm font-semibold">Новый клиент</div>

            <input
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
              placeholder="Имя"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              autoFocus
            />

            <input
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
              placeholder="Телефон"
              value={draftPhone}
              onChange={(e) => setDraftPhone(e.target.value)}
            />

            <textarea
              className="w-full min-h-20 rounded-md border border-input px-3 py-2 text-sm"
              placeholder="Комментарий"
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={cancelCreate}
              >
                Назад
              </Button>
              <Button
                type="button"
                className="w-full"
                onClick={saveCreate}
                disabled={!draftName.trim()}
              >
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
});
