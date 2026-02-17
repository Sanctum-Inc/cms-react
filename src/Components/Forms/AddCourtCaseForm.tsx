import { useState } from "react";
import {
  CourtCaseService,
  type AddCourtCaseRequest,
  type CourtCaseResponse,
} from "../../api";
import PrimaryButton from "../Buttons/PrimaryButton";
import { CourtCaseOutcomeOptions } from "../Inputs/InputOptions/CourtCaseOutcomeOptions";
import { CourtCaseStatusOptions } from "../Inputs/InputOptions/CourtCaseStatusOptions";
import { CourtCaseTypeOptions } from "../Inputs/InputOptions/CourtCaseTypesOptions";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";

interface AddCourtCaseFormProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  filteredCases: CourtCaseResponse[];
  setShowModal: (show: boolean) => void;
}

const AddCourtCaseForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  filteredCases,
  setShowModal,
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

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CourtCaseService.createCourtCases(formData)
      .then((response) => {
        setShowSuccessMessage("Court case created successfully!");
        filteredCases.push({
          id: response,
          caseNumber: formData.caseNumber,
          location: formData.location,
          plaintiff: formData.plaintiff,
          type: formData.type,
          nextDate: "",
          status: formData.status,
        });
        setShowModal(false);
      })
      .catch(() => {
        setShowErrorMessage("Failed to create court case. Please try again.");
      });
  };

  return (
    <div className="relative">
      {/* Scrollable Content */}
      <div
        className="max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 transparent",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-5 px-4">
          <PillInput
            label="Case Number:"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={(e) => handleChange("caseNumber", e.target.value)}
            placeholder="Enter case number"
          />

          <PillInput
            label="Location:"
            name="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location"
          />

          <PillInput
            label="Plaintiff:"
            name="plaintiff"
            value={formData.plaintiff}
            onChange={(e) => handleChange("plaintiff", e.target.value)}
            placeholder="Enter plaintiff name"
          />

          <PillInput
            label="Defendant:"
            name="defendant"
            value={formData.defendant}
            onChange={(e) => handleChange("defendant", e.target.value)}
            placeholder="Enter defendant name"
          />

          <PillSelect
            label="Status:"
            name="status"
            selectOptions={CourtCaseStatusOptions}
            value={formData.status ?? ""}
            onChange={(e) => handleChange("status", parseInt(e.target.value))}
          />

          <PillSelect
            label="Type:"
            name="type"
            selectOptions={CourtCaseTypeOptions}
            value={formData.type ?? ""}
            onChange={(e) => handleChange("type", parseInt(e.target.value))}
          />

          <PillSelect
            label="Outcome:"
            name="outcome"
            value={formData.outcome ?? ""}
            selectOptions={CourtCaseOutcomeOptions}
            onChange={(e) => handleChange("outcome", parseInt(e.target.value))}
          />
        </form>
      </div>

      {/* Sticky Button with Gradient Fade */}
      <div className="px-4 mt-4">
        <PrimaryButton type="submit" onClick={handleSubmit}>
          Create Court Case
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddCourtCaseForm;
