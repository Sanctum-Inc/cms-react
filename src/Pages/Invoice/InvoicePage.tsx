import { useEffect, useMemo, useState } from "react";
import {
  type AddInvoiceItemRequest,
  InvoiceService,
  type InvoiceStatus,
  type UpdateInvoiceRequest,
} from "../../api";
import ErrorAlert from "../../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../../Components/Feedback/Alerts/SuccessAlert";
import AddInvoiceForm from "../../Components/Forms/AddInvoiceForm";
import AddInvoiceItemForm from "../../Components/Forms/AddInvoiceItemForm";
import Header from "../../Components/Header/Header";
import SortBar from "../../Components/Inputs/SortBar";
import SideModal from "../../Components/Modal/SideModal";
import InvoiceTable from "../../Components/Tables/InvoiceTable";
import { InvoiceStatusOptions } from "../../Models/InputOptions/InvoiceStatusOptions";
import type { Invoice } from "../../Models/Invoices";

const InvoicePage = () => {
  const [sortBy, setSortBy] = useState<
    "invoiceNumber" | "total" | "status" | "caseNumber"
  >("invoiceNumber");
  const [sortDesc, setSortDesc] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdatemodal, setShowUpdateModal] = useState(false);
  const [showUpdateInvoiceModal, setShowUpdateInvoiceModal] = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([]);

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

  const [updateInvoiceRequest, setUpdateInvoiceRequest] =
    useState<UpdateInvoiceRequest>({} as UpdateInvoiceRequest);

  const returnSideModal = () => {
    if (showAddModal)
      return (
        <SideModal setShowModal={setShowAddModal} title="New Invoice Item">
          <AddInvoiceItemForm
            addInvoiceItemRequest={addInvoiceItemRequest}
            setInvoice={setInvoices}
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            buttonCaption="Update"
            setShowModal={setShowUpdateInvoiceModal}
          ></AddInvoiceItemForm>
        </SideModal>
      );
    else if (showUpdatemodal)
      return (
        <SideModal
          setShowModal={setShowUpdateModal}
          title="Update Invoice Item"
        >
          <AddInvoiceItemForm
            addInvoiceItemRequest={addInvoiceItemRequest}
            setInvoice={setInvoices}
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            buttonCaption="Update"
            setShowModal={setShowUpdateModal}
          />
        </SideModal>
      );
    else if (showUpdateInvoiceModal) {
      return (
        <SideModal
          setShowModal={setShowUpdateInvoiceModal}
          title="Update Invoice"
        >
          <AddInvoiceForm
            updateInvoiceRequest={updateInvoiceRequest}
            setInvoice={setInvoices}
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            buttonCaption="Update"
            setShowModal={setShowAddModal}
          />
        </SideModal>
      );
    }
  };

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

  const handleShowUpdateInvoiceModal = (invoices: Invoice) => {
    console.log(invoices);
    setUpdateInvoiceRequest({
      id: invoices.id,
      status: invoices.status,
      accountName: invoices.accountName,
      accountNumber: invoices.accountNumber,
      bank: invoices.bank,
      branchCode: invoices.branchCode,
      caseName: invoices.caseNumber,
      clientName: invoices.clientName,
      invoiceDate: invoices.dateCreated,
      invoiceNumber: invoices.invoiceNumber,
      reference: invoices.refference,
    });
    setShowUpdateInvoiceModal(true);
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
          refference: invoice.reference,
          defendant: invoice.defendant,
          accountName: invoice.accountName,
          bank: invoice.bank,
          branchCode: invoice.branchCode,
          accountNumber: invoice.accountNumber,
          dateCreated: invoice.invoiceDate.split("T")[0],
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

  useEffect(() => {
    if (!successAlertMessage) return;
    const timer = setTimeout(() => setSuccessAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [successAlertMessage]);

  useEffect(() => {
    if (!errorAlertMessage) return;
    const timer = setTimeout(() => setErrorAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [errorAlertMessage]);

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
        statusOptions={[
          "All",
          ...InvoiceStatusOptions.map((option) => option.value),
        ]}
      ></SortBar>
      <InvoiceTable
        sortBy={sortBy}
        sortDesc={sortDesc}
        invoices={filteredInvoices}
        setInvoices={setInvoices}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        setSuccessAlertMessage={setSuccessAlertMessage}
        setErrorAlertMessage={setErrorAlertMessage}
        setAddInvoiceItemRequest={setAddInvoiceItemRequest}
        setShowAddModal={setShowAddModal}
        handleShowUpdateModal={handleShowUpdateModal}
        setSortBy={setSortBy}
        setSortDesc={setSortDesc}
        handleShowUpdateInvoiceModal={handleShowUpdateInvoiceModal}
      />
      {returnSideModal()}
      {renderSuccessmessage()}
      {renderErrorMessage()}
    </>
  );
};

export default InvoicePage;
