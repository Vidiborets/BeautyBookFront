"use client";

import { useState } from "react";
import { authStore } from "@/src/features/auth/stores/auth.stores";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("a.vidiborets@gmail.com");
  const [password, setPassword] = useState("Cuba2307!");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    try {
      await authStore.login(email, password);
      r.push("/home");
    } catch (e) {
      setError("Неверный логин или пароль");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold">Вход</h1>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={submit}>Войти</Button>
    </div>
  );
}
