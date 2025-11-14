import {
  ArrowUp,
  FilterIcon,
  Plus,
  SearchIcon,
} from "lucide-react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import CourtCaseCard from "../Components/Cards/CourtCaseCard";
import { useState, useMemo, useContext } from "react";
import PillInput from "../Components/Inputs/PillInput";

const CourtCasePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState<
    "caseNumber" | "location" | "status" | "type" | "nextDate"
  >("caseNumber");
  const [sortDesc, setSortDesc] = useState(true);

  const courtCases: {
    caseNumber: string;
    location: string;
    status: string;
    type: string;
    nextDate: string;
    internalStatus: "open" | "closed" | "pending";
  }[] = [
    {
      caseNumber: "2023-CR-12345",
      location: "New York",
      status: "Open",
      type: "Criminal",
      nextDate: "2023-12-01",
      internalStatus: "open",
    },
    {
      caseNumber: "2023-CV-67890",
      location: "Los Angeles",
      status: "Closed",
      type: "Civil",
      nextDate: "2023-11-15",
      internalStatus: "closed",
    },
    {
      caseNumber: "2023-FM-54321",
      location: "Chicago",
      status: "Pending",
      type: "Family",
      nextDate: "2023-10-30",
      internalStatus: "pending",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Compute filtered + sorted cases
  const filteredCases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch = (c: (typeof courtCases)[number]) => {
      if (!q) return true;
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.nextDate.toLowerCase().includes(q)
      );
    };

    const matchesStatus = (c: (typeof courtCases)[number]) => {
      if (statusFilter === "all") return true;
      return c.internalStatus.toLowerCase() === statusFilter.toLowerCase();
    };

    const matchesType = (c: (typeof courtCases)[number]) => {
      if (typeFilter === "all") return true;
      return c.type.toLowerCase() === typeFilter.toLowerCase();
    };

    const compare = (
      a: (typeof courtCases)[number],
      b: (typeof courtCases)[number],
      key: keyof (typeof courtCases)[number],
      desc: boolean
    ) => {
      let av: string | number = a[key] ?? "";
      let bv: string | number = b[key] ?? "";
      // handle nextDate as date
      if (key === "nextDate") {
        const da = Date.parse(String(av));
        const db = Date.parse(String(bv));
        if (da === db) return 0;
        return desc ? (db > da ? 1 : -1) : da > db ? 1 : -1;
      }
      av = String(av).toLowerCase();
      bv = String(bv).toLowerCase();
      const res = av.localeCompare(bv);
      return desc ? -res : res;
    };

    // apply filters
    const filtered = courtCases.filter(
      (c) => matchesSearch(c) && matchesStatus(c) && matchesType(c)
    );

    // apply primary sort by `sortBy` with direction `sortDesc` and then
    // fall back to the other columns in a fixed order for stable results.
    filtered.sort((a, b) => {
      const res = compare(a, b, sortBy, sortDesc);
      if (res !== 0) return res;
      const order: (keyof (typeof courtCases)[number])[] = [
        "caseNumber",
        "location",
        "status",
        "type",
        "nextDate",
      ];
      for (const key of order) {
        if (key === sortBy) continue;
        const r = compare(a, b, key, false); // fallback ascending
        if (r !== 0) return r;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, statusFilter, typeFilter, sortBy, sortDesc]);

  // handle header clicks to set primary sort column and toggle direction
  const handleSort = (
    col: "caseNumber" | "location" | "status" | "type" | "nextDate"
  ) => {
    if (sortBy === col) {
      setSortDesc((s) => !s);
    } else {
      setSortBy(col);
      setSortDesc(true);
    }
  };

  const returnModal = () => {
    if (!showModal) return null;
    return (
      <>
        <div className="w-4/5 h-full fixed top-0 left-0 bg-black opacity-30">

      </div>
      <div className="w-1/5 border-2 border-red-300 h-full  fixed top-0 right-0 bg-white">
        <div className="flex justify-between border-b-solid border-b-2 border-solid border-gray-300 py-5 px-10">
          <div className="w-full text-xl font-bold text-(--color-primary)">New Court Case</div>
          <div
            className="w-full flex justify-end"
            onClick={() => handleShowModal(false)}
          >
            <div className="w-10 cursor-pointer flex justify-center">x</div>
          </div>
        </div>
        <div className="justify-center px-10">
          <PillInput
            className="h-13"
            type="text"
            name="case-number"
            value=""
            label="Case Number:"
            placeholder="Enter case number"
          />
          <PillInput
            className="h-13"
            type="text"
            name="location"
            value=""
            label="Location:"
            placeholder="City, State"
          />
          <PillInput
            className="h-13"
            type="text"
            name="plaintiff"
            value=""
            label="Plaintiff:"
            placeholder="Enter plaintiff name"
          />
          <PillInput
            className="h-13"
            type="text"
            name="defendant"
            value=""
            label="Defendant:"
            placeholder="Enter defendant name"
          />
          <PillInput
            className="h-13"
            type="text"
            name="status"
            value=""
            label="Status:"
            placeholder="Enter status"
          />
          <PillInput
            className="h-13"
            type="text"
            name="type"
            value=""
            label="Type:"
            placeholder="Enter type"
          />
          <PillInput
            className="h-13"
            type="text"
            name="outcome"
            value=""
            label="Outcome:"
            placeholder="Enter outcome"
          />
        </div>
        <div className="flex px-10 py-5">
          <PrimaryButton>Add Case</PrimaryButton>
        </div>
      </div>
      </>
    );
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  }

  return (
    <>
      <div className={showModal ? "opacity-30 pointer-events-none" : ""} >
        <div className="flex justify-between border-b-solid border-b-2 border-solid border-gray-300 py-5 px-3 bg-white">
          <span
            className="text-3xl text-black font-bold"
          >
            Case Management
          </span>
          <span className="text-lg text-gray-400 font-bold">
            <PrimaryButton
              onClick={() => handleShowModal(true)}
            >
              <div className="flex">
                <span className="m-auto">
                  <Plus className="pr-1" />
                </span>
                Add New Case
              </div>
            </PrimaryButton>
          </span>
        </div>
        <div>
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
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
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
                <option value="all">All Types</option>
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Family">Family</option>
              </select>
            </div>
          </Card>
          <div className="m-6 p-6 mt-5 font-bold text-gray-500 border-b border-gray-300 pb-3">
            <div>Case Information</div>
            <div className="grid grid-cols-5 gap-4 mt-4">
              <div className="flex align-center">
                <span>Case Number </span>
                <span
                  className="my-auto cursor-pointer"
                  onClick={() => handleSort("caseNumber")}
                >
                  {sortBy === "caseNumber" ? (
                    sortDesc ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowUp size={12} className="rotate-180" />
                    )
                  ) : (
                    <ArrowUp size={12} />
                  )}
                </span>
              </div>
              <div className="flex align-center">
                <span>Location </span>
                <span
                  className="my-auto cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  {sortBy === "location" ? (
                    sortDesc ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowUp size={12} className="rotate-180" />
                    )
                  ) : (
                    <ArrowUp size={12} />
                  )}
                </span>
              </div>
              <div className="flex align-center">
                <span>Status</span>
                <span
                  className="my-auto cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  {sortBy === "status" ? (
                    sortDesc ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowUp size={12} className="rotate-180" />
                    )
                  ) : (
                    <ArrowUp size={12} />
                  )}
                </span>
              </div>
              <div className="flex align-center">
                <span>Type</span>
                <span
                  className="my-auto cursor-pointer"
                  onClick={() => handleSort("type")}
                >
                  {sortBy === "type" ? (
                    sortDesc ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowUp size={12} className="rotate-180" />
                    )
                  ) : (
                    <ArrowUp size={12} />
                  )}
                </span>
              </div>
              <div className="flex align-center">
                <span>Next Date</span>
                <span
                  className="my-auto cursor-pointer"
                  onClick={() => handleSort("nextDate")}
                >
                  {sortBy === "nextDate" ? (
                    sortDesc ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowUp size={12} className="rotate-180" />
                    )
                  ) : (
                    <ArrowUp size={12} />
                  )}
                </span>
              </div>
            </div>
          </div>
          {filteredCases.map((courtCase) => (
            <CourtCaseCard key={courtCase.caseNumber} {...courtCase} />
          ))}
        </div>
      </div>
      {returnModal()}
    </>
  );
};

export default CourtCasePage;
