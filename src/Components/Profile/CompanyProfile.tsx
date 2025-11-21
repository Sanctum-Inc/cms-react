import type { InputItem } from "../../Models/InputItem";
import PillInput from "../Inputs/PillInput";

const CompanyProfile = () => {
  const inputs: InputItem[] = [
    {
      inputType: "input",
      name: "firmname",
      label: "Firm Name:",
      type: "text",
    },
    {
      inputType: "input",
      name: "address",
      label: "Address:",
      type: "text",
    },
    {
      inputType: "input",
      name: "email",
      label: "Email:",
      type: "email",
    },
    {
      inputType: "input",
      name: "telephone",
      label: "Telephone:",
      type: "text",
    },
    {
      inputType: "input",
      name: "mobile",
      label: "Mobile:",
      type: "text",
    },
    {
      inputType: "input",
      name: "fax",
      label: "Fax:",
      type: "text",
    },
    {
      inputType: "input",
      name: "attorneyAdmissionDate",
      label: "Attorney Admission Date:",
      type: "date",
    },
    {
      inputType: "input",
      name: "advocateAdmissionDate",
      label: "Advocate Admission Date:",
      type: "date",
    },
    {
      inputType: "input",
      name: "accountName",
      label: "Account Name:",
      type: "text",
    },
    {
      inputType: "input",
      name: "bankName",
      label: "Bank Name:",
      type: "text",
    },
    {
      inputType: "input",
      name: "branchCode",
      label: "Branch Code:",
      type: "text",
    },
    {
      inputType: "input",
      name: "accountNumber",
      label: "Account Number:",
      type: "text",
    },
  ];

  return (
    <>
      <div className="col-span-5">
        <div className="text-xl font-semibold text-(--color-primary) mt-4 mb-2">
          General Information
        </div>
        <PillInput {...inputs[0]} />
        <PillInput {...inputs[1]} />
        <div className="text-xl font-semibold text-(--color-primary) mt-4 pt-5 mb-2 border-t border-gray-200">
          Contact Information
        </div>
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-5">
            <PillInput {...inputs[2]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[3]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[4]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[5]} />
          </div>
        </div>
        <div className="text-xl font-semibold text-(--color-primary) mt-4 pt-5 mb-2 border-t border-gray-200">
          Professional Dates
        </div>
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-5">
            <PillInput {...inputs[6]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[7]} />
          </div>
        </div>
        <div className="text-xl font-semibold text-(--color-primary) mt-4 pt-5 mb-2 border-t border-gray-200">
          Banking Details
        </div>
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-5">
            <PillInput {...inputs[8]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[9]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[10]} />
          </div>
          <div className="col-span-5">
            <PillInput {...inputs[11]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
