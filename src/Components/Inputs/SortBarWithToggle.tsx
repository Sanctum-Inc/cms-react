import { Calendar, FilterIcon, List, SearchIcon } from "lucide-react";
import type { KeyValue } from "../../Models/InputItem";
import Card from "../Cards/Card";

interface SortBarWithToggleProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  statusOptions?: string[] | readonly KeyValue[];

  typeFilter?: string;
  setTypeFilter?: (type: string) => void;
  typeOptions?: string[] | readonly KeyValue[];

  isCalendarView: boolean;
  setIsCalendarView: (isCalendar: boolean) => void;
}

const SortBarWithToggle = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  statusOptions,
  typeFilter,
  setTypeFilter,
  isCalendarView,
  setIsCalendarView,
}: SortBarWithToggleProps) => {
  const normalizeOptions = (
    options?: string[] | readonly KeyValue[],
  ): KeyValue[] => {
    if (!options) return [];

    if (typeof options[0] === "string") {
      return (options as string[]).map((o) => ({
        key: o,
        value: o,
      }));
    }

    return options as KeyValue[];
  };

  return (
    <div className="flex gap-4 items-start">
      {" "}
      {/* items-start prevents the right card from stretching if the left grows */}
      <Card className="p-4 mt-4 flex items-center gap-5 w-8/12">
        {/* Search Input Container */}
        <Card
          className={`${
            statusOptions === undefined &&
            setStatusFilter === undefined &&
            typeFilter === undefined &&
            setTypeFilter === undefined
              ? "w-full"
              : "w-3/4"
          } flex items-center px-3 py-2 focus-within:ring-1 focus-within:ring-inset focus-within:ring-(--color-primary)`}
        >
          <div className="shrink-0 text-gray-500 mr-2">
            <SearchIcon size={15} />
          </div>
          <input
            id="search-court-case"
            type="search"
            placeholder="Search all case details..."
            className="block w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Card>

        {/* Filter Icon Logic */}
        {statusOptions !== undefined && typeFilter !== undefined && (
          <div className="text-gray-400">
            <FilterIcon size={18} />
          </div>
        )}

        {/* Status Filter */}
        {statusOptions !== undefined && setStatusFilter !== undefined && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <label
              htmlFor="status-filter"
              className="text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <select
              className="border border-gray-300 rounded-2xl px-3 py-1.5 text-sm focus:ring-1 focus:ring-(--color-primary) focus:outline-none cursor-pointer"
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {normalizeOptions(statusOptions).map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.value}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ... Repeat similar logic for Type Filter ... */}
      </Card>
      {/* Toggle Buttons Card */}
      <Card className="flex w-4/12 p-4 mt-4 items-center gap-4">
        <div
          className={`border border-gray-200 rounded-lg flex items-center w-1/2 justify-center py-2 gap-2 cursor-pointer transition-colors hover:bg-(--color-primary) hover:text-white ${!isCalendarView ? "bg-(--color-primary) text-white" : ""}`}
          onClick={() => setIsCalendarView(false)}
        >
          <List size={16} /> <span className="text-sm">Stream</span>
        </div>
        <div
          className={`border border-gray-200 rounded-lg flex items-center w-1/2 justify-center py-2 gap-2 cursor-pointer transition-colors hover:bg-(--color-primary) hover:text-white ${isCalendarView ? "bg-(--color-primary) text-white" : ""}`}
          onClick={() => setIsCalendarView(true)}
        >
          <Calendar size={16} /> <span className="text-sm">Calendar</span>
        </div>
      </Card>
    </div>
  );
};

export default SortBarWithToggle;
