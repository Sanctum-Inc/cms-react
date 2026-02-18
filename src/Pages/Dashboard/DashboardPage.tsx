import {
  BanknoteX,
  BriefcaseBusiness,
  CalendarDays,
  FolderOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  type CourtCaseDateTypes,
  type DashBoardResult,
  DashboardService,
} from "../../api";
import ErrorAlert from "../../Components/Feedback/Alerts/ErrorAlert";
import Header from "../../Components/Header/Header";
import type { CardItem } from "../../Models/CardItem";
import { CourtCaseDateTypeOptions } from "../../Models/InputOptions/CourtCaseDateTypeOptions";
import DashBoardActivityCard from "./DashBoardActivityCard";
import DashboardCard from "./DashboardCard";

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

  const [courtCaseItems, setCourtCaseItems] = useState<CardItem[]>([]);

  const [getTime, setTime] = useState("");

  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );
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
        setDashboardInformation(response);
        const mappedActivity = response.recentCases.map(
          (item) =>
            ({
              color: "green",
              title: item.actitvityTitle,
              description: item.activityDescription,
              time: item.timeSince,
            }) as CardItem,
        );
        setActivityItems(mappedActivity);

        const mappedCourtDates = response.upcomingCases.map(
          (item) =>
            ({
              color: courtCaseDateTypeClassMap[item.courtDateType],
              title: item.courtDateTitle,
              description: item.courtDateDescription,
              time: item.date,
              type: CourtCaseDateTypeOptions[item.courtDateType].value,
              caseId: item.id,
            }) as CardItem,
        );

        setCourtCaseItems(mappedCourtDates);
      })
      .catch(() => {
        setErrorAlertMessage("Failed to load dashboard. Please try again.");
      });
  }, []);

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

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
        <div className="w-full flex justify-between p-3 gap-10">
          <DashboardCard
            description="Total Cases"
            value={dashboardInformation.totalCases?.toString() || ""}
            icon={BriefcaseBusiness}
            color="blue"
            linkTo="/court-case"
          ></DashboardCard>
          <DashboardCard
            description="Pending Invoices"
            value={"R" + formatMoney() || ""}
            icon={BanknoteX}
            color="orange"
            linkTo="/invoices"
          ></DashboardCard>
          <DashboardCard
            description="Upcoming Dates"
            value={dashboardInformation.upcomingDates?.toString() || ""}
            icon={CalendarDays}
            color="green"
            linkTo="/dates"
          ></DashboardCard>
          <DashboardCard
            description="Documents Stored"
            value={dashboardInformation.documentsStored?.toString() || ""}
            icon={FolderOpen}
            color="purple"
            linkTo="/documents"
          ></DashboardCard>
        </div>
        <div className="w-full h-full p-3">
          <DashBoardActivityCard
            items={activityItems}
            title="Recent Case Activity"
            size="40"
            cardType="activity"
          />
        </div>
        <div className="w-full h-full p-3">
          <DashBoardActivityCard
            items={courtCaseItems}
            title="Upcoming Court Dates"
            size="25"
            clickable={true}
            cardType="dates"
          />
        </div>
        {renderErrorMessage()}
      </div>
    </>
  );
};

export default DashboardPage;
