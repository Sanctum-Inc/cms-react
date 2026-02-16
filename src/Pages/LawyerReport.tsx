import { CheckCircle, DollarSign, Gavel, TrendingUp } from "lucide-react";
import { useState } from "react";
import CaseStatusDistributionCard from "../Components/Cards/CaseStatusDistributionCard";
import LawyerReportCard from "../Components/Cards/LawyerReportCard";
import RevenueOpportunityCard from "../Components/Cards/RevenueOpportunityCard";
import Header from "../Components/Header/Header";
import LawyerInvoiceTable from "../Components/Tables/LawyerInvoiceTable";

const LawyerReport = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-5">
      <Header
        showButton={true}
        buttonCaption="Assign New Case"
        title="Lawyer Report"
        handleShowModal={setShowModal}
      />
      <div className="p-5">
        <div className="flex gap-3">
          <span className="text-4xl font-bold">Edwina Jast</span>
          <span className="flex items-center border rounded-3xl px-3">
            Criminal
          </span>
        </div>
        <div className="py-2">
          Detailed performance and case management report
        </div>
        <div className="w-full flex justify-between gap-10 mt-5">
          <LawyerReportCard
            percentage="24"
            value="10"
            icon={DollarSign}
            color="blue"
            linkTo=""
            title="Total Billings"
            subtitle="R412,580.00"
            description="R85k pending payment"
          />
          <LawyerReportCard
            percentage="64"
            value="10"
            icon={Gavel}
            color="purple"
            linkTo=""
            title="Active Cases"
            subtitle="12"
            description="3 closing this month"
          />
          <LawyerReportCard
            percentage="-5"
            value="10"
            icon={TrendingUp}
            color="green"
            linkTo=""
            title="Effeciency Rate"
            subtitle="94%"
            description="Tasks completed vs deadline"
          />
          <LawyerReportCard
            percentage="-78"
            value="10"
            icon={CheckCircle}
            color="red"
            linkTo=""
            title="Average Settlement"
            subtitle="R125K"
            description="Per successful case"
          />
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3 border border-gray-300 mx-5 rounded-3xl ">
          <LawyerInvoiceTable LawyerInvoice={[]} />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-5">
            <RevenueOpportunityCard />
            <CaseStatusDistributionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerReport;
