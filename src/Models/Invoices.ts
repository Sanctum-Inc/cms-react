import type { InvoiceStatus } from "../api/models/InvoiceStatus";

export interface InvoiceItemEntry {
  date: Date;
  description: string;
  hours: number;
  costPerHour: number;
  amount: number;
  caseId: string;
  invoiceId: string;
  id: string;
}

export interface Invoice {
  id: string;
  caseId: string;
  invoiceNumber: string;
  caseNumber: string;
  Items: InvoiceItemEntry[];
  total: number;
  plaintiff: string;
  defendant: string;
  status: InvoiceStatus;
}

  export const statusLabels: Record<number, string> = {
    0: "Pending",
    1: "Sent",
    2: "Paid",
    3: "Overdue",
    4: "Cancelled",
    5: "Partially Paid",
    6: "Draft",
  };