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
  Scale,
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
import ErrorAlert from "../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../Components/Feedback/Alerts/SuccessAlert";
import AddInvoiceForm from "../Components/Forms/AddInvoiceForm";
import Header from "../Components/Header/Header";
import PillSelect from "../Components/Inputs/PillSelect";
import NewItemModal from "../Components/Modal/NewItemModal";
import TabNavigation from "../Components/Navigation/TabNavigation";
import CourtCaseInformationTable from "../Components/Tables/CourtCaseInformationTable";

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
}

const CourtCaseInformation = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const caseId = query.get("id");

  const [selectedMenu, setSelectedMenu] = useState("Dates");
  const [showModal, setShowModal] = useState(false);
  const [caseFields, setCaseFields] = useState<CaseField[]>([
    {
      label: "Case ID",
      name: "caseId",
      value: "14e456s1s-egerghreh-tht-hw-gfw-f",
      icon: FileText,
      type: "text",
    },
    {
      label: "Location",
      name: "location",
      value: "Litigation",
      icon: MapPin,
      type: "text",
    },
    {
      label: "Case Type",
      name: "caseType",
      value: "Civil",
      icon: Briefcase,
      type: "text",
    },
    {
      label: "Outcome",
      name: "outcome",
      value: "Pending",
      icon: CheckCircle2,
      type: "text",
    },
    {
      label: "Created At",
      name: "createdAt",
      value: new Date(),
      icon: CalendarPlus,
      type: "date",
    },
    {
      label: "Last Modified",
      name: "lastModified",
      value: new Date(),
      icon: CalendarClock,
      type: "date",
    },
  ]);

  const [keyParties, setKeyParties] = useState([
    {
      label: "Plaintiff",
      name: "plaintiff",
      value: "Acme Corp. (Pty) Ltd",
      icon: User,
      type: "text",
      color: "green",
    },
    {
      label: "Defendant",
      name: "defendant",
      value: "Brave New World Solutions Inc.",
      icon: CircleX,
      type: "text",
      color: "red",
    },
  ]);

  const [profileMenus, setProfileMenus] = useState<ProfileMenu[]>([
    {
      label: "Dates",
      icon: Calendar,
      headers: {
        attributes1: "Date",
        attributes2: "Event Type",
        attributes3: "Description",
      },
      items: [
        {
          attributes1: "test1Dates",
          attributes2: "test2Dates",
          attributes3: "test3Dates",
        },
      ],
    },
    {
      label: "Documents",
      icon: File,
      headers: {
        attributes1: "Title",
        attributes2: "Type",
        attributes3: "Date Filed",
      },
      items: [
        {
          attributes1: "test1Documents",
          attributes2: "test2Documents",
          attributes3: "test3Documents",
        },
      ],
    },
    {
      label: "Invoices",
      icon: BanknoteArrowUp,
      headers: {
        attributes1: "Invoice Number",
        attributes2: "Amount",
        attributes3: "Status",
      },
      items: [
        {
          attributes1: "test1Invoices",
          attributes2: "test2Invoices",
          attributes3: "test3Invoices",
        },
      ],
    },
    {
      label: "Lawyers",
      icon: Users,
      headers: {
        attributes1: "Name",
        attributes2: "Mobile Number",
        attributes3: "Email",
      },
      items: [
        {
          attributes1: "test1Lawyers",
          attributes2: "test2Lawyers",
          attributes3: "test3Lawyers",
        },
      ],
    },
  ]);
  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );

  const [selectedCreateOption, setSelectedCreateOption] = useState("");

  useEffect(() => {
    if (!caseId) return;
    CourtCaseService.getCourtCasesById(caseId)
      .then((response) => {
        setCaseFields([
          { ...caseFields[0], value: response.id },
          { ...caseFields[1], value: response.location },
          { ...caseFields[2], value: response.type! },
          { ...caseFields[3], value: response.outcome! },
          { ...caseFields[4], value: response.created! },
          { ...caseFields[5], value: response.lastModified! },
        ]);

        setKeyParties([
          { ...keyParties[0], value: response.plaintiff },
          { ...keyParties[1], value: response.defendant },
        ]);

        setProfileMenus([
          {
            ...profileMenus[0],
            items: response.courtCaseDates
              ?.at(0)
              ?.courtCaseDateItems.map((courtCaseDate) => {
                return {
                  attributes1: courtCaseDate.date,
                  attributes2: courtCaseDate.courtCaseDateType.toString(),
                  attributes3: courtCaseDate.title,
                };
              }),
          },
          {
            ...profileMenus[1],
            items: response.documents?.map((document) => {
              return {
                attributes1: document.fileName,
                attributes2: document.contentType,
                attributes3: document.created,
              };
            }),
          },
          {
            ...profileMenus[2],
            items: response.invoices?.map((invoice) => {
              return {
                attributes1: invoice.invoiceNumber,
                attributes2: `R${invoice.totalAmount}`,
                attributes3: invoice.status.toString(),
              };
            }),
          },
          {
            ...profileMenus[3],
            items: response.lawyers?.map((lawyer) => {
              return {
                attributes1: lawyer.name,
                attributes2: lawyer.mobileNumber,
                attributes3: lawyer.email,
              };
            }),
          },
        ]);
      })
      .catch((error) => {});
  }, []);

  const renderCaseSummary = () => {
    return (
      <>
        <div className="flex items-center mb-4 border-b border-gray-300 pb-2">
          <span>
            <Scale />
          </span>
          <span className="text-2xl font-semibold ml-2">Case Summary</span>
        </div>
        <div className="grid grid-cols-10 gap-4">
          {caseFields.map(({ label, value, icon: Icon }, index) => (
            <Card
              className="col-span-5 bg-gray-50"
              key={`infoCardsSummary-${index}`}
            >
              <div className="grid grid-cols-20">
                <div className="col-span-1 flex items-center">
                  <Icon />
                </div>
                <div className="col-span-19 text-gray-500 font-medium">
                  <div>{label}</div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-19">{`${value}`}</div>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  };

  const renderKeyParties = () => {
    return (
      <>
        <div className="flex items-center mb-4 border-b border-gray-300 pb-2">
          <span>
            <Users />
          </span>
          <span className="text-2xl font-semibold ml-2">Key Parties</span>
        </div>
        <div className="">
          {keyParties.map(({ label, value, icon: Icon, color }, index) => (
            <Card
              className="bg-gray-50 mb-4"
              key={`infoCardsKeyParties-${index}`}
            >
              <div className="grid grid-cols-20">
                <div className="col-span-1 flex items-center">
                  <Icon color={color} />
                </div>
                <div className="col-span-19 text-gray-500 font-medium ml-1">
                  <div>{label}</div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-19 font-medium ml-1" style={{ color }}>
                  {value.toString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  };

  const renderTabs = () => {
    // Placeholder for future tab rendering logic
    return profileMenus.map((menu, index) => (
      <TabNavigation
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        menu={menu}
        index={index}
        key={`infoNav-${index}`}
        className="pt-2"
      />
    ));
  };

  const renderTables = () => {
    // Placeholder for future table rendering logic based on selectedMenu
    const x = profileMenus.find((menu) => {
      return menu.label === selectedMenu;
    });
    return <CourtCaseInformationTable headers={x?.headers} items={x?.items} />;
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };

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
        return <div>Form to add Date</div>;
      case "document":
        return <div>Form to add Document</div>;
      case "invoice":
        return (
          <AddInvoiceForm
            setShowSuccessMessage={setSuccessAlertMessage}
            setShowErrorMessage={setErrorAlertMessage}
            buttonCaption="Add Invoice"
          />
        );
      case "lawyer":
        return <div>Form to add Lawyer</div>;
    }
  };

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
        <Card className="col-span-7">{renderCaseSummary()}</Card>
        <Card className="col-span-3">{renderKeyParties()}</Card>
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

export default CourtCaseInformation;
