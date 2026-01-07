import CaseTimelineCard, {  } from './CaseTimelineCard';
import {
  Briefcase,
  ChevronDown,
  User,
} from "lucide-react";
import Card from "./Card";
import { useState } from "react";
import {
  type CourtCaseDates,
} from "../../Models/CourtCaseDates";

interface CaseTimeLineProps {
  upcomingCourtCaseDates: CourtCaseDates[];
  previousCourtCaseDates: CourtCaseDates[];
  onClickHandler: (courtCaseDate: CourtCaseDates) => void;
}

const CaseTimeLine = ({
  upcomingCourtCaseDates,
  previousCourtCaseDates,
  onClickHandler,
}: CaseTimeLineProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card
        hover={true}
        className="bg-gray-50 hover:bg-blue-50 mb-3 py-3"
        removePadding={true}
      >
        <div className="grid grid-cols-40">
          <div className="col-span-2 m-auto">
            <Briefcase className="text-blue-700" />
          </div>
          <div className="col-span-18 my-auto">
            <div className="text-xl font-bold">C-2025-001 - Acme Corp</div>
            <div className="text-gray-500">TrandeMark Infringement</div>
          </div>
          <div className="col-span-18 ">
            <div className="flex justify-end">
              <div className="border border-gray-200 w-fit flex py-1 px-2 rounded-full bg-green-200">
                <span className="flex items-center">
                  <User className="text-green-600" size={16}></User>
                </span>
                <span className="text-base font-semibold text-green-600">
                  Today
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-2 text-lg">
              Strategy Review Meeting
            </div>
            <div className="flex justify-end text-gray-500">2025-11-16</div>
          </div>
          <div className="col-span-2 m-auto">
            {showDetails ? (
              <ChevronDown onClick={() => setShowDetails(!showDetails)} />
            ) : (
              <ChevronDown
                className="rotate-180"
                onClick={() => setShowDetails(!showDetails)}
              />
            )}
          </div>
        </div>
        <CaseTimelineCard
          previousCourtCaseDates={previousCourtCaseDates}
          showDetails={showDetails}
          upcomingCourtCaseDates={upcomingCourtCaseDates}
          onClickHandler={onClickHandler}
        />
      </Card>
    </>
  );
};

export default CaseTimeLine;
