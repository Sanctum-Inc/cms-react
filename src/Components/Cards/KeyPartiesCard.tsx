import { Users } from "lucide-react";
import Card from "./Card";

interface KeyPartiesCardProps {
  keyParties: {
    label: string;
    value: string;
    icon: any;
    color: string;
  }[];
}

const KeyPartiesCard = ({ keyParties }: KeyPartiesCardProps) => {
  return (
    <>
      <div className="flex items-center mb-4 border-b border-gray-300 pb-2">
        <span>
          <Users />
        </span>
        <span className="text-2xl font-semibold ml-2">Key Parties</span>
      </div>
      <div className="">
        {keyParties.map(({ label, value, icon: Icon, color }, index) => (
          <Card
            className="bg-gray-50 mb-4"
            key={`infoCardsKeyParties-${index}`}
          >
            <div className="grid grid-cols-20">
              <div className="col-span-1 flex items-center">
                <Icon color={color} />
              </div>
              <div className="col-span-19 text-gray-500 font-medium ml-1">
                <div>{label}</div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-19 font-medium ml-1" style={{ color }}>
                {value?.toString()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default KeyPartiesCard;
