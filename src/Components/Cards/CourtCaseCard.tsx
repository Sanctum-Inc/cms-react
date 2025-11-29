import Card from "./Card";

interface courtCaseCardProps {
    caseNumber: string;
    location: string;
    plaintiff: string;
    type: string;
    nextDate: string;
    internalStatus: "pending" | "open" | "closed";
}

const CourtCaseCard = ({caseNumber, location, plaintiff, type, nextDate, internalStatus}: courtCaseCardProps) => {

    const getStatusStyles = () => {
        switch (internalStatus) {
            case "open":
                return "text-green-600 border border-green-400  bg-green-100 rounded-full px-2 pb-1 text-[12px] my-auto";
            case "closed":
                return "text-gray-600 border border-gray-400  bg-gray-100 rounded-full px-2 pb-1 text-[12px] my-auto";
            case "pending":
                return "text-orange-600 border border-orange-400  bg-orange-100 rounded-full px-2 pb-1 text-[12px] my-auto";
            default:
                return "";
        }
    };

  return (
    <>
      <Card className="mx-6 my-3 p-6 cursor-pointer">
        <a href="/court-case-information">
          <div className="grid grid-cols-5 gap-4">
            <div>{caseNumber}</div>
            <div>{location}</div>
            <div>{plaintiff}</div>
            <div>{type}</div>
            <div className="flex justify-between">
              <span>{nextDate}</span>
              <span className={getStatusStyles()}>{internalStatus}</span>
            </div>
          </div>
        </a>
      </Card>
    </>
  );
}

export default CourtCaseCard;