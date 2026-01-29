import "../axios.config"; // MUST BE FIRST - before React or any other imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import { AuthenticationProvider } from "./Context/AuthenticationContext";

createRoot(document.getElementById("root")!).render(
    <AuthenticationProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AuthenticationProvider>
);
