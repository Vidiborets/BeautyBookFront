"use client";

import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import DatePicker from "./DatePicker";
import { AppointmentList } from "@/src/features/appointments/components/AppointmentsList";
import { isSameDay } from "@/src/features/appointments/utils/index";
import { appointmentsStore } from "@/src/features/appointments/stores/appointments.store";
import { AppointmentContainer } from "@/src/features/appointments/containers/AppointmentsContainer";
import { Button } from "@/src/components/Button";
import TodayInfo from "./TodayInfo";
import DashBoardIncone from "./DashBoardIncome";

// import { ButtonGlass, InputGlass, ThemeProvider } from "shadcn-glass-ui";

const PAGE_SIZE = 5;

function HomePageClientInner() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    return () => {
      setVisibleCount(PAGE_SIZE);
    };
  }, [selectedDate]);

  const filteredAppointments = useMemo(() => {
    const all = appointmentsStore.items;

    if (!selectedDate) return all;

    return all.filter((ap) =>
      isSameDay(new Date(ap.appointmentAt), selectedDate),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentsStore.items, selectedDate]);

  const visibleAppointments = useMemo(
    () => filteredAppointments.slice(0, visibleCount),
    [filteredAppointments, visibleCount],
  );

  const hasMore = filteredAppointments.length > visibleAppointments.length;

  return (
    <div className="max-w-md mx-auto space-y-3">
      <TodayInfo
        date={selectedDate ?? new Date()}
        count={filteredAppointments.length}
        slotsCount={7}
      />
      <div className="flex justify-center">
        <DatePicker
          selected={selectedDate}
          onSelect={setSelectedDate}
          appointments={appointmentsStore.list}
        />
      </div>

      {/* CTA */}
      <div className="flex justify-center flex-col">
        {/* <ButtonGlass
          variant="secondary"
          onClick={() => appointmentsStore.openCreate()}
        >
          Добавить запись
        </ButtonGlass>
        <ButtonGlass variant="default">Default</ButtonGlass>
        <ButtonGlass variant="secondary">Secondary</ButtonGlass>

        <ButtonGlass variant="destructive">Destructive</ButtonGlass>
        <ButtonGlass variant="outline">Outline</ButtonGlass>
        <ButtonGlass variant="ghost">Ghost</ButtonGlass>
        <ButtonGlass variant="default">Default (Glass)</ButtonGlass>
        <ButtonGlass variant="success">Success (Glass)</ButtonGlass> */}
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          На этот день нет записей ✨
        </p>
      ) : (
        <>
          <AppointmentList appointments={visibleAppointments} />

          {hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Загрузить ещё
              </Button>
            </div>
          )}
        </>
      )}

      {/* universal sheet */}
      <AppointmentContainer />
      <DashBoardIncone
        date={selectedDate ?? new Date()}
        count={filteredAppointments.length}
        appoinmnets={filteredAppointments}
        slotsCount={7}
      />
    </div>
  );
}

export default observer(HomePageClientInner);
