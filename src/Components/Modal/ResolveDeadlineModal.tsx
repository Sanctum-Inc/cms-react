import { InfoIcon, X } from "lucide-react";
import type { PropsWithChildren } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Card from "../Cards/Card";
import type { ModalItemProps } from "../Cards/Common/Props/ModalItemProps";

interface ResolveDeadlineModalProps extends PropsWithChildren {
  title: string;
  setShowModal: (show: boolean) => void;
  items?: ModalItemProps[];
  subtitle?: string;
  showButton?: boolean;
}

const ResolveDeadlineModal = ({
  title,
  setShowModal,
  items,
  children,
}: ResolveDeadlineModalProps) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Container must have 'relative' so the button can pin to the corner */}
      <Card className="z-50 w-full max-w-lg px-8 py-6 bg-white flex flex-col max-h-[90vh] relative shadow-xl">
        {/* --- CLOSE BUTTON FIXED TO CORNER --- */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-400 hover:text-gray-600" />
        </button>

        {/* --- CENTERED HEADER --- */}
        <div className="flex items-center justify-center shrink-0 mb-6">
          <h2 className="text-2xl font-bold text-red-600 text-center uppercase tracking-wide">
            {title}
          </h2>
        </div>

        {/* Subtitle/Icon Section */}
        <div className="flex flex-col items-center shrink-0 mb-6">
          <div className="bg-red-50 rounded-full p-5 mb-4 border border-red-100">
            <InfoIcon className="text-red-500" size={40} />
          </div>
          <p className="text-center text-gray-700 font-medium">
            The following events require immediate action:
          </p>
        </div>

        {/* Scrollable List Section */}
        <div className="flex-grow overflow-y-auto pr-2 mb-6 space-y-4 custom-scrollbar">
          {items?.map(({ Icon, title, text }, index) => (
            <Card
              key={`informationModal-${index}`}
              className="p-4 border border-gray-200 flex items-center gap-4 hover:border-red-200 transition-colors"
            >
              <div className="shrink-0">
                <span className="bg-red-100 rounded-xl p-2.5 flex items-center justify-center">
                  <Icon size={24} className="text-red-600" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-gray-900 leading-tight">
                  {title}
                </div>
                <div className="text-gray-500 text-sm mt-0.5">{text}</div>
              </div>
            </Card>
          ))}
          {children}
        </div>

        {/* Footer Action */}
        <div className="shrink-0 border-t border-gray-100 pt-4">
          <PrimaryButton onClick={handleCloseModal} color="red">
            Mark all as complete
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
};

export default ResolveDeadlineModal;
