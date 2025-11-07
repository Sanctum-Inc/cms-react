import * as React from 'react';
import { type LucideProps } from "lucide-react";


interface DashboardCardProps {
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    value: string;
    color: string;
}

const DashboardCard = (props: DashboardCardProps) => {
    return (
        <div className='w-1/5 h-1/8 p-8 rounded-3xl border border-solid border-gray-300 bg-white hover:bg-(--color-hover-light)'>
            <div className='flex justify-between'>
                <span className='text-xl font-medium text-gray-400'>
                    {props.description}
                </span>
                <span>
                    <props.icon color={props.color} />
                </span>
            </div>
            <div className='pt-2'>
                <span className='text-3xl font-bold'>
                    {props.value}
                </span>
            </div>
    </div>
  );
}

export default DashboardCard;