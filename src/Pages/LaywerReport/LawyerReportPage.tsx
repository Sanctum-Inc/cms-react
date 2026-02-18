import { CheckCircle, DollarSign, Gavel, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { type LawyerReportResponse, LawyerService } from "../../api";
import ErrorAlert from "../../Components/Feedback/Alerts/ErrorAlert";
import SuccessAlert from "../../Components/Feedback/Alerts/SuccessAlert";
import AddCourtCaseForm from "../../Components/Forms/AddCourtCaseForm";
import Header from "../../Components/Header/Header";
import SideModal from "../../Components/Modal/SideModal";
import LawyerInvoiceTable from "../../Components/Tables/LawyerInvoiceTable";
import { LawyerSpecialityOptions } from "../../Models/InputOptions/LawyerSpecialityOptions";
import formatMoney from "../../Utils/FormatMoney";
import CaseStatusDistributionCard from "./CaseStatusDistributionCard";
import LawyerReportActivityCard from "./LawyerReportActivityCard";
import LawyerReportCard from "./LawyerReportCard";
import LawyerReportDateCard from "./LawyerReportDateCard";
import RevenueOpportunityCard from "./RevenueOpportunityCard";

const LawyerReportPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [reportInformation, setReportInformation] =
    useState<LawyerReportResponse>();
  const [successAlertMessage, setSuccessAlertMessage] = useState<string | null>(
    null,
  );
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.split("?")[1];
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    if (!id) {
      return;
    }

    LawyerService.getLawyerReportInformation(id)
      .then((res) => {
        setReportInformation(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderModal = () => {
    if (!showModal) return null;
    return (
      <SideModal setShowModal={setShowModal} title="New Court Case">
        <AddCourtCaseForm
          filteredCases={[]}
          setShowSuccessMessage={setSuccessAlertMessage}
          setShowErrorMessage={setErrorAlertMessage}
          setShowModal={setShowModal}
        />
      </SideModal>
    );
  };

  const renderSuccessmessage = () => {
    return (
      successAlertMessage && <SuccessAlert message={successAlertMessage} />
    );
  };

  const renderErrorMessage = () => {
    return errorAlertMessage && <ErrorAlert message={errorAlertMessage} />;
  };

  useEffect(() => {
    if (!successAlertMessage) return;
    const timer = setTimeout(() => setSuccessAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [successAlertMessage]);

  useEffect(() => {
    if (!errorAlertMessage) return;
    const timer = setTimeout(() => setErrorAlertMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [errorAlertMessage]);

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
          <span className="text-4xl font-bold">
            {reportInformation?.lawyer.name} {reportInformation?.lawyer.surname}
          </span>
          <span className="flex items-center border rounded-3xl px-3">
            {
              LawyerSpecialityOptions.find(
                (option) =>
                  option.key ===
                  reportInformation?.lawyer.speciality.toString(),
              )?.value
            }
          </span>
        </div>
        <div className="py-2">
          Detailed performance and case management report
        </div>
        <div className="w-full flex justify-between gap-10 mt-5">
          <LawyerReportCard
            percentage={
              reportInformation?.lawyerReportCards[0].percentage.toString() ||
              ""
            }
            icon={DollarSign}
            color="blue"
            linkTo=""
            title="Total Billings"
            subtitle={
              "R" +
                formatMoney(
                  Number(reportInformation?.lawyerReportCards[0].value),
                ) || ""
            }
            description={`R${formatMoney(Number(reportInformation?.lawyerReportCards[0].description?.toString()))} pending payment`}
          />
          <LawyerReportCard
            percentage={
              reportInformation?.lawyerReportCards[1].percentage.toString() ||
              ""
            }
            icon={Gavel}
            color="purple"
            linkTo=""
            title="Active Cases"
            subtitle={
              reportInformation?.lawyerReportCards[1].value.toString() || ""
            }
            description={`${reportInformation?.lawyerReportCards[1].description?.toString()} closed this month`}
          />
          <LawyerReportCard
            percentage={
              reportInformation?.lawyerReportCards[2].percentage.toString() ||
              ""
            }
            icon={TrendingUp}
            color="green"
            linkTo=""
            title="Effeciency Rate"
            subtitle={
              reportInformation?.lawyerReportCards[2].value.toString() || ""
            }
            description="Tasks completed vs deadline"
          />
          <LawyerReportCard
            percentage={
              reportInformation?.lawyerReportCards[3].percentage.toString() ||
              ""
            }
            icon={CheckCircle}
            color="red"
            linkTo=""
            title="Average Settlement"
            subtitle={
              reportInformation?.lawyerReportCards[3].value.toString() || ""
            }
            description={`${reportInformation?.lawyerReportCards[1].description?.toString()} per successfull case`}
          />
        </div>
      </div>
      <div className="flex">
        <div className="mx-5 ">
          <div className="border border-gray-300 rounded-3xl h-fit mb-5">
            <LawyerInvoiceTable LawyerInvoice={reportInformation?.invoices} />
          </div>
          <div className="flex gap-5">
            <div className="w-1/2">
              <LawyerReportDateCard />
            </div>
            <div className="w-1/2">
              <LawyerReportActivityCard />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-5">
            <RevenueOpportunityCard />
            <CaseStatusDistributionCard
              caseDistributions={reportInformation?.caseDistributions}
            />
          </div>
        </div>
      </div>
      {renderModal()}
      {renderSuccessmessage()}
      {renderErrorMessage()}
    </div>
  );
};

export default LawyerReportPage;
