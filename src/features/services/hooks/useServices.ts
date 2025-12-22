"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../api/api";
import { servicesStore } from "../store/service.stores";
import { useEffect } from "react";

export function useServices() {
  const query = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      servicesStore.setItems(query.data);
    }
  }, [query.data]);

  return query;
}
