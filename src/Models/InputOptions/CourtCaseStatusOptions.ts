import type { KeyValue } from "../InputItem";

export const CourtCaseStatusOptions: KeyValue[] = [
  { key: "0", value: "Draft" },
  { key: "1", value: "Filed" },
  { key: "2", value: "Pending" },
  { key: "3", value: "Scheduled" },
  { key: "4", value: "In Progress" },
  { key: "5", value: "On Hold" },
  { key: "6", value: "Postponed" },
  { key: "7", value: "Settled" },
  { key: "8", value: "Judgement Delivered" },
  { key: "9", value: "Closed" },
  { key: "10", value: "Dismissed" },
  { key: "11", value: "Withdrawn" },
  { key: "12", value: "Cancelled" },
] as const;
