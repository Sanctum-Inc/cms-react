import { InfoIcon, X } from "lucide-react";
import { type PropsWithChildren } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Card from "../Cards/Card";
import type { ModalItemProps } from "../Cards/Common/Props/ModalItemProps";

type ModalTheme = "primary" | "red" | "green";

interface InformationModalProps extends PropsWithChildren {
  title: string;
  setShowModal: (show: boolean) => void;
  items?: ModalItemProps[];
  subtitle?: string;
  showButton?: boolean;
  theme?: ModalTheme; // 2. Add theme prop
}

const InformationModal = ({
  title,
  setShowModal,
  items,
  subtitle,
  showButton,
  children,
  theme = "primary", // Default to primary
}: InformationModalProps) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const colorMap = {
    primary: {
      text: "text-(--color-primary)",
      icon: "text-(--color-primary)",
      bgLight: "bg-blue-100",
      bgIconContainer: "bg-(--color-primary-light)/50",
      buttonColor: "blue",
    },
    red: {
      text: "text-red-600",
      icon: "text-red-500",
      bgLight: "bg-red-100",
      bgIconContainer: "bg-red-200",
      buttonColor: "red",
    },
    green: {
      text: "text-green-600",
      icon: "text-green-500",
      bgLight: "bg-green-100",
      bgIconContainer: "bg-green-200",
      buttonColor: "green",
    },
  };

  const activeStyles = colorMap[theme];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <Card className="z-50 w-full max-w-lg px-8 py-6 bg-white flex flex-col max-h-[90vh] relative">
        {/* --- CHANGE START: ABSOLUTE CLOSE BUTTON --- */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-400 hover:text-gray-600" />
        </button>

        <div className="flex items-center justify-center shrink-0 mb-4">
          <h2
            className={`text-2xl font-bold text-center uppercase tracking-wide ${activeStyles.text}`}
          >
            {title}
          </h2>
        </div>
        {/* --- CHANGE END --- */}

        {subtitle && (
          <div className="shrink-0 mb-6">
            <div
              className={`mt-4 ${activeStyles.bgLight} rounded-full p-4 w-fit mx-auto`}
            >
              <InfoIcon className={`${activeStyles.icon} mx-auto`} size={48} />
            </div>
            <div className="mt-4 text-center text-gray-600">{subtitle}</div>
          </div>
        )}

        <div className="overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar flex-grow">
          {items?.map(({ Icon, title, text }, index) => (
            <Card
              key={`informationModal-${index}`}
              className="p-0 border border-gray-200"
            >
              <div className="p-4 flex items-center">
                <div className="mr-4 flex items-center shrink-0">
                  <span
                    className={`${activeStyles.bgIconContainer} rounded-xl p-2`}
                  >
                    <Icon size={32} className={activeStyles.icon} />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-lg truncate">{title}</div>
                  <div className="text-gray-600 text-sm">{text}</div>
                </div>
              </div>
            </Card>
          ))}
          {!showButton && children}
        </div>

        {showButton && (
          <div className="shrink-0 mt-auto pt-2">
            <PrimaryButton
              onClick={handleCloseModal}
              color={activeStyles.buttonColor as "blue" | "red" | "green"}
              className="w-full"
            >
              Got it, Thanks!
            </PrimaryButton>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InformationModal;
