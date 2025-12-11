import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAAppoinments } from "../api/fetchAppoinments";
import { appointmentsStore } from "../stores/appointments.store";

export const useAppointments = () => {
  const query = useQuery({
    queryKey: ["appoinments"],
    queryFn: fetchAAppoinments,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (query.data) {
      appointmentsStore.hydrate(query.data);
    }
  }, [query.data]);

  return query;
};
