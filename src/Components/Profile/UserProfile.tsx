import { useEffect, useState } from "react";
import type { InputItem } from "../../Models/InputItem";
import PillInput from "../Inputs/PillInput";
import { UserService } from "../../api";

type UserForm = {
  userId: string;
  password: string;
  firstname: string;
  surname: string;
  emailAddress: string;
  mobileNumber: string;
};

const UserProfile = () => {
  const [form, setForm] = useState<UserForm>({
    userId: "",
    password: "",
    firstname: "",
    surname: "",
    emailAddress: "",
    mobileNumber: "",
  });

  const inputs: InputItem[] = [
    {
      inputType: "input",
      name: "userId",
      label: "User ID (Non-Editable):",
      type: "text",
      disabled: true,
    },
    {
      inputType: "input",
      name: "firstname",
      label: "First Name:",
      type: "text",
    },
    {
      inputType: "input",
      name: "surname",
      label: "Surname:",
      type: "text",
    },
    {
      inputType: "input",
      name: "emailAddress",
      label: "Email Address:",
      type: "email",
    },
    {
      inputType: "input",
      name: "mobileNumber",
      label: "Mobile Number:",
      type: "text",
    },
  ];

  useEffect(() => {
    UserService.getById("current").then((response) => {
      setForm({
        userId: response.id,
        password: "",
        firstname: response.name,
        surname: response.surname,
        emailAddress: response.email,
        mobileNumber: response.mobileNumber,
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
    <div className="grid grid-cols-10 gap-5">
      {inputs.map((item, index) => (
        <div className="col-span-5" key={`${index}-user-profile-input`}>
          <PillInput
            {...item}
            value={form[item.name as keyof UserForm]}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
