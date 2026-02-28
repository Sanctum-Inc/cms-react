import { useEffect, useState, type SetStateAction } from "react";
import {
  CourtCaseService,
  InvoiceService,
  type CourtCaseNumberResponse,
  type UpdateInvoiceRequest,
} from "../../api";
import type { KeyValue } from "../../Models/InputItem";
import { InvoiceStatusOptions } from "../../Models/InputOptions/InvoiceStatusOptions";
import type { Invoice } from "../../Models/Invoices";
import PrimaryButton from "../Buttons/PrimaryButton";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";

interface AddInvoiceFormProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  setInvoice?: (invoice: SetStateAction<Invoice[]>) => void;
  setShowModal: (show: boolean) => void;
  updateInvoiceRequest?: UpdateInvoiceRequest;
  buttonCaption: string;
}

const AddInvoiceForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  setInvoice,
  setShowModal,
  updateInvoiceRequest,
  buttonCaption,
}: AddInvoiceFormProps) => {
  const [formData, setFormData] = useState<UpdateInvoiceRequest>({
    id: updateInvoiceRequest?.id || "",
    accountName: updateInvoiceRequest?.accountName || "",
    bank: updateInvoiceRequest?.bank || "",
    branchCode: updateInvoiceRequest?.branchCode || "",
    accountNumber: updateInvoiceRequest?.accountNumber || "",
    caseName: updateInvoiceRequest?.caseName || "",
    clientName: updateInvoiceRequest?.clientName || "",
    invoiceDate: updateInvoiceRequest?.invoiceDate || "",
    invoiceNumber: updateInvoiceRequest?.invoiceNumber || "",
    reference: updateInvoiceRequest?.reference || "",
    status: updateInvoiceRequest?.status ?? 0,
  });

  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);

  const handleChange = (
    name: keyof UpdateInvoiceRequest,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Switched to InvoiceService as we are now updating an Invoice, not an Item
    InvoiceService.updateInvoices(formData.id, formData)
      .then(() => {
        setShowSuccessMessage("Invoice updated successfully!");
        // Logic for updating local state if necessary
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating invoice:", error);
        setShowErrorMessage("Failed to update invoice. Please try again.");
      });
  };

  useEffect(() => {
    CourtCaseService.getAllCaseNumbers()
      .then((response) => {
        const cases = response.map((caseObj: CourtCaseNumberResponse) => ({
          key: caseObj.caseId,
          value: caseObj.caseNumber,
        }));
        setCaseNumbers(cases);
      })
      .catch(() => {
        setShowErrorMessage("Failed to fetch case numbers.");
      });
  }, []);

  return (
    <div className="relative">
      <div
        className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 px-4"
        data-testid="addInvoiceModal-ScrollableContent"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="font-semibold text-gray-700">General Information</h3>

          <PillInput
            label="Invoice Number:"
            name="invoiceNumber"
            type="text"
            value={formData.invoiceNumber}
            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
            disabled
          />

          <PillInput
            label="Invoice Date:"
            name="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => handleChange("invoiceDate", e.target.value)}
            disabled
          />

          <PillInput
            label="Client Name:"
            name="clientName"
            type="text"
            value={formData.clientName}
            onChange={(e) => handleChange("clientName", e.target.value)}
          />

          <PillInput
            label="Reference:"
            name="reference"
            type="text"
            value={formData.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
          />

          <PillSelect
            label="Status:"
            name="status"
            selectOptions={InvoiceStatusOptions}
            value={formData.status.toString()}
            onChange={(e) => handleChange("status", Number(e.target.value))}
          />

          <hr className="my-4" />
          <h3 className="font-semibold text-gray-700">Banking Details</h3>

          <PillInput
            label="Account Name:"
            name="accountName"
            type="text"
            value={formData.accountName}
            onChange={(e) => handleChange("accountName", e.target.value)}
            disabled
          />

          <PillInput
            label="Bank:"
            name="bank"
            type="text"
            value={formData.bank}
            onChange={(e) => handleChange("bank", e.target.value)}
            disabled
          />

          <PillInput
            label="Account Number:"
            name="accountNumber"
            type="text"
            value={formData.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            disabled
          />
          <PillInput
            label="Branch Code:"
            name="branchCode"
            type="text"
            value={formData.branchCode}
            onChange={(e) => handleChange("branchCode", e.target.value)}
            disabled
          />
        </form>
      </div>

      <div className="px-4 mt-4">
        <PrimaryButton type="submit" onClick={handleSubmit}>
          {buttonCaption}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddInvoiceForm;
