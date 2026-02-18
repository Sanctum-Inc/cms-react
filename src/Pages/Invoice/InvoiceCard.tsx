import axios from "axios";
import {
  BanknoteArrowUp,
  ChevronDown,
  EllipsisVertical,
  FileText,
  List,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { InvoiceService } from "../../api";
import Card from "../../Components/Cards/Card";
import ShareFileModal from "../../Components/Modal/ShareFileModal";
import {
  getInvoiceStatusOptionsStyles,
  InvoiceStatusOptions,
} from "../../Models/InputOptions/InvoiceStatusOptions";
import { type Invoice, type InvoiceItemEntry } from "../../Models/Invoices";
import formatMoney from "../../Utils/FormatMoney";

interface InvoiceCardProps {
  invoices: Invoice;
  openAddModal: (show: boolean, caseNumber: string) => void;
  openUpdateModal: (invoiceItem: InvoiceItemEntry) => void;
  setShowErrorMessage: (message: string) => void;
  setShowSuccessMessage: (message: string) => void;
  setInvoiceToPaid: (invoiceId: string, status: number) => void;
  caseNumber: string;
}

const InvoiceCard = ({
  invoices,
  openAddModal: openAddModal,
  caseNumber,
  openUpdateModal,
  setShowErrorMessage,
  setShowSuccessMessage,
  setInvoiceToPaid,
}: InvoiceCardProps) => {
  const [showItems, setShowItems] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openInvoiceOptions, setOpenInvoiceOptions] = useState(false);
  const [openInvoiceItemOptions, setOpenInvoiceItemOptions] = useState<
    boolean[]
  >([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenInvoiceOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const clickedInsideSomeMenu = menuRefs.current.some(
        (ref) => ref && ref.contains(e.target as Node),
      );

      if (!clickedInsideSomeMenu) {
        setOpenInvoiceItemOptions(Array(invoices.Items.length).fill(false));
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [invoices.Items.length]);

  useEffect(() => {
    setOpenInvoiceItemOptions(Array(invoices.Items.length).fill(false));
  }, [invoices.Items.length]);

  const renderInvoiceItems = (items: InvoiceItemEntry[]): ReactNode => {
    return (
      <>
        <div className="mt-4 border-t border-gray-300 pt-4"></div>
        <div className="grid grid-cols-6 gap-4 font-semibold text-gray-400 bg-gray-100 p-2 py-4 rounded-t-md">
          <div>Date</div>
          <div>Description</div>
          <div>Hours</div>
          <div>Rate</div>
          <div>Amount</div>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 odd:bg-white even:bg-gray-50 p-2 py-4 border-b border-gray-200"
          >
            <div className="font-semibold">{item.date.toDateString()}</div>
            <div className="text-gray-500">{item.description}</div>
            <div className="text-gray-500">{item.hours}</div>
            <div className="text-gray-500">
              <span>R</span>
              <span>{formatMoney(item.costPerHour || 0)}</span>
            </div>
            <div className="font-semibold">
              <span>R</span>
              <span>{formatMoney(item.amount)}</span>
            </div>
            <div
              className="flex items-center ml-auto relative"
              ref={(el) => {
                menuRefs.current[index] = el;
              }}
            >
              <button
                type="button"
                className="cursor-pointer focus:outline-none"
                onClick={() =>
                  setOpenInvoiceItemOptions((o) =>
                    o.map((_, i) => (i === index ? !o[i] : false)),
                  )
                }
                aria-label="Invoice options menu"
              >
                <EllipsisVertical className="h-5 w-5" />
              </button>
              {openInvoiceItemOptions[index] && (
                <div className="absolute right-0 top-7 mt-2 w-40 bg-white border rounded shadow-lg z-1">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleOpenUpdateModal(item)}
                  >
                    Update
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => console.log("View PDF")}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  };

  const handleOpenAddModal = (caseNumber: string) => {
    setOpenInvoiceOptions(false);
    openAddModal(true, caseNumber);
  };

  const handleOpenUpdateModal = (invoiceItem: InvoiceItemEntry) => {
    setOpenInvoiceOptions(false);
    openUpdateModal(invoiceItem);
  };

  const handleSetToPaid = (id: string, status: number) => {
    InvoiceService.updateInvoicesStatus(id, {
      isPaid: status,
    })
      .then(() => {
        setShowSuccessMessage("Invoice marked as paid.");
        setInvoiceToPaid(id, status);
      })
      .catch(() => {
        setShowErrorMessage("Error marking invoice as paid.");
      });
  };

  const downloadPdf = async (id: string, invoiceId: string) => {
    try {
      const response = await axios.get(`/api/Invoice/pdf/download/${id}`, {
        responseType: "blob", // important to get binary data as Blob
      });

      // Create a blob URL from the response data
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;

      const fileName = invoiceId;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const viewPdf = async (invoiceId: string) => {
    const signedPath = await InvoiceService.createLink(invoiceId);

    console.log(signedPath);

    window.open(signedPath, "_blank", "noopener,noreferrer");
  };

  const returnCenterModal = () => {
    return (
      showShareModal && (
        <ShareFileModal
          fileName="Invoice_2024_001.pdf"
          title={"Share Invoice"}
          fileSize="2.5MB"
          fileType="PDF Document"
          setShowModal={setShowShareModal}
          downloadPDF={() => downloadPdf(invoices.id, invoices.invoiceNumber)}
          viewPDF={() => viewPdf(invoices.id)}
          invoiceId={invoices.id}
        ></ShareFileModal>
      )
    );
  };

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
            <span className="text-gray-500 text-sm">Case: {caseNumber}</span>
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
              <span>{formatMoney(invoices.total)}</span>
            </span>
            <span className="text-gray-500 text-sm flex">Total</span>
          </div>
          <div>
            <span className={getInvoiceStatusOptionsStyles(invoices.status)}>
              {
                InvoiceStatusOptions.find(
                  (o) => o.key === String(invoices.status),
                )?.value
              }
            </span>
          </div>
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
                onClick={() => setOpenInvoiceOptions((o) => !o)}
                aria-label="Invoice options menu"
              >
                <EllipsisVertical className="h-5 w-5" />
              </button>
              {openInvoiceOptions && (
                <div className="absolute right-0 top-7 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleOpenAddModal(caseNumber)}
                  >
                    Add new Item
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      handleSetToPaid(invoices.id, invoices.status == 2 ? 0 : 2)
                    }
                  >
                    Set to {invoices.status ? "Unpaid" : "Paid"}
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      downloadPdf(invoices.id, invoices.invoiceNumber)
                    }
                  >
                    View Generated PDF
                  </button>

                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowShareModal(true)}
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
      {returnCenterModal()}
    </>
  );
};

export default InvoiceCard;
