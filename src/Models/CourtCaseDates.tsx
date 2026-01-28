
import {
  User,
  Scale,
  FileTextIcon,
  Gavel,
  Clock,
} from "lucide-react";

export type CaseDateType =
  | "Meeting"
  | "Court Appearance"
  | "Internal Review"
  | "Consultation"
  | "Deadline";

export const CASE_DATE_CONFIG: Record<
  CaseDateType,
  {
    Icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    bg: string;
    iconColor: string;
  }
> = {
  Meeting: {
    Icon: User,
    bg: "bg-green-200",
    iconColor: "text-green-600",
  },
  "Court Appearance": {
    Icon: Scale,
    bg: "bg-blue-200",
    iconColor: "text-blue-600",
  },
  "Internal Review": {
    Icon: FileTextIcon,
    bg: "bg-red-200",
    iconColor: "text-red-600",
  },
  Consultation: {
    Icon: Gavel,
    bg: "bg-orange-200",
    iconColor: "text-orange-600",
  },
  Deadline: {
    Icon: Clock,
    bg: "bg-purple-200",
    iconColor: "text-purple-600",
  },
};

export interface CourtCaseDates {
  id: string;
  caseName: string;
  caseNumber: string;
  defendant: string;
  date: string;
  type: string;
  title: string;
  plaintiff: string;
  caseId:string;
}

export const selectCourtCaseTypeOptions = (
  Object.keys(CASE_DATE_CONFIG) as CaseDateType[]
).map((type) => ({
  key: type,
  value: type,
}));