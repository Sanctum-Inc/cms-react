import Header from "../Components/Header/Header";
import { useEffect, useState } from "react";
import Modal from "../Components/Modal/Modal";
import type { InputItem, KeyValue } from "../Models/InputItem";
import Calendar from "../Components/Calendar/Calendar";
import Card from "../Components/Cards/Card";
import CaseTimeLine from "../Components/Cards/CaseTimeLine";
import { CalendarClock } from "lucide-react";
import {
  CourtCaseDateService,
  CourtCaseService,
  type AddCourtCaseDateRequest,
  type UpdateCourtCaseDateRequest,
} from "../api";
import {
  selectCourtCaseTypeOptions,
  type CourtCaseDates,
} from "../Models/CourtCaseDates";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import SuccessAlert from "../Components/Alerts/SuccessAlert";
import ErrorAlert from "../Components/Alerts/ErrorAlert";

const DatesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowModal = (show: boolean) => {
    setNewCourtCaseDate({
      caseId: "",
      date: "",
      title: "",
      type: "",
    });
    setShowModal(show);
  };
  const handleShowEditModal = (show: boolean) => {
    setShowEditModal(show);
  };
  const [newCourtCaseDate, setNewCourtCaseDate] =
    useState<AddCourtCaseDateRequest>({
      caseId: "",
      date: "",
      title: "",
      type: "",
    });

  const [updateCourtCaseDate, setUpdateCourtCaseDate] = useState<
    UpdateCourtCaseDateRequest & { id: string }
  >({
    caseId: "",
    date: "",
    title: "",
    id: "",
  });

  const [inputItems, setInputItems] = useState<InputItem[]>([
    {
      name: "title",
      label: "Event Title:",
      type: "text",
      addEnterHint: false,
      placeholder: "eg. Final Pre-Trial Hearing",
      value: "",
      inputType: "input",
    },
    {
      name: "caseId",
      label: "Case Number:",
      type: "text",
      addEnterHint: false,
      value: "",
      inputType: "select",
      selectOptions: [],
    },
    {
      name: "date",
      label: "Date:",
      type: "date",
      inputType: "input",
    },
    {
      name: "type",
      label: "Event Type & Icon:",
      type: "text",
      inputType: "select",
      selectOptions: selectCourtCaseTypeOptions,
    },
  ]);

  const [upcomingCourtCaseDates, setUpcomingCourtCaseDates] = useState<
    CourtCaseDates[]
  >([]);
  const [previousCourtCaseDates, setPreviousCourtCaseDates] = useState<
    CourtCaseDates[]
  >([]);

  const [isAdded, setIsAdded] = useState(false);

  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    CourtCaseDateService.getAllCourtCaseDates()
      .then((response) => {
        console.log(response);
        const mapped: CourtCaseDates[] = response.map((courtCaseDate) => {
          return {
            id: courtCaseDate.id,
            caseName: courtCaseDate.caseType,
            defendant: courtCaseDate.defendent,
            date: courtCaseDate.date,
            type: courtCaseDate.type,
            title: courtCaseDate.title,
            plaintiff: courtCaseDate.platiniff,
            subtitle: courtCaseDate.caseType,
            caseNumber: courtCaseDate.caseNumber,
            caseId: courtCaseDate.caseId,
          };
        });

        const now = Date.now();
        const previousDates = mapped
          .filter((courtCaseDate) => {
            return new Date(courtCaseDate.date).getTime() < now;
          })
          .sort((a, b) => {
            return b.date.localeCompare(a.date);
          });
        const futureDates = mapped
          .filter((courtCaseDate) => {
            return new Date(courtCaseDate.date).getTime() > now;
          })
          .sort((a, b) => {
            return a.date.localeCompare(b.date);
          });
        setPreviousCourtCaseDates(previousDates);
        setUpcomingCourtCaseDates(futureDates);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdded]);

  const handleAddNewDate = () => {
    CourtCaseDateService.createCourtCaseDates(newCourtCaseDate)
      .then((response) => {
        console.log(response);
        setIsAdded(true);
        setShowModal(false);
        setSuccessAlertMessage("Court case date added successfully.");
      })
      .catch((error) => {
        setErrorAlertMessage("Failed to add court case date.");
        console.log(error);
      });
  };

  const handleAddChange = (name: string, value: string) => {
    setInputItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, value } : i))
    );

    setNewCourtCaseDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (name: string, value: string) => {
    setInputItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, value } : i))
    );

    setUpdateCourtCaseDate((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            values={newCourtCaseDate}
            handleChange={handleAddChange}
          />
        </>
      );
  };

  useEffect(() => {
    CourtCaseService.getAllCourtCases()
      .then((response) => {
        const options: KeyValue[] = [];
        response.forEach((courtCase) => {
          options.push({
            key: courtCase.id,
            value: courtCase.caseNumber,
          });
        });

        setInputItems((prev) => {
          const updated = [...prev];
          updated[1] = {
            ...updated[1],
            // whatever you want to change
            selectOptions: options,
          };
          return updated;
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditDate = (id: string) => {
    console.log(id);
    CourtCaseDateService.updateCourtCaseDates(id, {
      date: updateCourtCaseDate.date,
      title: updateCourtCaseDate.title,
      caseId: updateCourtCaseDate.caseId,
    })
      .then((response) => {
        console.log(response);
        setShowEditModal(false);
        setIsAdded(true);
        setSuccessAlertMessage("Court case date updated successfully.");
      })
      .catch((error) => {
        setErrorAlertMessage("Failed to update court case date.");
        console.log(error);
      });
  };

  const handleDeleteDate = (id: string) => {
    CourtCaseDateService.deleteCourtCaseDates(id)
      .then((response) => {
        console.log(response);
        setShowEditModal(false);
        setIsAdded(true);
        setSuccessAlertMessage("Court case date deleted successfully.");
      })
      .catch((error) => {
        setErrorAlertMessage("Failed to delete court case date.");
        console.log(error);
      });
  };

  const renderEditModal = () => {
    console.log(updateCourtCaseDate);
    if (showEditModal == false) return null;
    else
      return (
        <>
          <Modal
            buttonCaption="Edit Date"
            title="Edit Event"
            setShowModal={setShowEditModal}
            handleShowModal={handleShowEditModal}
            inputItems={inputItems}
            values={updateCourtCaseDate}
            handleChange={handleUpdateChange}
          >
            <PrimaryButton
              onClick={() => handleEditDate(updateCourtCaseDate.id)}
            >
              Edit
            </PrimaryButton>
            <PrimaryButton
              onClick={() => handleDeleteDate(updateCourtCaseDate.id)}
              color="red"
            >
              Delete
            </PrimaryButton>
          </Modal>
        </>
      );
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
          <CaseTimeLine
            previousCourtCaseDates={previousCourtCaseDates}
            upcomingCourtCaseDates={upcomingCourtCaseDates}
            onClickHandler={(courtCase) => {
              setShowEditModal(!showEditModal);
              setUpdateCourtCaseDate({
                caseId: courtCase.caseId,
                date: courtCase.date,
                title: courtCase.title,
                id: courtCase.id,
              });
            }}
          />
        </Card>
        {renderEditModal()}
      </div>
    </>
  );
};

export default DatesPage;
