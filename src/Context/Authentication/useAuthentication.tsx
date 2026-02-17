import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider",
    );
  }

  return context;
};

export default useAuthentication;
