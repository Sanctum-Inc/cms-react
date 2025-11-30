import { ArrowLeft, UserPlus } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo-removebg-preview.png";
import { UserService } from "../api/services/UserService";
import PillInput from "../Components/Inputs/PillInput";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import { ValidateField } from "../Utils/InputValidator";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
};

const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});


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
    const email = user.email.trim();
    const password = user.password;

    // Mark fields as touched
    setTouched({ email: true, password: true });

    // Validate login fields
    const emailError = ValidateField("email", email);
    const passwordError = ValidateField("password", password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    console.log("Validating login:", { email, password });
    if (emailError || passwordError) return;

    console.log(user.email, user.password);
    console.log("Login button clicked");
    try {
      const result = await UserService.login({
        email: user.email,
        password: user.password,
      });
      console.log("Login successful:", result);
      // Handle successful login (e.g., store token, redirect)
      localStorage.setItem("accessToken", result.token);
      window.location.href = "/dashboard"; // Redirect to dashboard or desired page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // The response body is usually in error.body or error.response.data
      const errorData = error.body || error.response?.data || error;

      // Extract the detail message
      const errorMessage =
        errorData.detail || errorData.message || "An error occurred";
      const statusCode =
        errorData.status || error.status || error.response?.status;

      if (statusCode === 400 || statusCode === 401) {
        setErrors({
          ...errors,
          email: errorMessage, // This will show "Username or password is incorrect"
        });
      } else {
        setErrors({
          ...errors,
          email: "Login failed. Please try again.",
        });
      }
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
    };

    setErrors(newErrors);

    // If any errors exist, stop
    if (Object.values(newErrors).some((err) => err.length > 0)) {
      console.log("Form invalid:", newErrors);
      return;
    }

    // Proceed with registration
    console.log("Register button clicked");
    // Proceed with registration
    try {
      // Uncomment and use your actual UserService
      const result = await UserService.register({
        name: user.firstName,
        surname: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        password: user.password,
      });
      console.log("Registration successful:", result);

      console.log("Register button clicked - would call API here");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle 400 error (user already exists)
      if (error.status === 400 || error.response?.status === 400) {
        setErrors({
          ...errors,
          email: "An account with this email already exists.",
        });
      } else {
        // Handle other errors
        setErrors({
          ...errors,
          email: error.message || "Registration failed. Please try again.",
        });
      }
      console.error("Registration error:", error);
    }
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
            name="email"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mb-2 ml-3.5">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Password"
            type="password"
            inputType="input"
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm ml-3.5">{errors.password}</p>
          )}
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
    return (
      <>
        <div className="w-full flex">
          <div className="w-full mr-2">
            <PillInput
              placeholder="First Name"
              type="text"
              inputType="input"
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
              inputType="input"
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
        </div>
        <div className="w-full">
          <PillInput
            placeholder="Email Address"
            type="email"
            inputType="input"
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
            inputType="input"
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
            placeholder="Password"
            type="password"
            inputType="input"
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
            inputType="input"
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
      </>
    );
  };

  return (
    <>
      {
        <div className="h-dvh justify-center items-center flex flex-col">
          <Card className="border border-gray-300 p-10 rounded-lg shadow-lg flex flex-col items-center bg-white w-2/8">
            <div className="h-5/6 w-5/6">
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
