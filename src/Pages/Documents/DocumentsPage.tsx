import { useEffect, useState } from "react";
import { DocumentService, type DocumentResponse } from "../../api";
import ErrorAlert from "../../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../../Components/Feedback/Alerts/SuccessAlert";
import AddDocumentForm from "../../Components/Forms/AddDocumentForm";
import Header from "../../Components/Header/Header";
import SortBar from "../../Components/Inputs/SortBar";
import SideModal from "../../Components/Modal/SideModal";
import DocumentFolderCard from "./DocumentFolderCard";

const DocumentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);

  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    DocumentService.getAllDocument()
      .then((response) => {
        setDocuments(response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
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

  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

  const renderModal = () => {
    if (!showModal) return null;
    return (
      <SideModal setShowModal={setShowModal} title="New Court Case">
        <div className="flex h-full min-h-0 w-full flex-col gap-4 overflow-y-auto p-4">
          <AddDocumentForm
            setShowModal={setShowModal}
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
          />
        </div>
      </SideModal>
    );
  };

  return (
    <>
      <Header
        title="Document Management"
        showButton={true}
        buttonCaption="Add New Document"
        key={1}
        handleShowModal={handleShowModal}
      />
      <SortBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {documents.map((documents, index) => (
        <DocumentFolderCard
          key={index}
          caseNumber={documents.caseNumber}
          client={documents.client}
          folders={documents.folders}
        />
      ))}
      {renderModal()}
      {renderSuccessmessage()}
      {renderErrorMessage()}
    </>
  );
};

export default DocumentsPage;
