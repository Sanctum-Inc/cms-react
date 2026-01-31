import { useState } from "react";
import { CourtCaseService, type AddCourtCaseRequest, type InvoiceStatus } from "../../api";
import PillSelect from "../Inputs/PillSelect";
import PillInput from "../Inputs/PillInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import type { CourtCases } from "../../Models/CourtCases";
import { CourtCaseStatusOptions } from "../Inputs/InputOptions/CourtCaseStatusOptions";
import { CourtCaseTypeOptions } from "../Inputs/InputOptions/CourtCaseTypesOptions";
import { CourtCaseOutcomeOptions } from "../Inputs/InputOptions/CourtCaseOutcomeOptions";

interface AddCourtCaseFormProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  filteredCases: CourtCases[];
}

const AddCourtCaseForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  filteredCases,
}: AddCourtCaseFormProps) => {
  const [formData, setFormData] = useState<AddCourtCaseRequest>({
    caseNumber: "",
    defendant: "",
    plaintiff: "",
    location: "",
    outcome: 0,
    status: 0,
    type: 0,
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CourtCaseService.createCourtCases(formData)
      .then((response) => {
        console.log("Court case created successfully:", response);
        setShowSuccessMessage("Court case created successfully!");
        filteredCases.push({
          id: response,
          caseNumber: formData.caseNumber,
          location: formData.location,
          plaintiff: formData.plaintiff,
          type: formData.type,
          nextDate: "",
          internalStatus: formData.status as InvoiceStatus,
        });
      })
      .catch((error) => {
        console.error("Error creating court case:", error);
        setShowErrorMessage("Failed to create court case. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PillInput
        label="Case Number:"
        name="caseNumber"
        value={formData.caseNumber}
        onChange={(e) => handleChange("caseNumber", e.target.value)}
      />

      <PillInput
        label="Location:"
        name="location"
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <PillInput
        label="Plaintiff:"
        name="plaintiff"
        value={formData.plaintiff}
        onChange={(e) => handleChange("plaintiff", e.target.value)}
      />

      <PillInput
        label="Defendant:"
        name="defendant"
        value={formData.defendant}
        onChange={(e) => handleChange("defendant", e.target.value)}
      />

      <PillSelect
        label="Status:"
        name="status"
        selectOptions={CourtCaseStatusOptions}
        value={formData.status.toString() ?? ""}
        onChange={(e) => handleChange("status", e.target.value)}
      />

      <PillSelect
        label="Type:"
        name="type"
        selectOptions={CourtCaseTypeOptions}
        value={formData.type?.toString() ?? ""}
        onChange={(e) => handleChange("type", e.target.value)}
      />

      <PillSelect
        label="Outcome:"
        name="outcome"
        value={formData.outcome.toString() ?? ""}
        selectOptions={CourtCaseOutcomeOptions}
        onChange={(e) => handleChange("outcome", e.target.value)}
      />

      <div className="mt-5">
        <PrimaryButton type="submit">Create Court Case</PrimaryButton>
      </div>
    </form>
  );
};

export default AddCourtCaseForm;