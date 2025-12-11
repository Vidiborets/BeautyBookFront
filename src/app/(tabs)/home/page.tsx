"use client";
import { observer } from "mobx-react-lite";
import { useAppointments } from "@/src/features/appointments/hooks/useAppointments";
import { appointmentsStore } from "@/src/features/appointments/stores/appointments.store";
import HomePageContent from "@/src/components/Home/components/HomePage";

const HomePage = () => {
  const { isLoading, isFetching } = useAppointments();
  const initialLoading =
    (isLoading || isFetching) && appointmentsStore.items.length === 0;
  if (initialLoading) {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold">Главная</h1>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  return <HomePageContent />;
};

export default observer(HomePage);
