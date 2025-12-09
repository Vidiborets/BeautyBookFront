import { api } from "@/src/lib/axios";
import { signUpPayload } from "../types/index";

export const signUpRequest = async (payload: signUpPayload) => {
  const res = await api.post("/auth/signup", payload, {
    withCredentials: true,
  });
  return res.data;
};
