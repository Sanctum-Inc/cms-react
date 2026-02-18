import type { KeyValue } from "../InputItem";

export const CourtCaseOutcomeOptions: KeyValue[] = [
  { key: "0", value: "No Outcome Yet" },
  { key: "1", value: "Guilty" },
  { key: "2", value: "Not Guilty" },
  { key: "3", value: "Liable" },
  { key: "4", value: "Not Liable" },
  { key: "5", value: "Settled" },
  { key: "6", value: "Withdrawn" },
  { key: "7", value: "Dismissed" },
  { key: "8", value: "Struck Off" },
  { key: "9", value: "Postponed" },
  { key: "10", value: "Judgment for Plaintiff" },
  { key: "11", value: "Judgment for Defendant" },
  { key: "12", value: "Partially Granted" },
  { key: "13", value: "Appealed" },
  { key: "14", value: "Overturned on Appeal" },
] as const;
