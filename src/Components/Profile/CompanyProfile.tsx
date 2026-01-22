import { useEffect, useState } from "react";
import { FirmService, type FirmResponse } from "../../api";
import type { InputItem } from "../../Models/InputItem";
import PillInput from "../Inputs/PillInput";

type FirmForm = {
  firmname: string;
  address: string;
  email: string;
  telephone: string;
  mobile: string;
  fax: string;
  attorneyAdmissionDate: string;
  advocateAdmissionDate: string;
  accountName: string;
  bankName: string;
  branchCode: string;
  accountNumber: string;
};

const CompanyProfile = () => {
  const [form, setForm] = useState<FirmForm>({
    firmname: "",
    address: "",
    email: "",
    telephone: "",
    mobile: "",
    fax: "",
    attorneyAdmissionDate: "",
    advocateAdmissionDate: "",
    accountName: "",
    bankName: "",
    branchCode: "",
    accountNumber: "",
  });

  const inputs: InputItem[] = [
    { inputType: "input", name: "firmname", label: "Firm Name:", type: "text" },
    { inputType: "input", name: "address", label: "Address:", type: "text" },
    { inputType: "input", name: "email", label: "Email:", type: "email" },
    {
      inputType: "input",
      name: "telephone",
      label: "Telephone:",
      type: "text",
    },
    { inputType: "input", name: "mobile", label: "Mobile:", type: "text" },
    { inputType: "input", name: "fax", label: "Fax:", type: "text" },
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

  useEffect(() => {
    FirmService.getFirmById().then((response: FirmResponse) => {
      setForm({
        firmname: response.name,
        address: response.address,
        email: response.email,
        telephone: response.telephone,
        mobile: response.mobile,
        fax: response.fax,
        attorneyAdmissionDate: response.attorneyAdmissionDate,
        advocateAdmissionDate: response.advocateAdmissionDate,
        accountName: response.accountName,
        bankName: response.bank,
        branchCode: response.branchCode,
        accountNumber: response.accountNumber,
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="col-span-5">
      <div className="text-xl font-semibold text-(--color-primary) mt-4 mb-2">
        General Information
      </div>

      <PillInput {...inputs[0]} value={form.firmname} onChange={handleChange} />
      <PillInput {...inputs[1]} value={form.address} onChange={handleChange} />

      <div className="text-xl font-semibold text-(--color-primary) pt-5 mb-2 border-t border-gray-200">
        Contact Information
      </div>

      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-5">
          <PillInput
            {...inputs[2]}
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput
            {...inputs[3]}
            value={form.telephone}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput
            {...inputs[4]}
            value={form.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput {...inputs[5]} value={form.fax} onChange={handleChange} />
        </div>
      </div>

      <div className="text-xl font-semibold text-(--color-primary) pt-5 mb-2 border-t border-gray-200">
        Professional Dates
      </div>

      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-5">
          <PillInput
            {...inputs[6]}
            value={form.attorneyAdmissionDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput
            {...inputs[7]}
            value={form.advocateAdmissionDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="text-xl font-semibold text-(--color-primary) pt-5 mb-2 border-t border-gray-200">
        Banking Details
      </div>

      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-5">
          <PillInput
            {...inputs[8]}
            value={form.accountName}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput
            {...inputs[9]}
            value={form.bankName}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput
            {...inputs[10]}
            value={form.branchCode}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-5">
          <PillInput
            {...inputs[11]}
            value={form.accountNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;