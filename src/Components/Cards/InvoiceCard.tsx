import {
  BanknoteArrowUp,
  ChevronDown,
  EllipsisVertical,
  FileText,
  List,
  Users,
} from "lucide-react";
import type { Invoice, InvoiceItemEntry } from "../../Models/Invoices";
import Card from "./Card";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface InvoiceCardProps {
  invoices: Invoice;
  openModal: (show: boolean, caseNumber:string ) => void;
  caseNumber: string;
}

const InvoiceCard = ({ invoices, openModal, caseNumber }: InvoiceCardProps) => {
  const [showItems, setShowItems] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const getStatusStyles = () => {
    switch (invoices.status.toLowerCase()) {
      case "paid":
        return "text-green-600 border border-green-400  bg-green-100 rounded-full px-2 pb-1 text-[12px] my-auto  min-w-12 w-fit flex items-center justify-center";
      case "overdue":
        return "text-red-600 border border-red-400  bg-red-100 rounded-full px-2 pb-1 text-[12px] my-auto w-fit flex items-center justify-center";
      case "pending":
        return "text-orange-600 border border-orange-400  bg-orange-100 rounded-full px-2 pb-1 text-[12px] w-fit flex items-center justify-center";
      default:
        return "text-gray-600 border border-gray-400  bg-gray-100 rounded-full px-2 pb-1 text-[12px] w-fit flex items-center justify-center";
    }
  };

  const formatMoney = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const renderInvoiceItems = (items: InvoiceItemEntry[]): ReactNode => {
    return (
      <>
        <div className="mt-4 border-t border-gray-300 pt-4"></div>
        <div className="grid grid-cols-5 gap-4 font-semibold text-gray-400 bg-gray-100 p-2 py-4 rounded-t-md">
          <div>Date</div>
          <div>Description</div>
          <div>Hours</div>
          <div>Rate</div>
          <div>Amount</div>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 odd:bg-white even:bg-gray-50 p-2 py-4 border-b border-gray-200"
          >
            <div className="font-semibold">{item.date.toDateString()}</div>
            <div className="text-gray-500">{item.description}</div>
            <div className="text-gray-500">{item.hours}</div>
            <div className="text-gray-500">
              <span>R</span>
              <span>{formatMoney(item.rate || 0)}</span>
            </div>
            <div className="font-semibold">
              <span>R</span>
              <span>{formatMoney(item.amount)}</span>
            </div>
          </div>
        ))}
      </>
    );
  };

    const handleOpenModal =(caseNumber: string) => {
        setOpen(false);
        console.log(`1. ${caseNumber}`)
        openModal(true, caseNumber);
    }

  return (
    <>
      <Card
        className={`mx-6 my-3 p-6 ${showItems ? "bg-blue-50 " : ""}`}
        hover={true}
      >
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="flex flex-col">
            <span>
              <FileText className="inline-block mr-2 h-5 w-5 text-blue-700" />
              {invoices.invoiceNumber}
            </span>
            <span className="text-gray-500 text-sm">
              Case: {caseNumber}
            </span>
          </div>
          <div className="flex flex-col">
            <span>
              <Users className="inline-block mr-2 h-5 w-5 text-gray-400" />
              {invoices.plaintiff} vs {invoices.defendant}
            </span>
            <span className="text-gray-500 text-sm">Client</span>
          </div>
          <div className="flex flex-col">
            <span>
              <BanknoteArrowUp className="inline-block mr-2 h-5 w-5 text-green-700" />
              <span>R</span>
              <span>
                {formatMoney(
                  invoices.total
                )}
              </span>
            </span>
            <span className="text-gray-500 text-sm flex">Total</span>
          </div>
          <div className={getStatusStyles()}>{invoices.status}</div>
          <div className="flex justify-center h-full space-y-2">
            <div
              className="flex items-center border border-gray-300 rounded-2xl p-2 justify-center cursor-pointer hover:bg-gray-100 w-40"
              onClick={() => setShowItems((prev) => !prev)}
            >
              <List className="mr-2 h-5" />
              <div className="flex">
                <div className="w-fit">Show Items</div>
                {/* single button controls the toggle for accessibility and avoids duplicate handlers */}
                <button
                  type="button"
                  className="w-fit ml-1 flex items-center focus:outline-none"
                  onClick={() => setShowItems((prev) => !prev)}
                  aria-expanded={showItems}
                  aria-label={
                    showItems ? "Hide invoice items" : "Show invoice items"
                  }
                >
                  {showItems ? (
                    <ChevronDown
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => setShowItems((prev) => !prev)}
                    />
                  ) : (
                    <ChevronDown
                      className="rotate-180 h-5 w-5 cursor-pointer"
                      onClick={() => setShowItems((prev) => !prev)}
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center ml-auto relative" ref={menuRef}>
              <button
                type="button"
                className="cursor-pointer focus:outline-none"
                onClick={() => setOpen((o) => !o)}
                aria-label="Invoice options menu"
              >
                <EllipsisVertical className="h-5 w-5" />
              </button>
              {open && (
                <div className="absolute right-0 top-7 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleOpenModal(caseNumber)}
                  >
                    Add new Item
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => console.log("View PDF")}
                  >
                    View Generated PDF
                  </button>

                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => console.log("Share via Email")}
                  >
                    Share via Email
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>{showItems && renderInvoiceItems(invoices.Items)}</div>
      </Card>
    </>
  );
};

export default InvoiceCard;
