import { Clock, Dot } from "lucide-react";

const LawyerReportActivityCard = () => {
  return (
    <div>
      <div className="border border-gray-300 rounded-3xl p-4">
        <div className="flex mb-3 gap-2">
          <span className="text-gray-500">
            <Clock />
          </span>
          <span className="font-semibold">Activity Log</span>
        </div>
        <div className="flex">
          <div>
            <Dot color="blue" size={35} />
          </div>
          <div>
            <div>Uploaded Document: "Witness_Affidavit.pdf"</div>
            <div className="text-gray-400 mb-2">2 hours ago</div>
          </div>
        </div>
        <div className="flex">
          <div>
            <Dot color="blue" size={35} />
          </div>
          <div>
            <div>Uploaded Document: "Witness_Affidavit.pdf"</div>
            <div className="text-gray-400">2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LawyerReportActivityCard;
