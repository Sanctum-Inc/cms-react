import { Link } from "react-router-dom";
import type { CourtCaseTypes, InvoiceStatus } from "../../api";
import { CourtCaseStatusOptions } from "../Inputs/InputOptions/CourtCaseStatusOptions";
import { CourtCaseTypeOptions } from "../Inputs/InputOptions/CourtCaseTypesOptions";
import Card from "./Card";

interface courtCaseCardProps {
  id: string;
  caseNumber: string;
  location: string;
  plaintiff: string;
  type: CourtCaseTypes;
  nextDate: string;
  status: InvoiceStatus;
}

const CourtCaseCard = ({
  id,
  caseNumber,
  location,
  plaintiff,
  type,
  nextDate,
  status,
}: courtCaseCardProps) => {
  const getStatusStyles = (status: number) => {
    if (status === undefined)
      return "text-gray-600 border border-gray-400 bg-gray-100 rounded-full px-2 pb-1 text-[12px]";
    switch (status) {
      case 0: // Draft
        return "text-gray-700 border border-gray-400 bg-gray-100 rounded-full px-2 pb-1 text-[12px]";

      case 1: // Filed
        return "text-blue-700 border border-blue-500 bg-blue-100 rounded-full px-2 pb-1 text-[12px]";

      case 2: // Pending
        return "text-yellow-700 border border-yellow-500 bg-yellow-100 rounded-full px-2 pb-1 text-[12px]";

      case 3: // Scheduled
        return "text-purple-700 border border-purple-500 bg-purple-100 rounded-full px-2 pb-1 text-[12px]";

      case 4: // InProgress
        return "text-indigo-700 border border-indigo-500 bg-indigo-100 rounded-full px-2 pb-1 text-[12px]";

      case 5: // OnHold
        return "text-orange-700 border border-orange-500 bg-orange-100 rounded-full px-2 pb-1 text-[12px]";

      case 6: // Postponed
        return "text-amber-700 border border-amber-500 bg-amber-100 rounded-full px-2 pb-1 text-[12px]";

      case 7: // Settled
        return "text-green-700 border border-green-500 bg-green-100 rounded-full px-2 pb-1 text-[12px]";

      case 8: // JudgementDelivered
        return "text-emerald-700 border border-emerald-500 bg-emerald-100 rounded-full px-2 pb-1 text-[12px]";

      case 9: // Closed
        return "text-green-800 border border-green-600 bg-green-200 rounded-full px-2 pb-1 text-[12px]";

      case 10: // Dismissed
        return "text-red-700 border border-red-500 bg-red-100 rounded-full px-2 pb-1 text-[12px] line-through";

      case 11: // Withdrawn
        return "text-slate-700 border border-slate-500 bg-slate-100 rounded-full px-2 pb-1 text-[12px] line-through";

      case 12: // Cancelled
        return "text-gray-600 border border-gray-600 bg-gray-200 rounded-full px-2 pb-1 text-[12px] line-through";

      default:
        return "text-gray-600 border border-gray-400 bg-gray-100 rounded-full px-2 pb-1 text-[12px]";
    }
  };

  return (
    <>
      <Card className="mx-6 my-3 p-6 cursor-pointer">
        <Link to={`/court-case-information?id=${id}`}>
          <div className="grid grid-cols-5 gap-4">
            <div>{caseNumber}</div>
            <div>{location}</div>
            <div>{plaintiff}</div>
            <div>
              {CourtCaseTypeOptions.find((x) => x.key === type?.toString())
                ?.value ?? "Unknown"}
            </div>
            <div className="flex justify-between">
              <span>{nextDate ?? "N/A"}</span>
              <span className={getStatusStyles(status ?? 99)}>
                {CourtCaseStatusOptions.find(
                  (x) => x.key === status?.toString(),
                )?.value ?? "Unknown"}
              </span>
            </div>
          </div>
        </Link>
      </Card>
    </>
  );
};

export default CourtCaseCard;
