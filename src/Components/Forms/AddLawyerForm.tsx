import { useState, type SetStateAction } from "react";
import {
  LawyerService,
  type AddLawyerRequest,
  type LawyerResponse,
} from "../../api";
import { LawyerSpecialityOptions } from "../../Models/InputOptions/LawyerSpecialityOptions";
import PrimaryButton from "../Buttons/PrimaryButton";
import PillInput from "../Inputs/PillInput";
import PillSelect from "../Inputs/PillSelect";

interface AddLawyerFormProps {
  setShowSuccessMessage: (message: string) => void;
  setShowErrorMessage: (message: string) => void;
  setShowModal: (show: boolean) => void;
  setLawyers?: (lawyers: SetStateAction<LawyerResponse[]>) => void;
  selectedLawyer?: LawyerResponse;
}

const AddLawyerForm = ({
  setShowSuccessMessage,
  setShowErrorMessage,
  setShowModal,
  setLawyers,
  selectedLawyer,
}: AddLawyerFormProps) => {
  const [formData, setFormData] = useState<AddLawyerRequest>({
    email: selectedLawyer?.email || "",
    name: selectedLawyer?.name || "",
    mobileNumber: selectedLawyer?.mobileNumber || "",
    surname: selectedLawyer?.surname || "",
    specialty: selectedLawyer?.speciality || 0,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLawyer) {
      LawyerService.updateLawyers(selectedLawyer.id, formData)
        .then(() => {
          setShowSuccessMessage("Lawyer updated successfully!");
          if (setLawyers)
            setLawyers((prev) => {
              return [
                ...prev,
                {
                  id: selectedLawyer.id,
                  email: formData.email,
                  name: formData.name,
                  mobileNumber: formData.mobileNumber,
                  surname: formData.surname,
                  speciality: formData.specialty,
                  totalCases: selectedLawyer.totalCases,
                },
              ];
            });
          setShowModal(false);
        })
        .catch(() => {
          setShowErrorMessage("Failed to update lawyer. Please try again.");
        });
    } else {
      LawyerService.createLawyers(formData)
        .then((response) => {
          setShowSuccessMessage("Lawyer created successfully!");
          if (setLawyers)
            setLawyers((prev) => {
              return [
                ...prev,
                {
                  id: response,
                  email: formData.email,
                  name: formData.name,
                  mobileNumber: formData.mobileNumber,
                  surname: formData.surname,
                  speciality: formData.specialty,
                  totalCases: 0,
                },
              ];
            });
          setShowModal(false);
        })
        .catch(() => {
          setShowErrorMessage("Failed to lawyer. Please try again.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PillInput
        label="Name:"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <PillInput
        label="Surname:"
        name="surname"
        value={formData.surname}
        onChange={(e) => handleChange("surname", e.target.value)}
      />

      <PillInput
        label="Email:"
        name="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <PillInput
        label="Mobile Number:"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={(e) => handleChange("mobileNumber", e.target.value)}
      />

      <PillSelect
        label="Specialty:"
        name="specialty"
        selectOptions={LawyerSpecialityOptions}
        value={formData.specialty ?? ""}
        onChange={(e) => handleChange("specialty", parseInt(e.target.value))}
      />

      <div className="mt-5">
        <PrimaryButton type="submit">Add Lawyer</PrimaryButton>
      </div>
    </form>
  );
};

export default AddLawyerForm;
