"use client";

import { LoginForm } from "@/src/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto mt-16 px-4">
      <h1 className="text-xl font-bold mb-6">Вход</h1>
      <LoginForm />
    </div>
  );
}
