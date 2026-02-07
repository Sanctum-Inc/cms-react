import { ArrowRight, Clock, EllipsisVertical, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CourtCaseDateService,
  type CourtCaseDateItemResponse,
  type UpdateCourtCaseDateRequest,
} from "../../api";
import EditDateForm from "../Forms/EditDateForm";
import SideModal from "../Modal/SideModal";
import Card from "./Card";

interface UpdateCourtCaseRequest extends UpdateCourtCaseDateRequest {
  id: string;
}

interface CaseTimeLineProps {
  caseDateItems?: CourtCaseDateItemResponse[];
  setErrorAlertMessage: (message: string) => void;
  setSuccessAlertMessage: (message: string) => void;
}

const CaseTimeLine = ({
  caseDateItems,
  setErrorAlertMessage,
  setSuccessAlertMessage,
}: CaseTimeLineProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [updateCourtCaseDateRequest, setUpdateCourtCaseDateRequest] =
    useState<UpdateCourtCaseRequest>({
      id: "",
      caseId: "",
      date: "",
      description: "",
      title: "",
      type: 0,
      isCancelled: false,
      isComplete: false,
    });

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getBorderColor = (status: string) => {
    switch (status) {
      case "Overdue":
        return "border-red-700";
      case "DueToday":
        return "border-(--color-primary)";
      default:
        return "border-gray-500";
    }
  };

  const getBackgroundColor = (status: string) => {
    switch (status) {
      case "Overdue":
        return "bg-red-700";
      case "DueToday":
        return "bg-(--color-primary)";
      default:
        return "bg-gray-500";
    }
  };

  const getPillIconText = (status: string) => {
    switch (status) {
      case "Overdue":
        return "Critical | Overdue";
      case "DueToday":
        return "Due Today";
      default:
        return "Upcoming";
    }
  };

  const handleOpenEditModal = (courtCaseDate: CourtCaseDateItemResponse) => {
    console.log(courtCaseDate);
    console.log(showModal);
    setUpdateCourtCaseDateRequest({
      id: courtCaseDate.id,
      caseId: courtCaseDate.caseId,
      date: courtCaseDate.date,
      description: courtCaseDate.description,
      title: courtCaseDate.title,
      type: courtCaseDate.courtCaseDateType,
      isCancelled: false,
      isComplete: false,
    });
    setShowModal(true);
  };

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const clickedInsideSomeMenu = menuRefs.current.some(
        (ref) => ref && ref.contains(e.target as Node),
      );

      if (!clickedInsideSomeMenu) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const renderEditModal = () => {
    return (
      showModal && (
        <SideModal setShowModal={setShowModal} title="Edit Event">
          <EditDateForm
            setShowErrorMessage={setErrorAlertMessage}
            setShowSuccessMessage={setSuccessAlertMessage}
            updateCourtCaseRequest={updateCourtCaseDateRequest}
            setShowModal={setShowModal}
          />
        </SideModal>
      )
    );
  };

  const handleViewCase = (caseId: string) => {
    navigate(`/court-case-information?id=${caseId}`);
  };

  const handleMarkAsCancelled = (id: string) => {
    CourtCaseDateService.setToCancelled(id)
      .then(() => {
        setSuccessAlertMessage("Event cancelled successfully.");
      })
      .catch(() => {
        setErrorAlertMessage("Failed to cancel event. Please try again.");
      });
  };

  const handleMarkAsComplete = (id: string) => {
    CourtCaseDateService.setToComplete(id)
      .then(() => {
        setSuccessAlertMessage("Event completed successfully.");
      })
      .catch(() => {
        setErrorAlertMessage("Failed to complete event. Please try again.");
      });
  };

  return (
    <>
      {caseDateItems?.map((courtCaseDate, index) => (
        <Card
          hover={true}
          className={`mb-3 flex justify-end ${getBackgroundColor(courtCaseDate.status)} hover:cursor-default`}
          removePadding={true}
          key={`CaseTimeLine-${index}`}
        >
          <div
            className={`border ${getBorderColor(courtCaseDate.status)} h-full w-99/100 rounded-2xl bg-(--color-background) p-7`}
          >
            <div className="flex">
              <div
                className={`font-bold mr-3 border ${getBorderColor(courtCaseDate.status)} rounded-full py-1 px-3 ${getBackgroundColor(courtCaseDate.status)} text-white`}
              >
                {getPillIconText(courtCaseDate.status)}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-1">
                  <Clock size={20} color="gray" />
                </span>
                <span className="font-semibold">{courtCaseDate.date}</span>
              </div>
              {courtCaseDate.status === "Overdue" && (
                <div className="ml-auto flex items-center">
                  <Info size={20} className="animate-bounce text-red-700" />
                </div>
              )}
            </div>
            <div className="flex py-4">
              <div className="w-8/12 py-1">
                <div className="text-2xl font-bold py-1">
                  {courtCaseDate.title}
                </div>
                <div className="text-lg font-semibold text-gray-500">
                  {courtCaseDate.subtitle}
                </div>
              </div>
              <div className="w-4/12">
                <div className="flex gap-2 justify-end items-center h-full">
                  <button
                    className="font-bold py-2 px-3 rounded-xl transition duration-300 flex items-center justify-center text-black bg-white hover:bg-gray-50 border border-gray-200 hover:cursor-pointer text-sm"
                    onClick={() => handleOpenEditModal(courtCaseDate)}
                  >
                    Edit <ArrowRight size={16} className="ml-1" />
                  </button>
                  <div
                    className="flex items-center relative"
                    ref={(el) => {
                      menuRefs.current[index] = el;
                    }}
                  >
                    <button
                      type="button"
                      className="cursor-pointer focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition"
                      onClick={() => toggleMenu(index)}
                      aria-label="Invoice options menu"
                    >
                      <EllipsisVertical className="h-5 w-5" />
                    </button>
                    {openMenuIndex === index && (
                      <div className="absolute right-0 top-7 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleViewCase(courtCaseDate.caseId)}
                        >
                          View Case
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleMarkAsComplete(courtCaseDate.id)}
                        >
                          Mark as complete
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() =>
                            handleMarkAsCancelled(courtCaseDate.id)
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-(--color-background) bg-gray-200 w-full rounded-2xl h-20 p-4">
              {courtCaseDate.description}
            </div>
          </div>
        </Card>
      ))}
      {renderEditModal()}
    </>
  );
};

export default CaseTimeLine;
