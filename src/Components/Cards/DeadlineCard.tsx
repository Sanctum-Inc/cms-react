import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CourtCaseDateItemResponse } from "../../api";
import { CourtCaseDateTypeMap } from "../Inputs/InputOptions/CourtCaseDateTypeOptions";
import ResolveDeadlineModal from "../Modal/ResolveDeadlineModal";
import Card from "./Card";
import type { ModalItemProps } from "./Common/Props/ModalItemProps";

interface DeadlineCardProps {
  deadlineCount: number;
  deadlineCase: CourtCaseDateItemResponse | undefined;
  items: ModalItemProps[];
}

const DeadlineCard = ({
  deadlineCount,
  deadlineCase,
  items,
}: DeadlineCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleViewCourtCase = () => {
    navigate(`/court-case-information?id=${deadlineCase?.caseId}`);
  };

  const handleResolveNowOption = () => {
    setShowModal(true);
  };

  // Render modal only when showModal is true
  const renderResolveNowModal = () => {
    if (!showModal) return null;
    return (
      <ResolveDeadlineModal
        title="Resolve Now"
        subtitle={`${
          CourtCaseDateTypeMap[String(deadlineCase!.courtCaseDateType)] ??
          "Unknown"
        }${" "}
          deadline for ${deadlineCase?.subtitle} has lapsed.`}
        setShowModal={setShowModal}
        items={items}
      />
    );
  };

  const renderDeadlineErrorCard = () => {
    return (
      <Card className="border border-red-500 bg-red-700 text-white px-10 py-5 shadow-md ">
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
          <button
            className="w-full py-4 bg-white text-red-600 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform"
            onClick={handleResolveNowOption}
          >
            RESOLVE NOW
          </button>
        </div>
      </Card>
    );
  };

  const renderDeadlineInfoCard = () => {
    return (
      <Card className="border border-primary bg-primary text-white px-10 py-5 shadow-md">
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
          <button
            className="w-full py-4 bg-white text-primary rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform"
            onClick={handleViewCourtCase}
          >
            View
          </button>
        </div>
      </Card>
    );
  };

  const renderNoInfoCard = () => {
    return (
      <Card className="border border-primary bg-primary text-white px-10 py-5 shadow-md">
        <div className="flex justify-center">
          <ShieldCheck size={48} className="text-gray-300/50" />
        </div>
        <div className="font-bold text-3xl mt-5">
          No events require immediate action.
        </div>
        <div className="mt-4">
          <button
            className="w-full py-4 bg-white text-primary rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform"
            onClick={() => {}}
          >
            Wonderful!
          </button>
        </div>
      </Card>
    );
  };

  // This now returns JSX directly, not a function
  const renderCard = () => {
    if (deadlineCase === undefined) {
      return (
        <>
          {renderNoInfoCard()}
          {renderResolveNowModal()}
        </>
      );
    }

    if (deadlineCount > 0) {
      return (
        <>
          {renderDeadlineErrorCard()}
          {renderResolveNowModal()}
        </>
      );
    }

    if (deadlineCount === 0) {
      return (
        <>
          {renderDeadlineInfoCard()}
          {renderResolveNowModal()}
        </>
      );
    }

    // fallback UI
    return null;
  };

  return renderCard();
};

export default DeadlineCard;
