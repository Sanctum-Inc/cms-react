describe("Invoice Management Page", () => {
  beforeEach(() => {
    cy.mockLoginAndVisit("/invoices");

    cy.wait("@getUserById");
    cy.wait("@getInvoices");
  });

  it("should render invoice list", () => {
    // Invoice 0 — Paid
    cy.get("[data-testid='InvoiceCard-2']")
      .should("contain.text", "INV-2026-001")
      .should("contain.text", "Destinee Mraz vs Jeffrey Thompson")
      .should("contain.text", "R81,961.23")
      .should("contain.text", "Sent")
      .should("be.visible");

    // Invoice 1 — Partially Paid
    cy.get("[data-testid='InvoiceCard-1']")
      .should("contain.text", "INV-2026-002")
      .should("contain.text", "Ada Stark vs Werner Spinka")
      .should("contain.text", "R105,423.36")
      .should("contain.text", "Paid")
      .should("be.visible");

    // Invoice 2 — Pending
    cy.get("[data-testid='InvoiceCard-0']")
      .should("contain.text", "INV-2026-003")
      .should("contain.text", "Annabelle Graham vs Cleo Marvin")
      .should("contain.text", "R100,909.09")
      .should("contain.text", "Pending")
      .should("be.visible");
  });

  it("should expand and collapse invoice items", () => {
    cy.get("[data-testid='InvoiceCard-0']").within(() => {
      cy.contains("Show Items").click();
    });

    cy.get("[data-testid='InvoiceItems-0']")
      .should("be.visible")
      .should("contain.text", "Legal Consultation")
      .should("contain.text", "10")
      .should("contain.text", "R1,500")
      .should("contain.text", "R15,000")
      .should("contain.text", "Sun Feb 15 2026");

    cy.contains("Show Items").click();

    cy.get("[data-testid='InvoiceItems-0']").should("not.exist");
  });

  it("should filter invoices by status", () => {
    cy.get("select[name='status-filter']").select("Paid");

    cy.get("[data-testid^='InvoiceCard-']").each(($card) => {
      cy.wrap($card).should("contain.text", "Paid");
    });

    cy.get("[data-testid^='InvoiceCard-']").should("have.length", 1);
  });

  it("should search invoices", () => {
    cy.get("input[placeholder='Search all case details...']").type(
      "INV-2026-002",
    );

    cy.get("[data-testid^='InvoiceCard-']")
      .should("have.length", 1)
      .first()
      .should("contain.text", "INV-2026-002");
  });

  it("should open Add Invoice modal", () => {
    cy.contains("Add New Invoice").click();
    cy.wait("@getCaseNumbers");

    cy.get("[data-testid='AddInvoiceModal']").should("be.visible");

    cy.get("select[name='caseId']").should("exist");
    cy.get("select[name='invoiceId']").should("exist");
    cy.get("input[name='name']").should("exist");
    cy.get("input[name='hours']").should("exist");

    cy.get("input[name='costPerHour']").should("exist").and("not.be.disabled");
  });

  it("should create invoice successfully", () => {
    cy.contains("Add New Invoice").click();

    cy.get("select[name='caseId']").select(1);
    cy.get("select[name='invoiceId']").select(2);
    cy.get("input[name='name']").type("Court Hearing");
    cy.get("input[name='date']").type(new Date().toISOString().split("T")[0]);
    cy.get("input[name='hours']").type("3");
    cy.get("input[name='costPerHour']").type("1500");

    cy.contains("Create Invoice").click();

    cy.wait("@createInvoiceItem");

    cy.contains("Invoice item created successfully!").should("be.visible");
  });

  it("should show error when invoice creation fails", () => {
    cy.intercept("POST", "**/api/InvoiceItem", {
      statusCode: 500,
    }).as("createInvoiceItem");

    cy.contains("Add New Invoice").click();

    cy.get("select[name='caseId']").select(1);
    cy.get("select[name='invoiceId']").select(2);
    cy.get("input[name='name']").type("Court Hearing");
    cy.get("input[name='date']").type(new Date().toISOString().split("T")[0]);
    cy.get("input[name='hours']").type("3");
    cy.get("input[name='costPerHour']").type("1500");

    cy.contains("Create Invoice").click();

    cy.wait("@createInvoiceItem");

    cy.contains("Failed to create invoice item. Please try again.").should(
      "be.visible",
    );
  });

  it("should open invoice actions dropdown", () => {
    cy.get("[data-testid='InvoiceCard-0']").within(() => {
      cy.get("[data-testid='InvoiceActionsButton']").click();
    });

    cy.contains("Add new Item").should("be.visible");
    cy.get("body").then(($body) => {
      expect($body.text()).to.satisfy(
        (text) =>
          text.includes("Set to Paid") || text.includes("Set to Unpaid"),
      );
    });
    cy.contains("View Generated PDF").should("be.visible");
    cy.contains("Share via Email").should("be.visible");
  });

  it("should delete invoice", () => {
    cy.get("[data-testid='InvoiceCard-0']").within(() => {
      cy.contains("Show Items").click();
      cy.get("[data-testid='InvoiceItemActionsButton-0']").click();
      cy.contains("Delete").click();
    });

    cy.wait("@deleteInvoiceItem");

    cy.contains("Invoice item deleted successfully").should("be.visible");
  });
});
