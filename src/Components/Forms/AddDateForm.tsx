import { useEffect, useState } from "react";
import {
    CourtCaseDateService,
  CourtCaseService,
  type AddCourtCaseDateRequest,
  type CourtCaseNumberResponse,
} from "../../api";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";
import type { KeyValue } from "../../Models/InputItem";
import PillTextarea from "../Inputs/PillTextarea";
import { CourtCaseDateTypeOptions } from "../Inputs/InputOptions/CourtCaseDateTypeOptions";
import PrimaryButton from "../Buttons/PrimaryButton";

interface AddFormDateProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  addCourtCaseRequest?: AddCourtCaseDateRequest;
}

const AddDateForm = ({ setShowSuccessMessage, setShowErrorMessage, addCourtCaseRequest }: AddFormDateProps) => {
  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);

  const [formData, setFormData] = useState<AddCourtCaseDateRequest>({
    caseId: addCourtCaseRequest?.caseId || "",
    date: addCourtCaseRequest?.date || "",
    description: addCourtCaseRequest?.description || "",
    title: addCourtCaseRequest?.title || "",
    type: addCourtCaseRequest?.type || 0,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit form:", formData);

    CourtCaseDateService.createCourtCaseDates(formData)
      .then((response) => {
        console.log("Court case date created successfully:", response);
        setShowSuccessMessage("Court case date created successfully!");
      })
      .catch((error) => {
        console.error("Error creating court case date:", error);
        setShowErrorMessage("Failed to create court case date. Please try again.");
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <PillSelect
        label="Case Number:"
        name="caseId"
        selectOptions={caseNumbers}
        value={formData.caseId}
        onChange={(e) => handleChange("caseId", e.target.value)}
      />

      <PillInput
        label="Date of Event:"
        name="date"
        type="date"
        value={formData.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />

      <PillInput
        label="Title:"
        name="title"
        type="text"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <PillTextarea
        label="Description:"
        name="description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <PillSelect
        label="Type:"
        name="type"
        value={formData.type}
        onChange={(e) => handleChange("type", parseInt(e.target.value))}
        selectOptions={CourtCaseDateTypeOptions}
      />

      <div className="mt-5">
        <PrimaryButton type="submit">Create Event</PrimaryButton>
      </div>
    </form>
  );
};

export default AddDateForm;
