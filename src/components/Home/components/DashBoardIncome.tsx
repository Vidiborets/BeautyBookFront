"use client";
import IconGraphic from "@/src/assets/icons/trending-up.svg";
import IconCalendar from "@/src/assets/icons/calendar-due.svg";
import { DashBoardProps } from "@/src/types";
import { computeDayIncome } from "@/src/features/appointments/utils/index";
import { selectedDateTitle } from "@/src/features/appointments/utils/index";
import { decline } from "@/src/utils/decline";

const DashBoardIncone = ({ date, count, appoinmnets }: DashBoardProps) => {
  const { totalCahs, middleDayCash } = computeDayIncome(appoinmnets);

  const appoinmentsCount = (
    number: number,
    first: string,
    second: string,
    third: string,
  ): string => {
    return decline(number, first, second, third);
  };

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-3 cursor-pointer hover:bg-secondary/40 transition-colors">
      <div className="flex flex-col gap-1 mb-4">
        <small className="text-sm text-grey-600 text-body-2">
          Доход на {selectedDateTitle(date)}
        </small>
        <div className="flex justify-between">
          <span className="text-2xl font-semibold tracking-wide text-black">
            {totalCahs} ₴
          </span>
          <i className="w-6 h-6">
            <IconGraphic />
          </i>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col">
          <span className="flex text-sm text-grey-600 text-body-2 items-center">
            <IconCalendar className="w-3.5 h-3.5 mr-0.5" />
            <p>{appoinmentsCount(count, "запись", "записи", "записей")}</p>
          </span>
          <span className="ml-0.5 font-bold">{count}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-grey-600 text-body-2">cредний чек</span>
          <span className="font-bold">{middleDayCash} ₴</span>
        </div>
      </div>
    </div>
  );
};

export default DashBoardIncone;
