import { Briefcase, ChevronDown, Clock, FileTextIcon, Gavel, Scale, User, type LucideProps } from "lucide-react";
import Card from "./Card";
import { useState, type ForwardRefExoticComponent, type RefAttributes } from "react";

const CaseTimeLine = () => {
  const [showDetails, setShowDetails] = useState(false);
  const items = [
    {
      caseName: "C-2025-001",
      defendant: "John Doe",
      date: "2025-11-16",
      dateName: "Meeting",
      description: "Strategy Review Meeting",
      plaintiff: "Acme Corp",
      icon: User,
      color: "text-green-600",
      backgrundColor: "bg-green-200",
    },
    {
      caseName: "C-2025-002",
      defendant: "Beta Holdings",
      date: "2025-12-05",
      dateName: "Court Appearance",
      description: "Pre-Trial Hearing",
      plaintiff: "State of SA",
      icon: Clock,
      color: "text-blue-600",
      backgrundColor: "bg-blue-200",
    },
    {
      caseName: "C-2025-010",
      defendant: "James Smith",
      date: "2025-11-22",
      dateName: "Internal Review",
      description: "Case File Audit",
      plaintiff: "Legal Team",
      icon: FileTextIcon,
      color: "text-red-600",
      backgrundColor: "bg-red-200",
    },
    {
      caseName: "C-2025-015",
      defendant: "Marie Peters",
      date: "2025-11-19",
      dateName: "Consultation",
      description: "Client Consultation",
      plaintiff: "Phoenix Law",
      icon: Gavel,
      color: "text-orange-600",
      backgrundColor: "bg-orange-200",
    },
    {
      caseName: "C-2025-021",
      defendant: "GreenTech",
      date: "2025-11-30",
      dateName: "Deadline",
      description: "Submit Discovery Documents",
      plaintiff: "Enviro Agency",
      icon: Scale,
      color: "text-purple-600",
      backgrundColor: "bg-purple-200",
    },
  ];


  const renderShowDetails = () => {
    if (!showDetails) return null;
    else
      return (
        <div className="bg-white p-4">
          <div className="text-xl font-semibold border-b border-gray-200 mb-4 pb-1">
            Upcoming & Main Dates
          </div>
          {items.map((item, index) =>
            renderShowDetailsItems(
              item.caseName,
              item.defendant,
              item.date,
              item.dateName,
              item.description,
              item.plaintiff,
              item.icon!,
              item.backgrundColor,
              item.color,
              false,
              index
            )
          )}
          <div className="text-xl font-semibold border-b border-gray-200 mb-4 mt-4 pb-1">
            Previous Dates & History
          </div>
          {items.map((item, index) =>
            renderShowDetailsItems(
              item.caseName,
              item.defendant,
              item.date,
              item.dateName,
              item.description,
              item.plaintiff,
              item.icon!,
              item.backgrundColor,
              item.color,
              true,
              index
            )
          )}
        </div>
      );
  };

  const renderShowDetailsItems = (
    caseName: string,
    defendant: string,
    date: string,
    dateName: string,
    description: string,
    plaintiff: string,
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    backGroundColor: string,
    color:string,
    isPast:boolean,
    index: number
  ) => {
    return (
      <Card hover={false} removeBorder={true} className="hover:bg-gray-100" key={index}>
        <div className="grid grid-cols-40">
          <div className="col-span-2 m-auto">
            <div
              className={`border border-gray-200 rounded-full p-2 ${backGroundColor}`}
            >
              <Icon className={color} />
            </div>
          </div>

          <div className="col-span-28">
            {/* Title / description */}
            <div
              className={`text-lg font-medium ${isPast ? "line-through text-gray-500" : ""}`}
            >
              {description}
            </div>

            {/* Case number and date name */}
            <div className="text-gray-500">
              {caseName} | {dateName}
            </div>

            {/* Optional extra details */}
            <div className="text-gray-400 text-xs mt-1">
              Plaintiff: {plaintiff} • Defendant: {defendant}
            </div>
          </div>

          {/* Date */}
          <div className="col-span-10 flex justify-end font-semibold text-black">
            {date}
          </div>
        </div>
      </Card>
    );
  };


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
        {renderShowDetails()}
      </Card>
    </>
  );
};

export default CaseTimeLine;
