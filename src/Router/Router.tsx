import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from "../Pages/DashboardPage";
import MainLayout from '../Layout/MainLayout';
import CourtCasePage from '../Pages/CourtCasePage';
import InvoicePage from '../Pages/InvoicePage';
import DocumentsPage from '../Pages/DocumentsPage';
import DatesPage from '../Pages/DatesPage';
import ProfilePage from '../Pages/ProfilePage';
import CourtCaseInformation from '../Pages/CourtCaseInformation';


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: '/', element: <DashboardPage/> },
            { path: '/dashboard', element: <DashboardPage/> },
            { path: '/court-case', element: <CourtCasePage/> },
            { path: '/invoices', element: <InvoicePage/> },
            { path: '/documents', element: <DocumentsPage/> },
            { path: '/dates', element: <DatesPage/> },
            { path: '/profile', element: <ProfilePage/> },
            { path: '/court-case-information', element: <CourtCaseInformation/> },
        ]
    },
]);

export default router;