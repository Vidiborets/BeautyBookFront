"use client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { TodayInfoProps } from "@/src/types/index";
import { decline } from "@/src/utils/decline";
import { selectedDateTitle } from "@/src/features/appointments/utils/index";

const TodayInfo = ({ date, count, slotsCount }: TodayInfoProps) => {
  const formatedDate = format(date, "EEEE, d MMMM", { locale: ru });

  const appoinmentsCount = (
    number: number,
    first: string,
    second: string,
    third: string,
  ): string => {
    return `${count} ${decline(number, first, second, third)}`;
  };

  return (
    <div className="g-card px-3 py-2 text-sm flex justify-between items-center gap-1 ">
      <div className="flex flex-col items-baselin">
        <span className="text-2xl font-semibold tracking-wide text-black">
          {selectedDateTitle(date)}
        </span>
        <div className="text-sm text-grey-600 text-body-2">{formatedDate}</div>
      </div>

      <div className="flex gap-3 text-xs text-muted-foreground ">
        <button className="px-3 py-1.5 rounded-lg border cursor-pointer border-border bg-card  hover:bg-secondary/40 transition-colors">
          <small className="text-grey-600 text-body-2 text-sm">
            {appoinmentsCount(count, "запись", "записи", "записей")}
          </small>
        </button>

        {typeof slotsCount === "number" && (
          <button className="px-3 py-1.5 rounded-lg border cursor-pointer border-border bg-card  hover:bg-secondary/40 transition-colors">
            <small className="text-grey-600 text-body-2 text-sm">
              {appoinmentsCount(slotsCount, "окно", "окон", "окна")}
            </small>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodayInfo;
