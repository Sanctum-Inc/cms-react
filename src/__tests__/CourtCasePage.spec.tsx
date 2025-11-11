import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourtCasePage from "../Pages/CourtCasePage";
import { vi, describe, it, expect } from "vitest";

// --- MOCK CHILD COMPONENTS ---
vi.mock("../Components/Buttons/PrimaryButton", () => ({
  default: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock("../Components/Cards/Card", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("../Components/Cards/CourtCaseCard", () => ({
  default: (props: any) => (
    <div data-testid="court-case-card">
      {props.caseNumber} | {props.location} | {props.status}
    </div>
  ),
}));

vi.mock("../Components/Inputs/PillInput", () => ({
  default: ({ label }: any) => <div data-testid="pill-input">{label}</div>,
}));

describe("CourtCasePage", () => {
  it("renders header and default case cards", async () => {
    render(<CourtCasePage />);
    expect(screen.getByText(/Case Management/i)).toBeInTheDocument();

    const cards = await screen.findAllByTestId("court-case-card");
    expect(cards.length).toBe(3);
  });

  it("opens and closes the modal", async () => {
    render(<CourtCasePage />);
    const user = userEvent.setup();

    const openBtn = screen.getByRole("button", { name: /Add New Case/i });
    await user.click(openBtn);
    expect(screen.getByText(/New Court Case/i)).toBeInTheDocument();

    await user.click(screen.getByText("x"));
    expect(screen.queryByText(/New Court Case/i)).not.toBeInTheDocument();
  });

  it("filters cases by search", async () => {
    render(<CourtCasePage />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/Search all case details/i);
    await user.type(input, "Los Angeles");

    const cards = await screen.findAllByTestId("court-case-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent(/Los Angeles/i);
  });

  it("filters by status dropdown", async () => {
    render(<CourtCasePage />);
    const user = userEvent.setup();

    // Find the select by its label
    const select = screen.getByLabelText(/Status/i);
    await user.selectOptions(select, "Closed");

    const cards = await screen.findAllByTestId("court-case-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent(/Closed/i);
  });


  it("toggles sort order when clicking case number header", async () => {
    render(<CourtCasePage />);
    const user = userEvent.setup();

    // Wait for initial cases
    await waitFor(() => {
      expect(screen.getAllByTestId("court-case-card").length).toBeGreaterThan(
        0
      );
    });

    const header = screen.getByText("Case Number");
    await user.click(header);
    await user.click(header);

    // Re-fetch cards (sorting toggled)
    const cards = await screen.findAllByTestId("court-case-card");
    expect(cards.length).toBe(3);
  });
});
