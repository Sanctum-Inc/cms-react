import type { KeyValue } from "../InputItem";

export const CourtCaseTypeOptions: KeyValue[] = [
  { key: "0", value: "Civil" },
  { key: "1", value: "Criminal" },
  { key: "2", value: "Family" },
  { key: "3", value: "Commercial" },
  { key: "4", value: "Labour" },
  { key: "5", value: "Constitutional" },
  { key: "6", value: "Administrative" },
  { key: "7", value: "Tax" },
  { key: "8", value: "Small Claims" },
  { key: "9", value: "Probate" },
  { key: "10", value: "Insolvency" },
  { key: "11", value: "Environmental" },
  { key: "12", value: "Intellectual Property" },
  { key: "13", value: "Immigration" },
] as const;
