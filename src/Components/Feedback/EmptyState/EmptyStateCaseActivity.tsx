import { FileText, Plus, Search } from "lucide-react";

const EmptyStateActivity = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold uppercase">
          Option 1
        </span>
        <h2 className="text-sm font-medium text-gray-400">
          Illustrative & Action-Oriented
        </h2>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-800">Recent Case Activity</h3>
        </div>
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
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Create New Case
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptyStateActivity;
