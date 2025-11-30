import { useState, useEffect } from "react";

const ErrorAlert = ({ message }: { message: string }) => {
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
        className="w-7/8 fixed bottom-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl grid grid-cols-2"
        role="alert"
      >
        <div className="block sm:inline">{message}</div>

        <div className="flex justify-end" onClick={() => setShowAlert(false)}>
          x
        </div>
      </div>
    )
  );
};

export default ErrorAlert;
