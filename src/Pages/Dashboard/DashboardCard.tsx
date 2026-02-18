import { type LucideProps } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Cards/Card";

interface DashboardCardProps {
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  value: string;
  color: string;
  linkTo: string;
}

const DashboardCard = (props: DashboardCardProps) => {
  return (
    <Link to={props.linkTo} className="w-1/4">
      <Card className="w-full h-full p-8 hover:bg-[var(--color-hover-light)] bg-white justify-between">
        <div className="flex justify-between">
          <span className="text-xl font-medium text-gray-400">
            {props.description}
          </span>
          <span>
            <props.icon color={props.color} />
          </span>
        </div>
        <div className="pt-2">
          <span className="text-3xl font-bold">{props.value}</span>
        </div>
      </Card>
    </Link>
  );
};

export default DashboardCard;
