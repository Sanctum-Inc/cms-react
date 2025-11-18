import PrimaryButton from "../Buttons/PrimaryButton";
import PillInput from "../Inputs/PillInput";
import type { InputItem } from "../../Models/InputItem";

interface ModalProps {
  handleShowModal: (show: boolean) => void;
  setShowModal: (show: boolean) => void;
  title: string;
  inputItems: InputItem[];
  buttonCaption: string;
  buttonOnClick: () => void;
}

const Modal = ({
  handleShowModal,
  setShowModal,
  title,
  inputItems,
  buttonCaption,
  buttonOnClick,
}: ModalProps) => {
  const handleButtonClick = () => {
    // Logic to add the new court case goes here
    // For now, we'll just close the modal
    console.log("Button clicked");
    inputItems.forEach((element) => {
      console.log(element);
      if (element.valueArray && element.valueArray.length > 0) 
      {
        element.value = element.valueArray.reduce((acc, curr) => acc + ", " + curr);
      }
      console.log(element.label + " " + element.value);
    });
    buttonOnClick();
  };

  const handleModalEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed in modal");
      console.log((e.target as HTMLInputElement).getAttribute("name"));
      inputItems.forEach((element) => {
        if (element.name === (e.target as HTMLInputElement).getAttribute("name")) {
          element.valueArray = (element.valueArray ?? []).concat(
            (e.target as HTMLInputElement).value
          );
          console.log("Matched input item:");
          console.log(element);
          console.log("Values:");
          console.log(element.valueArray);
        }
      });
    }
  };

  return (
    <>
      <div
        className="w-4/5 h-full fixed top-0 left-0 bg-black opacity-30"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="w-1/5 border-2 border-gray-300 h-full  fixed top-0 right-0 bg-white">
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
          {inputItems.map((item, index) => (
            <PillInput
              key={index}
              {...item}
              onChange={(e) => {
                item.value = e.target.value;
              }}
              onKeyDown={handleModalEnterClick}
            />
          ))}
        </div>
        <div className="flex px-10 py-5">
          <PrimaryButton onClick={handleButtonClick}>
            {buttonCaption}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Modal;
