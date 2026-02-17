import { ArrowLeft, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/logo-removebg-preview.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import PillInput from "../Components/Inputs/PillInput";
import { ValidateField } from "../Utils/InputValidator";

const ResetPasswordPage = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    // Validate that token exists
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswords({ ...passwords, [name]: value });

    // Clear error immediately when user starts typing (if field was touched)
    if (touched[name]) {
      const error = ValidateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched({ ...touched, [name]: true });

    const error = ValidateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async () => {
    // Mark fields as touched
    setTouched({ password: true, confirmPassword: true });

    // Validate password fields
    const passwordError = ValidateField("password", passwords.password);
    const confirmPasswordError = ValidateField(
      "confirmPassword",
      passwords.confirmPassword,
    );

    const newErrors = {
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    // Check if passwords match
    if (passwords.password !== passwords.confirmPassword) {
      setErrors({
        ...newErrors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    if (passwordError || confirmPasswordError) return;

    if (!token) {
      setTokenError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // await UserService.resetPassword(token, passwords.password);
      // setIsSuccess(true);
      // // Redirect to login after 3 seconds
      // setTimeout(() => {
      //   navigate("/login");
      // }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorData = error.body || error.response?.data || error;
      const statusCode =
        errorData.status || error.status || error.response?.status;

      if (statusCode === 400) {
        setErrors({
          password: "Invalid or expired reset link. Please request a new one.",
        });
      } else {
        setErrors({
          password: "Failed to reset password. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (tokenError) {
    return (
      <div className="h-dvh justify-center items-center flex flex-col">
        <Card className="border border-gray-300 p-10 rounded-lg shadow-lg flex flex-col items-center bg-white">
          <div className="h-5/6 w-5/6">
            <img
              src={logo}
              alt="logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="w-full mb-6">
            <h2 className="text-2xl font-semibold text-center mb-2 text-red-600">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 text-center text-sm">
              This password reset link is invalid or has expired. Please request
              a new password reset.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 w-full">
            <Link
              to="/forgot-password"
              className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 cursor-pointer"
            >
              Request New Reset Link
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:underline flex items-center align-center justify-center gap-1 cursor-pointer"
            >
              <span>
                <ArrowLeft />
              </span>
              <span>Back to Login</span>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

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

        {!isSuccess ? (
          <>
            <div className="w-full mb-6">
              <h2 className="text-2xl font-semibold text-center mb-2">
                Reset Your Password
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Enter your new password below.
              </p>
            </div>

            <div className="w-full">
              <PillInput
                placeholder="New Password"
                type="password"
                label="New Password"
                name="password"
                value={passwords.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
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
                placeholder="Confirm New Password"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
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
                <PrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </PrimaryButton>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full mb-6">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle className="text-green-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-2">
                Password Reset Successful!
              </h2>
              <p className="text-gray-600 text-center text-sm mb-4">
                Your password has been successfully reset.
              </p>
              <p className="text-gray-500 text-center text-xs">
                Redirecting to login page...
              </p>
            </div>
          </div>
        )}

        {!isSuccess && (
          <div className="mt-5">
            <Link
              to="/login"
              className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 cursor-pointer"
            >
              <span>
                <ArrowLeft />
              </span>
              <span>Back to Login</span>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
