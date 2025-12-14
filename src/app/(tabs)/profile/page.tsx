"use client";

import UserProfileForm from "@/src/features/auth/components/UserProfileForm";

export default function SettingsPage() {
  return (
    <div className="max-w-sm mx-auto mt-8 px-4">
      <h1 className="text-xl font-bold mb-2">Профиль</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Обнови свои данные и информацию о салоне.
      </p>

      <UserProfileForm />
    </div>
  );
}
