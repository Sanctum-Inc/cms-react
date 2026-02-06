import { SearchIcon, FilterIcon } from "lucide-react";
import Card from "../Cards/Card";

interface SortBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  statusOptions?: string[];
  typeFilter?: string;
  setTypeFilter?: (type: string) => void;
  typeOptions?: string[];
}

const SortBar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  statusOptions,
  typeFilter,
  setTypeFilter,
  typeOptions,
}: SortBarProps) => {
  return (
    <>
      {/* 1. Added items-center to keep the search bar and select filters on the same baseline */}
      <Card className="m-6 p-4 mt-5 flex items-center gap-5">
        {/* 2. Removed fixed h-10 and used py-2 for flexible, consistent height */}
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
            name="search-court-case"
            placeholder="Search all case details..."
            className="block w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Card>

        {statusOptions !== undefined &&
          setStatusFilter !== undefined &&
          typeFilter !== undefined &&
          setTypeFilter !== undefined && (
            <div className="text-gray-400">
              <FilterIcon size={18} />
            </div>
          )}

        {/* 3. Wrapped label and select in a flex container for vertical alignment */}
        {statusOptions !== undefined && setStatusFilter !== undefined && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="status-filter"
            >
              Status:
            </label>
            <select
              className="border border-gray-300 rounded-2xl px-3 py-1.5 text-sm focus:ring-1 focus:ring-(--color-primary) focus:outline-none cursor-pointer bg-white"
              id="status-filter"
              name="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {typeFilter !== undefined && setTypeFilter !== undefined && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="type-filter"
            >
              Type:
            </label>
            <select
              className="border border-gray-300 rounded-2xl px-3 py-1.5 text-sm focus:ring-1 focus:ring-(--color-primary) focus:outline-none cursor-pointer bg-white"
              id="type-filter"
              name="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions?.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </Card>
    </>
  );
};

export default SortBar;
