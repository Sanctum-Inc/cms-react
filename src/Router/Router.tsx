import { createHashRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import EmailVerifiedPage from "../Pages/Authentication/EmailVerifiedPage";
import ForgotPasswordPage from "../Pages/Authentication/ForgotPasswordPage";
import Login from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegisterPage";
import CourtCaseInformationPage from "../Pages/CourtCase/CourtCaseInformationPage";
import CourtCasePage from "../Pages/CourtCase/CourtCasePage";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import DatesPage from "../Pages/Dates/DatesPage";
import DocumentsPage from "../Pages/Documents/DocumentsPage";
import InvoicePage from "../Pages/Invoice/InvoicePage";
import LawyerPage from "../Pages/Lawyer/LawyerPage";
import LawyerReportPage from "../Pages/LaywerReport/LawyerReportPage";
import ProfilePage from "../Pages/Profile/ProfilePage";
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
