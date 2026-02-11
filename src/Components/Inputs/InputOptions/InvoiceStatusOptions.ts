import type { KeyValue } from "../../../Models/InputItem";

export const InvoiceStatusOptions: KeyValue[] = [
  { key: "0", value: "Pending" },
  { key: "1", value: "Sent" },
  { key: "2", value: "Paid" },
  { key: "3", value: "Overdue" },
  { key: "4", value: "Cancelled" },
  { key: "5", value: "Partially Paid" },
  { key: "6", value: "Draft" },
] as const;
