import { Calendar } from "lucide-react";

const EmptyStateCourtDates = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold uppercase">
          Option 2
        </span>
        <h2 className="text-sm font-medium text-gray-400">
          Minimalist Utility
        </h2>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Upcoming Court Dates</h3>
        </div>
        <div className="p-12 flex items-center justify-center gap-8">
          <div className="hidden md:flex bg-emerald-50 p-5 rounded-2xl">
            <Calendar
              className="w-12 h-12 text-emerald-500"
              strokeWidth={1.2}
            />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-base font-semibold text-gray-900">
              Your schedule is clear
            </h4>
            <p className="text-gray-500 text-sm mt-1 max-w-sm">
              There are no hearings or court dates scheduled for the next 30
              days. You're all caught up.
            </p>
            <div className="mt-4 flex gap-3 justify-center md:justify-start">
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                View full calendar
              </button>
              <span className="text-gray-300">•</span>
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                Sync with Outlook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyStateCourtDates;
