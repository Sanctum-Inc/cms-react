import { ArrowUp, Plus } from "lucide-react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import { useMemo, useState } from "react";
import Modal from "../Components/Modal/Modal";
import type { InputItem } from "../Models/InputItem";
import SortBar from "../Components/Inputs/SortBar";
import InvoiceCard from "../Components/Cards/InvoiceCard";
import Header from "../Components/Header/Header";

const InvoicePage = () => {
    const [sortBy, setSortBy] = useState<
      "invoiceNumber" | "clientName" | "total" | "status"
    >("invoiceNumber");
    const [sortDesc, setSortDesc] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const inputItems: InputItem[] = [
      {
        label: "Name:",
        name: "name",
        type: "text",
        placeholder: "Enter item name",
        value: "",
      },
      {
        label: "Description:",
        name: "description",
        type: "text",
        placeholder: "Enter a description",
        value: ""
      },
      {
        label: "Date of Service:",
        name: "dateOfService",
        type: "date",
        placeholder: "",
        value: "",
      },
      {
        label: "Hours:",
        name: "hours",
        type: "number",
        placeholder: "0",
        value: "",
      },
      {
        label: "Cost Per Hour:",
        name: "costPerHour",
        type: "number",
        placeholder: "Enter hourly cost",
        value: "",
      },
      {
        label: "Day Fee Amount:",
        name: "dayFeeAmount",
        type: "number",
        placeholder: "Enter day fee amount",
        value: "",
      },
      {
        label: "Is Day Fee:",
        name: "isDayFee",
        type: "checkbox",
        value: "false",
        width: "30",
        height: "30"
      },
    ];
    const Invoices = [
      {
        invoiceNumber: "INV-001",
        clientName: "Acme Corp",
        caseNumber: "CASE-435",
        status: "Pending",
        total: 3000,
        Items: [
          {
            date: "2024-01-12",
            description: "Initial consultation",
            hours: 2,
            rate: 1500,
            amount: 3000,
          },
        ],
      },
      {
        invoiceNumber: "INV-002",
        clientName: "Globex Legal",
        caseNumber: "CASE-982",
        status: "Completed",
        total: 9000,
        Items: [
          {
            date: "2024-02-05",
            description: "Case review and document preparation",
            hours: 4,
            rate: 1800,
            amount: 7200,
          },
          {
            date: "2024-02-06",
            description: "Client meeting",
            hours: 1,
            rate: 1800,
            amount: 1800,
          },
        ],
      },
      {
        invoiceNumber: "INV-003",
        clientName: "Starlight Holdings",
        caseNumber: "CASE-774",
        status: "Overdue",
        total: 11600,
        Items: [
          {
            date: "2024-03-10",
            description: "Drafting affidavits",
            hours: 3,
            rate: 2000,
            amount: 6000,
          },
          {
            date: "2024-03-11",
            description: "Court filing",
            hours: 1,
            rate: 2000,
            amount: 2000,
          },
          {
            date: "2024-03-11",
            description: "Follow-up consultation",
            hours: 2,
            rate: 1800,
            amount: 3600,
          },
        ],
      },
      {
        invoiceNumber: "INV-004",
        clientName: "Nimbus Technology",
        caseNumber: "CASE-889",
        status: "Paid",
        total: 20400,
        Items: [
          {
            date: "2024-04-01",
            description: "Research and evidence gathering",
            hours: 5,
            rate: 1700,
            amount: 8500,
          },
          {
            date: "2024-04-02",
            description: "Drafting legal opinions",
            hours: 4,
            rate: 1700,
            amount: 6800,
          },
          {
            date: "2024-04-03",
            description: "Client strategy meeting",
            hours: 2,
            rate: 1700,
            amount: 3400,
          },
          {
            date: "2024-04-04",
            description: "Case administration and filing",
            hours: 1,
            rate: 1700,
            amount: 1700,
          },
        ],
      },
      {
        invoiceNumber: "INV-005",
        clientName: "Evergreen Estates",
        caseNumber: "CASE-552",
        status: "Pending",
        total: 22900,
        Items: [
          {
            date: "2024-05-10",
            description: "Site visit and client interview",
            hours: 3,
            rate: 2100,
            amount: 6300,
          },
          {
            date: "2024-05-11",
            description: "Drafting settlement proposal",
            hours: 4,
            rate: 2100,
            amount: 8400,
          },
          {
            date: "2024-05-12",
            description: "Negotiation with opposing counsel",
            hours: 2,
            rate: 2100,
            amount: 4200,
          },
          {
            date: "2024-05-13",
            description: "Final revisions & documentation",
            hours: 1,
            rate: 2100,
            amount: 2100,
          },
          {
            date: "2024-05-14",
            description: "Case closure administration",
            hours: 1,
            rate: 1900,
            amount: 1900,
          },
        ],
      },
    ];

    
      const [searchQuery, setSearchQuery] = useState("");
      const [statusFilter, setStatusFilter] = useState<string>("all");
    
      // Compute filtered + sorted cases
      const filteredInvoices = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
    
        const matchesSearch = (c: (typeof Invoices)[number]) => {
          if (!q) return true;  
          return (
            c.caseNumber.toLowerCase().includes(q) ||
            c.invoiceNumber.toLowerCase().includes(q) ||
            c.status.toLowerCase().includes(q) ||
            c.Items.toString().toLowerCase().includes(q) ||
            c.clientName.toLowerCase().includes(q) ||
            c.total.toString().toLowerCase().includes(q)    
          );
        };
    
        const matchesStatus = (c: (typeof Invoices)[number]) => {
          if (statusFilter === "all") return true;
          return c.status.toLowerCase() === statusFilter.toLowerCase();
        };
    
        const compare = (
          a: (typeof Invoices)[number],
          b: (typeof Invoices)[number],
          key: keyof (typeof Invoices)[number],
          desc: boolean
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
        const filtered = Invoices.filter(
          (c) => matchesSearch(c) && matchesStatus(c)
        );
    
        // apply primary sort by `sortBy` with direction `sortDesc` and then
        // fall back to the other columns in a fixed order for stable results.
        filtered.sort((a, b) => {
          const res = compare(a, b, sortBy, sortDesc);
          if (res !== 0) return res;
          const order: (keyof (typeof Invoices)[number])[] = [
            "caseNumber",
            "invoiceNumber",
            "status",
            "clientName",
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
      }, [searchQuery, statusFilter, sortBy, sortDesc]);

    
    const returnModal = () => {
      if (!showModal) return null;
      return (
        <Modal
          setShowModal={setShowModal}
          handleShowModal={handleShowModal}
          title="New Invoice Item"
          inputItems={inputItems}
          buttonCaption="Add Item"
          buttonOnClick={handleButtonClick}
        />
      );
    };

    const handleShowModal = (show: boolean) => {
      setShowModal(show);
    };

    const handleButtonClick = () => {
      // Logic to add the new court case goes here
      // For now, we'll just close the modal
      //setShowModal(false);
    };

    const handleSort = (
      col: "invoiceNumber" | "clientName" | "total" | "status"
    ) => {
      if (sortBy === col) {
        setSortDesc((s) => !s);
      } else {
        setSortBy(col);
        setSortDesc(true);
      }
    };



    return (
      <>
        <Header showButton={true} title="Invoice Management" buttonCaption="Add New Invoice" handleShowModal={handleShowModal}/>
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
                onClick={() => handleSort("clientName")}
              >
                {sortBy === "clientName" ? (
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
        {filteredInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.invoiceNumber}
            invoices={invoice}
            openModal={handleShowModal}
          />
        ))}
        {returnModal()}
      </>
    );
}

export default InvoicePage;