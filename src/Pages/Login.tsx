import { ArrowLeft, UserPlus } from "lucide-react";
import logo from "../assets/logo-white.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import PillInput from "../Components/Inputs/PillInput";
import { useState } from "react";

const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = () => {
    // Logic for handling login goes here
    console.log("Login button clicked");
  };

  const handleRegister = () => {
    // Logic for handling login goes here
    console.log("Register button clicked");
  };

  const renderLogin = () => {
    return (
      <>
        <div className="w-full">
          <PillInput
            placeholder="Email Address"
            type="email"
            inputType="input"
            label="Email"
          />
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Password"
            type="password"
            inputType="input"
            label="Password"
          />
        </div>
        <div className="w-full flex justify-end mt-5">
          <a href="" className="text-(--color-primary) hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="w-full flex justify-end mt-5">
          <div className="w-8/8 flex justify-end">
            <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
          </div>
        </div>
        <div className="mt-5">
          <span className="text-gray-500">Don't have an account? </span>
          <div
            className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 mt-1 cursor-pointer"
            onClick={() => setShowRegistration(true)}
          >
            <span>
              <UserPlus />
            </span>
            <span>Create an account</span>
          </div>
        </div>
      </>
    );
  };

  const renderRegister = () => {
    return (<>
      <div className="w-full flex">
        <div className="w-full mr-2">
          <PillInput
            placeholder="First Name"
            type="text"
            inputType="input"
            label="First Name"
          />
        </div>
        <div className="w-full">
          <PillInput
            placeholder="Last Name"
            type="text"
            inputType="input"
            label="Last Name"
          />
        </div>
      </div>
      <div className="w-full">
        <PillInput
          placeholder="Email Address"
          type="email"
          inputType="input"
          label="Email"
        />
      </div>
      <div className="w-full">
        <PillInput
          placeholder="Mobile Number"
          type="text"
          inputType="input"
          label="Mobile Number"
        />
      </div>
      <div className="w-full">
        <PillInput
          placeholder="Password"
          type="password"
          inputType="input"
          label="Password"
        />
      </div>
      <div className="w-full">
        <PillInput
          placeholder="Confirm Password"
          type="password"
          inputType="input"
          label="Confirm Password"
        />
      </div>
      <div className="w-full flex justify-end mt-5">
        <a href="" className="text-(--color-primary) hover:underline">
          Forgot Password?
        </a>
      </div>
      <div className="w-full flex justify-end mt-5">
        <div className="w-8/8 flex justify-end">
          <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
        </div>
      </div>
      <div className="mt-5">
        <span className="text-gray-500">Already have an account? </span>
        <div
          className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 mt-1 cursor-pointer"
          onClick={() => setShowRegistration(false)}
        >
          <span>
            <ArrowLeft />
          </span>
          <span>Sign In</span>
        </div>
      </div>
    </>);
  };

  return (
    <>
      {
        <div className="h-dvh justify-center items-center flex flex-col">
          <Card className="border p-10 rounded-lg shadow-lg flex flex-col items-center bg-white w-2/8">
            <div className="h-4/6 w-4/6">
              <img
                src={logo}
                alt="logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {showRegistration ? renderRegister() : renderLogin()}
          </Card>
        </div>
      }
    </>
  );
};

export default Login;
