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
      name: "caseNumber",
      label: "Case Number:",
      type: "text",
      addEnterHint: false,
      placeholder: "Enter Case Number...",
      value: "",
    },
  ];

  const handleAddNewDate = () => {
    console.log()
  }

  const renderModal = () => {
    if (showModal == false) return null;
    else
      return (
        <Modal
          buttonCaption="Add Date"
          title="Add New Date"
          setShowModal={setShowModal}
          handleShowModal={handleShowModal}
          inputItems={inputItems}
          buttonOnClick={handleAddNewDate}
        />
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
    </>
  );
};

export default DatesPage;
