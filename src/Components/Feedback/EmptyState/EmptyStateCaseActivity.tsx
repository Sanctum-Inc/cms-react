import { FileText, Plus, Search } from "lucide-react";
import PrimaryButton from "../../Buttons/PrimaryButton";

const EmptyStateCaseActivity = () => {
  return (
    <>
      <div className="py-16 flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-blue-100 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-white p-4 rounded-full border border-blue-50 shadow-sm">
            <FileText className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          No activity found yet
        </h4>
        <p className="text-gray-500 text-sm mb-6 max-w-[280px] text-center leading-relaxed">
          When you update case statuses or add notes, they will appear in this
          timeline.
        </p>
        <div>
          <PrimaryButton color="blue">
            <Plus className="w-4 h-4" />
            Create New Case
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default EmptyStateCaseActivity;
