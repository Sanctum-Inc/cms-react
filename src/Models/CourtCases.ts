import type { CourtCaseTypes, InvoiceStatus } from "../api";

interface CourtCases {
    id: string;
    caseNumber: string;
    location: string;
    plaintiff: string;
    type: CourtCaseTypes;
    nextDate: string;
    internalStatus: InvoiceStatus;
  };

export type { CourtCases };