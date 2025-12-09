"use client";

import { useEffect } from "react";
import type { ModalProps } from "../types";

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
      />

      <div
        className="
          absolute bottom-0 left-0 right-0
          mx-auto max-w-md
          rounded-t-2xl border border-border
          bg-card shadow-xl
          animate-in slide-in-from-bottom duration-200
        "
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="text-sm font-semibold">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex h-8 w-8 items-center justify-center
              rounded-full border border-border bg-background
              text-muted-foreground hover:text-foreground
            "
          >
            ✕
          </button>
        </div>

        <div className="px-4 pb-6 pt-3">{children}</div>
      </div>
    </div>
  );
}
