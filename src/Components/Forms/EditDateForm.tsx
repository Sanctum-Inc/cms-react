import { useEffect, useState } from "react";
import {
  CourtCaseDateService,
  CourtCaseService,
  type CourtCaseNumberResponse,
  type UpdateCourtCaseDateRequest,
} from "../../api";
import type { KeyValue } from "../../Models/InputItem";
import PrimaryButton from "../Buttons/PrimaryButton";
import { CourtCaseDateTypeOptions } from "../Inputs/InputOptions/CourtCaseDateTypeOptions";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";
import PillTextarea from "../Inputs/PillTextarea";

interface UpdateCourtCaseRequest extends UpdateCourtCaseDateRequest {
  id: string;
}

interface EditFormDateProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  updateCourtCaseRequest?: UpdateCourtCaseRequest;
  setShowModal: (show: boolean) => void;
}

const EditDateForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  updateCourtCaseRequest,
  setShowModal,
}: EditFormDateProps) => {
  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);

  const [formData, setFormData] = useState<UpdateCourtCaseDateRequest>({
    caseId: updateCourtCaseRequest?.caseId || "",
    date: updateCourtCaseRequest?.date || "",
    description: updateCourtCaseRequest?.description || "",
    title: updateCourtCaseRequest?.title || "",
    type: updateCourtCaseRequest?.type || 0,
    isCancelled: updateCourtCaseRequest?.isCancelled || false,
    isComplete: updateCourtCaseRequest?.isComplete || false,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    CourtCaseService.getAllCaseNumbers().then((response) => {
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

    CourtCaseDateService.updateCourtCaseDates(
      updateCourtCaseRequest?.id || "",
      formData,
    )
      .then((response) => {
        setShowSuccessMessage("Court case date created successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error creating court case date:", error);
        setShowErrorMessage(
          "Failed to create court case date. Please try again.",
        );
      });
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
        <PrimaryButton type="submit">Edit Event</PrimaryButton>
      </div>
    </form>
  );
};

export default EditDateForm;
