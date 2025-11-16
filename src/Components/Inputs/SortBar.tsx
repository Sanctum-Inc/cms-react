import { SearchIcon, FilterIcon } from "lucide-react";
import Card from "../Cards/Card";

interface SortBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    statusOptions: string[];
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
      <Card className="m-6 p-6 mt-5 flex gap-5">
        <Card className="w-6/8 flex focus-within:ring-1 focus-within:ring-inset focus-within:ring-(--color-primary) h-10">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            <SearchIcon size={15} />
          </div>
          <input
            id="search-court-case"
            type="search"
            name="search-court-case"
            placeholder="Search all case details..."
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Card>
        <div>
          <FilterIcon />
        </div>
        <div>
          <label className="" htmlFor="status-filter">
            Status:{" "}
          </label>
          <select
            className="border border-gray-300 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-inset focus-within:ring-(--color-primary) focus:outline-none cursor-pointer"
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
        {typeFilter !== undefined && setTypeFilter !== undefined && 
        <div>
          <label className="" htmlFor="type-filter">
            Type:{" "}
          </label>
          <select
            className="border border-gray-300 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-inset focus-within:ring-(--color-primary) focus:outline-none cursor-pointer"
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
        </div>}
      </Card>
    </>
  );
}

export default SortBar;