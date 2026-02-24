// cypress/e2e/dashboard.mocked.cy.ts
describe("Dashboard - fully mocked API", () => {
  beforeEach(() => {
    // installs all intercepts and visits app with mocked auth
    cy.mockLoginAndVisit("/dashboard");
    // wait for dashboard API to be requested (mocked)
    cy.wait("@getDashboard");
  });

  it("renders dashboard header", () => {
    cy.contains("Dashboard").should("be.visible");
  });

  it("shows summary cards with values from mocked API", () => {
    cy.get('[data-testid="dashboard-total-cases"]').should(
      "contain.text",
      "101",
    );
    cy.get('[data-testid="dashboard-total-invoices"]').should(
      "contain.text",
      "R1,591,790.55",
    );

    cy.get('[data-testid="dashboard-total-dates"]').should("contain", "50");

    cy.get('[data-testid="dashboard-total-documents"]').should(
      "contain",
      "105",
    );
  });

  it("shows recent case activity list from mocked API", () => {
    cy.get('[data-testid="dashboard-activity-card"]')
      .should("be.visible")
      .parent()
      .contains("File crest-removebg.png has been added.")
      .should("exist");
  });

  it("shows upcoming court dates from mocked API", () => {
    cy.get('[data-testid="dashboard-upcoming-card"]')
      .should("be.visible")
      .parent()
      .contains("CC-9878/2026")
      .should("exist");
  });

  it("can click logout and land on login page (if available)", () => {
    // If logout exists on your UI
    cy.contains("Logout").click({ force: true });
    cy.url().should("include", "/login");
  });
});
