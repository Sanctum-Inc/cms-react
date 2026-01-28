import type { InvoiceStatus } from "../api";

interface CourtCases {
    id: string;
    caseNumber: string;
    location: string;
    plaintiff: string;
    type: string;
    nextDate: string;
    internalStatus: InvoiceStatus;
  };

export type { CourtCases };