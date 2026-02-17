import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../api/services/UserService";
import logo from "../assets/logo-white.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import PillInput from "../Components/Inputs/PillInput";
import useAuthentication from "../Context/Authentication/useAuthentication";
import { ValidateField } from "../Utils/InputValidator";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
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

    if (emailError || passwordError) return;

    try {
      const result = await UserService.login({
        email: user.email,
        password: user.password,
      });

      login(result.token);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // The response body is usually in error.body or error.response.data
      const errorData = error.body || error.response?.data || error;

      const statusCode =
        errorData.status || error.status || error.response?.status;

      if (statusCode === 400 || statusCode === 401) {
        setErrors({
          ...errors,
          password: "Username or password is incorrect",
        });
      } else {
        setErrors({
          ...errors,
          email: "Login failed. Please try again.",
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm border border-gray-200 p-6 rounded-xl shadow-md flex flex-col items-center bg-white">
        <div className="w-32 mb-6">
          <img
            src={logo}
            alt="logo"
            className="max-h-full max-w-full object-contain"
          />
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
            onKeyPress={handleKeyPress}
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mb-2 ml-3.5">{errors.email}</p>
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
            onKeyPress={handleKeyPress}
          />
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm ml-3.5">{errors.password}</p>
          )}
        </div>

        <div className="w-full flex justify-end mt-5">
          <Link
            to="/forgot-password"
            className="text-(--color-primary) hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="w-full flex justify-end mt-5">
          <div className="w-8/8 flex justify-end">
            <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
          </div>
        </div>

        <div className="mt-5">
          <span className="text-gray-500">Don't have an account? </span>
          <Link
            to="/register"
            className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 mt-1 cursor-pointer"
          >
            <span>
              <UserPlus />
            </span>
            <span>Create an account</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
