import {
  BanknoteX,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  FolderOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DashboardService,
  type CourtCaseDateTypes,
  type DashBoardResult,
} from "../api";
import DashBoardActivityCard from "../Components/Dashboard/DashBoardActivityCard";
import DashboardCard from "../Components/Dashboard/DashboardCard";
import Header from "../Components/Header/Header";
import { CourtCaseDateTypeOptions } from "../Components/Inputs/InputOptions/CourtCaseDateTypeOptions";
import type { CardItem } from "../Models/CardItem";

const courtCaseDateTypeClassMap: Record<CourtCaseDateTypes, string> = {
  0: "gray", // Unknown

  // Hearings
  1: "blue", // Hearing
  2: "navy", // Trial
  3: "cyan", // MotionHearing
  4: "teal", // PreTrialConference

  // Administrative
  5: "red", // FilingDeadline
  6: "orange", // SubmissionDeadline
  7: "yellow", // ResponseDeadline

  // Case lifecycle
  8: "purple", // Arraignment
  9: "violet", // Sentencing
  10: "indigo", // Judgment
  11: "pink", // SettlementConference

  // Misc
  12: "green", // Mention
  13: "lime", // StatusConference
  14: "emerald", // Mediation
};

const DashboardPage = () => {
  const [dashboardInformation, setDashboardInformation] =
    useState<DashBoardResult>({
      totalCases: 0,
      totalInvoices: 0,
      upcomingDates: 0,
      documentsStored: 0,
      recentCases: [],
      upcomingCases: [],
    });

  const [activityItems, setActivityItems] = useState<CardItem[]>([]);

  const [courtCaseItems, setCourtCaseItems] = useState<CardItem[]>([
    {
      color: "green",
      title: "12/15/2025 @ 9:30 AM",
      description: "Case 2024-088: State vs. A. Johnson",
      time: "In 1 day",
      icon: CalendarCheck,
      type: "Hearing",
    },
    {
      color: "red",
      title: "12/20/2025 @ 2:00 PM",
      description: "Case 2024-119: Property Trust Fund Dispute",
      time: "In 2 days",
      icon: CalendarCheck,
      type: "Trial",
    },
    {
      color: "orange",
      title: "01/05/2026 @ 11:00 AM",
      description: "Case 2024-150: Patent Infringement Claim",
      time: "In a week",
      icon: CalendarCheck,
      type: "Deposition",
    },
    {
      color: "purple",
      title: "01/15/2026 @ 10:00 AM",
      description: "Case 2023-999: Tax Audit Appeal",
      time: "In 2 months",
      icon: CalendarCheck,
      type: "Final Judgement",
    },
  ]);

  const [getTime, setTime] = useState("");

  const getCurrentDate = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Extract specific parts of the date
    const year = currentDate.getFullYear(); // Gets the year, e.g., 2025
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Gets the month (0-11, so add 1), padded to 2 digits, e.g., "11"
    const day = String(currentDate.getDate()).padStart(2, "0"); // Gets the day of the month, padded to 2 digits, e.g., "07"

    // Format the date in "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const getCurrentTime = () => {
    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setTime(getCurrentTime());

    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    DashboardService.getDashboardInformation()
      .then((response) => {
        console.log(response);
        setDashboardInformation(response);
        const mappedActivity = response.recentCases.map((item) => ({
          color: "green",
          title: item.actitvityTitle,
          description: item.activityDescription,
          time: item.timeSince,
        }));
        setActivityItems(mappedActivity);

        const mappedCourtDates = response.upcomingCases.map((item) => ({
          color: courtCaseDateTypeClassMap[item.courtDateType],
          title: item.courtDateTitle,
          description: item.courtDateDescription,
          time: item.date,
          type: CourtCaseDateTypeOptions[item.courtDateType].value,
        }));
        setCourtCaseItems(mappedCourtDates);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatMoney = () => {
    return dashboardInformation.totalInvoices
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Header title="Dashboard" showButton={false}>
        <span className="text-2xl text-gray-400 font-bold">
          {getCurrentDate()} | {getTime}
        </span>
      </Header>
      <div className="flex-col w-full bg-(--color-hover-light)">
        <div className="w-full flex justify-between p-3">
          <DashboardCard
            description="Total Cases"
            value={dashboardInformation.totalCases?.toString() || ""}
            icon={BriefcaseBusiness}
            color="blue"
          ></DashboardCard>
          <DashboardCard
            description="Pending Invoices"
            value={"R" + formatMoney() || ""}
            icon={BanknoteX}
            color="orange"
          ></DashboardCard>
          <DashboardCard
            description="Upcoming Dates"
            value={dashboardInformation.upcomingDates?.toString() || ""}
            icon={CalendarDays}
            color="green"
          ></DashboardCard>
          <DashboardCard
            description="Documents Stored"
            value={dashboardInformation.documentsStored?.toString() || ""}
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
};

export default DashboardPage;
