const ErrorAlert = ({ message }: { message: string }) => {
  return (
      <div
        className="w-7/8 fixed bottom-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl grid grid-cols-2 z-1000"
        role="alert"
      >
        <div className="block sm:inline">{message}</div>

        <div className="flex justify-end">
          x
        </div>
      </div>
  );
};

export default ErrorAlert;
