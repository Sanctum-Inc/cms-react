import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CourtCaseInformation from "../Pages/CourtCaseInformation";
import CourtCasePage from "../Pages/CourtCasePage";
import DashboardPage from "../Pages/DashboardPage";
import DatesPage from "../Pages/DatesPage";
import DocumentsPage from "../Pages/DocumentsPage";
import InvoicePage from "../Pages/InvoicePage";
import Login from "../Pages/Login";
import ProfilePage from "../Pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <DashboardPage /> },
        { path: "/dashboard", element: <DashboardPage /> },
        { path: "/court-case", element: <CourtCasePage /> },
        { path: "/invoices", element: <InvoicePage /> },
        { path: "/documents", element: <DocumentsPage /> },
        { path: "/dates", element: <DatesPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/court-case-information", element: <CourtCaseInformation /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ],
  {
    basename: "/cms-react",
  },
);

export default router;
