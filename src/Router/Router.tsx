import { createHashRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CourtCaseInformation from "../Pages/CourtCaseInformation";
import CourtCasePage from "../Pages/CourtCasePage";
import DashboardPage from "../Pages/DashboardPage";
import DatesPage from "../Pages/DatesPage";
import DocumentsPage from "../Pages/DocumentsPage";
import EmailVerified from "../Pages/EmailVerified";
import InvoicePage from "../Pages/InvoicePage";
import LawyerPage from "../Pages/LawyerPage";
import LawyerReport from "../Pages/LawyerReport";
import Login from "../Pages/Login";
import ProfilePage from "../Pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "court-case", element: <CourtCasePage /> },
      { path: "invoices", element: <InvoicePage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "dates", element: <DatesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "lawyer", element: <LawyerPage /> },
      { path: "court-case-information", element: <CourtCaseInformation /> },
      { path: "lawyer-report", element: <LawyerReport /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "email-verified", element: <EmailVerified /> },
]);

export default router;
