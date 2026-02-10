import type { CardItem } from "../../Models/CardItem";
import Card from "../Cards/Card";
import EmptyStateCaseActivity from "../Feedback/EmptyState/EmptyStateCaseActivity";
import EmptyStateCourtDates from "../Feedback/EmptyState/EmptyStateCourtDates";
import DashBoardActivityItem from "./DashBoardActivityItem";

interface DashBoardActivityCardProps {
  title: string;
  size?: string;
  clickable?: boolean;
  items: Array<CardItem>;
  cardType: "dates" | "activity";
}

const DashBoardActivityCard = (props: DashBoardActivityCardProps) => {
  const renderActivityItem = (items: CardItem[]) => {
    if (items.length > 0) {
      return items.map((item, index) => {
        return (
          <DashBoardActivityItem
            key={`dashboardActivityItem-${index}`}
            color={item.color}
            title={item.title}
            description={item.description}
            time={item.time}
            size={props.size}
            clickable={props.clickable}
            type={item.type}
            caseId={item.caseId}
          />
        );
      });
    } else if (props.cardType === "activity") {
      return <EmptyStateCaseActivity />;
    } else {
      return <EmptyStateCourtDates />;
    }
  };

  return (
    <Card className="p-5">
      <div className="text-2xl font-semibold mb-5">{props.title}</div>
      <div className="min-h-50 max-h-100 overflow-y-auto">
        {renderActivityItem(props.items)}
      </div>
    </Card>
  );
};

export default DashBoardActivityCard;
