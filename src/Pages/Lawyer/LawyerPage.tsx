import { useEffect, useMemo, useState } from "react";
import { type LawyerResponse, LawyerService } from "../../api";
import ErrorAlert from "../../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../../Components/Feedback/Alerts/SuccessAlert";
import AddLawyerForm from "../../Components/Forms/AddLawyerForm";
import Header from "../../Components/Header/Header";
import SortBar from "../../Components/Inputs/SortBar";
import DeleteModal from "../../Components/Modal/DeleteModal";
import InformationModal from "../../Components/Modal/InformationModal";
import SideModal from "../../Components/Modal/SideModal";
import SuccessModal from "../../Components/Modal/SuccessModal";
import { LawyerSpecialityOptions } from "../../Models/InputOptions/LawyerSpecialityOptions";
import LawyerCard from "./LawyerCard";

const LawyerPage = () => {
  const [lawyers, setLawyers] = useState<LawyerResponse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCasesModal, setShowCasesModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sortBy] = useState<
    "id" | "email" | "mobileNumber" | "name" | "surname" | "speciality"
  >("email");

  const [sortDesc] = useState(false); // earliest first by default
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );
  const [selectedLawyer, setSelectedLawyer] = useState<
    LawyerResponse | undefined
  >(undefined);

  // Compute filtered + sorted cases
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch = (c: LawyerResponse) => {
      if (!q) return true;
      return (
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.mobileNumber.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.surname.toLowerCase().includes(q) ||
        LawyerSpecialityOptions.find((o) => o.key === String(c.speciality))
          ?.value.toLowerCase()
          .includes(q)
      );
    };

    const matchesStatus = (c: LawyerResponse) => {
      if (statusFilter === "all") return true;
      return (
        LawyerSpecialityOptions.find(
          (o) => o.key === String(c.speciality),
        )?.value.toLowerCase() === statusFilter.toLowerCase()
      );
    };

    const filtered = lawyers?.filter(
      (c) => matchesSearch(c) && matchesStatus(c),
    );

    return filtered;
  }, [searchQuery, statusFilter, sortBy, sortDesc, lawyers]);

  useEffect(() => {
    LawyerService.getAllLawyers()
      .then(setLawyers)
      .catch(() => {
        setErrorAlertMessage("Failed to fetch lawyers. Please try again.");
      });
  }, []);

  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

  useEffect(() => {
    if (!successAlertMessage) return;
    const timer = setTimeout(() => setSuccessAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [successAlertMessage]);

  useEffect(() => {
    if (!errorAlertMessage) return;
    const timer = setTimeout(() => setErrorAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [errorAlertMessage]);

  const renderSideModal = () => {
    if (!showModal) return null;
    return (
      <SideModal setShowModal={setShowModal} title="New Lawyer">
        <AddLawyerForm
          setShowSuccessMessage={setSuccessAlertMessage}
          setShowErrorMessage={setErrorAlertMessage}
          setShowModal={setShowModal}
          setLawyers={setLawyers}
          selectedLawyer={selectedLawyer}
        />
      </SideModal>
    );
  };

  const renderModal = () => {
    if (!showDeleteModal) return null;
    return (
      <DeleteModal
        setShowModal={(show) => {
          setShowDeleteModal(show);
          setShowSuccessModal(true);
        }}
        title="Delete lawyer"
      />
    );
  };

  const renderSuccessModal = () => {
    if (!showSuccessModal) return null;
    return (
      <SuccessModal
        title="Lawyer deleted"
        subititle="Lawyer has been deleted successfully."
        setShowModal={setShowSuccessModal}
        buttonText="Wonderful!"
      />
    );
  };

  const renderCaseModal = () => {
    if (!showCasesModal) return null;
    return (
      <InformationModal
        setShowModal={setShowCasesModal}
        title="Delete lawyer"
      />
    );
  };

  const handleSetShowModal = (show: boolean, lawyer: LawyerResponse) => {
    setSelectedLawyer(lawyer);
    setShowModal(show);
  };

  return (
    <div className="mb-10">
      <Header
        title="Lawyers"
        buttonCaption="Add Lawyer"
        showButton
        handleShowModal={() => {
          setSelectedLawyer(undefined);
          setShowModal(true);
        }}
      />
      <SortBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statusOptions={[
          "all",
          ...LawyerSpecialityOptions.map((speciality) => speciality.value),
        ]}
      />
      <div>
        <div className="grid grid-cols-3 gap-4 mx-5">
          {filteredItems.map((lawyer) => (
            <LawyerCard
              key={`lawyer-card-${lawyer.id}`}
              lawyer={lawyer}
              setShowModal={(show, lawyer) => handleSetShowModal(show, lawyer)}
              setShowDeleteModal={setShowDeleteModal}
              setShowCasesModal={setShowCasesModal}
            />
          ))}
        </div>
      </div>
      {renderSuccessmessage()}
      {renderErrorMessage()}
      {renderSideModal()}
      {renderModal()}
      {renderSuccessModal()}
      {renderCaseModal()}
    </div>
  );
};

export default LawyerPage;
