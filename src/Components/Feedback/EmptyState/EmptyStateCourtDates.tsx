import { Calendar } from "lucide-react";

const EmptyStateCourtDates = () => {
  return (
    <>
      <div className="p-12 flex items-center justify-center gap-8">
        <div className="hidden md:flex bg-emerald-50 p-5 rounded-2xl">
          <Calendar className="w-12 h-12 text-emerald-500" strokeWidth={1.2} />
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-base font-semibold text-gray-900">
            Your schedule is clear
          </h4>
          <p className="text-gray-500 text-sm mt-1 max-w-sm">
            There are no hearings or court dates scheduled for the next 30 days.
            You're all caught up.
          </p>
          <div className="mt-4 flex gap-3 justify-center md:justify-start">
            <button className="text-blue-600 text-sm font-semibold hover:underline hover:cursor-pointer">
              View full calendar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyStateCourtDates;
