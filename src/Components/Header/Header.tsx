import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

interface HeaderProps {
  handleShowModal?: (value: boolean) => void;
  title: string;
  buttonCaption?: string;
  showButton: boolean;
  children?: ReactNode;
}

const Header = ({
  handleShowModal,
  title,
  buttonCaption,
  showButton,
  children,
}: HeaderProps) => {
  const showModal = () => {
    if (handleShowModal != undefined) handleShowModal!(true);
  };

  return (
    <>
      <div className="flex justify-between border-b-solid border-b-2 border-solid border-gray-300 pt-3 px-3 bg-white">
        <span className="text-3xl text-black font-bold">{title}</span>
        <span className="text-lg text-gray-400 font-bold">
          {showButton && (
            <PrimaryButton onClick={showModal}>
              <div className="flex">
                <span className="m-auto">
                  <Plus className="pr-1" />
                </span>
                {buttonCaption}
              </div>
            </PrimaryButton>
          )}
          {children}
        </span>
      </div>
    </>
  );
};

export default Header;
