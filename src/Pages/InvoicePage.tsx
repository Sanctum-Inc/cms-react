import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Modal from "../Components/Modal/Modal";
import type { InputItem, KeyValue } from "../Models/InputItem";
import SortBar from "../Components/Inputs/SortBar";
import InvoiceCard from "../Components/Cards/InvoiceCard";
import Header from "../Components/Header/Header";
import {
  CourtCaseService,
  InvoiceItemService,
  InvoiceService,
  type InvoiceStatus,
} from "../api";
import { statusLabels, type Invoice, type InvoiceItemEntry } from "../Models/Invoices";
import SuccessAlert from "../Components/Alerts/SuccessAlert";
import ErrorAlert from "../Components/Alerts/ErrorAlert";

const InvoicePage = () => {
  const [sortBy, setSortBy] = useState<
    "invoiceNumber" | "total" | "status" | "caseNumber"
  >("invoiceNumber");
  const [sortDesc, setSortDesc] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdatemodal, setShowUpdateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState<InvoiceItemEntry>({
    caseId: "",
    rate: 0,
    hours: 0,
    invoiceId: "",
    description: "",
    amount: 0,
    date: new Date(),
    id: ""
  });

  const [inputItems, setInputItems] = useState<InputItem[]>([
    {
      label: "Case Number:",
      name: "caseId",
      type: "text",
      placeholder: "Enter case number",
      value: "",
      inputType: "select",
      selectOptions: [],
    },
    {
      label: "Invoice Number:",
      name: "invoiceId",
      type: "text",
      value: "",
      inputType: "select",
      selectOptions: [],
    },
    {
      label: "Description:",
      name: "description",
      type: "text",
      value: "",
      inputType: "input",
    },
    {
      label: "Date of Service:",
      name: "date",
      type: "date",
      placeholder: "",
      value: "",
      inputType: "input",
    },
    {
      label: "Hours:",
      name: "hours",
      type: "number",
      placeholder: "0",
      value: "",
      inputType: "input",
    },
    {
      label: "Cost Per Hour:",
      name: "rate",
      type: "number",
      placeholder: "Enter hourly cost",
      value: "",
      inputType: "input",
    },
  ]);

  const [invoices, setInvoice] = useState<Invoice[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null
  );

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
    const filtered = invoices.filter(
      (c) => matchesSearch(c) && matchesStatus(c)
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

  const handleChange = (name: string, value: string) => {
    setInputItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, value } : i))
    );

    setNewInvoice((prev) => ({
      ...prev,
      [name]:
        name === "hours" || name === "costPerHour" || name === "rate"
          ? Number(value)
          : value,
    }));
  };


  const returnModal = () => {
    if (showAddModal)
      return (
        <Modal
          setShowModal={setShowAddModal}
          handleShowModal={() => handleShowAddModal(true, "", "")}
          title="New Invoice Item"
          inputItems={inputItems}
          buttonCaption="Add Item"
          buttonOnClick={handleAddButtonClick}
          values={{
            caseId: String(newInvoice.caseId ?? ""),
            invoiceId: String(newInvoice.invoiceId ?? ""),
            description: String(newInvoice.description ?? ""),
            date: newInvoice.date ? new Date(newInvoice.date).toISOString().split("T")[0] : "",
            hours: String(newInvoice.hours ?? ""),
            rate: String(newInvoice.rate ?? "")
          }}
          handleChange={handleChange}
        />
      );
    else if (showUpdatemodal)
      return (
        <Modal
          setShowModal={setShowUpdateModal}
          handleShowModal={() =>
            handleShowUpdateModal({} as InvoiceItemEntry, "", "")
          }
          title="Update Invoice Item"
          inputItems={inputItems}
          buttonCaption="Update Item"
          buttonOnClick={handleUpdateButtonClick}
          values={{
            caseId: String(newInvoice.caseId ?? ""),
            invoiceId: String(newInvoice.invoiceId ?? ""),
            description: String(newInvoice.description ?? ""),
            date: newInvoice.date ? new Date(newInvoice.date).toISOString().split("T")[0] : "",
            hours: String(newInvoice.hours ?? ""),
            rate: String(newInvoice.rate ?? "")
          }}
          handleChange={handleChange}
        />
      );
  };

  const handleShowUpdateModal = (
    invoice: InvoiceItemEntry,
    invoiceId: string,
    caseId: string
  ) => {
    setNewInvoice({
      caseId: caseId,
      rate: invoice.rate,
      hours: invoice.hours,
      invoiceId: invoiceId,
      description: invoice.description,
      date: invoice.date,
      amount: invoice.amount,
      id: invoice.id,
    });

    setInputItems((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        // whatever you want to change
        value: caseId,
      };
      updated[1] = {
        ...updated[1],
        value: invoiceId,
      };
      updated[2] = {
        ...updated[2],
        value: invoice.description,
      };
      updated[3] = {
        ...updated[3],
        value: invoice.date.toISOString().split("T")[0],
      };
      updated[4] = {
        ...updated[4],
        value: invoice.hours.toString(),
      };
      updated[5] = {
        ...updated[5],
        value: invoice.rate.toString(),
      };
      return updated;
    });

    setShowUpdateModal(true);
  };

  const handleShowAddModal = (
    show: boolean,
    caseId: string,
    invoiceId: string
  ) => {
    setNewInvoice({
      caseId: caseId,
      rate: 0,
      hours: 0,
      invoiceId: invoiceId,
      description: "",
      amount: 0,
      date: new Date(),
    id: ""
    });

    setInputItems((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        // whatever you want to change
        value: caseId,
      };
      updated[1] = {
        ...updated[1],
        value: invoiceId,
      };
      updated[1] = {
        ...updated[1],
        value: invoiceId,
      };
      return updated;
    });

    setShowAddModal(show);
    console.log(inputItems);
    console.log(newInvoice);
  };

  const handleAddButtonClick = () => {
    // Logic to add the new court case goes here
    // For now, we'll just close the modal
    //setShowModal(false);
    console.log(newInvoice);
    InvoiceItemService.createInvoiceItems({
      caseId: newInvoice.caseId,
      hours: newInvoice.hours,
      costPerHour: newInvoice.rate,
      name: newInvoice.description,
      invoiceId: newInvoice.invoiceId,
    })
      .then((response) => {
        console.log("Court case added" + response);
        setShowAddModal(false);
        setSuccessAlertMessage("Invoice item added successfully.");

        setInvoice((prev) =>
          prev.map((inv) =>
            inv.id === newInvoice.invoiceId
              ? {
                  ...inv,
                  Items: [
                    ...inv.Items,
                    {
                      caseId: newInvoice.caseId,
                      invoiceId: newInvoice.invoiceId,
                      date: newInvoice.date,
                      hours: newInvoice.hours,
                      rate: newInvoice.rate,
                      amount: newInvoice.hours * newInvoice.rate,
                      description: newInvoice.description,
                      id: newInvoice.id
                    },
                  ],
                  total: inv.total + newInvoice.hours * newInvoice.rate,
                }
              : inv
          )
        );
      })
      .catch(() => {
        setErrorAlertMessage(
          "There was an error processing your request, please try again later."
        );
      });
  };

  const handleUpdateButtonClick = () => {
    console.log(newInvoice);

    InvoiceItemService.updateInvoiceItems(newInvoice.id, {
      caseId: newInvoice.caseId,
      hours: newInvoice.hours,
      costPerHour: newInvoice.rate,
      name: newInvoice.description,
      invoiceId: newInvoice.invoiceId,
    })
      .then((response) => {
        console.log("Court case updated" + response);
        setShowUpdateModal(false); // <-- FIXED

        setSuccessAlertMessage("Invoice item updated successfully.");

        setInvoice((prev) =>
          prev.map((inv) =>
            inv.id === newInvoice.invoiceId
              ? {
                  ...inv,
                  Items: inv.Items.map((item) =>
                    item.id === newInvoice.id
                      ? {
                          ...item,
                          caseId: newInvoice.caseId,
                          invoiceId: newInvoice.invoiceId,
                          date: newInvoice.date,
                          hours: newInvoice.hours,
                          rate: newInvoice.rate,
                          amount: newInvoice.hours * newInvoice.rate,
                          description: newInvoice.description,
                        }
                      : item
                  ),
                  total: inv.Items.reduce((sum, item) => {
                    const updatedAmount =
                      item.id === newInvoice.id
                        ? newInvoice.hours * newInvoice.rate
                        : item.amount;

                    return sum + updatedAmount;
                  }, 0),
                }
              : inv
          )
        );
      })
      .catch(() => {
        setErrorAlertMessage(
          "There was an error processing your request, please try again later."
        );
      });
  };

  const handleSort = (
    col: "invoiceNumber" | "caseNumber" | "total" | "status"
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
        console.log(response);
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
            rate: item.costPerHour,
            caseId: invoice.caseId,
            invoiceId: invoice.id,
            id: item.id
          })),
        }));

        const options: KeyValue[] = [];
        response.forEach((invoice) => {
          options.push({
            key: invoice.id,
            value: invoice.invoiceNumber,
          });
        });

        setInputItems((prev) => {
          const updated = [...prev];
          updated[1] = {
            ...updated[1],
            // whatever you want to change
            selectOptions: options,
          };
          return updated;
        });

        setInvoice(mapped);
      })
      .catch((error) => console.log(error));

    CourtCaseService.getAllCourtCases()
      .then((response) => {
        const options: KeyValue[] = [];
        response.forEach((courtCase) => {
          options.push({
            key: courtCase.id,
            value: courtCase.caseNumber,
          });
        });

        setInputItems((prev) => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            // whatever you want to change
            selectOptions: options,
          };
          return updated;
        });
      })
      .catch((error) => console.log(error));
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
          openUpdateModal={(x) =>
            handleShowUpdateModal(x, invoice.id, invoice.caseId)
          }
        />
      ))}
      {returnModal()}
      {renderSuccessmessage()}
      {renderErrorMessage()}
    </>
  );
};

export default InvoicePage;
