import { ArrowUp } from "lucide-react";
import { useEffect, useMemo } from "react";
import {
  type AddInvoiceItemRequest,
  InvoiceService,
  type InvoiceStatus,
} from "../../api";
import type { Invoice } from "../../Models/Invoices";
import InvoiceCard from "../Cards/InvoiceCard";
import { InvoiceStatusOptions } from "../Inputs/InputOptions/InvoiceStatusOptions";

interface InvoiceTableProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  searchQuery: string;
  statusFilter: string;
  setSuccessAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setAddInvoiceItemRequest: React.Dispatch<
    React.SetStateAction<AddInvoiceItemRequest>
  >;
  setShowAddModal?: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowUpdateModal?: (invoice: Invoice, index: number) => void;
  sortBy: "invoiceNumber" | "total" | "status" | "caseNumber";
  setSortBy: React.Dispatch<
    React.SetStateAction<"invoiceNumber" | "total" | "status" | "caseNumber">
  >;
  sortDesc: boolean;
  setSortDesc: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoiceTable = ({
  invoices,
  setInvoices,
  searchQuery,
  statusFilter,
  setSuccessAlertMessage,
  setErrorAlertMessage,
  setAddInvoiceItemRequest,
  setShowAddModal,
  handleShowUpdateModal,
  sortBy,
  setSortBy,
  setSortDesc,
  sortDesc,
}: InvoiceTableProps) => {
  // Compute filtered + sorted cases
  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch = (c: (typeof invoices)[number]) => {
      if (!q) return true;
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.invoiceNumber.toLowerCase().includes(q) ||
        InvoiceStatusOptions.find((o) => o.key === String(c.status))
          ?.value.toLowerCase()
          .includes(q) ||
        c.Items.toString().toLowerCase().includes(q) ||
        c.total.toString().toLowerCase().includes(q)
      );
    };

    const matchesStatus = (c: (typeof invoices)[number]) => {
      if (statusFilter === "all") return true;
      return (
        InvoiceStatusOptions.find(
          (o) => o.key === String(c.status),
        )?.value.toLowerCase() === statusFilter.toLowerCase()
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

  const handleShowAddModal = (
    show: boolean,
    caseId: string,
    invoiceId: string,
  ) => {
    if (!setShowAddModal) return;
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

        setInvoices(mapped);
      })
      .catch(() => {
        setErrorAlertMessage("Failed to load invoices. Please try again.");
      });
  }, []);

  const SetInvoiceToPaid = (invoiceId: string, status: number) => {
    setInvoices((prev) => {
      return prev.map((invoice) => {
        if (invoice.id === invoiceId) {
          return {
            ...invoice,
            status: status,
          };
        }
        return invoice;
      });
    });
  };
  return (
    <>
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
          openUpdateModal={() =>
            handleShowUpdateModal && handleShowUpdateModal(invoice, index)
          }
          setShowErrorMessage={setErrorAlertMessage}
          setShowSuccessMessage={setSuccessAlertMessage}
          setInvoiceToPaid={SetInvoiceToPaid}
        />
      ))}
    </>
  );
};

export default InvoiceTable;
