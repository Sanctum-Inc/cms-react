export interface InvoiceItemEntry {
  date: Date;
  description: string;
  hours: number;
  rate: number;
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

export type InvoiceStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;


  export const statusLabels: Record<number, string> = {
    0: "Pending",
    1: "Sent",
    2: "Paid",
    3: "Overdue",
    4: "Cancelled",
    5: "Partially Paid",
    6: "Draft",
  };