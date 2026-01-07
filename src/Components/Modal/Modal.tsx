import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import type { InputItem } from "../../Models/InputItem";
import PrimaryButton from "../Buttons/PrimaryButton";
import PillInput from "../Inputs/PillInput";

interface ModalProps extends PropsWithChildren {
  handleShowModal: (show: boolean) => void;
  setShowModal: (show: boolean) => void;
  title: string;
  inputItems: InputItem[];
  buttonCaption: string;
  buttonOnClick?: () => void;
  handleChange?: (name: string, value: string) => void;
  values?: Record<string, string>;
}

const Modal = ({
  handleShowModal,
  setShowModal,
  title,
  inputItems,
  buttonCaption,
  buttonOnClick,
  handleChange,
  values,
  children
}: ModalProps) => {
  const [localInputItems, setLocalInputItems] =
    useState<InputItem[]>(inputItems);

  // Update localInputItems whenever values or inputItems change
  useEffect(() => {
    if (!values) return;

    // Map inputItems and set their value to values[name]
    const updatedInputItems = inputItems.map((item) => ({
      ...item,
      value: values[item.name] ?? "",
    }));

    setLocalInputItems(updatedInputItems);
  }, [values, inputItems]);

  const handleButtonClick = () => {
    // Your existing logic here...
    buttonOnClick?.();
  };

  const handleModalEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Your existing logic here...
    }
  };

  return (
    <>
      <div
        className="w-4/5 h-full fixed top-0 left-0 bg-black opacity-30 z-40"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="w-1/5 border-2 border-gray-300 h-full fixed top-0 right-0 bg-white z-50">
        <div className="grid grid-cols-10 border-b-solid border-b-2 border-solid border-gray-300 py-5 px-10">
          <div className="col-span-9 text-xl font-bold text-(--color-primary)">
            {title}
          </div>
          <div
            className="w-full flex justify-end"
            onClick={() => handleShowModal(false)}
          >
            <div className="w-10 cursor-pointer flex justify-center">x</div>
          </div>
        </div>
        <div className="justify-center px-10">
          {localInputItems.map((item, index) => (
            <PillInput
              key={`${index}-modalpillInput`}
              {...item}
              value={item.value}
              onKeyDown={handleModalEnterClick}
              onChange={(e) => handleChange?.(item.name, e.target.value)}
            />
          ))}
        </div>
        <div className="px-10 py-5">
          {children ?? (
            <PrimaryButton onClick={handleButtonClick}>
              {buttonCaption}
            </PrimaryButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;