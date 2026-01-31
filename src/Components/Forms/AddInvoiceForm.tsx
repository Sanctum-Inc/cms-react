import { useEffect, useState } from "react";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";
import PrimaryButton from "../Buttons/PrimaryButton";
import { CourtCaseService, type AddInvoiceItemRequest } from "../../api";
import type { KeyValue } from "../../Models/InputItem";

const AddInvoiceForm = () => {
  const [formData, setFormData] = useState<AddInvoiceItemRequest>({
    caseId: "",
    invoiceId: "",
    name: "",
    date: "",
    hours: 0,
    costPerHour: 0,
  });
  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  useEffect(() => {
    // Any side effects or data fetching can be done here
    CourtCaseService.getAllCaseNumbers().then((response) => {
      console.log("Fetched court cases:", response);
      const cases = response.map((caseNumber: string) => ({
        key: caseNumber,
        value: caseNumber,
      }));
      setCaseNumbers(cases);
    })
  }, []);

  return (
    <form onSubmit={handleSubmit}>
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
        selectOptions={[]} // fill with your options if any
        value={formData.invoiceId}
        onChange={(e) => handleChange("invoiceId", e.target.value)}
      />

      <PillInput
        label="Description:"
        name="description"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange("description", e.target.value)}
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
        name="rate"
        type="number"
        placeholder="Enter hourly cost"
        value={formData.costPerHour}
        onChange={(e) => handleChange("rate", e.target.value)}
      />

      <div className="mt-5">
        <PrimaryButton type="submit">Create Invoice</PrimaryButton>
      </div>
    </form>
  );
};

export default AddInvoiceForm;
