import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import DashboardPage from "../Pages/DashboardPage";
import type { LucideProps } from "lucide-react";

vi.mock("../Components/Dashboard/DashboardCard", () => ({
  default: ({ description, value, color, icon }: {
    description: string;
    value: string;
    color: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  }) => (
    <div data-testid="dashboard-card">
      <span>{description}</span>
      <span>{value}</span>
      <span>{color}</span>
      <span>{icon?.name ?? "icon"}</span>
    </div>
  ),
}));

vi.mock("../Components/Dashboard/DashBoardActivityCard", () => ({
  default: ({ title, items, clickable }: {
    title: string;
    items: {
        color: string;
        title: string;
        description: string;
        time: string;
        icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        type: string;
    }[];
    clickable?: boolean;
  }) => (
    <div data-testid="dashboard-activity-card">
      <h2>{title}</h2>
      <div>{items.length} items</div>
      <div>{clickable ? "clickable" : "not clickable"}</div>
    </div>
  ),
}));

describe("DashboardPage", () => {
  it("renders the page header with current date and time", () => {
    render(<DashboardPage />);

    expect(screen.getByText(/DashBoard/i)).toBeInTheDocument();

    // The date format is YYYY-MM-DD, check for that pattern in rendered text
    const dateTimeText = screen.getByText(/^\d{4}-\d{2}-\d{2} \| \d{2}:\d{2}$/);
    expect(dateTimeText).toBeInTheDocument();
  });

  it("renders 4 dashboard cards with correct descriptions and values", () => {
    render(<DashboardPage />);
    const cards = screen.getAllByTestId("dashboard-card");
    expect(cards).toHaveLength(4);

    const totalCasesCard = cards.find((card) =>
      card.textContent?.includes("Total Cases")
    );
    expect(totalCasesCard).toBeDefined();
    expect(totalCasesCard).toHaveTextContent("25");

    const pendingInvoicesCard = cards.find((card) =>
      card.textContent?.includes("Pending Invoices")
    );
    expect(pendingInvoicesCard).toBeDefined();
    expect(pendingInvoicesCard).toHaveTextContent("R235 000");

    const activeLawyersCard = cards.find((card) =>
      card.textContent?.includes("Active Lawyers")
    );
    expect(activeLawyersCard).toBeDefined();
    expect(activeLawyersCard).toHaveTextContent("12");

    const documentsStoredCard = cards.find((card) =>
      card.textContent?.includes("Documents Stored")
    );
    expect(documentsStoredCard).toBeDefined();
    expect(documentsStoredCard).toHaveTextContent("1896");
  });


  it("renders two dashboard activity cards with titles and items count", () => {
    render(<DashboardPage />);
    const activityCards = screen.getAllByTestId("dashboard-activity-card");
    expect(activityCards).toHaveLength(2);

    expect(screen.getByText(/Recent Case Activity/i)).toBeInTheDocument();
    expect(screen.getByText("3 items")).toBeInTheDocument();

    expect(screen.getByText(/Upcoming Court Dates/i)).toBeInTheDocument();
    expect(screen.getByText("4 items")).toBeInTheDocument();

    expect(screen.getByText("clickable")).toBeInTheDocument();
  });
});
