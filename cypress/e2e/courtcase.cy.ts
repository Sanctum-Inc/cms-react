// cypress/e2e/courtCasePage.spec.ts
describe("Court Case Page", () => {
  beforeEach(() => {
    // Intercept the API call to fetch all court cases
    // cy.intercept("GET", "/api/court-cases", {
    //   fixture: "courtCases.json", // mock your court cases
    // }).as("getCourtCases");

    cy.mockLoginAndVisit("/court-case"); // update with your route
    cy.wait("@getUserById");
    cy.wait("@getCourtCases");
  });

  it("should render all court cases", () => {
    cy.get("[data-testid='CourtCasePageCard-0']")
      .should("exist")
      .should("contain.text", "CC-9879/2026")
      .should("contain.text", "Polokwane")
      .should("contain.text", "2026-02-11")
      .should("contain.text", "Michael Scott")
      .should("be.visible");

    cy.get("[data-testid='CourtCasePageCard-1']")
      .should("exist")
      .should("contain.text", "CC-9878/2026")
      .should("contain.text", "Johannesburg")
      .should("contain.text", "2026-02-10")
      .should("contain.text", "Dewayne Hoppe")
      .should("be.visible");
  });

  it("should filter cases by status", () => {
    cy.get("select[name='status-filter']").select("Pending");
    cy.get("[data-testid='CourtCasePageCard-0']")
      .should("exist")
      .should("contain.text", "CC-9879/2026")
      .should("contain.text", "Polokwane")
      .should("contain.text", "2026-02-11")
      .should("contain.text", "Michael Scott")
      .should("be.visible");
    cy.get("[data-testid^='CourtCasePageCard-']").should("have.length", 1);
  });

  it("should filter cases by type", () => {
    cy.get("select[name='type-filter']").select("Criminal");
    cy.get("[data-testid='CourtCasePageCard-0']")
      .should("exist")
      .should("contain.text", "CC-9879/2026")
      .should("contain.text", "Polokwane")
      .should("contain.text", "2026-02-11")
      .should("contain.text", "Michael Scott")
      .should("be.visible");
    cy.get("[data-testid^='CourtCasePageCard-']").should("have.length", 1);
  });

  it("should open the add court case modal", () => {
    cy.contains("Add New Case").click();
    cy.get("[data-testid='addCourtCaseModal']").should("exist");
    cy.get("input[name='caseNumber']").should("exist");
    cy.get("input[name='location']").should("exist");
    cy.get("input[name='plaintiff']").should("exist");
    cy.get("input[name='defendant']").should("exist");
    cy.get("select[name='status']").should("exist");
    cy.get("select[name='type']").should("exist");
    cy.get("select[name='outcome']").should("exist");
  });

  it("should submit a new court case successfully", () => {
    cy.intercept("POST", "/api/court-cases", {
      statusCode: 200,
      body: 999, // new case ID
    }).as("createCourtCase");

    cy.contains("Add New Case").click();

    cy.get("input[name='caseNumber']").type("CC-9999/2026");
    cy.get("input[name='location']").type("Test Court");
    cy.get("input[name='plaintiff']").type("Test Plaintiff");
    cy.get("input[name='defendant']").type("Test Defendant");
    cy.get("select[name='status']").select("Pending");
    cy.get("select[name='type']").select("Civil");
    cy.get("select[name='outcome']").select("No Outcome Yet");

    cy.contains("Create Court Case").click();
    cy.wait("@createCourtCase");

    cy.contains("Court case created successfully!").should("be.visible");
    cy.get("[data-testid='CourtCasePageCard-2']")
      .should("exist")
      .should("contain.text", "CC-9999/2026")
      .should("contain.text", "Test Court")
      .should("contain.text", "Test Plaintiff")
      .should("contain.text", "Pending")
      .should("contain.text", "Civil")
      .should("be.visible");
  });

  it("should show error when creating a case fails", () => {
    cy.intercept("POST", "**/api/CourtCase", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("createCourtCase");

    cy.contains("Add New Case").click();

    cy.get("input[name='caseNumber']").type("CC-0000/2026");
    cy.get("input[name='location']").type("Error Court");
    cy.get("input[name='plaintiff']").type("Error Plaintiff");

    cy.contains("Create Court Case").click();

    cy.wait("@createCourtCase");

    cy.contains("Failed to create court case. Please try again.").should(
      "be.visible",
    );
  });
});
