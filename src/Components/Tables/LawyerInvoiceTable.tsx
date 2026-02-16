import { EllipsisVertical, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { InvoiceResponse } from "../../api";
import EmptyStateInvoices from "../Feedback/EmptyState/EmptyStateInvoices";
import { getInvoiceStatusOptionsStyles } from "../Inputs/InputOptions/InvoiceStatusOptions";

interface LawyerInvoiceTableProps {
  LawyerInvoice: InvoiceResponse[];
}

const LawyerInvoiceTable = ({ LawyerInvoice }: LawyerInvoiceTableProps) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const clickedInsideSomeMenu = menuRefs.current.some(
        (ref) => ref && ref.contains(e.target as Node),
      );

      if (!clickedInsideSomeMenu) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-white rounded-3xl">
      {/* Header */}
      <div className="flex gap-2 py-3 pl-2 items-center">
        <FileText className="text-gray-400" />
        <span className="text-xl font-semibold w-fit">Recent Invoices</span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 font-semibold text-gray-400 bg-gray-100 p-2 py-4">
        <div>Invoice ID</div>
        <div>Case/Client</div>
        <div>Amount</div>
        <div>Status</div>
      </div>

      {/* Table Body */}
      <div>
        {LawyerInvoice.length > 0 ? (
          LawyerInvoice.map((invoice, index) => (
            <div key={invoice.id}>
              <div className="grid grid-cols-4 gap-4 p-2 py-4 items-center">
                {/* Invoice ID */}
                <div className="text-(--color-primary) underline decoration-(--color-primary) hover:cursor-pointer font-semibold">
                  {invoice.invoiceNumber}
                </div>

                {/* Case / Client */}
                <div className="flex flex-col">
                  <span className="font-semibold">{invoice.clientName}</span>
                  <span className="text-sm text-gray-400">
                    Case: {invoice.caseNumber}
                  </span>
                </div>

                {/* Amount */}
                <div className="font-bold">
                  R {invoice.totalAmount?.toLocaleString()}
                </div>

                {/* Status + Menu */}
                <div className="flex justify-between items-center">
                  <span
                    className={`w-fit h-fit ${getInvoiceStatusOptionsStyles(
                      invoice.status,
                    )}`}
                  >
                    {invoice.status}
                  </span>

                  <div
                    ref={(el) => {
                      menuRefs.current[index] = el;
                    }}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      className="cursor-pointer focus:outline-none"
                      aria-label="Invoice options menu"
                    >
                      <EllipsisVertical className="h-5 w-5" />
                    </button>

                    {openMenuIndex === index && (
                      <div className="absolute right-0 top-7 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Add new Item
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          View Generated PDF
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Share via Email
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200" />
            </div>
          ))
        ) : (
          <EmptyStateInvoices />
        )}
      </div>
    </div>
  );
};

export default LawyerInvoiceTable;
