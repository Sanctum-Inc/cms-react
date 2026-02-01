import { type PropsWithChildren } from "react";
import Card from "../Cards/Card";
import {
  CheckCircle,
  X,
} from "lucide-react";
import PrimaryButton from "../Buttons/PrimaryButton";

interface SuccessModalProps extends PropsWithChildren {
  title: string;
  subititle: string;
  setShowModal: (show: boolean) => void;
  buttonText?: string;
}

const SuccessModal = ({
  title,
  subititle,
  setShowModal,
  buttonText,
}: SuccessModalProps) => {

  const handleSendEmail = () => {
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center 
  bg-black/40 backdrop-blur-sm"
    >
      <Card className="z-50 w-6/10 px-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-2xl  font-bold text-green-500">{title}</div>
          <div className="rounded-full p-1 cursor-pointer hover:bg-gray-200 hover:text-black-500">
            <X
              className="cursor-pointer text-gray-500"
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>

        <div className="mt-15 bg-green-100 rounded-full p-4 w-fit mx-auto animate-bounce">
          <CheckCircle className="text-green-500 mx-auto" size={48} />
        </div>
        <div>
          {<div className="mt-4 text-center text-gray-600">{subititle}</div>}
        </div>
        <div className="flex mt-4 items-center">
            <PrimaryButton
              onClick={handleSendEmail}
              color="green"
            >
              {buttonText ? buttonText : "Continue"}
            </PrimaryButton>
        </div>
      </Card>
    </div>
  );
};

export default SuccessModal;
