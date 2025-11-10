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
      <div className="text-2xl font-semibold">{props.title}</div>
      <div className="pt-8">
        {props.items &&
          props.items.map((item, index) => (
            <DashBoardActivityItem
              key={index}
              color={item.color}
              title={item.title}
              description={item.description}
              time={item.time}
              icon={item.icon}
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