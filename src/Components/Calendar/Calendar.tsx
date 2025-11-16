import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../Cards/Card";
import type { ReactNode } from "react";
import { useState } from "react";

interface CalendarProps {
  renderModal: () => ReactNode;
}

const Calendar = ({ renderModal }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date(); // today's date
  });

  // Move to previous month
  const prevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // Move to next month
  const nextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Helper values
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  // Sunday = 0, Monday = 1...
  // We want Monday first -> shift index
  const startIndex = (firstDay + 6) % 7;

  // Number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create array with empty spots + days
  const calendarCells = [
    ...Array(startIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const renderPillIcon = () => {
    return (
      <span className="border px-3 py-1 rounded-full bg-blue-300">
        C-2025-001 - Acme Corp
      </span>
    );
  };

  return (
    <Card className="my-5 mx-3">
      <div className="flex justify-between py-5 px-5">
        <div onClick={prevMonth} className="cursor-pointer">
          <ChevronLeft />
        </div>

        <div className="text-4xl">
          {monthName} {year}
        </div>

        <div onClick={nextMonth} className="cursor-pointer">
          <ChevronRight />
        </div>
      </div>

      <div className="py-5 px-5">
        <div className="grid grid-cols-7 gap-4 text-center">
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>

        <div className="grid grid-cols-7">
          {calendarCells.map((day, idx) => (
            <div
              key={idx}
              className="h-40 p-2 border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              {day && (
                <>
                  <div className="mb-2">{day}</div>
                  {day == currentDate.getDate().toString() ? renderPillIcon() : null}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {renderModal()}
    </Card>
  );
};

export default Calendar;
