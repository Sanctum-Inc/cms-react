import { useEffect, useState } from "react";

const PrimaryAlert = ({ message }: { message: string }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!showAlert) return null;

  return (
    showAlert && (
      <div
        className="w-7/8 fixed bottom-0 right-0 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-xl grid grid-cols-10"
        role="alert"
      >
        <span className="block sm:inline col-span-9">{message}</span>
        <div
          className="col-span-1 flex justify-end"
          onClick={() => setShowAlert(false)}
        >
          x
        </div>
      </div>
    )
  );
};

export default PrimaryAlert;
