import Card from "../../Components/Cards/Card";

interface DateHealthCardProps {
  completionRate: number;
  upcomingEvents: number;
  changeFromLastMonth: number;
}

const DateHealthCard = ({
  completionRate,
  upcomingEvents,
  changeFromLastMonth,
}: DateHealthCardProps) => {
  const getCompletionRateColor = (completionRate: number) => {
    if (completionRate < 50) {
      return "bg-red-100 text-red-600"; // 0% - 49%
    } else if (completionRate < 70) {
      return "bg-orange-100 text-orange-600"; // 50% - 69%
    } else if (completionRate < 90) {
      return "bg-yellow-100 text-yellow-600"; // 70% - 89%
    } else if (completionRate <= 100) {
      return "bg-green-100 text-green-600"; // 90% - 100%
    } else {
      return "bg-gray-100 text-gray-600"; // Invalid > 100%
    }
  };

  const getUpcomingEventsColor = (upcomingEvents: number) => {
    if (upcomingEvents < 5) {
      return "bg-green-100 text-green-600"; // 0 - 4
    } else if (upcomingEvents < 10) {
      return "bg-orange-100 text-orange-600"; // 5 - 9
    } else {
      return "bg-red-100 text-red-600"; // 10 or more
    }
  };

  return (
    <Card className="border border-gray-300 shadow-md">
      <div className="font-bold opacity-60 mb-3">Timeline Health</div>
      <div className="flex mt-2">
        <div
          className={`w-14 h-14 flex justify-center items-center ${getCompletionRateColor(completionRate)} rounded-xl mr-3 font-semibold`}
        >
          {completionRate}%
        </div>
        <div className="w-7/8">
          <div className="font-semibold">Completeion Rate</div>
          <div className="text-sm font-semibold opacity-50">
            {changeFromLastMonth}% from last month
          </div>
        </div>
      </div>
      <div className="flex mt-2">
        <div
          className={`w-14 h-14 flex justify-center items-center ${getUpcomingEventsColor(upcomingEvents)} rounded-xl mr-3 font-semibold`}
        >
          {upcomingEvents}
        </div>
        <div className="w-7/8">
          <div className="font-semibold">Upcoming Events</div>
          <div className="text-sm font-semibold opacity-50">Next 30 days</div>
        </div>
      </div>
    </Card>
  );
};

export default DateHealthCard;
