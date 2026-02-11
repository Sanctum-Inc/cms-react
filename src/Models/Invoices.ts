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
