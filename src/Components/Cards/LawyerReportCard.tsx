import { type LucideProps } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";

interface LawyerReportCardProps {
  percentage: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  value: string;
  color: string;
  linkTo: string;
  title: string;
  subtitle: string;
  description: string;
}

const LawyerReportCard = (props: LawyerReportCardProps) => {
  const getStyles = (percentage: string) => {
    if (percentage.includes("-")) {
      return "text-red-500 bg-red-100 rounded-full px-2";
    } else {
      return "text-green-500 bg-green-100 rounded-full px-2";
    }
  };

  const getStylesBackground = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-500 bg-red-100 rounded-xl p-3";
      case "blue":
        return "text-blue-500 bg-blue-100 rounded-xl p-3";
      case "green":
        return "text-green-500 bg-green-100 rounded-xl p-3";
      case "purple":
        return "text-purple-500 bg-purple-100 rounded-xl p-3";
      default:
        break;
    }
  };

  return (
    <Link to={props.linkTo} className="w-1/4">
      <Card className="w-full p-8 hover:bg-(--color-hover-light) bg-white">
        <div className="flex justify-between">
          <span className={getStylesBackground(props.color)}>
            <props.icon color={props.color} />
          </span>
          <span
            className={`text-xs flex items-center ${getStyles(props.percentage)} h-fit p-1 rounded-lg`}
          >
            {Number(props.percentage) > 0
              ? `${props.percentage}%`
              : `${props.percentage}%`}
          </span>
        </div>
        <div className="pt-2 mt-3 flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-500">
            {props.title}
          </div>
          <div className="text-xl font-bold">{props.subtitle}</div>
          <div className="text-md text-gray-400">{props.description}</div>
        </div>
      </Card>
    </Link>
  );
};

export default LawyerReportCard;
