import "../axios.config";
import { validateEnv } from "./Config/EnvCheck";
import "./Config/OpenApiSetup";

validateEnv();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthenticationProvider from "./Context/Authentication/AuthenticationProvider";
import "./index.css";
import router from "./Router/Router";

createRoot(document.getElementById("root")!).render(
  <AuthenticationProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthenticationProvider>,
);
