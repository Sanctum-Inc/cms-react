import { DollarSign, Plus, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * EmptyStateInvoices Component
 * Matches the visual design language of EmptyStateCaseActivity and EmptyStateCourtDates.
 * Uses an orange/amber color scheme typically associated with financial/billing status.
 */
const EmptyStateInvoices = () => {
  const navigate = useNavigate();
  const handleCreateInvoice = () => {
    navigate(`/invoices?status=create`);
  };

  return (
    <div className="py-16 flex flex-col items-center justify-center">
      {/* Visual Icon Group */}
      <div className="relative mb-6">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-amber-100 rounded-full blur-lg opacity-50"></div>

        {/* Main Icon Container */}
        <div className="relative bg-white p-4 rounded-full border border-amber-50 shadow-sm">
          <Receipt className="w-10 h-10 text-amber-500" strokeWidth={1.5} />
        </div>

        {/* Secondary Accessory Icon */}
        <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm">
          <DollarSign className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Text Content */}
      <h4 className="text-lg font-medium text-gray-900 mb-2">
        No invoices generated
      </h4>
      <p className="text-gray-500 text-sm mb-6 max-w-[280px] text-center leading-relaxed">
        You haven't billed for any services yet. Start tracking your time and
        expenses to generate your first invoice.
      </p>

      {/* Action Button */}
      <div>
        <button
          onClick={handleCreateInvoice}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-200"
        >
          <Plus className="w-4 h-4" />
          Create First Invoice
        </button>
      </div>
    </div>
  );
};

export default EmptyStateInvoices;
