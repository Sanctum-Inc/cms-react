import { Briefcase, Ellipsis } from "lucide-react";
import Card from "../../Components/Cards/Card";
import {
  CASE_DATE_CONFIG,
  type CourtCaseDates,
} from "../../Models/CourtCaseDates";

interface CaseTimelineCard {
  showDetails: boolean;
  upcomingCourtCaseDates: CourtCaseDates[];
  previousCourtCaseDates: CourtCaseDates[];
  onClickHandler: (courtCaseDate: CourtCaseDates) => void;
}

const CaseTimelineCard = ({
  showDetails,
  upcomingCourtCaseDates,
  previousCourtCaseDates,
  onClickHandler,
}: CaseTimelineCard) => {
  const getCaseDateUI = (type: string) => {
    return (
      CASE_DATE_CONFIG[type as keyof typeof CASE_DATE_CONFIG] ?? {
        Icon: Briefcase,
        bg: "bg-gray-200",
        iconColor: "text-gray-700",
      }
    );
  };

  const handleEditDeleteOnDate = (courtCaseDate: CourtCaseDates) => {
    onClickHandler(courtCaseDate);
  };

  const renderShowDetailsItems = (
    id: string,
    defendant: string,
    date: string,
    type: string,
    title: string,
    plaintiff: string,
    isPast: boolean,
    index: number,
    caseNumber: string,
    caseId: string,
  ) => {
    const ui = getCaseDateUI(type);
    const Icon = ui.Icon;

    return (
      <Card
        hover={false}
        removeBorder={true}
        className="hover:bg-gray-100"
        key={index}
      >
        <div
          className="grid grid-cols-40"
          onClick={() =>
            handleEditDeleteOnDate({
              caseName: "",
              caseNumber: caseNumber,
              date: date,
              defendant: defendant,
              id: id,
              plaintiff: plaintiff,
              title: title,
              type: type,
              caseId: caseId,
            })
          }
        >
          <div className="col-span-2 m-auto">
            <div className={`border border-gray-200 rounded-full p-2 ${ui.bg}`}>
              <Icon className={ui.iconColor} />
            </div>
          </div>

          <div className="col-span-28">
            {/* Title / description */}
            <div
              className={`text-lg font-medium ${
                isPast ? "line-through text-gray-500" : ""
              }`}
            >
              {title}
            </div>

            {/* Case number and date name */}
            <div className="text-gray-500">
              {caseNumber} | {type}
            </div>

            {/* Optional extra details */}
            <div className="text-gray-400 text-xs mt-1">
              Plaintiff: {plaintiff} • Defendant: {defendant}
            </div>
          </div>

          {/* Date + Ellipsis column */}
          <div className="col-span-10 h-full">
            <div className="grid grid-cols-10 h-full">
              {/* Date – LEFT, top-aligned */}
              <div className="flex items-start col-span-9 justify-end">
                <span className="font-semibold text-black">{date}</span>
              </div>

              {/* Ellipsis – RIGHT, vertically centered */}
              <div className="flex items-center justify-end col-span-1">
                <Ellipsis className="rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    showDetails && (
      <div className="bg-white p-4">
        <div className="text-xl font-semibold border-b border-gray-200 mb-4 pb-1">
          Upcoming & Main Dates
        </div>
        {upcomingCourtCaseDates.map((item, index) =>
          renderShowDetailsItems(
            item.id,
            item.defendant,
            item.date,
            item.type,
            item.title,
            item.plaintiff,
            false,
            index,
            item.caseNumber,
            item.caseId,
          ),
        )}
        <div className="text-xl font-semibold border-b border-gray-200 mb-4 mt-4 pb-1">
          Previous Dates & History
        </div>
        {previousCourtCaseDates.map((item, index) =>
          renderShowDetailsItems(
            item.id,
            item.defendant,
            item.date,
            item.type,
            item.title,
            item.plaintiff,
            true,
            index,
            item.caseNumber,
            item.caseId,
          ),
        )}
      </div>
    )
  );
};

export default CaseTimelineCard;
