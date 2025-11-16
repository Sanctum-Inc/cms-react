export interface InvoiceItemEntry {
  date: string;
  description: string;
  hours: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  invoiceNumber: string;
  clientName: string;
  caseNumber: string;
  status: string;
  Items: InvoiceItemEntry[];
  total: number;
}
