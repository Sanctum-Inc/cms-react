import { useEffect, useState, type SetStateAction } from "react";
import {
  CourtCaseDateService,
  CourtCaseService,
  type AddCourtCaseDateRequest,
  type CourtCaseNumberResponse,
} from "../../api";
import type { KeyValue } from "../../Models/InputItem";
import { CourtCaseDateTypeOptions } from "../../Models/InputOptions/CourtCaseDateTypeOptions";
import type { ProfileMenu } from "../../Pages/CourtCase/CourtCaseInformationPage";
import { formatFormalDateTime } from "../../Utils/FormatDateTime";
import PrimaryButton from "../Buttons/PrimaryButton";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";
import PillTextarea from "../Inputs/PillTextarea";

interface AddFormDateProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  setShowModal: (show: boolean) => void;
  setCaseAttachments?: (invoice: SetStateAction<ProfileMenu[]>) => void;
  addCourtCaseRequest?: AddCourtCaseDateRequest;
  caseId?: string;
}

const AddDateForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  setShowModal,
  addCourtCaseRequest,
  setCaseAttachments,
  caseId,
}: AddFormDateProps) => {
  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);

  const [formData, setFormData] = useState<AddCourtCaseDateRequest>({
    caseId: addCourtCaseRequest?.caseId || caseId || "",
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

    CourtCaseDateService.createCourtCaseDates(formData)
      .then(() => {
        setShowSuccessMessage("Court case date created successfully!");
        if (setCaseAttachments)
          setCaseAttachments((prev) =>
            prev.map((section) => {
              if (section.label !== "Dates") return section;

              return {
                ...section,
                items: [
                  ...(section.items ?? []),
                  {
                    attributes1: formatFormalDateTime(formData.date),
                    attributes2:
                      CourtCaseDateTypeOptions.find(
                        (option) => option.key === formData.type.toString(),
                      )?.value || "",
                    attributes3: formData.description,
                  },
                ],
              };
            }),
          );
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
        disabled={caseId !== undefined}
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
