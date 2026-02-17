import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../api/services/UserService";
import logo from "../assets/logo-white.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import PillInput from "../Components/Inputs/PillInput";
import { ValidateField } from "../Utils/InputValidator";
import useAuthentication from "../Context/Authentication/useAuthentication";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  firmId: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    firmId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { login } = useAuthentication();

  // Handle input change - clear error immediately when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });

    // Clear error immediately when user starts typing (if field was touched)
    if (touched[name]) {
      const error = ValidateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched({ ...touched, [name]: true });

    const error = ValidateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleLogin = async () => {
    try {
      const result = await UserService.login({
        email: user.email,
        password: user.password,
      });

      login(result.token);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Auto-login failed after registration:", error);
      // Redirect to login page if auto-login fails
      navigate("/login");
    }
  };

  const handleRegister = async () => {
    // Mark all fields as touched
    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      mobileNumber: true,
      password: true,
      confirmPassword: true,
      firmId: true,
    };
    setTouched(allTouched);

    // Validate all registration fields
    const newErrors: Record<string, string> = {
      firstName: ValidateField("firstName", user.firstName),
      lastName: ValidateField("lastName", user.lastName),
      email: ValidateField("email", user.email),
      mobileNumber: ValidateField("mobileNumber", user.mobileNumber),
      password: ValidateField("password", user.password),
      confirmPassword: ValidateField("confirmPassword", user.confirmPassword),
      firmId: ValidateField("firmId", user.firmId),
    };

    setErrors(newErrors);

    // If any errors exist, stop
    if (Object.values(newErrors).some((err) => err.length > 0)) {
      return;
    }

    // Proceed with registration
    try {
      const result = await UserService.register({
        name: user.firstName,
        surname: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        password: user.password,
        firmId: user.firmId,
      });

      if (result) handleLogin();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const problemDetails = error.body;

      // Rename to avoid shadowing the state variable 'errors'
      const apiErrors = problemDetails?.errors as {
        code: string;
        description: string;
      }[];

      console.log(apiErrors);

      if (apiErrors) {
        const newErrors: Record<string, string> = {
          firstName:
            apiErrors.find((x) => x.code.toLowerCase().includes("firstname"))
              ?.description || "",
          lastName:
            apiErrors.find((x) => x.code.toLowerCase().includes("lastname"))
              ?.description || "",
          email:
            apiErrors.find((x) => x.code.toLowerCase().includes("email"))
              ?.description || "",
          mobileNumber:
            apiErrors.find((x) => x.code.toLowerCase().includes("mobilenumber"))
              ?.description || "",
          password:
            apiErrors.find((x) => x.code.toLowerCase().includes("password"))
              ?.description || "",
          confirmPassword:
            apiErrors.find((x) =>
              x.code.toLowerCase().includes("confirmpassword"),
            )?.description || "",
          firmId:
            apiErrors.find((x) => x.code.toLowerCase().includes("firm"))
              ?.description || "",
        };
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mx-5">
      <Card className="w-full max-w-sm border border-gray-200 p-6 rounded-xl shadow-md flex flex-col items-center bg-white">
        <div className="w-32 mb-6">
          <img
            src={logo}
            alt="logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="w-full mr-2">
          <PillInput
            placeholder="First Name"
            type="text"
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.firstName && errors.firstName && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="w-full">
          <PillInput
            placeholder="Last Name"
            type="text"
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.lastName && errors.lastName && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">
              {errors.lastName}
            </p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Email Address"
            type="email"
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Mobile Number"
            type="text"
            label="Mobile Number"
            name="mobileNumber"
            value={user.mobileNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.mobileNumber && errors.mobileNumber && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">
              {errors.mobileNumber}
            </p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Firm ID"
            type="text"
            label="Firm ID"
            name="firmId"
            value={user.firmId}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.firmId && errors.firmId && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">{errors.firmId}</p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Password"
            type="password"
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">
              {errors.password}
            </p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1 ml-3.5">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="w-full flex justify-end mt-5">
          <div className="w-8/8 flex justify-end">
            <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
          </div>
        </div>

        <div className="mt-5">
          <span className="text-gray-500">Already have an account? </span>
          <Link
            to="/login"
            className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 mt-1 cursor-pointer"
          >
            <span>
              <ArrowLeft />
            </span>
            <span>Sign In</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
