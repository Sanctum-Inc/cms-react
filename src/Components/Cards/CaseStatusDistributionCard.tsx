const CaseStatusDistributionCard = () => {
  return (
    <div className="px-5">
      <div className="border border-gray-300 p-5 rounded-3xl flex flex-col gap-3">
        <div className="text-lg font-semibold">Case Status Distribution</div>
        <div className="">
          <div className="flex justify-between">
            <div className="text-gray-500 font-semibold">Active Litigation</div>
            <div>16</div>
          </div>
          <div className="w-full bg-gray-200 h-5 rounded-xl">
            <div className="bg-(--color-primary) h-5 rounded-xl w-3/4"></div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="text-gray-500 font-semibold">Discovery</div>
            <div>8</div>
          </div>
          <div className="w-full bg-gray-200 h-5 rounded-xl">
            <div className="bg-orange-500 h-5 rounded-xl w-1/2"></div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="text-gray-500 font-semibold">Mediation</div>
            <div>4</div>
          </div>
          <div className="w-full bg-gray-200 h-5 rounded-xl">
            <div className="bg-green-500 h-5 rounded-xl w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStatusDistributionCard;
