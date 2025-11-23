import Header from "../Components/Header/Header";
import { useState } from "react";
import Modal from "../Components/Modal/Modal";
import type { InputItem } from "../Models/InputItem";
import Calendar from "../Components/Calendar/Calendar";
import Card from "../Components/Cards/Card";
import CaseTimeLine from "../Components/Cards/CaseTimeLine";
import { CalendarClock } from "lucide-react";

const DatesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };

  const inputItems: InputItem[] = [
    {
      name: "eventTitle",
      label: "Event Title:",
      type: "text",
      addEnterHint: false,
      placeholder: "eg. Final Pre-Trial Hearing",
      value: "",
      inputType: "input",
    },
    {
      name: "caseNumber",
      label: "Case Number:",
      type: "text",
      addEnterHint: false,
      value: "",
      inputType: "select",
      selectOptions: ["C00001", "C00002", "C00003", "C00004", "C00005"],
    },
    {
      name: "date",
      label: "Date:",
      type: "date",
      inputType: "input",
    },
    {
      name: "eventType",
      label: "Event Type & Icon:",
      type: "text",
      inputType: "select",
      selectOptions: ["Deadline", "Hearing", "Filing", "Court Day"],
    },
  ];

  const handleAddNewDate = () => {
    console.log();
  };

  const renderModal = () => {
    if (showModal == false) return null;
    else
      return (
        <>
          <Modal
            buttonCaption="Add Date"
            title="Schedule New Event"
            setShowModal={setShowModal}
            handleShowModal={handleShowModal}
            inputItems={inputItems}
            buttonOnClick={handleAddNewDate}
          />
          <div>
            test
          </div>
        </>
      );
  };

  return (
    <>
    
      <Header
        title="Date Management"
        showButton={true}
        buttonCaption="Add New Date"
        handleShowModal={handleShowModal}
        />
    <div className="p-6">
      <Calendar renderModal={renderModal} />
      <Card className="my-5 mx-3">
        <div className="flex text-2xl items-center mb-4">
          <span className="mr-2 text-blue-700">
            <CalendarClock />
          </span>
          <span className="font-bold">Case Timeline</span>
        </div>
        <CaseTimeLine />
      </Card>
    </div>
        </>
  );
};

export default DatesPage;
