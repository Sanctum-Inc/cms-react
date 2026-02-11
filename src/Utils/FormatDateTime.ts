export const formatFormalDateTime = (dateString?: string | null) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
