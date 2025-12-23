"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../api/api";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
