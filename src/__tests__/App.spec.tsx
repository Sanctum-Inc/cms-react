import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import App from "../App";

// Mock child components
vi.mock("../Components/Navigation/Navigation", () => ({
  default: () => <div data-testid="navigation">Navigation Mock</div>,
}));

vi.mock("../Pages/DashboardPage", () => ({
  default: () => <div data-testid="dashboard-page">Dashboard Mock</div>,
}));

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
    // Just check that the root structure exists
    const appContainer = screen.getByTestId("navigation");
    expect(appContainer).toBeInTheDocument();
  });

  it("renders Navigation and DashboardPage", () => {
    render(<App />);

    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });
});
