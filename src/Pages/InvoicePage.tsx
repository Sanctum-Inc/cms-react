import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  InvoiceService,
  type AddInvoiceItemRequest,
  type InvoiceStatus,
} from "../api";
import InvoiceCard from "../Components/Cards/InvoiceCard";
import ErrorAlert from "../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../Components/Feedback/Alerts/SuccessAlert";
import AddInvoiceForm from "../Components/Forms/AddInvoiceForm";
import Header from "../Components/Header/Header";
import SortBar from "../Components/Inputs/SortBar";
import SideModal from "../Components/Modal/SideModal";
import { statusLabels, type Invoice } from "../Models/Invoices";

const InvoicePage = () => {
  const [sortBy, setSortBy] = useState<
    "invoiceNumber" | "total" | "status" | "caseNumber"
  >("invoiceNumber");
  const [sortDesc, setSortDesc] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdatemodal, setShowUpdateModal] = useState(false);

  const [invoices, setInvoice] = useState<Invoice[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );
  const [addInvoiceItemRequest, setAddInvoiceItemRequest] =
    useState<AddInvoiceItemRequest>({
      caseId: "",
      invoiceId: "",
      name: "",
      date: "",
      hours: 0,
      costPerHour: 0,
      clientName: "",
      refference: "",
    });

  // Compute filtered + sorted cases
  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch = (c: (typeof invoices)[number]) => {
      if (!q) return true;
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.invoiceNumber.toLowerCase().includes(q) ||
        statusLabels[c.status].toLowerCase().includes(q) ||
        c.Items.toString().toLowerCase().includes(q) ||
        c.total.toString().toLowerCase().includes(q)
      );
    };

    const matchesStatus = (c: (typeof invoices)[number]) => {
      if (statusFilter === "all") return true;
      return (
        statusLabels[c.status].toLowerCase() === statusFilter.toLowerCase()
      );
    };

    const compare = (
      a: (typeof invoices)[number],
      b: (typeof invoices)[number],
      key: keyof (typeof invoices)[number],
      desc: boolean,
    ) => {
      const avRaw = a[key];
      const bvRaw = b[key];

      // Numeric compare (e.g. total)
      if (typeof avRaw === "number" && typeof bvRaw === "number") {
        const r = avRaw === bvRaw ? 0 : avRaw > bvRaw ? 1 : -1;
        return desc ? -r : r;
      }

      // Array compare (e.g. Items) — stringify for stable comparison
      if (Array.isArray(avRaw) && Array.isArray(bvRaw)) {
        const av = JSON.stringify(avRaw).toLowerCase();
        const bv = JSON.stringify(bvRaw).toLowerCase();
        const r = av.localeCompare(bv);
        return desc ? -r : r;
      }

      // Fallback to string compare (handles case-insensitive)
      const av = String(avRaw ?? "").toLowerCase();
      const bv = String(bvRaw ?? "").toLowerCase();
      const r = av.localeCompare(bv);
      return desc ? -r : r;
    };

    // apply filters
    const filtered = invoices.filter(
      (c) => matchesSearch(c) && matchesStatus(c),
    );

    // apply primary sort by `sortBy` with direction `sortDesc` and then
    // fall back to the other columns in a fixed order for stable results.
    filtered.sort((a, b) => {
      const res = compare(a, b, sortBy, sortDesc);
      if (res !== 0) return res;
      const order: (keyof (typeof invoices)[number])[] = [
        "caseNumber",
        "invoiceNumber",
        "status",
        "Items",
      ];
      for (const key of order) {
        if (key === sortBy) continue;
        const r = compare(a, b, key, false); // fallback ascending
        if (r !== 0) return r;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, statusFilter, sortBy, sortDesc, invoices]);

  const returnSideModal = () => {
    if (showAddModal)
      return (
        <SideModal setShowModal={setShowAddModal} title="New Invoice Item">
          <div className="flex h-full min-h-0 w-full flex-col gap-4 overflow-y-auto p-4">
            <AddInvoiceForm
              addInvoiceItemRequest={addInvoiceItemRequest}
              setInvoice={setInvoice}
              setShowErrorMessage={setErrorAlertMessage}
              setShowSuccessMessage={setSuccessAlertMessage}
              buttonCaption="Create"
            />
          </div>
        </SideModal>
      );
    else if (showUpdatemodal)
      return (
        <SideModal
          setShowModal={setShowUpdateModal}
          title="Update Invoice Item"
        >
          <div className="flex h-full min-h-0 w-full flex-col gap-4 overflow-y-auto p-4">
            <AddInvoiceForm
              addInvoiceItemRequest={addInvoiceItemRequest}
              setInvoice={setInvoice}
              setShowErrorMessage={setErrorAlertMessage}
              setShowSuccessMessage={setSuccessAlertMessage}
              buttonCaption="Update"
            />
          </div>
        </SideModal>
      );
  };

  const handleShowUpdateModal = (invoice: Invoice, index: number) => {
    setAddInvoiceItemRequest({
      caseId: invoice.caseId,
      invoiceId: invoice.id,
      name: invoice.Items[index]?.description || "",
      date: invoice.Items[index]?.date.toISOString().split("T")[0] || "",
      hours: invoice.Items[index]?.hours || 0,
      costPerHour: invoice.Items[index]?.costPerHour || 0,
      clientName: "",
      refference: "",
    });

    setShowUpdateModal(true);
  };

  const handleShowAddModal = (
    show: boolean,
    caseId: string,
    invoiceId: string,
  ) => {
    setAddInvoiceItemRequest({
      caseId: caseId,
      invoiceId: invoiceId,
      name: "",
      date: "",
      hours: 0,
      costPerHour: 0,
      clientName: "",
      refference: "",
    });

    setShowAddModal(show);
  };

  const handleSort = (
    col: "invoiceNumber" | "caseNumber" | "total" | "status",
  ) => {
    if (sortBy === col) {
      setSortDesc((s) => !s);
    } else {
      setSortBy(col);
      setSortDesc(true);
    }
  };

  useEffect(() => {
    InvoiceService.getAllInvoices()
      .then((response) => {
        const mapped = response.map((invoice) => ({
          id: invoice.id,
          caseId: invoice.caseId,
          caseNumber: invoice.caseNumber,
          clientName: invoice.clientName,
          invoiceNumber: invoice.invoiceNumber,
          status: invoice.status as InvoiceStatus,
          total: invoice.totalAmount,
          plaintiff: invoice.plaintiff,
          defendant: invoice.defendant,
          Items: invoice.items.map((item) => ({
            amount: item.total,
            hours: item.hours,
            date: new Date(item.date),
            description: item.name,
            costPerHour: item.costPerHour,
            caseId: invoice.caseId,
            invoiceId: invoice.id,
            id: item.id,
          })),
        }));

        setInvoice(mapped);
      })
      .catch(() => {
        setErrorAlertMessage("Failed to load invoices. Please try again.");
      });
  }, []);

  useEffect(() => {
    if (!successAlertMessage) return;
    const timer = setTimeout(() => setSuccessAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [successAlertMessage]);

  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };
  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

  return (
    <>
      <Header
        showButton={true}
        title="Invoice Management"
        buttonCaption="Add New Invoice"
        handleShowModal={() => handleShowAddModal(true, "", "")}
      />
      <SortBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statusOptions={["all", "paid", "overdue", "pending"]}
      ></SortBar>
      <div className="m-6 p-6 mt-5 font-bold text-gray-500 border-b border-gray-300 pb-3">
        <div>Invoice Information</div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          <div className="flex align-center">
            <span>Invoice Number </span>
            <span
              className="my-auto cursor-pointer"
              onClick={() => handleSort("invoiceNumber")}
            >
              {sortBy === "invoiceNumber" ? (
                sortDesc ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowUp size={12} className="rotate-180" />
                )
              ) : (
                <ArrowUp size={12} />
              )}
            </span>
          </div>
          <div className="flex align-center">
            <span>Client Name </span>
            <span
              className="my-auto cursor-pointer"
              onClick={() => handleSort("caseNumber")}
            >
              {sortBy === "caseNumber" ? (
                sortDesc ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowUp size={12} className="rotate-180" />
                )
              ) : (
                <ArrowUp size={12} />
              )}
            </span>
          </div>
          <div className="flex align-center">
            <span>Total</span>
            <span
              className="my-auto cursor-pointer"
              onClick={() => handleSort("total")}
            >
              {sortBy === "total" ? (
                sortDesc ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowUp size={12} className="rotate-180" />
                )
              ) : (
                <ArrowUp size={12} />
              )}
            </span>
          </div>
          <div className="flex align-center">
            <span>Status</span>
            <span
              className="my-auto cursor-pointer"
              onClick={() => handleSort("status")}
            >
              {sortBy === "status" ? (
                sortDesc ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowUp size={12} className="rotate-180" />
                )
              ) : (
                <ArrowUp size={12} />
              )}
            </span>
          </div>
        </div>
      </div>
      {filteredInvoices.map((invoice, index) => (
        <InvoiceCard
          key={`${index}-invoiceCard`}
          invoices={invoice}
          caseNumber={invoice.caseNumber}
          openAddModal={() =>
            handleShowAddModal(true, invoice.caseId, invoice.id)
          }
          openUpdateModal={() => handleShowUpdateModal(invoice, index)}
        />
      ))}
      {returnSideModal()}
      {renderSuccessmessage()}
      {renderErrorMessage()}
    </>
  );
};

export default InvoicePage;
