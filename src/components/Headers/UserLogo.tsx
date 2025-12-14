"use client";

import { observer } from "mobx-react-lite";
import UserIcon from "../../assets/icons/user-icon.svg";
import { authStore } from "@/src/features/auth/stores/auth.stores";
import { useRouter } from "next/navigation";

export const UserLogo = observer(() => {
  const user = authStore.user;
  const router = useRouter();

  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const sallonName =
    user?.sallons?.map((sallon) => sallon.name).join(", ") ?? "Нет салона";

  return (
    <div className="flex items-center gap-4">
      <button
        key="profile"
        onClick={() => {
          router.push("/profile");
        }}
        className="w-12 h-12 cursor-pointer bg-gradient-to-br from-gray-500 to-gray-200 rounded-full flex items-center justify-center shrink-0 shadow-[var(--shadow-sm)]"
      >
        <i className="text-white w-6 h-6 flex justify-center items-center">
          <UserIcon />
        </i>
      </button>
      <div className="flex flex-col">
        <h6 className="text-black capitalize">
          {firstName} {lastName}
        </h6>
        <p className="text-grey-600 text-body-2 capitalize">{sallonName}</p>
      </div>
    </div>
  );
});
