import { ArrowUp, Plus } from "lucide-react";
import CourtCaseCard from "../Components/Cards/CourtCaseCard";
import { useState, useMemo, useEffect } from "react";
import Modal from "../Components/Modal/Modal";
import SortBar from "../Components/Inputs/SortBar";
import Header from "../Components/Header/Header";
import { CourtCaseService, type AddCourtCaseRequest, type InvoiceStatus } from "../api";
import type { CourtCases } from "../Models/CourtCases";
import SuccessAlert from "../Components/Alerts/SuccessAlert";
import ErrorAlert from "../Components/Alerts/ErrorAlert";
import { statusLabels } from "../Models/Invoices";
import type { InputItem } from "../Models/InputItem";

const CourtCasePage = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null
  );
  const [sortBy, setSortBy] = useState<
    "caseNumber" | "location" | "plaintiff" | "type" | "nextDate"
  >("caseNumber");
  const [sortDesc, setSortDesc] = useState(true);

  const [courtCases, setCourtCases] = useState<CourtCases[]>([]);
  const [newCourtCases, setNewCourtCases] = useState<AddCourtCaseRequest>({
    caseNumber: "",
    location: "",
    plaintiff: "",
    defendant: "",
    status: 0,
    type: "",
    outcome: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [courtCaseInputs, setCourtCaseInputs] = useState<InputItem[]>([
    {
      label: "Case Number:",
      name: "caseNumber",
      type: "text",
      placeholder: "Enter case number",
      value: "",
      inputType: "input",
    },
    {
      label: "Location:",
      name: "location",
      type: "text",
      placeholder: "City, State",
      value: "",
      inputType: "input",
    },
    {
      label: "Plaintiff:",
      name: "plaintiff",
      type: "text",
      placeholder: "Enter plaintiff name",
      value: "",
      inputType: "input",
    },
    {
      label: "Defendant:",
      name: "defendant",
      type: "text",
      placeholder: "Enter defendant names",
      value: "",
      icon: Plus,
      addEnterHint: true,
      inputType: "input",
    },
    {
      label: "Lawyer:",
      name: "lawyer",
      type: "text",
      placeholder: "Enter lawyer names",
      value: "",
      icon: Plus,
      addEnterHint: true,
      inputType: "input",
    },
    {
      label: "Status:",
      name: "status",
      type: "text",
      placeholder: "Enter status",
      value: "",
      inputType: "select",
      selectOptions: [
        { key: "0", value: "Open" },
        { key: "1", value: "Closed" },
        { key: "2", value: "Pending" },
        { key: "3", value: "Appealed" },
        { key: "4", value: "Dismissed" },
        { key: "5", value: "Settled" },
      ],
      addEnterHint: false,
    },
    {
      label: "Type:",
      name: "type",
      type: "text",
      placeholder: "Enter type",
      value: "",
      inputType: "select",
      selectOptions: [
        { key: "0", value: "Criminal" },
        { key: "1", value: "Civil" },
        { key: "2", value: "Family" },
        { key: "3", value: "Labor" },
        { key: "4", value: "Commercial" },
        { key: "5", value: "Road Accident Fund" },
      ],
    },
    {
      label: "Outcome:",
      name: "outcome",
      type: "text",
      placeholder: "Enter outcome",
      value: "",
      inputType: "select",
      selectOptions: [
        { key: "0", value: "Guilty" },
        { key: "1", value: "Not Guilty" },
        { key: "2", value: "Settled" },
        { key: "3", value: "Withdrawn" },
        { key: "4", value: "Ongoing" },
        { key: "5", value: "N/A" },
      ],
    },
  ]);

  // Compute filtered + sorted cases
  const filteredCases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch = (c: (typeof courtCases)[number]) => {
      if (!q) return true;
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.plaintiff.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.nextDate.toLowerCase().includes(q)
      );
    };

    const matchesStatus = (c: (typeof courtCases)[number]) => {
      if (statusFilter === "all") return true;
      return (
        statusLabels[c.internalStatus].toLowerCase() ===
        statusFilter.toLowerCase()
      );
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
        "plaintiff",
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
  }, [searchQuery, statusFilter, typeFilter, sortBy, sortDesc, courtCases]);

  // handle header clicks to set primary sort column and toggle direction
  const handleSort = (
    col: "caseNumber" | "location" | "plaintiff" | "type" | "nextDate"
  ) => {
    if (sortBy === col) {
      setSortDesc((s) => !s);
    } else {
      setSortBy(col);
      setSortDesc(true);
    }
  };

  const handleChange = (name: string, value: string) => {
    setCourtCaseInputs((prev) =>
      prev.map((i) => (i.name === name ? { ...i, value } : i))
    );

    setNewCourtCases((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const renderModal = () => {
    if (!showModal) return null;
    return (
      <Modal
        setShowModal={setShowModal}
        handleShowModal={handleShowModal}
        title="New Court Case"
        inputItems={courtCaseInputs}
        buttonCaption="Add Case"
        buttonOnClick={handleButtonClick}
        values={{
          caseNumber: newCourtCases.caseNumber!,
          location: newCourtCases.location!,
          plaintiff: newCourtCases.plaintiff!,
          defendant: newCourtCases.defendant!,
          status: newCourtCases.status!,
          type: newCourtCases.type!,
          outcome: newCourtCases.outcome!,
        }}
        handleChange={handleChange}
      />
    );
  };

  const handleButtonClick = () => {
    // Logic to add the new court case goes here
    // For now, we'll just close the modal
    //setShowModal(false);

    setNewCourtCases({
      caseNumber:
        courtCaseInputs.find((item) => item.name === "case-number")?.value ||
        "",
      location:
        courtCaseInputs.find((item) => item.name === "location")?.value || "",
      plaintiff:
        courtCaseInputs.find((item) => item.name === "plaintiff")?.value || "",
      defendant:
        courtCaseInputs.find((item) => item.name === "defendant")?.value || "",
      status:
        Number(courtCaseInputs.find((item) => item.name === "status")?.value) || 0,
      type: courtCaseInputs.find((item) => item.name === "type")?.value || "",
      outcome:
        courtCaseInputs.find((item) => item.name === "outcome")?.value || "",
    });

    CourtCaseService.createCourtCases(newCourtCases)
      .then((response) => {
        console.log("Court case added" + response);
        setShowModal(false);
        setSuccessAlertMessage("Court case added successfully.");
        filteredCases.push({
          id: response,
          caseNumber: newCourtCases.caseNumber,
          location: newCourtCases.location,
          plaintiff: newCourtCases.plaintiff,
          type: newCourtCases.type!,
          nextDate: "",
          internalStatus: newCourtCases.status! as InvoiceStatus,
        });
      })
      .catch(() => {
        //Log error somewhere
        setErrorAlertMessage(
          "There was an error processing your request, please try again later."
        );
      });

    console.log("New Court Case:", newCourtCases);
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };


  useEffect(() => {
    CourtCaseService.getAllCourtCases().then((response) => {
      const mapped = response.map((courtCase) => ({
        id: courtCase.id,
        caseNumber: courtCase.caseNumber,
        location: courtCase.location,
        plaintiff: courtCase.plaintiff,
        type: courtCase.type!,
        nextDate: courtCase.courtCaseDates?.length
          ? courtCase.courtCaseDates[0].date! //ToDO: find next upcoming date
          : "",
        internalStatus: courtCase.status,
      }));

      setCourtCases(mapped);
      console.log("Fetched court cases:", mapped);
    });
  }, []);

  useEffect(() => {
    if (!successAlertMessage) return;
    const timer = setTimeout(() => setSuccessAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [successAlertMessage]);

  useEffect(() => {
    if (!errorAlertMessage) return;
    const timer = setTimeout(() => setErrorAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [errorAlertMessage]);

  
  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

  return (
    <>
      <div>
        <Header
          handleShowModal={handleShowModal}
          title="Case Management"
          buttonCaption="Add New Case"
          showButton={true}
        />
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
                <span>Plaintiff</span>
                <span
                  className="my-auto cursor-pointer"
                  onClick={() => handleSort("plaintiff")}
                >
                  {sortBy === "plaintiff" ? (
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
            <CourtCaseCard key={courtCase.id} {...courtCase} />
          ))}
        </div>
        {renderSuccessmessage()}
        {renderErrorMessage()}
      </div>
      {}
      
      {renderModal()}
    </>
  );
};

export default CourtCasePage;
