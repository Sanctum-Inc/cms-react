/// <reference types="cypress" />

Cypress.Commands.add("mockApi", () => {
  // ─── User ─────────────────────────────────────────────────────────────────

  cy.intercept("POST", "**/api/User/login", {
    statusCode: 200,
    body: {
      token: "mocked-jwt-token",
      expiration: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      refreshToken: "mocked-refresh-token",
    },
  }).as("login");

  cy.intercept("POST", "**/api/User/register", { statusCode: 200 }).as(
    "register",
  );

  cy.intercept("POST", "**/api/User/forgot-password", {
    statusCode: 200,
    body: true,
  }).as("forgotPassword");

  cy.intercept("POST", "**/api/User/change-password", {
    statusCode: 200,
    body: true,
  }).as("changePassword");

  cy.intercept("GET", "**/api/User/confirm-email*", { statusCode: 200 }).as(
    "confirmEmail",
  );

  cy.intercept("GET", "**/api/User/confirm-email/resend/*", {
    statusCode: 200,
    body: true,
  }).as("resendConfirmEmail");

  cy.intercept("GET", "**/api/User/*", { statusCode: 200, body: {} }).as(
    "getUserById",
  );

  // ─── Dashboard ────────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/Dashboard", {
    statusCode: 200,
    body: {
      totalCases: 101,
      totalInvoices: 1591790.55,
      upcomingDates: 50,
      documentsStored: 105,
      recentCases: [
        {
          actitvityTitle: "File crest-removebg.png has been added.",
          activityDescription:
            "File crest-removebg.png has been added. For case: CC-4033/2026",
          date: "2026-02-11T10:03:59Z",
          timeSince: "8 days ago",
        },
      ],
      upcomingCases: [
        {
          courtDateTitle: "2026-02-10",
          courtDateDescription: "CC-9878/2026: Dewayne Hoppe vs Cruz Luettgen",
          date: "2026-02-10T09:00:00Z",
          courtDateType: 1,
          id: "11111111-1111-1111-1111-111111111111",
        },
      ],
    },
  }).as("getDashboard");

  // ─── CourtCase ────────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/CourtCase/case-numbers", {
    statusCode: 200,
    body: [
      { caseId: "cc-1-uuid", caseNumber: "CC-9878/2026" },
      { caseId: "cc-2-uuid", caseNumber: "CC-9878/2026" },
      { caseId: "cc-3-uuid", caseNumber: "CC-9878/2026" },
    ],
  }).as("getCaseNumbers");

  cy.intercept("GET", "**/api/CourtCase/court-case-information/*", {
    statusCode: 200,
    body: {
      caseId: "cc-1-uuid",
      caseNumber: "CC-9878/2026",
      location: "Johannesburg",
      plaintiff: "Dewayne Hoppe",
      defendant: "Cruz Luettgen",
      caseType: 1,
      caseOutcomes: 0,
      createdAt: "2026-01-01T00:00:00Z",
      lastModified: "2026-01-01T00:00:00Z",
      dates: [],
      documents: [],
      invoices: [],
      lawyers: [],
    },
  }).as("getCourtCaseInformation");

  cy.intercept("GET", "**/api/CourtCase/", {
    statusCode: 200,
    body: {
      id: "cc-1-uuid",
      caseNumber: "CC-9878/2026",
      status: 1,
      location: "Johannesburg",
      nextDate: "2026-02-10T09:00:00Z",
      plaintiff: "Dewayne Hoppe",
      type: 1,
    },
  }).as("getCourtCaseById");

  cy.intercept("GET", "**/api/CourtCase", {
    statusCode: 200,
    body: [
      {
        id: "cc-1-uuid",
        caseNumber: "CC-9878/2026",
        status: 1,
        location: "Johannesburg",
        nextDate: "2026-02-10T09:00:00Z",
        plaintiff: "Dewayne Hoppe",
        type: 3,
      },
      {
        id: "cc-1-uuid",
        caseNumber: "CC-9879/2026",
        status: 2,
        location: "Polokwane",
        nextDate: "2026-02-11T09:00:00Z",
        plaintiff: "Michael Scott",
        type: 1,
      },
    ],
  }).as("getCourtCases");

  cy.intercept("POST", "**/api/CourtCase", {
    statusCode: 201,
    body: "cc-1-uuid",
  }).as("createCourtCase");

  cy.intercept("PUT", "**/api/CourtCase/*", {
    statusCode: 204,
    body: true,
  }).as("updateCourtCase");

  cy.intercept("DELETE", "**/api/CourtCase/*", {
    statusCode: 204,
    body: true,
  }).as("deleteCourtCase");

  // ─── CourtCaseDate ────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/CourtCaseDate/*", {
    statusCode: 200,
    body: {
      overdueItems: 0,
      completionRate: 75,
      upcomingEvents: 3,
      changeFromLastMonth: 10.5,
      deadlineCase: null,
      courtCaseDateItems: [],
    },
  }).as("getCourtCaseDateById");

  cy.intercept("GET", "**/api/CourtCaseDate", {
    statusCode: 200,
    body: {
      overdueItems: 2,
      completionRate: 75,
      upcomingEvents: 5,
      changeFromLastMonth: 10.5,
      deadlineCase: {
        id: "date-1-uuid",
        date: "2026-03-01",
        title: "Hearing",
        caseNumber: "CC-9878/2026",
        caseId: "cc-1-uuid",
        courtCaseDateType: 1,
        subtitle: "Hearing subtitle",
        description: "Upcoming hearing",
        status: "Pending",
      },
      courtCaseDateItems: [
        {
          id: "date-1-uuid",
          date: "2026-03-01",
          title: "Hearing",
          caseNumber: "CC-9878/2026",
          caseId: "cc-1-uuid",
          courtCaseDateType: 1,
          subtitle: "Hearing subtitle",
          description: "Upcoming hearing",
          status: "Pending",
        },
      ],
    },
  }).as("getCourtCaseDates");

  cy.intercept("POST", "**/api/CourtCaseDate", {
    statusCode: 201,
    body: true,
  }).as("createCourtCaseDate");

  cy.intercept("PUT", "**/api/CourtCaseDate/*", {
    statusCode: 204,
    body: true,
  }).as("updateCourtCaseDate");

  cy.intercept("DELETE", "**/api/CourtCaseDate/*", {
    statusCode: 204,
    body: true,
  }).as("deleteCourtCaseDate");

  cy.intercept("PATCH", "**/api/CourtCaseDate/cancelled/*", {
    statusCode: 204,
    body: true,
  }).as("cancelCourtCaseDate");

  cy.intercept("PATCH", "**/api/CourtCaseDate/complete/*", {
    statusCode: 204,
    body: true,
  }).as("completeCourtCaseDate");

  // ─── Document ─────────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/Document/*/download", {
    statusCode: 200,
    body: {},
  }).as("downloadDocument");

  cy.intercept("GET", "**/api/Document/*", {
    statusCode: 200,
    body: {
      id: "doc-1-uuid",
      name: "crest-removebg",
      fileName: "crest-removebg.png",
      size: 12345,
      created: "2026-02-11T10:03:59Z",
      caseId: "cc-1-uuid",
      contentType: "image/png",
      createdBy: "user-1-uuid",
    },
  }).as("getDocumentById");

  cy.intercept("GET", "**/api/Document", {
    statusCode: 200,
    body: [
      {
        id: "doc-1-uuid",
        name: "crest-removebg",
        fileName: "crest-removebg.png",
        size: 12345,
        created: "2026-02-11T10:03:59Z",
        caseId: "cc-1-uuid",
        contentType: "image/png",
        createdBy: "user-1-uuid",
      },
    ],
  }).as("getDocuments");

  cy.intercept("POST", "**/api/Document/upload", {
    statusCode: 201,
    body: true,
  }).as("uploadDocument");

  cy.intercept("PUT", "**/api/Document/*", {
    statusCode: 204,
    body: true,
  }).as("updateDocument");

  cy.intercept("DELETE", "**/api/Document/*", {
    statusCode: 204,
    body: true,
  }).as("deleteDocument");

  // ─── Invoice ──────────────────────────────────────────────────────────────

  // -----------------------------
  // GET ALL INVOICES
  // -----------------------------
  cy.intercept("GET", "**/api/Invoice", {
    statusCode: 200,
    body: [
      {
        id: "inv-1-uuid",
        invoiceNumber: "INV-2026-001",
        invoiceDate: "2026-02-01T00:00:00Z",
        clientName: "ACME Corp",
        reference: "Ref-AC-01",
        totalAmount: 81961.23,
        accountName: "ACME Holdings",
        bank: "FNB",
        branchCode: "250655",
        accountNumber: "12345678",
        status: 1, // Paid
        caseNumber: "CC-1701/2026",
        plaintiff: "Destinee Mraz",
        defendant: "Jeffrey Thompson",
        caseId: "cc-1-uuid",
        items: [
          {
            id: "item-1",
            date: "2026-02-06T00:00:00Z",
            name: "Expert Witness Fee",
            hours: 18,
            costPerHour: 654.65,
            total: 11783.7,
          },
          {
            id: "item-2",
            date: "2026-02-06T00:00:00Z",
            name: "Document Preparation",
            hours: 15,
            costPerHour: 3663.71,
            total: 54955.65,
          },
        ],
      },
      {
        id: "inv-2-uuid",
        invoiceNumber: "INV-2026-002",
        invoiceDate: "2026-02-10T00:00:00Z",
        clientName: "Stark Industries",
        reference: "Ref-ST-02",
        totalAmount: 105423.36,
        accountName: "Stark Holdings",
        bank: "Standard Bank",
        branchCode: "051001",
        accountNumber: "87654321",
        status: 2, // Partially Paid
        caseNumber: "CC-4312/2026",
        plaintiff: "Ada Stark",
        defendant: "Werner Spinka",
        caseId: "cc-2-uuid",
        items: [
          {
            id: "item-3",
            date: "2026-02-10T00:00:00Z",
            name: "Court Appearance",
            hours: 7,
            costPerHour: 1715.79,
            total: 12010.53,
          },
          {
            id: "item-4",
            date: "2026-02-10T00:00:00Z",
            name: "Administrative Work",
            hours: 3,
            costPerHour: 1070.45,
            total: 3211.35,
          },
        ],
      },
      {
        id: "inv-3-uuid",
        invoiceNumber: "INV-2026-003",
        invoiceDate: "2026-02-15T00:00:00Z",
        clientName: "Wayne Enterprises",
        reference: "Ref-WE-03",
        totalAmount: 100909.09,
        accountName: "Wayne Corp",
        bank: "ABSA",
        branchCode: "632005",
        accountNumber: "99999999",
        status: 0, // Pending
        caseNumber: "CC-9001/2026",
        plaintiff: "Annabelle Graham",
        defendant: "Cleo Marvin",
        caseId: "cc-3-uuid",
        items: [
          {
            id: "item-5",
            date: "2026-02-15T00:00:00Z",
            name: "Legal Consultation",
            hours: 10,
            costPerHour: 1500,
            total: 15000,
          },
        ],
      },
    ],
  }).as("getInvoices");

  // -----------------------------
  // GET INVOICE BY ID
  // -----------------------------
  cy.intercept("GET", "**/api/Invoice/*", (req) => {
    const id = req.url.split("/").pop();

    req.reply({
      statusCode: 200,
      body: {
        id,
        invoiceNumber: "INV-2026-001",
        invoiceDate: "2026-02-01T00:00:00Z",
        clientName: "ACME Corp",
        reference: "Ref-AC-01",
        totalAmount: 81961.23,
        accountName: "ACME Holdings",
        bank: "FNB",
        branchCode: "250655",
        accountNumber: "12345678",
        status: 1,
        caseNumber: "CC-1701/2026",
        plaintiff: "Destinee Mraz",
        defendant: "Jeffrey Thompson",
        caseId: "cc-1-uuid",
        items: [],
      },
    });
  }).as("getInvoiceById");

  // -----------------------------
  // GET INVOICE NUMBERS
  // -----------------------------
  cy.intercept("GET", "**/api/Invoice/invoice-numbers", {
    statusCode: 200,
    body: [
      { invoiceId: "inv-1-uuid", invoiceNumber: "INV-2026-001" },
      { invoiceId: "inv-2-uuid", invoiceNumber: "INV-2026-002" },
      { invoiceId: "inv-3-uuid", invoiceNumber: "INV-2026-003" },
    ],
  }).as("getInvoiceNumbers");

  // -----------------------------
  // PDF ROUTES
  // -----------------------------
  cy.intercept("GET", "**/api/Invoice/pdf/*", {
    statusCode: 200,
    body: "https://mocked-pdf-link.com/invoice.pdf",
  }).as("getInvoicePdfLink");

  cy.intercept("GET", "**/api/Invoice/pdf/download/*", {
    statusCode: 200,
    body: {},
  }).as("downloadInvoicePdf");

  cy.intercept("GET", "**/api/Invoice/pdf/view/*", {
    statusCode: 200,
    body: {},
  }).as("viewInvoicePdf");

  // -----------------------------
  // CREATE
  // -----------------------------
  cy.intercept("POST", "**/api/Invoice", {
    statusCode: 201,
    body: "inv-999-uuid",
  }).as("createInvoice");

  // -----------------------------
  // UPDATE STATUS
  // -----------------------------
  cy.intercept("PUT", "**/api/Invoice/status/*", {
    statusCode: 204,
  }).as("updateInvoiceStatus");

  // -----------------------------
  // UPDATE
  // -----------------------------
  cy.intercept("PUT", "**/api/Invoice/*", {
    statusCode: 204,
  }).as("updateInvoice");

  // -----------------------------
  // DELETE
  // -----------------------------
  cy.intercept("DELETE", "**/api/Invoice/*", {
    statusCode: 204,
  }).as("deleteInvoice");

  // ─── InvoiceItem ──────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/InvoiceItem/*", {
    statusCode: 200,
    body: {
      id: "item-1-uuid",
      date: "2026-01-01T00:00:00Z",
      name: "Consultation",
      hours: 2,
      costPerHour: 1500.0,
      total: 3000.0,
    },
  }).as("getInvoiceItemById");

  cy.intercept("GET", "**/api/InvoiceItem", {
    statusCode: 200,
    body: [
      {
        id: "item-1-uuid",
        date: "2026-01-01T00:00:00Z",
        name: "Consultation",
        hours: 2,
        costPerHour: 1500.0,
        total: 3000.0,
      },
    ],
  }).as("getInvoiceItems");

  cy.intercept("POST", "**/api/InvoiceItem", {
    statusCode: 201,
    body: true,
  }).as("createInvoiceItem");

  cy.intercept("PUT", "**/api/InvoiceItem/*", {
    statusCode: 204,
    body: true,
  }).as("updateInvoiceItem");

  cy.intercept("DELETE", "**/api/InvoiceItem/*", {
    statusCode: 204,
  }).as("deleteInvoiceItem");

  // ─── Lawyer ───────────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/Lawyer/report/*", {
    statusCode: 200,
    body: {
      lawyerReportCards: [],
      invoices: [],
      caseDistributions: [],
      upcomingDeadlines: [],
      activityLog: [],
      lawyer: {
        id: "lawyer-1-uuid",
        name: "John",
        surname: "Doe",
        mobileNumber: "0821234567",
        email: "john.doe@firm.co.za",
        speciality: 1,
        totalCases: 5,
      },
    },
  }).as("getLawyerReport");

  cy.intercept("GET", "**/api/Lawyer/*", {
    statusCode: 200,
    body: {
      id: "lawyer-1-uuid",
      name: "John",
      surname: "Doe",
      mobileNumber: "0821234567",
      email: "john.doe@firm.co.za",
      speciality: 1,
      totalCases: 5,
    },
  }).as("getLawyerById");

  cy.intercept("GET", "**/api/Lawyer", {
    statusCode: 200,
    body: [
      {
        id: "lawyer-1-uuid",
        name: "John",
        surname: "Doe",
        mobileNumber: "0821234567",
        email: "john.doe@firm.co.za",
        speciality: 1,
        totalCases: 5,
      },
    ],
  }).as("getLawyers");

  cy.intercept("POST", "**/api/Lawyer", { statusCode: 201 }).as("createLawyer");

  cy.intercept("PUT", "**/api/Lawyer/*", { statusCode: 204 }).as(
    "updateLawyer",
  );

  cy.intercept("DELETE", "**/api/Lawyer/*", { statusCode: 204 }).as(
    "deleteLawyer",
  );

  // ─── Firm ─────────────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/Firm", {
    statusCode: 200,
    body: {
      id: "firm-1-uuid",
      name: "LexCase Attorneys",
      address: "123 Main St, Johannesburg",
      telephone: "0117654321",
      fax: "0117654322",
      mobile: "0821234567",
      email: "info@lexcase.co.za",
      attorneyAdmissionDate: "2010-01-01",
      advocateAdmissionDate: "2012-01-01",
      accountName: "LexCase Trust",
      bank: "FNB",
      branchCode: "250655",
      accountNumber: "62123456789",
      dateCreated: "2020-01-01T00:00:00Z",
    },
  }).as("getFirm");

  cy.intercept("POST", "**/api/Firm", {
    statusCode: 201,
    body: "firm-1-uuid",
  }).as("createFirm");

  cy.intercept("PUT", "**/api/Firm/*", { statusCode: 204, body: true }).as(
    "updateFirm",
  );

  cy.intercept("DELETE", "**/api/Firm/*", { statusCode: 204, body: true }).as(
    "deleteFirm",
  );

  // ─── Email ────────────────────────────────────────────────────────────────

  cy.intercept("GET", "**/api/Email/*", {
    statusCode: 200,
    body: {
      toAddresses: "client@example.com",
      ccAddresses: null,
      bccAddresses: null,
      subject: "Case Update",
      body: "Your case has been updated.",
      attachmentIds: null,
      status: 1,
      errorMessage: null,
      sentAt: "2026-02-01T10:00:00Z",
    },
  }).as("getEmailById");

  cy.intercept("GET", "**/api/Email", {
    statusCode: 200,
    body: [
      {
        toAddresses: "client@example.com",
        ccAddresses: null,
        bccAddresses: null,
        subject: "Case Update",
        body: "Your case has been updated.",
        attachmentIds: null,
        status: 1,
        errorMessage: null,
        sentAt: "2026-02-01T10:00:00Z",
      },
    ],
  }).as("getEmails");

  cy.intercept("POST", "**/api/Email", { statusCode: 201 }).as("createEmail");

  cy.intercept("PUT", "**/api/Email/*", {
    statusCode: 200,
    body: [],
  }).as("updateEmail");
});

Cypress.Commands.add("mockLoginAndVisit", (url: string) => {
  cy.mockApi();

  const token = createMockJwt();

  cy.visit(`/#${url}`, {
    onBeforeLoad(win) {
      win.localStorage.setItem("accessToken", token);
    },
  });
});

function createMockJwt() {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: "123",
    email: "cypress@lexcase.co.za",
    name: "Cypress User",
    role: "Admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const base64Url = (obj: object) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  return `${base64Url(header)}.${base64Url(payload)}.signature`;
}
