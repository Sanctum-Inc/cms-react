import {
  ArrowUp,
  Plus,
} from "lucide-react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import CourtCaseCard from "../Components/Cards/CourtCaseCard";
import { useState, useMemo } from "react";
import Modal from "../Components/Modal/Modal";
import SortBar from "../Components/Inputs/SortBar";
import type { InputItem } from "../Models/InputItem";
import Header from "../Components/Header/Header";

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

  const inputItems: InputItem[] = [
    {
      label: "Case Number:",
      name: "case-number",
      type: "text",
      placeholder: "Enter case number",
      value: "",
    },
    {
      label: "Location:",
      name: "location",
      type: "text",
      placeholder: "City, State",
      value: "",
    },
    {
      label: "Plaintiff:",
      name: "plaintiff",
      type: "text",
      placeholder: "Enter plaintiff name",
      value: "",
    },
    {
      label: "Defendant:",
      name: "defendant",
      type: "text",
      placeholder: "Enter defendant names",
      value: "",
      icon: Plus,
      addEnterHint: true,
    },
    {
      label: "Lawyer:",
      name: "lawyer",
      type: "text",
      placeholder: "Enter lawyer names",
      value: "",
      icon: Plus,
      addEnterHint: true,
    },
    {
      label: "Status:",
      name: "status",
      type: "text",
      placeholder: "Enter status",
      value: "",
    },
    {
      label: "Type:",
      name: "type",
      type: "text",
      placeholder: "Enter type",
      value: "",
    },
    {
      label: "Outcome:",
      name: "outcome",
      type: "text",
      placeholder: "Enter outcome",
      value: "",
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
      <Modal setShowModal={setShowModal} handleShowModal={handleShowModal} title="New Court Case" inputItems={inputItems} buttonCaption="Add Case" buttonOnClick={handleButtonClick}/>
    );
  };

  const handleButtonClick = () => {
    // Logic to add the new court case goes here
    // For now, we'll just close the modal
    //setShowModal(false);
  }

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  }

  return (
    <>
      <div className={showModal ? "opacity-30 pointer-events-none" : ""}>
        <Header handleShowModal={handleShowModal} title='Case Management' buttonCaption="Add New Case" showButton={true}/>
        <div>
          <SortBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusOptions={["all", "open", "closed", "pending"]}
            typeOptions={["all", "criminal", "civil", "family"]}
          ></SortBar>
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
