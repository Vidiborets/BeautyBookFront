"use client";

import classNames from "classnames";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

type SideBarMenuProps = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

const SideBar = ({ setMenuOpen, menuOpen }: SideBarMenuProps) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 z-40 flex justify-center transition-opacity duration-200",
        {
          "opacity-0 pointer-events-none": !menuOpen,
          "opacity-100 pointer-events-auto": menuOpen,
        },
      )}
    >
      <div className="relative w-full max-w-md h-full">
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />

        <aside
          className={classNames(
            `
            absolute right-0 top-0 h-full w-64 max-w-[80%]
            bg-card border-l border-border shadow-xl
            transition-transform duration-200 ease-out
          `,
            {
              "translate-x-full": !menuOpen,
              "translate-x-0": menuOpen,
            },
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-medium">Меню</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/home"
              onClick={() => setMenuOpen(false)}
              className="text-sm rounded-lg px-3 py-2 hover:bg-muted transition-colors"
            >
              Главная
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-sm rounded-lg px-3 py-2 hover:bg-muted transition-colors"
            >
              Настройки
            </Link>

            <div className="mt-4 pt-4 border-t border-border">
              <LogoutButton />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
