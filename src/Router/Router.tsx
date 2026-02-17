import { createHashRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CourtCaseInformationPage from "../Pages/CourtCaseInformationPage";
import CourtCasePage from "../Pages/CourtCasePage";
import DashboardPage from "../Pages/DashboardPage";
import DatesPage from "../Pages/DatesPage";
import DocumentsPage from "../Pages/DocumentsPage";
import EmailVerifiedPage from "../Pages/EmailVerifiedPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import InvoicePage from "../Pages/InvoicePage";
import LawyerPage from "../Pages/LawyerPage";
import LawyerReportPage from "../Pages/LawyerReportPage";
import Login from "../Pages/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import RegisterPage from "../Pages/RegisterPage";
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
      { path: "court-case-information", element: <CourtCaseInformationPage /> },
      { path: "lawyer-report", element: <LawyerReportPage /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "email-verified", element: <EmailVerifiedPage /> },
]);

export default router;
