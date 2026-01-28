
import type { InvoiceStatus } from "../../api";
import Card from "./Card";

interface courtCaseCardProps {
  id: string;
  caseNumber: string;
  location: string;
  plaintiff: string;
  type: string;
  nextDate: string;
  internalStatus: InvoiceStatus;
}

const CourtCaseCard = ({id, caseNumber, location, plaintiff, type, nextDate, internalStatus}: courtCaseCardProps) => {

    const getStatusStyles = (status: number) => {
      switch (status) {
        case 0: // Pending
          return "text-yellow-700 border border-yellow-500 bg-yellow-100 rounded-full px-2 pb-1 text-[12px]";
        case 1: // Sent
          return "text-blue-700 border border-blue-500 bg-blue-100 rounded-full px-2 pb-1 text-[12px]";
        case 2: // Paid
          return "text-green-700 border border-green-500 bg-green-100 rounded-full px-2 pb-1 text-[12px]";
        case 3: // Overdue
          return "text-red-700 border border-red-500 bg-red-100 rounded-full px-2 pb-1 text-[12px]";
        case 4: // Cancelled
          return "text-gray-600 border border-gray-600 bg-gray-200 rounded-full px-2 pb-1 text-[12px] line-through";
        case 5: // Partially Paid
          return "text-indigo-700 border border-indigo-500 bg-indigo-100 rounded-full px-2 pb-1 text-[12px]";
        case 6: // Draft
          return "text-gray-700 border border-gray-400 bg-gray-100 rounded-full px-2 pb-1 text-[12px]";
        default:
          return "text-gray-600 border border-gray-400 bg-gray-100 rounded-full px-2 pb-1 text-[12px]";
      }
    };

  return (
    <>
      <Card className="mx-6 my-3 p-6 cursor-pointer">
        <a href={`/court-case-information?id=${id}`}>
          <div className="grid grid-cols-5 gap-4">
            <div>{caseNumber}</div>
            <div>{location}</div>
            <div>{plaintiff}</div>
            <div>{type}</div>
            <div className="flex justify-between">
              <span>{nextDate}</span>
              <span className={getStatusStyles(internalStatus)}>
                {internalStatus}
              </span>
            </div>
          </div>
        </a>
      </Card>
    </>
  );
}

export default CourtCaseCard;