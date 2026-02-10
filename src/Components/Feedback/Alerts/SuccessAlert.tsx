
const SuccessAlert = ({ message}: { message: string}) => {
  return (
    <div
      className="w-7/8 fixed bottom-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl grid grid-cols-2"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <div className="flex justify-end">x</div>
    </div>
  );
};

export default SuccessAlert;
