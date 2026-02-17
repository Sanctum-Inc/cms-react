import {
  BanknoteArrowUp,
  Briefcase,
  Calendar,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  CircleX,
  File,
  FileText,
  MapPin,
  User,
  Users,
  type LucideProps,
} from "lucide-react";
import {
  useEffect,
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { useLocation } from "react-router-dom";
import { CourtCaseService } from "../api";
import Card from "../Components/Cards/Card";
import CaseSummaryCard from "../Components/Cards/CaseSummaryCard";
import KeyPartiesCard from "../Components/Cards/KeyPartiesCard";
import ErrorAlert from "../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../Components/Feedback/Alerts/SuccessAlert";
import AddDateForm from "../Components/Forms/AddDateForm";
import AddDocumentForm from "../Components/Forms/AddDocumentForm";
import AddInvoiceForm from "../Components/Forms/AddInvoiceForm";
import AddLawyerForm from "../Components/Forms/AddLawyerForm";
import Header from "../Components/Header/Header";
import { CourtCaseDateTypeOptions } from "../Components/Inputs/InputOptions/CourtCaseDateTypeOptions";
import { CourtCaseOutcomeOptions } from "../Components/Inputs/InputOptions/CourtCaseOutcomeOptions";
import { InvoiceStatusOptions } from "../Components/Inputs/InputOptions/InvoiceStatusOptions";
import PillSelect from "../Components/Inputs/PillSelect";
import NewItemModal from "../Components/Modal/NewItemModal";
import TabNavigation from "../Components/Navigation/TabNavigation";
import CourtCaseInformationTable from "../Components/Tables/CourtCaseInformationTable";
import type { KeyParties } from "../Models/KeyParties";
import { formatFormalDateTime } from "../Utils/FormatDateTime";

interface CaseField {
  label: string;
  name: string;
  value: string | number | Date;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  type?: string;
  color?: string;
}

export interface Items {
  attributes1: string;
  attributes2: string;
  attributes3: string;
}

export interface ProfileMenu {
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  headers: Items;
  items?: Items[];
  color: string;
}

const CourtCaseInformationPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const caseId = query.get("id");

  const [selectedMenu, setSelectedMenu] = useState("Dates");
  const [showModal, setShowModal] = useState(false);

  const [caseSummary, setCaseSummary] = useState<CaseField[]>([]);
  const [keyParties, setKeyParties] = useState<KeyParties[]>([]);
  const [caseAttachements, setCaseAttachments] = useState<ProfileMenu[]>([]);

  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );

  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );

  const modalCreateOptions = [
    {
      key: "date",
      value: "Add Date",
    },
    {
      key: "document",
      value: "Add Document",
    },
    { key: "invoice", value: "Add Invoice" },
    { key: "lawyer", value: "Add Lawyer" },
  ];

  const [selectedCreateOption, setSelectedCreateOption] = useState("");

  useEffect(() => {
    if (!caseId) return;

    CourtCaseService.getCourtCaseInformation(caseId)
      .then((response) => {
        // Build new state objects directly from response
        setCaseSummary([
          {
            label: "Case Number",
            name: "caseNumber",
            value: response.caseNumber,
            icon: FileText,
            type: "text",
          },
          {
            label: "Location",
            name: "location",
            value: response.location,
            icon: MapPin,
            type: "text",
          },
          {
            label: "Case Type",
            name: "caseType",
            value:
              CourtCaseDateTypeOptions.find(
                (o) => o.key === response.caseType.toString(),
              )?.value || "Unknown",
            icon: Briefcase,
            type: "text",
          },
          {
            label: "Outcome",
            name: "outcome",
            value:
              CourtCaseOutcomeOptions.find(
                (o) => o.key === response.caseOutcomes.toString(),
              )?.value || "Unknown",
            icon: CheckCircle2,
            type: "text",
          },
          {
            label: "Created At",
            name: "createdAt",
            value: formatFormalDateTime(response.createdAt),
            icon: CalendarPlus,
            type: "date",
          },
          {
            label: "Last Modified",
            name: "lastModified",
            value: formatFormalDateTime(response.lastModified),
            icon: CalendarClock,
            type: "date",
          },
        ]);

        setKeyParties([
          {
            label: "Plaintiff",
            name: "plaintiff",
            value: response.plaintiff,
            icon: User,
            type: "text",
            color: "green",
          },
          {
            label: "Defendant",
            name: "defendant",
            value: response.defendant,
            icon: CircleX,
            type: "text",
            color: "red",
          },
        ]);

        setCaseAttachments([
          {
            label: "Dates",
            icon: Calendar,
            color: "blue",
            headers: {
              attributes1: "Date",
              attributes2: "Event Type",
              attributes3: "Description",
            },
            items: response.dates?.map((courtCaseDate) => ({
              attributes1: formatFormalDateTime(courtCaseDate.date),
              attributes2:
                CourtCaseDateTypeOptions.find(
                  (o) => o.key === courtCaseDate.dateType.toString(),
                )?.value || "Unknown",
              attributes3: courtCaseDate.description,
            })),
          },
          {
            label: "Documents",
            icon: File,
            color: "orange",
            headers: {
              attributes1: "Title",
              attributes2: "Type",
              attributes3: "Date Filed",
            },
            items: response.documents?.map((document) => ({
              attributes1: document.title,
              attributes2: document.fileType,
              attributes3: formatFormalDateTime(document.dateFiled),
            })),
          },
          {
            label: "Invoices",
            icon: BanknoteArrowUp,
            color: "green",
            headers: {
              attributes1: "Invoice Number",
              attributes2: "Amount",
              attributes3: "Status",
            },
            items: response.invoices?.map((invoice) => ({
              attributes1: invoice.invoiceNumber,
              attributes2: `R${invoice.amount.toFixed(2)}`,
              attributes3:
                InvoiceStatusOptions.find(
                  (o) => o.key === invoice.status.toString(),
                )?.value || "Unknown",
            })),
          },
          {
            label: "Lawyers",
            color: "purple",
            icon: Users,
            headers: {
              attributes1: "Name",
              attributes2: "Mobile Number",
              attributes3: "Email",
            },
            items: response.lawyers?.map((lawyer) => ({
              attributes1: lawyer.name,
              attributes2: lawyer.mobileNumber,
              attributes3: lawyer.email,
            })),
          },
        ]);
      })
      .catch(() => {
        setErrorAlertMessage("Failed to load court case information.");
      });
  }, [caseId]);

  const renderTabs = () => {
    // Placeholder for future tab rendering logic
    return caseAttachements.map((menu, index) => (
      <TabNavigation
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        menu={menu}
        index={index}
        key={`infoNav-${index}`}
        className="pt-2"
        color={menu.color}
      />
    ));
  };

  const renderTables = () => {
    const x = caseAttachements.find((menu) => {
      return menu.label === selectedMenu;
    });
    return <CourtCaseInformationTable headers={x?.headers} items={x?.items} />;
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };

  const renderModal = () => {
    // Placeholder for future modal rendering logic
    return (
      <NewItemModal setShowModal={setShowModal}>
        <PillSelect
          label="Select Item Type:"
          name="itemType"
          selectOptions={modalCreateOptions}
          value={selectedCreateOption}
          onChange={(e) => setSelectedCreateOption(e.target.value)}
        ></PillSelect>
        {renderCreateForm()}
      </NewItemModal>
    );
  };

  const renderCreateForm = () => {
    switch (selectedCreateOption) {
      case "date":
        return (
          <AddDateForm
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            setShowModal={setShowModal}
            setCaseAttachments={setCaseAttachments}
            caseId={caseId ?? undefined}
          />
        );
      case "document":
        return (
          <AddDocumentForm
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            setShowModal={setShowModal}
            setCaseAttachments={setCaseAttachments}
            caseId={caseId ?? undefined}
          />
        );
      case "invoice":
        return (
          <AddInvoiceForm
            setShowSuccessMessage={setSuccessAlertMessage}
            setShowErrorMessage={setErrorAlertMessage}
            setShowModal={setShowModal}
            buttonCaption="Add Invoice"
          />
        );
      case "lawyer":
        return (
          <AddLawyerForm
            setShowSuccessMessage={setSuccessAlertMessage}
            setShowErrorMessage={setErrorAlertMessage}
            setShowModal={setShowModal}
          />
        );
    }
  };

  useEffect(() => {
    if (successAlertMessage) {
      const timer = setTimeout(() => setSuccessAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successAlertMessage]);

  useEffect(() => {
    if (errorAlertMessage) {
      const timer = setTimeout(() => setErrorAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorAlertMessage]);

  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

  return (
    <>
      <Header
        title="Court Case Information"
        showButton={true}
        buttonCaption="Add New Item"
        handleShowModal={handleShowModal}
      />
      <div className="grid grid-cols-10 p-6 gap-4">
        <Card className="col-span-7">
          <CaseSummaryCard caseFields={caseSummary} />
        </Card>
        <Card className="col-span-3">
          <KeyPartiesCard keyParties={keyParties} />
        </Card>
      </div>
      <div className="px-6 py-2 h-fit">
        <Card className="h-full">
          <div className="flex bg-gray-100 py-4 px-4 rounded-t-2xl">
            {renderTabs()}
          </div>
          <div className="mt-5">{renderTables()}</div>
        </Card>
      </div>
      {showModal && renderModal()}
      {renderSuccessmessage()}
      {renderErrorMessage()}
    </>
  );
};

export default CourtCaseInformationPage;
