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
import Card from "../Components/Cards/Card";
import Header from "../Components/Header/Header";
import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import TabNavigation from "../Components/Navigation/TabNavigation";
import CourtCaseInformationTable from "../Components/Tables/CourtCaseInformationTable";
import DynamicModal from "../Components/Modal/DynamicModal";

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
  items: Items[];
}

const CourtCaseInformation = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dates");
  const [showModal, setShowModal] = useState(false);

  const caseFields: CaseField[] = [
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
  ];

  const keyParties: CaseField[] = [
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
  ];

  const profileMenus: ProfileMenu[] = [
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
        attributes2: "Role",
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
  ];

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
          {caseFields.map(({ label, value, icon: Icon }) => (
            <Card className="col-span-5 bg-gray-50">
              <div className="grid grid-cols-20">
                <div className="col-span-1 flex items-center">
                  <Icon />
                </div>
                <div className="col-span-19 text-gray-500 font-medium">
                  <div>{label}</div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-19">{value.toString()}</div>
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
          {keyParties.map(({ label, value, icon: Icon, color }) => (
            <Card className="bg-gray-50 mb-4">
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
        className="pt-2"
      />
    ));
  };

  const renderTables = () => {
    // Placeholder for future table rendering logic based on selectedMenu
    const x = profileMenus.find((menu) => {
      return menu.label === selectedMenu;
    });
    return (
      <CourtCaseInformationTable
        headers={x?.headers}
        items={x?.items}
      />
    );
  };

  const handleAddItemButtonClick = () =>{
    console.log("Add Item Button Clicked");
    setShowModal(false);
  }

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  }

  const renderModal = () => {
    // Placeholder for future modal rendering logic
    return <DynamicModal buttonOnClick={handleAddItemButtonClick} handleShowModal={handleShowModal} setShowModal={setShowModal} title="Add New Item" inputItems={[]} key={231} />
  }

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
    </>
  );
};

export default CourtCaseInformation;
