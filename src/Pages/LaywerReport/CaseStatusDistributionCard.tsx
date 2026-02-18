import type { LawyerReportCaseDistributionResponse } from "../../api";
import { CourtCaseTypeOptions } from "../../Models/InputOptions/CourtCaseTypesOptions";

interface CaseStatusDistributionCardProps {
  caseDistributions?: LawyerReportCaseDistributionResponse[];
}
const CaseStatusDistributionCard = ({
  caseDistributions,
}: CaseStatusDistributionCardProps) => {
  return (
    <div className="px-5">
      <div className="border border-gray-300 p-5 rounded-3xl flex flex-col gap-3">
        <div className="text-lg font-semibold">Case Type Distribution</div>
        {caseDistributions?.map((caseDistribution, index) => (
          <div key={`caseDistirbutionStatus-${index}`}>
            <div className="flex justify-between">
              <div className="text-gray-500 font-semibold">
                {
                  CourtCaseTypeOptions.find(
                    (option) =>
                      option.key === caseDistribution.caseType.toString(),
                  )?.value
                }
              </div>
              <div>{caseDistribution.totalAmount}</div>
            </div>
            <div className="w-full bg-gray-200 h-5 rounded-xl">
              <div className="bg-(--color-primary) h-5 rounded-xl w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStatusDistributionCard;
