import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  CourtCaseDateItemResponse,
  CourtCaseDateResponse,
  UpdateCourtCaseDateRequest,
} from "../../api";
import type { KeyValue } from "../../Models/InputItem";
import PrimaryButton from "../Buttons/PrimaryButton";
import EditDateForm from "../Forms/EditDateForm";
import PillSelect from "../Inputs/PillSelect";
import InformationModal from "../Modal/InformationModal";
import SideModal from "../Modal/SideModal";

interface UpdateCourtCaseRequest extends UpdateCourtCaseDateRequest {
  id: string;
}

interface CalendarDay {
  day: number | null;
  date: Date | null;
  currentMonth: boolean;
  events: CourtCaseDateResponse["courtCaseDateItems"];
}

interface CalendarProps {
  caseDateItems: CourtCaseDateResponse;
  setErrorAlertMessage: (message: string) => void;
  setSuccessAlertMessage: (message: string) => void;
}

const Calendar = ({
  caseDateItems,
  setErrorAlertMessage,
  setSuccessAlertMessage,
}: CalendarProps) => {
  const [updateCourtCaseDateRequest, setUpdateCourtCaseDateRequest] =
    useState<UpdateCourtCaseRequest>({
      id: "",
      caseId: "",
      date: "",
      description: "",
      title: "",
      type: 0,
      isCancelled: false,
      isComplete: false,
    });
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();
  const today = new Date();

  const getInitialDate = () => {
    const firstEvent = caseDateItems.courtCaseDateItems?.[0];
    if (!firstEvent) return new Date();

    const [y, m] = firstEvent.date.split("T")[0].split("-").map(Number);
    return new Date(y, m - 1, 1);
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate);

  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const isSameCalendarDay = (
    apiDate: string,
    year: number,
    month: number,
    day: number,
  ) => {
    // Handle both "2026-02-05" and "2026-02-24 01:58" formats
    const datePart = apiDate.split("T")[0].split(" ")[0];
    const [y, m, d] = datePart.split("-").map(Number);
    return y === year && m === month + 1 && d === day;
  };

  const calendarDays = useMemo<CalendarDay[]>(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const days: CalendarDay[] = [];

    // Empty slots before month start
    for (let i = 0; i < startDay; i++) {
      days.push({
        day: null,
        date: null,
        currentMonth: false,
        events: [],
      });
    }

    // Actual month days
    for (let i = 1; i <= totalDays; i++) {
      const dayEvents =
        caseDateItems.courtCaseDateItems?.filter((e) =>
          isSameCalendarDay(e.date, year, month, i),
        ) ?? [];

      days.push({
        day: i,
        date: new Date(year, month, i),
        currentMonth: true,
        events: dayEvents,
      });
    }

    return days;
  }, [currentDate, caseDateItems]);

  const openModal = (day: CalendarDay) => {
    if (day.events.length > 0) {
      setSelectedDay(day);
      setShowModal(true);
    }
  };

  const renderModal = () => {
    if (!selectedDay || !selectedDay.date) return null;

    const color = getEventColor(selectedDay.date.toISOString());

    return (
      <InformationModal
        title={selectedDay.date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        setShowModal={setShowModal}
        items={selectedDay.events.map((event) => ({
          Icon: Info,
          title: event.title,
          text: event.description,
        }))}
        showButton={false}
        theme={color.color as "primary" | "red" | "green"}
      >
        <PillSelect
          label="Select Case:"
          name="caseId"
          onChange={handleSelectChange}
          value={selectedCaseId}
          selectOptions={selectedDay.events.map((cases) => {
            return {
              key: cases.caseId,
              value: cases.caseNumber,
            } as KeyValue;
          })}
        />
        <div className="flex gap-2 mt-5">
          <div className="w-1/2">
            <PrimaryButton
              color="lightGray"
              onClick={() => handleGoToCase(selectedCaseId)}
            >
              Go To Case
            </PrimaryButton>
          </div>
          <div className="w-1/2">
            <PrimaryButton
              onClick={() =>
                handleReschedule(
                  selectedDay.events.find((e) => e.caseId === selectedCaseId),
                )
              }
            >
              Reschedule
            </PrimaryButton>
          </div>
        </div>
      </InformationModal>
    );
  };

  const renderEditModal = () => {
    return (
      showModal && (
        <SideModal setShowModal={setShowEditModal} title="Edit Event">
          <EditDateForm
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            updateCourtCaseRequest={updateCourtCaseDateRequest}
            setShowModal={setShowEditModal}
          />
        </SideModal>
      )
    );
  };

  const handleGoToCase = (caseId: string | undefined) => {
    if (!caseId) return;

    navigate(`/court-case-information?id=${caseId}`);
  };

  const handleReschedule = (
    courtCaseDate: CourtCaseDateItemResponse | undefined,
  ) => {
    if (!courtCaseDate) {
      return;
    }

    setUpdateCourtCaseDateRequest({
      id: courtCaseDate.id,
      caseId: courtCaseDate.caseId,
      date: courtCaseDate.date,
      description: courtCaseDate.description,
      title: courtCaseDate.title,
      type: courtCaseDate.courtCaseDateType,
      isCancelled: false,
      isComplete: false,
    });
    setShowEditModal(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCaseId(e.target.value);
  };

  const getEventColor = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime()))
      return { background: "bg-slate-200", color: "primary" }; // invalid date

    // Normalize both dates to midnight (start of day)
    const eventDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
    ).getTime();
    const today = new Date();
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    ).getTime();

    if (eventDay < todayDay) return { background: "bg-red-200", color: "red" }; // Past
    if (eventDay > todayDay)
      return { background: "bg-green-200", color: "green" }; // Future
    return { background: "bg-(--color-primary)", color: "primary" }; // Today
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-xl font-black text-slate-800">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1,
                ),
              )
            }
            className="p-2 hover:bg-white border border-slate-200 rounded-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
            }
            className="px-4 py-2 hover:bg-white border border-slate-200 rounded-xl text-xs font-black"
          >
            TODAY
          </button>

          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1,
                ),
              )
            }
            className="p-2 hover:bg-white border border-slate-200 rounded-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-white">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 grid-rows-5 min-h-[500px] bg-slate-100 gap-[1px]">
        {calendarDays.map((day, idx) => {
          const isToday =
            day.day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={idx}
              onClick={() => openModal(day)}
              className={`bg-white p-2 min-h-[100px] relative cursor-pointer transition
                ${
                  !day.currentMonth
                    ? "bg-slate-50/50 opacity-40"
                    : "hover:bg-indigo-50/30"
                }`}
            >
              <span
                className={`text-xs font-black ${
                  isToday
                    ? "bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-lg shadow"
                    : "text-slate-400"
                }`}
              >
                {day.day}
              </span>

              <div className="mt-2 space-y-1">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className={`h-1.5 w-full rounded-full ${getEventColor(event.date).background}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && renderModal()}
      {showEditModal && renderEditModal()}
    </div>
  );
};

export default Calendar;
