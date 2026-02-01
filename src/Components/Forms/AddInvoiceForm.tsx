import { useEffect, useState, type SetStateAction } from "react";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";
import PrimaryButton from "../Buttons/PrimaryButton";
import {
  CourtCaseService,
  InvoiceItemService,
  InvoiceService,
  type AddInvoiceItemRequest,
  type CourtCaseNumberResponse,
  type InvoiceNumberResponse,
} from "../../api";
import type { KeyValue } from "../../Models/InputItem";
import type { Invoice } from "../../Models/Invoices";

interface AddInvoiceFormProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  setInvoice?: (invoice: SetStateAction<Invoice[]>) => void;
  invoiceId?: string;
  caseId?: string;
}

const AddInvoiceForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  setInvoice,
  invoiceId,
  caseId,
}: AddInvoiceFormProps) => {
  const [formData, setFormData] = useState<AddInvoiceItemRequest>({
    caseId: caseId || "",
    invoiceId: invoiceId || "",
    name: "",
    date: "",
    hours: 0,
    costPerHour: 0,
    clientName: "",
    refference: "",
  });
  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);
  const [invoiceNumbers, setInvoiceNumbers] = useState<KeyValue[]>([
    { key: "new", value: "Add New Invoice" },
  ]);
  const [isNewInvoice, setIsNewInvoice] = useState<boolean>(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    InvoiceItemService.createInvoiceItems(formData)
      .then(() => {
        setShowSuccessMessage("Invoice item created successfully!");

        if (setInvoice) {
          setInvoice((prevInvoices: Invoice[]) =>
            prevInvoices.map((inv) =>
              inv.id === formData.invoiceId
                ? {
                    ...inv,
                    Items: [
                      ...inv.Items,
                      {
                        id: formData.invoiceId, // ToDo: fix id assignment
                        caseId: formData.caseId,
                        invoiceId: formData.invoiceId,
                        date: new Date(formData.date),
                        hours: formData.hours,
                        rate: formData.costPerHour,
                        amount: formData.hours * formData.costPerHour,
                        description: formData.name,
                      },
                    ],
                    total: inv.total + formData.hours * formData.costPerHour,
                  }
                : inv,
            ),
          );
        }
      })
      .catch((error) => {
        console.error("Error creating invoice item:", error);
        setShowErrorMessage("Failed to create invoice item. Please try again.");
      });
  };

  useEffect(() => {
    // Any side effects or data fetching can be done here
    CourtCaseService.getAllCaseNumbers().then((response) => {
      console.log("Fetched court cases:", response);
      const cases = response.map((caseObj: CourtCaseNumberResponse) => ({
        key: caseObj.caseId,
        value: caseObj.caseNumber,
      }));

      const uniqueCases = Array.from(
        new Map(cases.map((caseItem) => [caseItem.key, caseItem])).values(),
      );

      setCaseNumbers(uniqueCases);
    });

    InvoiceService.getAllInvoiceNumbers().then((response) => {
      const invoices = response.map((inv: InvoiceNumberResponse) => ({
        key: inv.invoiceId,
        value: inv.invoiceNumber,
      }));

      setInvoiceNumbers(() => [
        { key: "new", value: "Add New Invoice" },
        ...invoices,
      ]);
    });
  }, []);

  const handleInvoiceNumberChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = e.target.value;
    if (selectedValue === "new") {
      setIsNewInvoice(true);
    } else {
      setIsNewInvoice(false);
    }

    handleChange("invoiceId", selectedValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <PillSelect
          label="Case Number:"
          name="caseId"
          selectOptions={caseNumbers}
          value={formData.caseId}
          onChange={(e) => handleChange("caseId", e.target.value)}
        />

        <PillSelect
          label="Invoice Number:"
          name="invoiceId"
          selectOptions={invoiceNumbers}
          value={formData.invoiceId}
          onChange={handleInvoiceNumberChange}
        />

        {isNewInvoice && (
          <>
            <PillInput
              label="Client Name:"
              name="clientName"
              type="text"
              value={formData.clientName ?? ""}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />

            <PillInput
              label="Reference:"
              name="refference"
              type="text"
              value={formData.refference ?? ""}
              onChange={(e) => handleChange("refference", e.target.value)}
            />
          </>
        )}

        <PillInput
          label="Description:"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <PillInput
          label="Date of Service:"
          name="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />

        <PillInput
          label="Hours:"
          name="hours"
          type="number"
          placeholder="0"
          value={formData.hours}
          onChange={(e) => handleChange("hours", e.target.value)}
        />

        <PillInput
          label="Cost Per Hour:"
          name="costPerHour"
          type="number"
          placeholder="Enter hourly cost"
          value={formData.costPerHour}
          onChange={(e) => handleChange("costPerHour", e.target.value)}
        />

        <div className="mt-5">
          <PrimaryButton type="submit">Create Invoice</PrimaryButton>
        </div>
      </div>
    </form>
  );
};

export default AddInvoiceForm;
