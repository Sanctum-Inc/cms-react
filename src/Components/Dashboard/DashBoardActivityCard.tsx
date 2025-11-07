import DashBoardActivityItem from "./DashBoardActivityItem";
import type { CardItem } from "../../Models/CardItem";

interface DashBoardActivityCardProps {
  title: string;
  size?: string;
  clickable?: boolean;
  items: Array<CardItem>;
}

const DashBoardActivityCard = (props:DashBoardActivityCardProps) => {
  return (
    <div className="border border-gray-300 p-5 rounded-lg bg-white">
      <div className="text-2xl font-semibold">
        {props.title}
      </div>
      <div className="pt-8">
        {
          props.items && props.items.map((item, index) => (
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
          ))
        }
      </div>
    </div>
  );
};

export default DashBoardActivityCard;