"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CafeEvent } from "./types";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  category: string;
}

interface CalendarFilterProps {
  selectedDateFilter: string | null;
  onSelectDate: (dateStr: string | null) => void;
  eventsData: CalendarEvent[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parseEventDate = (dateStr: string) => {
  const parts = dateStr.replace(",", "").split(" ");
  const month = MONTH_NAMES.indexOf(parts[0]);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return { year, month, day };
};

export default function CalendarFilter({
  selectedDateFilter,
  onSelectDate,
  eventsData,
}: CalendarFilterProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(5); // June (0-indexed 5)
  const [calYear, setCalYear] = useState(2026);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const prevMonth = () => {
    setCalMonth((m) => {
      if (m === 0) {
        setCalYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setCalMonth((m) => {
      if (m === 11) {
        setCalYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
  const totalDaysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const dayCells: (number | null)[] = [];

  for (let i = 0; i < firstDayIndex; i++) {
    dayCells.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    dayCells.push(d);
  }

  const getEventForDateCell = (day: number | null) => {
    if (!day) return null;

    return eventsData.find((ev) => {
      if (!ev.date) return false;

      const parsed = parseEventDate(ev.date);

      return (
        parsed.year === calYear &&
        parsed.month === calMonth &&
        parsed.day === day
      );
    });
  };

  const selectDate = (dateStr: string) => {
    onSelectDate(dateStr);
    setIsCalendarOpen(false);
  };

  return (
    <div ref={calendarRef} className="relative ml-1">
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className={`p-2 border rounded-full transition-all cursor-pointer flex items-center justify-center ${
          isCalendarOpen || selectedDateFilter
            ? "bg-[#3E2723] text-[#F4F1EA] border-[#3E2723]"
            : "border-[#3E2723]/20 hover:border-[#3E2723] opacity-70 hover:opacity-100"
        }`}
        aria-label="Filter events by date calendar"
        title="Filter by Specific Date"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Custom Styled Calendar Dropdown Menu */}
      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 mt-3 z-50 bg-[#FAF8F5] border border-[#3E2723]/20 p-4 shadow-2xl rounded-sm w-[290px] max-w-[calc(100vw-32px)]"
            style={{
              boxShadow: "8px 8px 0px rgba(62, 39, 35, 0.05)",
            }}
          >
            {/* Header: Month & Year selection arrows */}
            <div className="flex items-center justify-between border-b border-[#3E2723]/10 pb-2 mb-3">
              <button
                onClick={prevMonth}
                className="p-1 hover:bg-stone-200 rounded cursor-pointer transition-colors"
                aria-label="Previous month"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <span className="font-semibold text-xs tracking-wider uppercase">
                {MONTH_NAMES[calMonth]} {calYear}
              </span>

              <button
                onClick={nextMonth}
                className="p-1 hover:bg-stone-200 rounded cursor-pointer transition-colors"
                aria-label="Next month"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Weekdays row */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] uppercase tracking-wider text-[#3E2723]/40 mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days grid layout */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {dayCells.map((day, cellIndex) => {
                if (!day) return <div key={`empty-${cellIndex}`} />;

                const event = getEventForDateCell(day);
                const isFilteredActive = selectedDateFilter === event?.date;

                return (
                  <div
                    key={`day-${day}`}
                    className="group relative flex items-center justify-center aspect-square"
                  >
                    {event ? (
                      <>
                        {/* Clickable Day with Event */}
                        <button
                          onClick={() => selectDate(event.date)}
                          className={`w-7 h-7 flex items-center justify-center font-bold border transition-all cursor-pointer rounded-full
                            ${
                              isFilteredActive
                                ? "bg-[#3E2723] text-[#F4F1EA] border-[#3E2723]"
                                : "border-[#C5A880]/70 bg-[#C5A880]/10 text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F4F1EA]"
                            }
                          `}
                        >
                          {day}
                        </button>
                        {/* Tooltip display on hover showing scheduled Event Title */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[160px] scale-0 group-hover:scale-100 transition-transform bg-[#3E2723] text-[#F4F1EA] text-[9.5px] py-1.5 px-2.5 rounded shadow-xl pointer-events-none z-50 text-center leading-normal">
                          <span className="font-bold block text-[8px] text-[#C5A880] uppercase tracking-wider border-b border-white/10 pb-0.5 mb-1">
                            {event.category} Event
                          </span>
                          {event.title}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#3E2723]" />
                        </div>
                      </>
                    ) : (
                      /* Standard non-event day cell */
                      <span className="w-7 h-7 flex items-center justify-center opacity-25 select-none">
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reset Option inside Calendar */}
            {selectedDateFilter && (
              <div className="border-t border-[#3E2723]/10 mt-3 pt-2.5 text-center">
                <button
                  onClick={() => {
                    onSelectDate(null);
                    setIsCalendarOpen(false);
                  }}
                  className="text-[9px] uppercase tracking-wider font-bold text-[#5D4037] hover:underline cursor-pointer"
                >
                  Clear Date Filter
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
