"use client";

import { useSearchParams } from "next/navigation";
import { SignUpForm } from "@/src/features/auth/components/SignUpForm";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  return (
    <div className="max-w-sm mx-auto mt-16 px-4 auth-card">
      <h1 className="text-xl font-bold mb-2">Регистрация</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Создай аккаунт, чтобы следить за записями и доходом.
      </p>
      <SignUpForm initialEmail={initialEmail} />
    </div>
  );
}
