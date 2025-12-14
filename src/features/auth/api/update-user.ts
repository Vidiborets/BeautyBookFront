import { api } from "@/src/lib/axios";
import type { AuthUser } from "../types";
import { UpdateUserPayload } from "../types";

export async function updateUserRequest(
  id: number,
  payload: UpdateUserPayload,
): Promise<AuthUser> {
  const res = await api.patch<AuthUser>(`/users/${id}`, payload);
  return res.data;
}
