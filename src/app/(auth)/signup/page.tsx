"use client";

import { SignUpForm } from "@/src/features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="max-w-sm mx-auto mt-16 px-4">
      <h1 className="text-xl font-bold mb-6">Регистрация</h1>
      <SignUpForm />
    </div>
  );
}
