import { useEffect } from "react";
import type { InputItem } from "../../Models/InputItem";
import PillInput from "../Inputs/PillInput";
import { UserService } from "../../api";

const UserProfile = () => {
  const inputs: InputItem[] = [
    {
      inputType: "input",
      name: "userId",
      label: "User ID (Non-Editable):",
      type: "text",
    },
    {
      inputType: "input",
      name: "password",
      label: "Password:",
      type: "Password",
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
    // Fetch and set user profile data here if needed
    UserService.getById("current").then((response) => {
      const userData = response.data;
      // You can set the fetched data to state and pass it to inputs if needed
    });
  }, []);

  return (
    <div className="grid grid-cols-10 gap-5">
      {inputs.map((item, index) => (
        <div className="col-span-5" key={index}>
          <PillInput {...item} />
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
