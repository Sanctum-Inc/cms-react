import { CalendarDays, Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CardItem } from "../../Models/CardItem";

const DashBoardActivityItem = (props: CardItem) => {
  const navigate = useNavigate();
  const handleGoToCourtCase = (caseId: string) => {
    navigate(`/court-case-information?id=${caseId}`);
  };

  if (props.clickable == true) {
    return (
      <div
        className="py-4 flex border border-gray-200 rounded-4xl items-center hover:border-(--color-primary) cursor-pointer p-3 mb-2"
        onClick={() => handleGoToCourtCase(props.caseId || "")}
      >
        <div className="w-1/70">
          <CalendarDays size={props.size || 40} color={props.color} />
        </div>
        <div className="flex flex-col ml-4">
          <span className="font-semibold">{props.title}</span>
          <span className="text-gray-500">{props.description}</span>
        </div>
        <div className="ml-auto">
          <span className="flex text-(--color-primary) text-sm border p-1 rounded-3xl w-full min-w-15 justify-center bg-(--color-hover-light)">
            {props.type}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-4 flex border-b border-gray-200 items-center">
        <div className="w-1/70">
          <Dot size={props.size || 40} color={props.color} />
        </div>
        <div className="flex flex-col ml-4">
          <span className="font-semibold">{props.title}</span>
          <span className="text-gray-500">{props.description}</span>
        </div>
        <div className="ml-auto">
          <span className="text-gray-400 text-sm">{props.time}</span>
        </div>
      </div>
    );
  }
};

export default DashBoardActivityItem;
