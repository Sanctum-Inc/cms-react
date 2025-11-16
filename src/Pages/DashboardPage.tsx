import DashboardCard from "../Components/Dashboard/DashboardCard";
import { BanknoteX, BriefcaseBusiness, CalendarCheck, Dot, FolderOpen, Users } from "lucide-react";
import DashBoardActivityCard from "../Components/Dashboard/DashBoardActivityCard";
import type { CardItem } from "../Models/CardItem";
import { useState, useEffect } from "react";
import Header from "../Components/Header/Header";

const DashboardPage = () => {

    const activityItems: CardItem[] = [
        {
            color: "green",
            title: "Invoice #2024-123 issued",
            description: "Invoice for legal services rendered.",
            time: "30 minutes ago",
            icon: Dot
        },
        {
            color: "red",
            title: "Payment Overdue: Invoice #2024-101",
            description: "Payment for invoice #2024-101 is overdue.",
            time: "2 hours ago",
            icon: Dot
        },
        {
            color: "orange",
            title: "New Client Added: Acme Corp",
            description: "Client profile for Acme Corp created.",
            time: "4 hours ago",
            icon: Dot
        }
    ];

    const courtCaseItems: CardItem[] = [
        {
            color: "green",
            title: "12/15/2025 @ 9:30 AM",
            description: "Case 2024-088: State vs. A. Johnson",
            time: "In 1 day",
            icon: CalendarCheck,
            type: "Hearing"
        },
        {
            color: "red",
            title: "12/20/2025 @ 2:00 PM",
            description: "Case 2024-119: Property Trust Fund Dispute",
            time: "In 2 days",
            icon: CalendarCheck,
            type: "Trial"
        },
        {
            color: "orange",
            title: "01/05/2026 @ 11:00 AM",
            description: "Case 2024-150: Patent Infringement Claim",
            time: "In a week",
            icon: CalendarCheck,
            type: "Deposition"
        },
        {
            color: "purple",
            title: "01/15/2026 @ 10:00 AM",
            description: "Case 2023-999: Tax Audit Appeal",
            time: "In 2 months",
            icon: CalendarCheck,
            type: "Final Judgement"
        }
    ];

    const [getTime, setTime] = useState("")

    const getCurrentDate = () => {

        // Get the current date and time
        const currentDate = new Date();

        // Extract specific parts of the date
        const year = currentDate.getFullYear(); // Gets the year, e.g., 2025
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Gets the month (0-11, so add 1), padded to 2 digits, e.g., "11"
        const day = String(currentDate.getDate()).padStart(2, '0'); // Gets the day of the month, padded to 2 digits, e.g., "07"

        // Format the date in "YYYY-MM-DD" format
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;

    }

    const getCurrentTime = () => {
        const currentDate = new Date();

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        setTime(getCurrentTime())

        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 60000);

        return () => clearInterval(interval)
    }, []);

    return (
      <>
        <Header title="Dashboard" showButton={false} >
          <span className="text-2xl text-gray-400 font-bold">
            {getCurrentDate()} | {getTime}
          </span>
        </Header>
        <div className="flex-col w-full bg-(--color-hover-light)">
          <div className="w-full flex justify-between p-3">
            <DashboardCard
              description="Total Cases"
              value="25"
              icon={BriefcaseBusiness}
              color="blue"
            ></DashboardCard>
            <DashboardCard
              description="Pending Invoices"
              value="R235 000"
              icon={BanknoteX}
              color="orange"
            ></DashboardCard>
            <DashboardCard
              description="Active Lawyers"
              value="12"
              icon={Users}
              color="green"
            ></DashboardCard>
            <DashboardCard
              description="Documents Stored"
              value="1896"
              icon={FolderOpen}
              color="purple"
            ></DashboardCard>
          </div>
          <div className="w-full h-full p-3">
            <DashBoardActivityCard
              items={activityItems}
              title="Recent Case Activity"
              size="40"
            />
          </div>
          <div className="w-full h-full p-3">
            <DashBoardActivityCard
              items={courtCaseItems}
              title="Upcoming Court Dates"
              size="25"
              clickable={true}
            />
          </div>
        </div>
      </>
    );
}

export default DashboardPage;