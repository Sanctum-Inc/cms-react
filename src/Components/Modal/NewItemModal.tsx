interface NewItemModalProps {
    setShowModal: (show: boolean) => void;
    children: React.ReactNode;
}

const NewItemModal = ({ children, setShowModal } : NewItemModalProps) => {
return (
  <>
    <div
      className="w-4/5 h-full fixed top-0 left-0 bg-black opacity-30 z-40"
      onClick={() => setShowModal(false)}
    ></div>
    <div className="w-1/5 border-2 border-gray-300 h-full fixed top-0 right-0 bg-white z-50">
      <div className="grid grid-cols-10 border-b-solid border-b-2 border-solid border-gray-300 py-5 px-10">
        <div className="col-span-9 text-xl font-bold text-(--color-primary)">
          Add New Item
        </div>
        <div
          className="w-full flex justify-end"
          onClick={() => setShowModal(false)}
        >
          <div className="w-10 cursor-pointer flex justify-center">x</div>
        </div>
      </div>
      <div className="justify-center px-10">{children}</div>
    </div>
  </>
);
}

export default NewItemModal;