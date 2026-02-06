import { ShieldAlert, ShieldCheck } from "lucide-react";
import Card from "./Card";
import type { CourtCaseDateItemResponse } from "../../api";
import { CourtCaseDateTypeMap } from "../Inputs/InputOptions/CourtCaseDateTypeOptions";
import { useNavigate } from "react-router-dom";

interface DeadlineCardProps {
  deadlineCount: number;
  deadlineCase: CourtCaseDateItemResponse | undefined;
}

const DeadlineCard = ({ deadlineCount, deadlineCase }: DeadlineCardProps) => {

  const navigate = useNavigate();

  const handleViewCourtCase = () => {
    console.log(deadlineCase);
    navigate(`/court-case-information?id=${deadlineCase?.caseId}`);
  }


  const renderDeadlineErrorCard = () => {
    return (
      <Card className="border border-red-500 bg-red-700 text-white px-10 py-5 shadow-md">
        <div className="flex justify-center">
          <ShieldAlert size={48} className="text-gray-300/50" />
        </div>
        <div className="font-bold text-3xl mt-5">
          {deadlineCount} Critical Deadline Requires Action.
        </div>
        <div className="font-bold text-lg mt-2 opacity-80">
          {CourtCaseDateTypeMap[String(deadlineCase!.courtCaseDateType)] ??
            "Unknown"}{" "}
          deadline for {deadlineCase?.subtitle} has lapsed.
        </div>
        <div className="mt-4">
          <button className="w-full py-4 bg-white text-red-600 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform">
            RESOLVE NOW
          </button>
        </div>
      </Card>
    );
  };

  const renderDeadlineInfoCard = () => {
    return (
      <Card className="border border-(--color-primary) bg-(--color-primary) text-white px-10 py-5 shadow-md">
        <div className="flex justify-center">
          <ShieldCheck size={48} className="text-gray-300/50" />
        </div>
        <div className="font-bold text-3xl mt-5">
          No events require immediate action.
        </div>
        <div className="font-bold text-lg mt-2 opacity-80">
          Next:{" "}
          {CourtCaseDateTypeMap[String(deadlineCase!.courtCaseDateType)] ??
            "Unknown"}{" "}
          deadline for {deadlineCase?.subtitle}
        </div>
        <div className="mt-4">
          <button className="w-full py-4 bg-white text-(--color-primary) rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform" onClick={handleViewCourtCase}>
            View
          </button>
        </div>
      </Card>
    );
  };

  const renderNoInfoCard = () => {
    return (
      <Card className="border border-(--color-primary) bg-(--color-primary) text-white px-10 py-5 shadow-md">
        <div className="flex justify-center">
          <ShieldCheck size={48} className="text-gray-300/50" />
        </div>
        <div className="font-bold text-3xl mt-5">
          No events require immediate action.
        </div>
        <div className="mt-4">
          <button className="w-full py-4 bg-white text-(--color-primary) rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform">
            Wonderful!
          </button>
        </div>
      </Card>
    );
  };

  const renderCard = () => {
    if (deadlineCase === undefined) return renderNoInfoCard();

    if (deadlineCount > 0) {
      return renderDeadlineErrorCard();
    }

    if (deadlineCount === 0) {
      return renderDeadlineInfoCard();
    }
  };

  return renderCard();
};

export default DeadlineCard;
