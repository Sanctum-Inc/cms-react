import type { KeyValue } from "../InputItem";

export const LawyerSpecialityOptions: KeyValue[] = [
  { key: "0", value: "Criminal" },
  { key: "1", value: "Civil" },
  { key: "2", value: "Family" },
  { key: "3", value: "Corporate" },
  { key: "4", value: "Labor" },
  { key: "5", value: "Immigration" },
  { key: "6", value: "Real Estate" },
  { key: "7", value: "Intellectual Property" },
  { key: "8", value: "Tax" },
  { key: "9", value: "Environmental" },
] as const;

type LawyerSpecialityKey = (typeof LawyerSpecialityOptions)[number]["key"];

export const getStyles = (key: LawyerSpecialityKey): string => {
  const map: Record<LawyerSpecialityKey, string> = {
    "0": "bg-red-500", // Criminal
    "1": "bg-blue-500", // Civil
    "2": "bg-pink-500", // Family
    "3": "bg-indigo-500", // Corporate
    "4": "bg-yellow-500", // Labor
    "5": "bg-emerald-500", // Immigration
    "6": "bg-orange-500", // Real Estate
    "7": "bg-purple-500", // Intellectual Property
    "8": "bg-teal-500", // Tax
    "9": "bg-green-700", // Environmental
  };

  return map[key] ?? "bg-gray-400";
};
