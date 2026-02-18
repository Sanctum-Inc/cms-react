import { Scale } from "lucide-react";
import Card from "../../Components/Cards/Card";

interface CaseSummaryCardProps {
  caseFields: {
    label: string;
    value: string | number | Date;
    icon: React.ForwardRefExoticComponent<
      Omit<import("lucide-react").LucideProps, "ref"> &
        React.RefAttributes<SVGSVGElement>
    >;
  }[];
}

const CaseSummaryCard = ({ caseFields }: CaseSummaryCardProps) => {
  return (
    <>
      <div className="flex items-center mb-4 border-b border-gray-300 pb-2">
        <span>
          <Scale />
        </span>
        <span className="text-2xl font-semibold ml-2">Case Summary</span>
      </div>
      <div className="grid grid-cols-10 gap-4">
        {caseFields.map(({ label, value, icon: Icon }, index) => (
          <Card
            className="col-span-5 bg-gray-50"
            key={`infoCardsSummary-${index}`}
          >
            <div className="grid grid-cols-40">
              <div className="col-span-3 flex items-center">
                <Icon />
              </div>
              <div className="col-span-37 text-gray-500 font-medium">
                <div>{label}</div>
              </div>
              <div className="col-span-3"></div>
              <div className="col-span-37">{`${value}`}</div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CaseSummaryCard;
