interface CourtCases {
    caseNumber: string;
    location: string;
    plaintiff: string;
    type: string;
    nextDate: string;
    internalStatus: "open" | "closed" | "pending";
  };

export type { CourtCases };