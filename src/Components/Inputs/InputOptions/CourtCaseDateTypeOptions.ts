import type { KeyValue } from "../../../Models/InputItem";


export const CourtCaseDateTypeOptions: KeyValue[] = [
  { key: "0", value: "Unknown" },

  { key: "1", value: "Hearing" },
  { key: "2", value: "Trial" },
  { key: "3", value: "Motion Hearing" },
  { key: "4", value: "Pre-Trial Conference" },

  { key: "5", value: "Filing Deadline" },
  { key: "6", value: "Submission Deadline" },
  { key: "7", value: "Response Deadline" },

  { key: "8", value: "Arraignment" },
  { key: "9", value: "Sentencing" },
  { key: "10", value: "Judgment" },
  { key: "11", value: "Settlement Conference" },

  { key: "12", value: "Mention" },
  { key: "13", value: "Status Conference" },
  { key: "14", value: "Mediation" },
] as const;

export const CourtCaseDateTypeMap = Object.fromEntries(
  CourtCaseDateTypeOptions.map((o) => [o.key, o.value]),
) as Record<string, string>;
