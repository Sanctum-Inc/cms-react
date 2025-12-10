export interface InvoiceItemEntry {
  date: Date;
  description: string;
  hours: number;
  rate: number | null;
  amount: number;
}

export interface Invoice {
  id: string;
  caseId: string;
  invoiceNumber: string;
  caseNumber: string;
  status: string;
  Items: InvoiceItemEntry[];
  total: number;
  plaintiff: string;
  defendant: string;
}
