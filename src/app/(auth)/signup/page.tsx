"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SignUpForm } from "@/src/features/auth/components/SignUpForm";

function SignUpPageInner() {
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

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-sm mx-auto mt-16 px-4 auth-card">
          <h1 className="text-xl font-bold mb-2">Регистрация</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Загружаем форму...
          </p>
        </div>
      }
    >
      <SignUpPageInner />
    </Suspense>
  );
}
