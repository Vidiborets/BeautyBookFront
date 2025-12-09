import { api } from "@/src/lib/axios";

export async function signInRequest(email: string, password: string) {
  const res = await api.post(
    "/auth/signin",
    { email, password },
    { withCredentials: true },
  );
  return res.data;
}
