import * as React from 'react';
import { type LucideProps } from "lucide-react";
import Card from '../Cards/Card';


interface DashboardCardProps {
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    value: string;
    color: string;
}

const DashboardCard = (props: DashboardCardProps) => {
    return (
      <Card className="w-1/5 h-1/8 p-8 hover:bg-(--color-hover-light) bg-white">
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
    );
}

export default DashboardCard;