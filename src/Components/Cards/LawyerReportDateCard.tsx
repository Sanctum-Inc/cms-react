import { Calendar } from "lucide-react";

const LawyerReportDateCard = () => {
  return (
    <div className="border border-gray-300 rounded-3xl p-4">
      <div className="flex mb-3 gap-2">
        <span className="text-gray-500">
          <Calendar />
        </span>
        <span className="font-semibold">Upcoming Deadlines</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 border border-orange-100 rounded-xl p-2 bg-orange-100">
          <div className="border border-orange-400 px-3 py-1 rounded-xl flex flex-col items-center justify-center font-bold bg-orange-500 text-white">
            <div>FEB</div>
            <div>21</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-semibold">Final Argument Filing</div>
            <div className="text-gray-500 text-sm">Case #CC-4312/2026</div>
          </div>
        </div>
        <div className="flex gap-3 border border-orange-100 rounded-xl p-2 bg-orange-100">
          <div className="border border-orange-400 px-3 py-1 rounded-xl flex flex-col items-center justify-center font-bold bg-orange-500 text-white">
            <div>FEB</div>
            <div>21</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-semibold">Final Argument Filing</div>
            <div className="text-gray-500 text-sm">Case #CC-4312/2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerReportDateCard;
