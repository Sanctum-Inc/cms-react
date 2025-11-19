import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import Header from "../Components/Header/Header";
import PillInput from "../Components/Inputs/PillInput";
import type { InputItem } from "../Models/InputItem";

const ProfilePage = () => {
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

  return (
    <>
      <Header showButton={false} title="Profile Management" />
      <div className="m-6 p-6">
        <div className="grid grid-cols-10">
          <div className="col-span-2">
            <span className="border-b px-2">User Profile</span>
          </div>
          <div className="col-span-2">
            <span>Firm Settings</span>
          </div>
        </div>
      </div>
      <Card className="m-6 p-6">
        <div className="text-2xl font-semibold">Profile Details</div>
        <div className="grid grid-cols-10 gap-5">
          {inputs.map((item, index) => (
            <>
              <div className="col-span-5" key={index}>
                <PillInput {...item} />
              </div>
            </>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
            <div className="w-1/4">
            <PrimaryButton >
                Save Profile Changes
            </PrimaryButton>
            </div>
        </div>
      </Card>
    </>
  );
};

export default ProfilePage;
