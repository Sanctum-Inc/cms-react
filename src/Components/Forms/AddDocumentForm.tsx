import { useEffect, useState, type SetStateAction } from "react";
import {
  CourtCaseService,
  DocumentService,
  type CourtCaseNumberResponse,
} from "../../api";
import type { KeyValue } from "../../Models/InputItem";
import type { ProfileMenu } from "../../Pages/CourtCaseInformationPage";
import { formatFormalDateTime } from "../../Utils/FormatDateTime";
import PrimaryButton from "../Buttons/PrimaryButton";
import PillFile from "../Inputs/PillFile";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";

interface DocumentFormData {
  caseId: string;
  name: string;
  file: File | null;
}

interface AddDocumentFormProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  setShowModal: (show: boolean) => void;
  setCaseAttachments: (invoice: SetStateAction<ProfileMenu[]>) => void;
  caseId?: string;
}

const AddDocumentForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  setShowModal,
  setCaseAttachments,
  caseId,
}: AddDocumentFormProps) => {
  const [caseNumbers, setCaseNumbers] = useState<KeyValue[]>([]);

  const [formData, setFormData] = useState<DocumentFormData>({
    caseId: caseId || "",
    name: "",
    file: null,
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

    console.log(formData);
    console.log("CLicked");

    DocumentService.uploadDocument(formData)
      .then((res) => {
        console.log(res);
        setShowSuccessMessage("Document uploaded successfully!");
        setCaseAttachments((prev) =>
          prev.map((section) => {
            if (section.label !== "Documents") return section;

            return {
              ...section,
              items: [
                ...(section.items ?? []),
                {
                  attributes1: formData.name,
                  attributes2: formData.file?.type || "",
                  attributes3: formatFormalDateTime(
                    new Date().toLocaleString(),
                  ),
                },
              ],
            };
          }),
        );

        setShowModal(false);
      })
      .catch(() => {
        setShowErrorMessage("Failed to upload document. Please try again.");
      });
  };

  const handleFileChange = (files: File | null) => {
    if (!files) return;
    setFormData((prev) => ({
      ...prev,
      file: files,
    }));
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
        label="File Name:"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <PillFile
        label="Upload File:"
        name="file"
        customOnChange={(files) => handleFileChange(files)}
      />

      <div className="mt-5">
        <PrimaryButton type="submit">Add Document</PrimaryButton>
      </div>
    </form>
  );
};

export default AddDocumentForm;
