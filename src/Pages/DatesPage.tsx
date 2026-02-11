import { Info } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CourtCaseDateService,
  type CourtCaseDateItemResponse,
  type CourtCaseDateResponse,
} from "../api";
import Calendar from "../Components/Calendar/Calendar";
import CaseTimeLine from "../Components/Cards/CaseTimeLine";
import type { ModalItemProps } from "../Components/Cards/Common/Props/ModalItemProps";
import DateHealthCard from "../Components/Cards/DateHealthCard";
import DeadlineCard from "../Components/Cards/DeadlineCard";
import ErrorAlert from "../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../Components/Feedback/Alerts/SuccessAlert";
import AddDateForm from "../Components/Forms/AddDateForm";
import Header from "../Components/Header/Header";
import SortBarWithToggle from "../Components/Inputs/SortBarWithToggle";
import SideModal from "../Components/Modal/SideModal";

const DatesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [courtCasesDates, setCourtCaseDates] =
    useState<CourtCaseDateResponse>();

  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );

  const [isCalendarView, setIsCalendarView] = useState(false);

  const [sortBy] = useState<
    | "caseNumber"
    | "title"
    | "subtitle"
    | "courtCaseDateType"
    | "date"
    | "status"
  >("date");

  const [sortDesc] = useState(false); // earliest first by default
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Compute filtered + sorted cases
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch = (c: CourtCaseDateItemResponse) => {
      if (!q) return true;
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
      );
    };

    const matchesStatus = (c: CourtCaseDateItemResponse) => {
      if (statusFilter === "all") return true;
      return c.status.toLowerCase() === statusFilter.toLowerCase();
    };

    const compare = (
      a: CourtCaseDateItemResponse,
      b: CourtCaseDateItemResponse,
      key: keyof CourtCaseDateItemResponse,
      desc: boolean,
    ) => {
      // Date handling
      if (key === "date") {
        const da = Date.parse(a.date);
        const db = Date.parse(b.date);
        if (da === db) return 0;
        return desc ? db - da : da - db;
      }

      const av = String(a[key] ?? "").toLowerCase();
      const bv = String(b[key] ?? "").toLowerCase();
      const res = av.localeCompare(bv);
      return desc ? -res : res;
    };

    const filtered = courtCasesDates?.courtCaseDateItems.filter(
      (c) => matchesSearch(c) && matchesStatus(c),
    );

    filtered?.sort((a, b) => {
      const primary = compare(a, b, sortBy, sortDesc);
      if (primary !== 0) return primary;

      // Stable fallback order
      const fallback: (keyof CourtCaseDateItemResponse)[] = [
        "date",
        "caseNumber",
        "title",
        "courtCaseDateType",
        "status",
      ];

      for (const key of fallback) {
        if (key === sortBy) continue;
        const r = compare(a, b, key, false);
        if (r !== 0) return r;
      }

      return 0;
    });

    return filtered;
  }, [
    searchQuery,
    statusFilter,
    sortBy,
    sortDesc,
    courtCasesDates?.courtCaseDateItems,
  ]);

  // handle header clicks to set primary sort column and toggle direction
  // const handleSort = (
  //   col:
  //     | "caseNumber"
  //     | "title"
  //     | "subtitle"
  //     | "courtCaseDateType"
  //     | "date"
  //     | "status",
  // ) => {
  //   if (sortBy === col) {
  //     setSortDesc((s) => !s);
  //   } else {
  //     setSortBy(col);
  //     setSortDesc(false); // sensible default
  //   }
  // };

  const renderModal = () => {
    if (showModal == false) return null;
    else
      return (
        <>
          <SideModal title="Schedule New Event" setShowModal={setShowModal}>
            <AddDateForm
              setShowErrorMessage={setErrorAlertMessage}
              setShowSuccessMessage={setSuccessAlertMessage}
              setShowModal={setShowModal}
            />
          </SideModal>
        </>
      );
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };

  useEffect(() => {
    CourtCaseDateService.getAllCourtCaseDates()
      .then((response) => {
        setCourtCaseDates(response);
      })
      .catch(() => {
        setErrorAlertMessage("Failed to load dates. Please try again.");
      });
  }, []);

  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

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

  return (
    <>
      <Header
        title="Date Management"
        showButton={true}
        buttonCaption="Add New Date"
        handleShowModal={() => handleShowModal(true)}
      />
      <div className="p-6">
        <SortBarWithToggle
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusOptions={[
            { key: "all", value: "All" },
            { key: "overdue", value: "Overdue" },
            { key: "upcoming", value: "Upcoming" },
            { key: "completed", value: "Completed" },
            { key: "duetoday", value: "Due Today" },
          ]}
          isCalendarView={isCalendarView}
          setIsCalendarView={setIsCalendarView}
        ></SortBarWithToggle>
        <div className="flex mt-5">
          <div className="w-8/12">
            {isCalendarView ? (
              <Calendar
                caseDateItems={courtCasesDates || ({} as CourtCaseDateResponse)}
                setErrorAlertMessage={setErrorAlertMessage}
                setSuccessAlertMessage={setSuccessAlertMessage}
              />
            ) : (
              <CaseTimeLine
                caseDateItems={filteredItems || []}
                setErrorAlertMessage={setErrorAlertMessage}
                setSuccessAlertMessage={setSuccessAlertMessage}
              />
            )}
          </div>
          <div className="w-4/12 ml-4">
            <div>
              <DeadlineCard
                deadlineCount={courtCasesDates?.overdueItems || 0}
                deadlineCase={courtCasesDates?.deadlineCase || undefined}
                items={
                  courtCasesDates?.courtCaseDateItems
                    .filter((item) => item.status === "Overdue")
                    .map((item) => {
                      return {
                        Icon: Info,
                        text: item.title,
                        title: item.subtitle,
                      } as ModalItemProps;
                    }) || []
                }
              />
            </div>
            <div className="mt-5">
              <DateHealthCard
                changeFromLastMonth={courtCasesDates?.changeFromLastMonth || 0}
                completionRate={courtCasesDates?.completionRate || 0}
                upcomingEvents={courtCasesDates?.upcomingEvents || 0}
              />
            </div>
          </div>
        </div>
        {renderModal()}
        {renderSuccessmessage()}
        {renderErrorMessage()}
      </div>
    </>
  );
};

export default DatesPage;
