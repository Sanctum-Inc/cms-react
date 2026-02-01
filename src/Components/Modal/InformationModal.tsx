import {
  type ForwardRefExoticComponent,
  type PropsWithChildren,
  type RefAttributes,
} from "react";
import Card from "../Cards/Card";
import { InfoIcon, X, type LucideProps } from "lucide-react";
import PrimaryButton from "../Buttons/PrimaryButton";

interface InformationModalProps extends PropsWithChildren {
  title: string;
  setShowModal: (show: boolean) => void;
  items?: {
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    text: string;
  }[];
  subtitle?: string;
}

const InformationModal = ({
  title,
  setShowModal,
  items,
  subtitle,
}: InformationModalProps) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center 
  bg-black/40 backdrop-blur-sm"
    >
      <Card className="z-50 w-5/10 px-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-2xl  font-bold text-(--color-primary)">
            {title}
          </div>
          <div className="rounded-full p-1 cursor-pointer hover:bg-gray-200 hover:text-black-500">
            <X
              className="cursor-pointer text-gray-500"
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>

        {subtitle && (
          <>
            <div className="mt-15 bg-blue-100 rounded-full p-4 w-fit mx-auto animate-">
              <InfoIcon className="text-blue-500 mx-auto" size={48} />
            </div>
            <div className="mt-4 text-center text-gray-600">{subtitle}</div>
          </>
        )}

        {items?.map(({ Icon, title, text }, index) => (
          <Card
            key={`informationModaal-${index}`}
            className="mt-4 p-0 border border-gray-200"
          >
            <div className="">
              <div key={index} className="p-4 flex">
                <div className="mr-4 flex items-center">
                  <span className="bg-blue-200 rounded-xl p-2 bg-(--color-primary-light)/50">
                    <Icon size={32} className="text-(--color-primary)" />
                  </span>
                </div>
                <div>
                  <div className="font-bold text-lg">{title}</div>
                  <div className="text-gray-600">{text}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <div></div>
        <div className="flex mt-4 items-center">
          <PrimaryButton onClick={handleCloseModal} color="blue">
            Got it, Thanks!
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
};

export default InformationModal;
