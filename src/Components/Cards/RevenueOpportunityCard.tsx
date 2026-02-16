import { ArrowRight, Zap } from "lucide-react";

const RevenueOpportunityCard = () => {
  // Mock data for the insight
  const leakageData = {
    unbilledAmount: "2,450",
    agingDays: 14,
    impactLevel: "High",
  };

  const handleAction = () => {
    console.log("Navigating to unbilled entries...");
  };

  return (
    <div className="px-5">
      <div className="w-full max-w-md bg-white border border-amber-100 rounded-xl overflow-hidden shadow-sm">
        <div className="p-5">
          {/* Header Section */}
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-amber-50 rounded-lg">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-600" />
            </div>
            <span className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Revenue Opportunity
            </span>
            <span className="ml-auto px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">
              {leakageData.impactLevel} Impact
            </span>
          </div>

          {/* Content Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800 leading-snug">
              ${leakageData.unbilledAmount} in unbilled time is nearing expiry
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              There are 12 completed tasks from the last {leakageData.agingDays}{" "}
              days that haven't been added to an invoice yet. These entries are
              at risk of missing the end-of-month billing cycle.
            </p>
          </div>

          {/* Footer/Action Section */}
          <button
            onClick={handleAction}
            className="mt-5 w-full group flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 rounded-lg transition-all duration-200"
          >
            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700">
              Convert Unbilled Time to Invoice
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Visual Progress/Indicator Bar */}
        <div className="h-1 w-full bg-slate-100">
          <div className="h-full bg-amber-500 w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default RevenueOpportunityCard;
