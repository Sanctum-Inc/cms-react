import DashBoardActivityItem from "./DashBoardActivityItem";
import type { CardItem } from "../../Models/CardItem";
import Card from "../Cards/Card";

interface DashBoardActivityCardProps {
  title: string;
  size?: string;
  clickable?: boolean;
  items: Array<CardItem>;
}

const DashBoardActivityCard = (props:DashBoardActivityCardProps) => {
  return (
    <Card className="p-5">
      <div className="text-2xl font-semibold mb-5">{props.title}</div>
      <div className="h-100 overflow-y-auto">
        {props.items &&
          props.items.map((item, index) => (
            <DashBoardActivityItem
              key={index}
              color={item.color}
              title={item.title}
              description={item.description}
              time={item.time}
              size={props.size}
              clickable={props.clickable}
              type={item.type}
            />
          ))}
      </div>
    </Card>
  );
};

export default DashBoardActivityCard;