import { type PropsWithChildren } from "react";
import Card from "../Cards/Card";
import { Trash2, X } from "lucide-react";
import PrimaryButton from "../Buttons/PrimaryButton";

interface SuccessModalProps extends PropsWithChildren {
  title: string;
  setShowModal: (show: boolean) => void;
}

const DeleteModal = ({
  title,
  setShowModal,
}: SuccessModalProps) => {
  const handleSendEmail = () => {
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center 
  bg-black/40 backdrop-blur-sm"
    >
      <Card className="z-50 w-5/10 px-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-2xl  font-bold text-red-500">{title}</div>
          <div className="rounded-full p-1 cursor-pointer hover:bg-gray-200 hover:text-black-500">
            <X
              className="cursor-pointer text-gray-500"
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>

        <div className="mt-15 bg-red-100 rounded-full p-4 w-fit mx-auto animate-pulse">
          <Trash2 className="text-red-500 mx-auto" size={48} />
        </div>
        <div>
          {<div className="mt-4 text-center text-gray-600">Are you sure you want to delete this item? It cannot be recovered.</div>}
        </div>
        <div className="flex mt-4 items-center">
          <div className="w-1/2 mr-2">
            <PrimaryButton onClick={handleSendEmail} color="red">
              Delete
            </PrimaryButton>
          </div>
          <div className="w-1/2">
            <PrimaryButton onClick={handleSendEmail} color="lightGray">
              Cancel
            </PrimaryButton>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeleteModal;
