import type { Items } from "../../Pages/CourtCaseInformation";

export interface CourtCaseInformationTableProps {
  // Define any props needed for the CourtCaseInformationTable here
  headers: Items | undefined;
  items: Items[] | undefined;
}

const CourtCaseInformationTable = ({
  headers,
  items,
}: CourtCaseInformationTableProps) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 font-semibold text-gray-400 bg-gray-100 p-2 py-4 rounded-t-md">
        <div>{headers?.attributes1}</div>
        <div>{headers?.attributes2}</div>
        <div>{headers?.attributes3}</div>
      </div>
      {items?.map((item, index) => (
        <div
          key={`infoTable-${index}`}
          className="grid grid-cols-3 gap-4 bg-white p-2 py-4 border-b border-gray-200"
        >
          <div className="font-semibold">{item.attributes1}</div>
          <div className="text-gray-500">{item.attributes2}</div>
          <div className="text-gray-500">{item.attributes3}</div>
        </div>
      ))}
    </>
  );
};

export default CourtCaseInformationTable;
