"use client";

import { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { DatePickerProps } from "@/src/types/index";

function DatePicker({ selected, onSelect, appointments }: DatePickerProps) {
  const bookedDays = useMemo(
    () => appointments.map((a) => new Date(a.appointmentAt)),
    [appointments],
  );

  return (
    <DayPicker
      mode="single"
      captionLayout="dropdown"
      navLayout="around"
      animate
      selected={selected}
      onSelect={onSelect}
      modifiers={{ booked: bookedDays }}
      modifiersClassNames={{
        booked: "day-booked",
      }}
    />
  );
}

export default DatePicker;
